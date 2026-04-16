import {
  AlertCircle,
  Bot,
  MessageSquare,
  Send,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import type { ChatMessage } from "../backend.d.ts";
import { useAuth } from "../hooks/useAuth";
import { useBackend } from "../hooks/useBackend";

// ─── types ───────────────────────────────────────────────────────────────────

interface LocalMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  isError?: boolean;
}

// ─── constants ───────────────────────────────────────────────────────────────

const MAX_CHARS = 500;

const STARTERS = [
  "What's a good diet for weight loss?",
  "How many calories should I eat?",
  "Best exercises for abs?",
  "How to build muscle fast?",
];

const WELCOME: LocalMessage = {
  id: "welcome",
  role: "assistant",
  content:
    "Hi! I'm your FitAI assistant. Ask me anything about fitness, nutrition, or workouts! 💪",
  timestamp: new Date(),
};

// ─── helpers ─────────────────────────────────────────────────────────────────

function backendMsgToLocal(m: ChatMessage): LocalMessage {
  return {
    id: m.id,
    role: m.role === "user" ? "user" : "assistant",
    content: m.content,
    timestamp: new Date(Number(m.createdAt) / 1_000_000),
  };
}

function formatTime(d: Date) {
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

// ─── sub-components ──────────────────────────────────────────────────────────

function BotAvatar({ size = 28 }: { size?: number }) {
  return (
    <div
      className="rounded-full flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-accent to-secondary shadow-lg"
      style={{ width: size, height: size }}
    >
      <Sparkles size={size * 0.5} className="text-black" />
    </div>
  );
}

function UserAvatar({ initials }: { initials: string }) {
  return (
    <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 bg-muted border border-white/10 text-[10px] font-bold text-foreground uppercase">
      {initials}
    </div>
  );
}

function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 4 }}
      className="flex gap-2.5 items-end"
      data-ocid="chat.loading_state"
    >
      <BotAvatar />
      <div className="glass border border-white/10 px-4 py-3 rounded-2xl rounded-tl-sm">
        <div className="flex items-center gap-2.5">
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-accent/70 animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            FitAI is thinking…
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function MessageBubble({
  msg,
  initials,
}: {
  msg: LocalMessage;
  initials: string;
}) {
  const isUser = msg.role === "user";
  const [showTime, setShowTime] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
      className={`flex gap-2.5 items-end ${isUser ? "flex-row-reverse" : "flex-row"}`}
    >
      {isUser ? <UserAvatar initials={initials} /> : <BotAvatar />}

      <div
        className={`flex flex-col gap-0.5 max-w-[78%] ${isUser ? "items-end" : "items-start"}`}
      >
        <button
          type="button"
          onClick={() => setShowTime((p) => !p)}
          className={`px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap break-words rounded-2xl text-left transition-smooth cursor-default ${
            isUser
              ? "bg-accent text-black rounded-tr-sm font-medium"
              : msg.isError
                ? "bg-destructive/20 border border-destructive/30 text-destructive-foreground rounded-tl-sm"
                : "glass border border-white/10 text-foreground rounded-tl-sm"
          }`}
          data-ocid={isUser ? "chat.user_bubble" : "chat.ai_bubble"}
          aria-label={`${isUser ? "You" : "FitAI"}: ${msg.content}`}
        >
          {msg.isError && (
            <span className="inline-flex items-center gap-1 mb-1 text-destructive text-xs font-medium">
              <AlertCircle size={12} /> Error
            </span>
          )}
          {msg.content}
        </button>

        <AnimatePresence>
          {showTime && (
            <motion.span
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="text-[10px] text-muted-foreground px-1"
            >
              {formatTime(msg.timestamp)}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function ConfirmClearDialog({
  onConfirm,
  onCancel,
}: {
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.6)" }}
      data-ocid="chat.dialog"
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ duration: 0.18 }}
        className="glass-elevated rounded-2xl p-6 w-full max-w-xs border border-white/10"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-full bg-destructive/15 flex items-center justify-center">
            <Trash2 size={16} className="text-destructive" />
          </div>
          <h3 className="font-display font-semibold text-foreground">
            Clear chat?
          </h3>
        </div>
        <p className="text-sm text-muted-foreground mb-5">
          This will permanently delete all your chat history with FitAI.
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            data-ocid="chat.cancel_button"
            onClick={onCancel}
            className="flex-1 py-2 rounded-xl border border-white/15 text-sm text-foreground hover:bg-white/5 transition-smooth"
          >
            Cancel
          </button>
          <button
            type="button"
            data-ocid="chat.confirm_button"
            onClick={onConfirm}
            className="flex-1 py-2 rounded-xl bg-destructive/80 hover:bg-destructive text-destructive-foreground text-sm font-medium transition-smooth"
          >
            Clear
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── main page ────────────────────────────────────────────────────────────────

export default function ChatPage() {
  const { backend, isFetching } = useBackend();
  const { principal } = useAuth();

  // derive initials from principal (last 4 chars) or "U"
  const initials = principal ? principal.slice(-4).toUpperCase() : "U";

  const [messages, setMessages] = useState<LocalMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [historyLoaded, setHistoryLoaded] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [hasApiKey, setHasApiKey] = useState<boolean | null>(null);

  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // ── scroll helpers ──────────────────────────────────────────────────────
  const scrollToBottom = useCallback(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll on message count change
  useLayoutEffect(() => {
    scrollToBottom();
  }, [messages.length, isLoading]);

  // ── load history on mount ───────────────────────────────────────────────
  useEffect(() => {
    if (!backend || isFetching || historyLoaded) return;

    async function load() {
      try {
        const [history, apiKeyStatus] = await Promise.all([
          backend!.getChatHistory(BigInt(50)),
          backend!.hasGeminiApiKey(),
        ]);
        setHasApiKey(apiKeyStatus);
        if (history.length > 0) {
          setMessages(history.map(backendMsgToLocal));
        } else {
          setMessages([WELCOME]);
        }
      } catch {
        setMessages([WELCOME]);
      } finally {
        setHistoryLoaded(true);
      }
    }

    load();
  }, [backend, isFetching, historyLoaded]);

  // ── auto-resize textarea ────────────────────────────────────────────────
  function autoResize() {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    const lineH = 24;
    const maxH = lineH * 3 + 24; // 3 rows + padding
    el.style.height = `${Math.min(el.scrollHeight, maxH)}px`;
  }

  // ── send message ────────────────────────────────────────────────────────
  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isLoading || !backend) return;

      const userMsg: LocalMessage = {
        id: `u-${Date.now()}`,
        role: "user",
        content: trimmed,
        timestamp: new Date(),
      };

      setMessages((prev) => [
        ...prev.filter((m) => m.id !== "welcome"),
        userMsg,
      ]);
      setInput("");
      if (textareaRef.current) textareaRef.current.style.height = "auto";
      setIsLoading(true);

      try {
        // persist user message
        await backend.saveChatMessage("user", trimmed);

        // generate AI response
        const result = await backend.generateAIResponse(trimmed);

        if (result.__kind__ === "ok") {
          const aiMsg: LocalMessage = {
            id: `a-${Date.now()}`,
            role: "assistant",
            content: result.ok,
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, aiMsg]);
        } else {
          const errMsg: LocalMessage = {
            id: `err-${Date.now()}`,
            role: "assistant",
            content: result.err.includes("API key")
              ? "Failed to get response. Please add your Gemini API key in Profile settings."
              : result.err || "Failed to get a response. Please try again.",
            timestamp: new Date(),
            isError: true,
          };
          setMessages((prev) => [...prev, errMsg]);
        }
      } catch {
        const errMsg: LocalMessage = {
          id: `err-${Date.now()}`,
          role: "assistant",
          content:
            "Failed to get response. Check your Gemini API key in Profile settings.",
          timestamp: new Date(),
          isError: true,
        };
        setMessages((prev) => [...prev, errMsg]);
      } finally {
        setIsLoading(false);
      }
    },
    [backend, isLoading],
  );

  // ── clear history ───────────────────────────────────────────────────────
  const handleClear = useCallback(async () => {
    setShowClearConfirm(false);
    if (!backend) return;
    await backend.clearChatHistory();
    setMessages([WELCOME]);
  }, [backend]);

  // ── keyboard submit ─────────────────────────────────────────────────────
  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  const canSend = input.trim().length > 0 && !isLoading && !!backend;
  const showStarters = messages.length <= 1 && !isLoading;
  const charsLeft = MAX_CHARS - input.length;

  // ── no history skeleton ─────────────────────────────────────────────────
  if (!historyLoaded) {
    return (
      <div
        className="flex flex-col h-[calc(100vh-4rem)] items-center justify-center gap-3"
        data-ocid="chat.loading_state"
      >
        <div className="w-10 h-10 rounded-full border-2 border-accent border-t-transparent animate-spin" />
        <span className="text-sm text-muted-foreground">
          Loading chat history…
        </span>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col h-[calc(100vh-4rem)] relative"
      data-ocid="chat.page"
    >
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <div className="flex-shrink-0 px-4 pt-5 pb-3 border-b border-white/5 glass-elevated rounded-none">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BotAvatar size={40} />
            <div>
              <h1 className="font-display font-bold text-foreground leading-tight">
                FitAI Assistant
              </h1>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="text-xs text-accent font-medium">Online</span>
                {hasApiKey === false && (
                  <span className="text-xs text-muted-foreground">
                    · No API key
                  </span>
                )}
              </div>
            </div>
          </div>

          <button
            type="button"
            data-ocid="chat.clear_history_button"
            onClick={() => setShowClearConfirm(true)}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-smooth"
            aria-label="Clear chat history"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>

      {/* ── Messages ───────────────────────────────────────────────────── */}
      <div
        className="flex-1 overflow-y-auto px-4 py-4 space-y-4 min-h-0"
        data-ocid="chat.messages_list"
      >
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <MessageBubble key={msg.id} msg={msg} initials={initials} />
          ))}

          {isLoading && <TypingIndicator key="typing" />}
        </AnimatePresence>

        {/* Empty / welcome placeholder when only welcome exists + no starters visible */}
        {messages.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center h-40 gap-3"
            data-ocid="chat.empty_state"
          >
            <MessageSquare size={36} className="text-muted-foreground/40" />
            <p className="text-sm text-muted-foreground">
              Start a conversation with FitAI
            </p>
          </motion.div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* ── Starter chips ──────────────────────────────────────────────── */}
      <AnimatePresence>
        {showStarters && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="flex-shrink-0 px-4 pb-2"
          >
            <p className="text-[10px] text-muted-foreground mb-2 uppercase tracking-wider font-medium">
              Quick questions
            </p>
            <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
              {STARTERS.map((s) => (
                <button
                  type="button"
                  key={s}
                  data-ocid="chat.suggestion_button"
                  onClick={() => sendMessage(s)}
                  disabled={isLoading || !backend}
                  className="flex-shrink-0 px-3 py-1.5 rounded-full glass border border-white/15 text-xs text-muted-foreground hover:text-accent hover:border-accent/40 disabled:opacity-40 transition-smooth"
                >
                  {s}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Input bar ──────────────────────────────────────────────────── */}
      <div
        className="flex-shrink-0 px-4 pb-4 pt-2 border-t border-white/5"
        style={{
          backdropFilter: "blur(12px)",
          background: "rgba(15,23,42,0.9)",
        }}
        data-ocid="chat.input_form"
      >
        <div className="flex gap-2 items-end">
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              data-ocid="chat.input"
              placeholder="Ask your AI coach…"
              value={input}
              rows={1}
              maxLength={MAX_CHARS}
              onChange={(e) => {
                setInput(e.target.value);
                autoResize();
              }}
              onKeyDown={handleKeyDown}
              disabled={isLoading || !backend}
              className="w-full px-4 py-3 rounded-xl glass border border-white/15 bg-transparent text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-accent/50 transition-smooth resize-none overflow-hidden disabled:opacity-50 leading-6"
              style={{ minHeight: "48px" }}
              aria-label="Message input"
            />
            {input.length > 400 && (
              <span
                className={`absolute bottom-2 right-3 text-[10px] tabular-nums ${
                  charsLeft <= 20 ? "text-destructive" : "text-muted-foreground"
                }`}
              >
                {charsLeft}
              </span>
            )}
          </div>

          <motion.button
            type="button"
            data-ocid="chat.send_button"
            disabled={!canSend}
            whileHover={canSend ? { scale: 1.06 } : {}}
            whileTap={canSend ? { scale: 0.94 } : {}}
            onClick={() => sendMessage(input)}
            className="w-11 h-11 rounded-xl bg-gradient-to-br from-accent to-secondary flex items-center justify-center text-black shadow-lg hover:shadow-accent/30 transition-smooth disabled:opacity-40 flex-shrink-0"
            aria-label="Send message"
          >
            <Send size={16} />
          </motion.button>
        </div>

        <p className="text-[10px] text-muted-foreground/50 mt-1.5 px-1">
          Enter to send · Shift+Enter for new line
        </p>
      </div>

      {/* ── Confirm dialog ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {showClearConfirm && (
          <ConfirmClearDialog
            onConfirm={handleClear}
            onCancel={() => setShowClearConfirm(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
