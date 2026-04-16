import Map "mo:core/Map";
import List "mo:core/List";
import Set "mo:core/Set";
import Principal "mo:core/Principal";
import Types "./types/fitness";
import FitnessMixin "./mixins/fitness-api";
import AIMixin "./mixins/ai-api";

actor {
  // ── Admin set ──────────────────────────────────────────────────────────────
  let admins = Set.empty<Principal>();

  // ── Core state ─────────────────────────────────────────────────────────────
  let profiles = Map.empty<Principal, Types.UserProfile>();
  let checkIns = Map.empty<Principal, List.List<Types.DailyCheckIn>>();
  let weightHistory = Map.empty<Principal, List.List<Types.WeightEntry>>();
  let aiPlans = Map.empty<Principal, Map.Map<Text, Types.AIPlan>>();
  let chatHistory = Map.empty<Principal, List.List<Types.ChatMessage>>();
  let exercises = List.empty<Types.Exercise>();

  // ── Pre-seed exercises ─────────────────────────────────────────────────────
  do {
    let seed : [Types.Exercise] = [
      // Chest
      { id = "ex-001"; name = "Push-Up"; muscleGroup = "Chest"; difficulty = 1; description = "Start in a plank position with hands shoulder-width apart. Lower your chest to the floor keeping your body straight, then push back up. Keep core tight throughout."; createdBy = null },
      { id = "ex-002"; name = "Bench Press"; muscleGroup = "Chest"; difficulty = 3; description = "Lie on a flat bench, grip the barbell slightly wider than shoulder-width. Lower the bar to mid-chest with control, then press explosively back up. Maintain a slight arch in the lower back."; createdBy = null },
      { id = "ex-003"; name = "Dumbbell Flyes"; muscleGroup = "Chest"; difficulty = 2; description = "Lie on a flat bench holding dumbbells above chest with a slight bend in the elbows. Lower the weights in a wide arc until you feel a stretch, then bring them back together."; createdBy = null },
      // Back
      { id = "ex-004"; name = "Pull-Up"; muscleGroup = "Back"; difficulty = 3; description = "Hang from a bar with an overhand grip slightly wider than shoulders. Pull yourself up until your chin clears the bar, then lower with control. Engage your lats and avoid swinging."; createdBy = null },
      { id = "ex-005"; name = "Bent-Over Row"; muscleGroup = "Back"; difficulty = 3; description = "Hinge at the hips holding a barbell, keeping your back flat and parallel to the floor. Pull the bar to your lower chest, squeezing your shoulder blades together, then lower under control."; createdBy = null },
      { id = "ex-006"; name = "Lat Pulldown"; muscleGroup = "Back"; difficulty = 2; description = "Sit at a cable machine and grip the bar wider than shoulder-width. Pull the bar down to your upper chest while leaning back slightly, squeezing your lats. Control the return."; createdBy = null },
      // Legs
      { id = "ex-007"; name = "Squat"; muscleGroup = "Legs"; difficulty = 2; description = "Stand with feet shoulder-width apart. Push your hips back and bend your knees to lower until thighs are parallel to the floor, keeping your chest up and knees tracking over toes. Drive through heels to stand."; createdBy = null },
      { id = "ex-008"; name = "Romanian Deadlift"; muscleGroup = "Legs"; difficulty = 3; description = "Hold a barbell at hip height with a shoulder-width grip. Hinge at the hips pushing them back, lowering the bar along your legs until you feel a hamstring stretch. Drive hips forward to return."; createdBy = null },
      { id = "ex-009"; name = "Lunges"; muscleGroup = "Legs"; difficulty = 2; description = "Stand upright, step one foot forward and lower your back knee toward the floor until both knees are at 90 degrees. Push through your front heel to return. Alternate legs each rep."; createdBy = null },
      { id = "ex-010"; name = "Leg Press"; muscleGroup = "Legs"; difficulty = 2; description = "Sit in the leg press machine with feet shoulder-width on the platform. Lower the sled by bending your knees to 90 degrees, then press back to the start without locking your knees."; createdBy = null },
      // Shoulders
      { id = "ex-011"; name = "Overhead Press"; muscleGroup = "Shoulders"; difficulty = 3; description = "Stand holding a barbell at shoulder height with an overhand grip. Press the bar straight up overhead until arms are fully extended, then lower back to shoulder height with control."; createdBy = null },
      { id = "ex-012"; name = "Lateral Raise"; muscleGroup = "Shoulders"; difficulty = 1; description = "Stand holding dumbbells at your sides. Raise your arms out to the sides until they are parallel to the floor, keeping a slight bend in the elbows. Lower slowly back to the start."; createdBy = null },
      // Arms
      { id = "ex-013"; name = "Barbell Curl"; muscleGroup = "Arms"; difficulty = 2; description = "Stand holding a barbell with an underhand grip at hip width. Curl the bar up toward your shoulders by bending the elbows, keeping upper arms stationary. Lower with control."; createdBy = null },
      { id = "ex-014"; name = "Tricep Dip"; muscleGroup = "Arms"; difficulty = 2; description = "Support yourself on parallel bars with arms straight. Lower your body by bending the elbows to about 90 degrees, keeping them close to your sides, then push back up to the start."; createdBy = null },
      { id = "ex-015"; name = "Hammer Curl"; muscleGroup = "Arms"; difficulty = 1; description = "Hold dumbbells at your sides with a neutral (palms-in) grip. Curl both weights up toward the shoulders without rotating your wrists, then lower under control."; createdBy = null },
      // Core
      { id = "ex-016"; name = "Plank"; muscleGroup = "Core"; difficulty = 1; description = "Hold a push-up position with your forearms on the floor, body forming a straight line from head to heels. Brace your core and glutes, breathing steadily. Hold for time."; createdBy = null },
      { id = "ex-017"; name = "Crunches"; muscleGroup = "Core"; difficulty = 1; description = "Lie on your back with knees bent and hands behind your head. Contract your abs to lift your shoulders off the floor, then lower back down. Avoid pulling on your neck."; createdBy = null },
      { id = "ex-018"; name = "Russian Twists"; muscleGroup = "Core"; difficulty = 2; description = "Sit on the floor with knees bent and feet slightly elevated, leaning back to a 45-degree angle. Rotate your torso side to side, touching the floor (or a weight) beside each hip."; createdBy = null },
      // Cardio
      { id = "ex-019"; name = "Burpees"; muscleGroup = "Cardio"; difficulty = 3; description = "From standing, squat down and place your hands on the floor, jump your feet back to a plank, do a push-up, jump your feet forward, then explosively jump up with arms overhead."; createdBy = null },
      { id = "ex-020"; name = "Jump Rope"; muscleGroup = "Cardio"; difficulty = 2; description = "Hold jump rope handles with hands at hip level. Swing the rope overhead and jump with both feet as it passes beneath you. Land softly on the balls of your feet and maintain a steady rhythm."; createdBy = null },
    ];
    for (ex in seed.vals()) {
      exercises.add(ex);
    };
  };

  // ── Gemini API key ─────────────────────────────────────────────────────────
  var geminiApiKey : Text = "";

  public shared ({ caller }) func setGeminiApiKey(key : Text) : async () {
    if (admins.isEmpty() or admins.contains(caller)) {
      geminiApiKey := key;
      admins.add(caller);
    };
  };

  public shared ({ caller }) func addAdmin(newAdmin : Principal) : async () {
    if (admins.isEmpty() or admins.contains(caller)) {
      admins.add(newAdmin);
    };
  };

  public query ({ caller }) func hasGeminiApiKey() : async Bool {
    geminiApiKey != "";
  };

  // ── Include mixins ─────────────────────────────────────────────────────────
  include FitnessMixin(admins, profiles, checkIns, weightHistory, aiPlans, chatHistory, exercises);
  include AIMixin(func() { geminiApiKey }, profiles, aiPlans, chatHistory);
};
