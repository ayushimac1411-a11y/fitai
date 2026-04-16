import Float "mo:core/Float";
import Types "../types/fitness";

module {
  // ── Helpers ────────────────────────────────────────────────────────────────

  func bmi(profile : Types.UserProfile) : Float {
    let heightM = profile.heightCm / 100.0;
    profile.weightKg / (heightM * heightM);
  };

  func bmiCategory(b : Float) : Text {
    if (b < 18.5) "Underweight"
    else if (b < 25.0) "Normal weight"
    else if (b < 30.0) "Overweight"
    else "Obese";
  };

  // ── Public builders ─────────────────────────────────────────────────────────

  public func buildDietPlanPrompt(profile : Types.UserProfile) : Text {
    let b = bmi(profile);
    let bmiText = b.toText();
    let category = bmiCategory(b);
    "You are a professional Indian nutritionist and dietitian. Generate a detailed 7-day diet plan for the following user:\n\n"
    # "Name: " # profile.name # "\n"
    # "Age: " # debug_show(profile.age) # " years\n"
    # "Gender: " # profile.gender # "\n"
    # "Height: " # profile.heightCm.toText() # " cm\n"
    # "Weight: " # profile.weightKg.toText() # " kg\n"
    # "BMI: " # bmiText # " (" # category # ")\n"
    # "Fitness Goal: " # profile.fitnessGoal # "\n"
    # "Activity Level: " # profile.activityLevel # "\n\n"
    # "Requirements:\n"
    # "- Include traditional Indian foods such as dal, roti, rice, paneer, sabzi, dahi, idli, poha, upma, rajma, chole, sambar, etc.\n"
    # "- Provide both vegetarian and non-vegetarian meal options for each slot.\n"
    # "- Include budget-friendly options as well as premium options.\n"
    # "- Each day must have: Breakfast, Mid-Morning Snack, Lunch, Evening Snack, Dinner.\n"
    # "- Include estimated calories for each meal and daily total.\n"
    # "- Tailor macros and portion sizes to the user's goal (" # profile.fitnessGoal # ") and activity level (" # profile.activityLevel # ").\n"
    # "- Keep the plan practical and realistic for an Indian household.\n\n"
    # "Output as valid JSON with this exact structure:\n"
    # "{ \"days\": [ { \"day\": \"Day 1\", \"meals\": { \"breakfast\": { \"veg\": \"...\", \"nonVeg\": \"...\", \"calories\": 0 }, \"midMorningSnack\": { \"veg\": \"...\", \"nonVeg\": \"...\", \"calories\": 0 }, \"lunch\": { \"veg\": \"...\", \"nonVeg\": \"...\", \"calories\": 0 }, \"eveningSnack\": { \"veg\": \"...\", \"nonVeg\": \"...\", \"calories\": 0 }, \"dinner\": { \"veg\": \"...\", \"nonVeg\": \"...\", \"calories\": 0 }, \"totalCalories\": 0 } } ] }\n"
    # "Return only the JSON, no extra text.";
  };

  public func buildWorkoutPlanPrompt(profile : Types.UserProfile) : Text {
    let b = bmi(profile);
    let bmiText = b.toText();
    let category = bmiCategory(b);
    "You are a certified personal trainer. Generate a detailed 7-day workout plan for the following user:\n\n"
    # "Name: " # profile.name # "\n"
    # "Age: " # debug_show(profile.age) # " years\n"
    # "Gender: " # profile.gender # "\n"
    # "BMI: " # bmiText # " (" # category # ")\n"
    # "Fitness Goal: " # profile.fitnessGoal # "\n"
    # "Activity Level: " # profile.activityLevel # "\n\n"
    # "Requirements:\n"
    # "- For Beginner: use full-body workouts 3 days/week, rest or light activity on other days.\n"
    # "- For Intermediate: use Push/Pull/Legs split or Upper/Lower split.\n"
    # "- For Advanced: use a 5-6 day hypertrophy/strength split.\n"
    # "- Each exercise must include: name, target muscle group, sets, reps, rest time (seconds), and brief form tip.\n"
    # "- Include warm-up and cool-down notes for each day.\n"
    # "- Tailor volume and intensity to the goal: Weight Loss (higher reps, shorter rest, cardio finishers), Muscle Gain (progressive overload, moderate reps), Maintain (balanced).\n\n"
    # "Output as valid JSON with this exact structure:\n"
    # "{ \"days\": [ { \"day\": \"Day 1\", \"focus\": \"...\", \"warmUp\": \"...\", \"exercises\": [ { \"name\": \"...\", \"muscleGroup\": \"...\", \"sets\": 0, \"reps\": \"...\", \"restSeconds\": 0, \"formTip\": \"...\" } ], \"coolDown\": \"...\" } ] }\n"
    # "Return only the JSON, no extra text.";
  };

  public func buildAIChatPrompt(profile : ?Types.UserProfile, userMessage : Text) : Text {
    let systemContext = "You are FitAI, an expert AI fitness assistant built into the FitAI Gym App. "
    # "You specialise in fitness, nutrition, workout programming, and healthy lifestyle advice. "
    # "Be concise, practical, motivating, and evidence-based. "
    # "When relevant, suggest Indian-friendly food and workout options. "
    # "Keep answers under 300 words unless a detailed plan is specifically requested.\n\n";

    let profileContext = switch (profile) {
      case null { "" };
      case (?p) {
        let b = bmi(p);
        "User Profile:\n"
        # "- Name: " # p.name # "\n"
        # "- Age: " # debug_show(p.age) # "\n"
        # "- Gender: " # p.gender # "\n"
        # "- BMI: " # b.toText() # " (" # bmiCategory(b) # ")\n"
        # "- Goal: " # p.fitnessGoal # "\n"
        # "- Activity Level: " # p.activityLevel # "\n\n";
      };
    };

    systemContext # profileContext # "User question: " # userMessage;
  };
};
