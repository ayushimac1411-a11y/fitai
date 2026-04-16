import Map "mo:core/Map";
import List "mo:core/List";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Int "mo:core/Int";
import Nat "mo:core/Nat";
import Order "mo:core/Order";
import Time "mo:core/Time";
import Text "mo:core/Text";
import Principal "mo:core/Principal";
import Types "../types/fitness";
import Common "../types/common";

module {
  // --- Profile ---

  public func saveProfile(
    profiles : Map.Map<Principal, Types.UserProfile>,
    caller : Principal,
    name : Text,
    age : Nat,
    gender : Text,
    heightCm : Float,
    weightKg : Float,
    fitnessGoal : Text,
    activityLevel : Text,
    darkMode : Bool,
  ) : Common.Result {
    let now = Time.now();
    let createdAt = switch (profiles.get(caller)) {
      case (?p) { p.createdAt };
      case null { now };
    };
    profiles.add(caller, {
      userId = caller;
      name;
      age;
      gender;
      heightCm;
      weightKg;
      fitnessGoal;
      activityLevel;
      darkMode;
      createdAt;
      updatedAt = now;
    });
    #ok("Profile saved");
  };

  public func getProfile(
    profiles : Map.Map<Principal, Types.UserProfile>,
    caller : Principal,
  ) : ?Types.UserProfile {
    profiles.get(caller);
  };

  // --- Check-ins ---

  public func saveCheckIn(
    checkIns : Map.Map<Principal, List.List<Types.DailyCheckIn>>,
    caller : Principal,
    date : Text,
    workoutDone : Bool,
    dietFollowed : Bool,
    waterGlasses : Nat,
    steps : Nat,
  ) : Common.Result {
    let now = Time.now();
    let userCheckIns = switch (checkIns.get(caller)) {
      case (?list) { list };
      case null {
        let l = List.empty<Types.DailyCheckIn>();
        checkIns.add(caller, l);
        l;
      };
    };
    let filtered = userCheckIns.filter(func(c : Types.DailyCheckIn) : Bool { c.date != date });
    userCheckIns.clear();
    userCheckIns.append(filtered);
    userCheckIns.add({ date; userId = caller; workoutDone; dietFollowed; waterGlasses; steps; createdAt = now });
    #ok("Check-in saved");
  };

  public func getCheckIns(
    checkIns : Map.Map<Principal, List.List<Types.DailyCheckIn>>,
    caller : Principal,
    limit : Nat,
  ) : [Types.DailyCheckIn] {
    switch (checkIns.get(caller)) {
      case null { [] };
      case (?list) {
        let arr = list.toArray().sort(func(a : Types.DailyCheckIn, b : Types.DailyCheckIn) : Order.Order {
          Text.compare(b.date, a.date)
        });
        if (arr.size() <= limit) { arr } else { arr.sliceToArray(0, limit) };
      };
    };
  };

  public func getStreak(
    checkIns : Map.Map<Principal, List.List<Types.DailyCheckIn>>,
    caller : Principal,
  ) : Nat {
    switch (checkIns.get(caller)) {
      case null { 0 };
      case (?list) {
        let completed = list.filter(func(c : Types.DailyCheckIn) : Bool {
          c.workoutDone and c.dietFollowed
        });
        if (completed.isEmpty()) { return 0 };
        let sorted = completed.toArray().sort(func(a : Types.DailyCheckIn, b : Types.DailyCheckIn) : Order.Order {
          Text.compare(b.date, a.date)
        });
        let arr = sorted;
        var streak = 1;
        var i = 1;
        while (i < arr.size()) {
          let diff = dateDiffDays(arr[i - 1].date, arr[i].date);
          if (diff == 1) { streak += 1; i += 1 } else { i := arr.size() };
        };
        streak;
      };
    };
  };

  // Parse YYYY-MM-DD → approximate day count (for streak calculation)
  // Uses a simple integer approximation sufficient for consecutive-day detection.
  private func dateToApproxDays(date : Text) : Nat {
    let parts = date.split(#char '-').toArray();
    if (parts.size() < 3) { return 0 };
    let y = switch (Nat.fromText(parts[0])) { case (?n) n; case null 0 };
    let m = switch (Nat.fromText(parts[1])) { case (?n) n; case null 0 };
    let d = switch (Nat.fromText(parts[2])) { case (?n) n; case null 0 };
    // Approximate: year*365 + month*30 + day (good enough for consecutive-day check)
    y * 365 + m * 30 + d;
  };

  // Returns days between later and earlier (later > earlier → positive)
  private func dateDiffDays(later : Text, earlier : Text) : Nat {
    let l = dateToApproxDays(later);
    let e = dateToApproxDays(earlier);
    if (l > e) { l - e } else { 0 };
  };

  // --- Weight ---

  public func logWeight(
    weightHistory : Map.Map<Principal, List.List<Types.WeightEntry>>,
    caller : Principal,
    date : Text,
    weightKg : Float,
  ) : Common.Result {
    let userHistory = switch (weightHistory.get(caller)) {
      case (?list) { list };
      case null {
        let l = List.empty<Types.WeightEntry>();
        weightHistory.add(caller, l);
        l;
      };
    };
    let filtered = userHistory.filter(func(e : Types.WeightEntry) : Bool { e.date != date });
    userHistory.clear();
    userHistory.append(filtered);
    userHistory.add({ date; weightKg; userId = caller });
    #ok("Weight logged");
  };

  public func getWeightHistory(
    weightHistory : Map.Map<Principal, List.List<Types.WeightEntry>>,
    caller : Principal,
    limit : Nat,
  ) : [Types.WeightEntry] {
    switch (weightHistory.get(caller)) {
      case null { [] };
      case (?list) {
        let arr = list.toArray().sort(func(a : Types.WeightEntry, b : Types.WeightEntry) : Order.Order {
          Text.compare(b.date, a.date)
        });
        if (arr.size() <= limit) { arr } else { arr.sliceToArray(0, limit) };
      };
    };
  };

  // --- AI Plans ---

  public func saveAIPlan(
    aiPlans : Map.Map<Principal, Map.Map<Text, Types.AIPlan>>,
    caller : Principal,
    planType : Text,
    content : Text,
  ) : Common.Result {
    let now = Time.now();
    let userPlans = switch (aiPlans.get(caller)) {
      case (?m) { m };
      case null {
        let m = Map.empty<Text, Types.AIPlan>();
        aiPlans.add(caller, m);
        m;
      };
    };
    userPlans.add(planType, { userId = caller; planType; content; generatedAt = now });
    #ok("AI plan saved");
  };

  public func getAIPlan(
    aiPlans : Map.Map<Principal, Map.Map<Text, Types.AIPlan>>,
    caller : Principal,
    planType : Text,
  ) : ?Types.AIPlan {
    switch (aiPlans.get(caller)) {
      case null { null };
      case (?userPlans) { userPlans.get(planType) };
    };
  };

  // --- Chat ---

  public func saveChatMessage(
    chatHistory : Map.Map<Principal, List.List<Types.ChatMessage>>,
    caller : Principal,
    role : Text,
    content : Text,
  ) : Text {
    let now = Time.now();
    let id = caller.toText() # "#" # now.toText();
    let userChat = switch (chatHistory.get(caller)) {
      case (?list) { list };
      case null {
        let l = List.empty<Types.ChatMessage>();
        chatHistory.add(caller, l);
        l;
      };
    };
    userChat.add({ id; userId = caller; role; content; createdAt = now });
    id;
  };

  public func getChatHistory(
    chatHistory : Map.Map<Principal, List.List<Types.ChatMessage>>,
    caller : Principal,
    limit : Nat,
  ) : [Types.ChatMessage] {
    switch (chatHistory.get(caller)) {
      case null { [] };
      case (?list) {
        let arr = list.toArray().sort(func(a : Types.ChatMessage, b : Types.ChatMessage) : Order.Order {
          Int.compare(a.createdAt, b.createdAt)
        });
        let total = arr.size();
        if (total <= limit) { arr } else {
          arr.sliceToArray(total - limit, total);
        };
      };
    };
  };

  public func clearChatHistory(
    chatHistory : Map.Map<Principal, List.List<Types.ChatMessage>>,
    caller : Principal,
  ) : () {
    switch (chatHistory.get(caller)) {
      case null { () };
      case (?list) { list.clear() };
    };
  };

  // --- Exercises ---

  public func listExercises(exercises : List.List<Types.Exercise>) : [Types.Exercise] {
    exercises.toArray();
  };

  public func addExercise(
    exercises : List.List<Types.Exercise>,
    id : Text,
    name : Text,
    muscleGroup : Text,
    difficulty : Nat,
    description : Text,
    caller : Principal,
  ) : Common.Result {
    switch (exercises.find(func(e : Types.Exercise) : Bool { e.id == id })) {
      case (?_) { #err("Exercise with id " # id # " already exists") };
      case null {
        exercises.add({ id; name; muscleGroup; difficulty; description; createdBy = ?caller });
        #ok("Exercise added");
      };
    };
  };

  public func deleteExercise(exercises : List.List<Types.Exercise>, id : Text) : Common.Result {
    switch (exercises.findIndex(func(e : Types.Exercise) : Bool { e.id == id })) {
      case null { #err("Exercise not found") };
      case (?_) {
        let filtered = exercises.filter(func(e : Types.Exercise) : Bool { e.id != id });
        exercises.clear();
        exercises.append(filtered);
        #ok("Exercise deleted");
      };
    };
  };
};
