import Map "mo:core/Map";
import List "mo:core/List";
import Set "mo:core/Set";
import Principal "mo:core/Principal";
import Types "../types/fitness";
import Common "../types/common";
import FitnessLib "../lib/fitness";

mixin (
  admins : Set.Set<Principal>,
  profiles : Map.Map<Principal, Types.UserProfile>,
  checkIns : Map.Map<Principal, List.List<Types.DailyCheckIn>>,
  weightHistory : Map.Map<Principal, List.List<Types.WeightEntry>>,
  aiPlans : Map.Map<Principal, Map.Map<Text, Types.AIPlan>>,
  chatHistory : Map.Map<Principal, List.List<Types.ChatMessage>>,
  exercises : List.List<Types.Exercise>,
) {
  // --- Admin check ---

  public query ({ caller }) func isAdmin() : async Bool {
    admins.contains(caller);
  };

  // --- Profile ---

  public shared ({ caller }) func saveProfile(
    name : Text,
    age : Nat,
    gender : Text,
    heightCm : Float,
    weightKg : Float,
    fitnessGoal : Text,
    activityLevel : Text,
    darkMode : Bool,
  ) : async Common.Result {
    FitnessLib.saveProfile(profiles, caller, name, age, gender, heightCm, weightKg, fitnessGoal, activityLevel, darkMode);
  };

  public query ({ caller }) func getProfile() : async ?Types.UserProfile {
    FitnessLib.getProfile(profiles, caller);
  };

  // --- Check-ins ---

  public shared ({ caller }) func saveCheckIn(
    date : Text,
    workoutDone : Bool,
    dietFollowed : Bool,
    waterGlasses : Nat,
    steps : Nat,
  ) : async Common.Result {
    FitnessLib.saveCheckIn(checkIns, caller, date, workoutDone, dietFollowed, waterGlasses, steps);
  };

  public query ({ caller }) func getCheckIns(limit : Nat) : async [Types.DailyCheckIn] {
    FitnessLib.getCheckIns(checkIns, caller, limit);
  };

  public query ({ caller }) func getStreak() : async Nat {
    FitnessLib.getStreak(checkIns, caller);
  };

  // --- Weight ---

  public shared ({ caller }) func logWeight(date : Text, weightKg : Float) : async Common.Result {
    FitnessLib.logWeight(weightHistory, caller, date, weightKg);
  };

  public query ({ caller }) func getWeightHistory(limit : Nat) : async [Types.WeightEntry] {
    FitnessLib.getWeightHistory(weightHistory, caller, limit);
  };

  // --- AI Plans ---

  public shared ({ caller }) func saveAIPlan(planType : Text, content : Text) : async Common.Result {
    FitnessLib.saveAIPlan(aiPlans, caller, planType, content);
  };

  public query ({ caller }) func getAIPlan(planType : Text) : async ?Types.AIPlan {
    FitnessLib.getAIPlan(aiPlans, caller, planType);
  };

  // --- Chat ---

  public shared ({ caller }) func saveChatMessage(role : Text, content : Text) : async Text {
    FitnessLib.saveChatMessage(chatHistory, caller, role, content);
  };

  public query ({ caller }) func getChatHistory(limit : Nat) : async [Types.ChatMessage] {
    FitnessLib.getChatHistory(chatHistory, caller, limit);
  };

  public shared ({ caller }) func clearChatHistory() : async () {
    FitnessLib.clearChatHistory(chatHistory, caller);
  };

  // --- Exercises ---

  public query func listExercises() : async [Types.Exercise] {
    FitnessLib.listExercises(exercises);
  };

  public shared ({ caller }) func addExercise(
    id : Text,
    name : Text,
    muscleGroup : Text,
    difficulty : Nat,
    description : Text,
  ) : async Common.Result {
    if (not admins.contains(caller)) {
      return #err("Unauthorized: admin only");
    };
    FitnessLib.addExercise(exercises, id, name, muscleGroup, difficulty, description, caller);
  };

  public shared ({ caller }) func deleteExercise(id : Text) : async Common.Result {
    if (not admins.contains(caller)) {
      return #err("Unauthorized: admin only");
    };
    FitnessLib.deleteExercise(exercises, id);
  };
};
