import Map "mo:core/Map";
import List "mo:core/List";
import Blob "mo:core/Blob";
import Time "mo:core/Time";
import Text "mo:core/Text";
import Int "mo:core/Int";
import Principal "mo:core/Principal";
import Types "../types/fitness";
import Common "../types/common";
import AILib "../lib/ai";

mixin (
  getGeminiKey : () -> Text,
  profiles : Map.Map<Principal, Types.UserProfile>,
  aiPlans : Map.Map<Principal, Map.Map<Text, Types.AIPlan>>,
  chatHistory : Map.Map<Principal, List.List<Types.ChatMessage>>,
) {
  // IC management canister HTTP outcall types (matching system IDL)
  type HttpHeader = { name : Text; value : Text };
  type HttpRequestResult = { status : Nat; headers : [HttpHeader]; body : Blob };
  type TransformArg = { response : HttpRequestResult; context : Blob };
  type HttpRequestArgs = {
    url : Text;
    max_response_bytes : ?Nat64;
    method : { #get; #head; #post };
    headers : [HttpHeader];
    body : ?Blob;
    transform : ?{ function : shared query TransformArg -> async HttpRequestResult; context : Blob };
    is_replicated : ?Bool;
  };

  // IC management canister reference for HTTP outcalls
  let ic = actor "aaaaa-aa" : actor {
    http_request : shared HttpRequestArgs -> async HttpRequestResult;
  };

  // Transform callback: strips non-deterministic headers for consensus
  public query func transformResponse(arg : TransformArg) : async HttpRequestResult {
    { status = arg.response.status; headers = []; body = arg.response.body };
  };

  // Minimal JSON string escaping for embedding prompt in JSON values
  // \u{22} = double-quote, \u{5C} = backslash
  private func escapeJson(s : Text) : Text {
    var result = "";
    for (c in s.chars()) {
      if (c == '\u{22}') { result := result # "\u{5C}\u{22}" }
      else if (c == '\u{5C}') { result := result # "\u{5C}\u{5C}" }
      else if (c == '\n') { result := result # "\\n" }
      else if (c == '\r') { result := result # "\\r" }
      else if (c == '\t') { result := result # "\\t" }
      else { result := result # Text.fromChar(c) };
    };
    result;
  };

  private func callGemini(prompt : Text) : async Common.Result {
    let geminiApiKey = getGeminiKey();
    if (geminiApiKey == "") {
      return #err("Gemini API key not configured. Please contact admin.");
    };
    let q = "\u{22}";
    let url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" # geminiApiKey;
    let bodyText = "{" # q # "contents" # q # ":[{" # q # "parts" # q # ":[{" # q # "text" # q # ":" # q # escapeJson(prompt) # q # "}]}]}";
    try {
      let resp = await ic.http_request({
        url;
        max_response_bytes = ?(512 * 1024 : Nat64);
        method = #post;
        headers = [{ name = "Content-Type"; value = "application/json" }];
        body = ?bodyText.encodeUtf8();
        transform = ?{ function = transformResponse; context = Blob.fromArray([]) };
        is_replicated = null;
      });
      switch (resp.body.decodeUtf8()) {
        case null { #err("Failed to decode Gemini response") };
        case (?text) { #ok(text) };
      };
    } catch (_) {
      #err("Gemini API call failed. Please try again.");
    };
  };

  private func savePlanInternal(caller : Principal, planType : Text, content : Text) {
    let plan : Types.AIPlan = { userId = caller; planType; content; generatedAt = Time.now() };
    let userPlans = switch (aiPlans.get(caller)) {
      case null {
        let m = Map.empty<Text, Types.AIPlan>();
        aiPlans.add(caller, m);
        m;
      };
      case (?m) { m };
    };
    userPlans.add(planType, plan);
  };

  private func appendChatInternal(caller : Principal, role : Text, content : Text) {
    let now = Time.now();
    let msg : Types.ChatMessage = {
      id = caller.toText() # "#" # now.toText() # "#" # role;
      userId = caller;
      role;
      content;
      createdAt = now;
    };
    let msgs = switch (chatHistory.get(caller)) {
      case null {
        let m = List.empty<Types.ChatMessage>();
        chatHistory.add(caller, m);
        m;
      };
      case (?m) { m };
    };
    msgs.add(msg);
  };

  public shared ({ caller }) func generateDietPlan() : async Common.Result {
    let profile = switch (profiles.get(caller)) {
      case null { return #err("Profile not found. Please set up your profile first.") };
      case (?p) { p };
    };
    let result = await callGemini(AILib.buildDietPlanPrompt(profile));
    switch (result) {
      case (#ok(content)) { savePlanInternal(caller, "diet", content); #ok(content) };
      case (#err(e)) { #err(e) };
    };
  };

  public shared ({ caller }) func generateWorkoutPlan() : async Common.Result {
    let profile = switch (profiles.get(caller)) {
      case null { return #err("Profile not found. Please set up your profile first.") };
      case (?p) { p };
    };
    let result = await callGemini(AILib.buildWorkoutPlanPrompt(profile));
    switch (result) {
      case (#ok(content)) { savePlanInternal(caller, "workout", content); #ok(content) };
      case (#err(e)) { #err(e) };
    };
  };

  public shared ({ caller }) func generateAIResponse(userMessage : Text) : async Common.Result {
    let profile = profiles.get(caller);
    appendChatInternal(caller, "user", userMessage);
    let result = await callGemini(AILib.buildAIChatPrompt(profile, userMessage));
    switch (result) {
      case (#ok(content)) { appendChatInternal(caller, "assistant", content); #ok(content) };
      case (#err(e)) { #err(e) };
    };
  };
};
