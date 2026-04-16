import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Exercise {
    id: string;
    difficulty: bigint;
    name: string;
    createdBy?: Principal;
    description: string;
    muscleGroup: string;
}
export type Result = {
    __kind__: "ok";
    ok: string;
} | {
    __kind__: "err";
    err: string;
};
export interface HttpRequestResult {
    status: bigint;
    body: Uint8Array;
    headers: Array<HttpHeader>;
}
export interface TransformArg {
    context: Uint8Array;
    response: HttpRequestResult;
}
export interface DailyCheckIn {
    waterGlasses: bigint;
    userId: Principal;
    date: string;
    createdAt: bigint;
    dietFollowed: boolean;
    steps: bigint;
    workoutDone: boolean;
}
export interface AIPlan {
    content: string;
    userId: Principal;
    generatedAt: bigint;
    planType: string;
}
export interface ChatMessage {
    id: string;
    content: string;
    userId: Principal;
    createdAt: bigint;
    role: string;
}
export interface WeightEntry {
    userId: Principal;
    date: string;
    weightKg: number;
}
export interface HttpHeader {
    value: string;
    name: string;
}
export interface UserProfile {
    age: bigint;
    activityLevel: string;
    fitnessGoal: string;
    heightCm: number;
    userId: Principal;
    name: string;
    createdAt: bigint;
    darkMode: boolean;
    updatedAt: bigint;
    weightKg: number;
    gender: string;
}
export interface backendInterface {
    addAdmin(newAdmin: Principal): Promise<void>;
    addExercise(id: string, name: string, muscleGroup: string, difficulty: bigint, description: string): Promise<Result>;
    clearChatHistory(): Promise<void>;
    deleteExercise(id: string): Promise<Result>;
    generateAIResponse(userMessage: string): Promise<Result>;
    generateDietPlan(): Promise<Result>;
    generateWorkoutPlan(): Promise<Result>;
    getAIPlan(planType: string): Promise<AIPlan | null>;
    getChatHistory(limit: bigint): Promise<Array<ChatMessage>>;
    getCheckIns(limit: bigint): Promise<Array<DailyCheckIn>>;
    getProfile(): Promise<UserProfile | null>;
    getStreak(): Promise<bigint>;
    getWeightHistory(limit: bigint): Promise<Array<WeightEntry>>;
    hasGeminiApiKey(): Promise<boolean>;
    isAdmin(): Promise<boolean>;
    listExercises(): Promise<Array<Exercise>>;
    logWeight(date: string, weightKg: number): Promise<Result>;
    saveAIPlan(planType: string, content: string): Promise<Result>;
    saveChatMessage(role: string, content: string): Promise<string>;
    saveCheckIn(date: string, workoutDone: boolean, dietFollowed: boolean, waterGlasses: bigint, steps: bigint): Promise<Result>;
    saveProfile(name: string, age: bigint, gender: string, heightCm: number, weightKg: number, fitnessGoal: string, activityLevel: string, darkMode: boolean): Promise<Result>;
    setGeminiApiKey(key: string): Promise<void>;
    transformResponse(arg: TransformArg): Promise<HttpRequestResult>;
}
