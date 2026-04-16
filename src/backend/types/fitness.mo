module {
  public type UserProfile = {
    userId : Principal;
    name : Text;
    age : Nat;
    gender : Text;
    heightCm : Float;
    weightKg : Float;
    fitnessGoal : Text;
    activityLevel : Text;
    darkMode : Bool;
    createdAt : Int;
    updatedAt : Int;
  };

  public type WeightEntry = {
    date : Text;
    weightKg : Float;
    userId : Principal;
  };

  public type DailyCheckIn = {
    date : Text;
    userId : Principal;
    workoutDone : Bool;
    dietFollowed : Bool;
    waterGlasses : Nat;
    steps : Nat;
    createdAt : Int;
  };

  public type Exercise = {
    id : Text;
    name : Text;
    muscleGroup : Text;
    difficulty : Nat;
    description : Text;
    createdBy : ?Principal;
  };

  public type ChatMessage = {
    id : Text;
    userId : Principal;
    role : Text;
    content : Text;
    createdAt : Int;
  };

  public type AIPlan = {
    userId : Principal;
    planType : Text;
    content : Text;
    generatedAt : Int;
  };
};
