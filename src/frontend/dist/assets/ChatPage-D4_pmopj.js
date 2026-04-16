import { c as createLucideIcon, x as useAuth, r as reactExports, j as jsxRuntimeExports, f as AnimatePresence, m as motion, S as Sparkles } from "./index-gvkJDNXI.js";
import { u as useBackend } from "./useBackend-DWQBpq60.js";
import { C as CircleAlert } from "./circle-alert-NtPVmQFH.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z", key: "1lielz" }]
];
const MessageSquare = createLucideIcon("message-square", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3"
    }
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
];
const Send = createLucideIcon("send", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
  ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
  ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }],
  ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }]
];
const Trash2 = createLucideIcon("trash-2", __iconNode);
const MAX_CHARS = 500;
const STARTERS = [
  "What's a good diet for weight loss?",
  "How many calories should I eat?",
  "Best exercises for abs?",
  "How to build muscle fast?"
];
const WELCOME = {
  id: "welcome",
  role: "assistant",
  content: "Hi! I'm your FitAI assistant. Ask me anything about fitness, nutrition, or workouts! 💪",
  timestamp: /* @__PURE__ */ new Date()
};
function backendMsgToLocal(m) {
  return {
    id: m.id,
    role: m.role === "user" ? "user" : "assistant",
    content: m.content,
    timestamp: new Date(Number(m.createdAt) / 1e6)
  };
}
function formatTime(d) {
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}
function BotAvatar({ size = 28 }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "rounded-full flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-accent to-secondary shadow-lg",
      style: { width: size, height: size },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: size * 0.5, className: "text-black" })
    }
  );
}
function UserAvatar({ initials }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 bg-muted border border-white/10 text-[10px] font-bold text-foreground uppercase", children: initials });
}
function TypingIndicator() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 8 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 4 },
      className: "flex gap-2.5 items-end",
      "data-ocid": "chat.loading_state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(BotAvatar, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass border border-white/10 px-4 py-3 rounded-2xl rounded-tl-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1", children: [0, 1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "w-1.5 h-1.5 rounded-full bg-accent/70 animate-bounce",
              style: { animationDelay: `${i * 0.15}s` }
            },
            i
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "FitAI is thinking…" })
        ] }) })
      ]
    }
  );
}
function MessageBubble({
  msg,
  initials
}) {
  const isUser = msg.role === "user";
  const [showTime, setShowTime] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 12 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0 },
      transition: { duration: 0.22, ease: [0.4, 0, 0.2, 1] },
      className: `flex gap-2.5 items-end ${isUser ? "flex-row-reverse" : "flex-row"}`,
      children: [
        isUser ? /* @__PURE__ */ jsxRuntimeExports.jsx(UserAvatar, { initials }) : /* @__PURE__ */ jsxRuntimeExports.jsx(BotAvatar, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `flex flex-col gap-0.5 max-w-[78%] ${isUser ? "items-end" : "items-start"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => setShowTime((p) => !p),
                  className: `px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap break-words rounded-2xl text-left transition-smooth cursor-default ${isUser ? "bg-accent text-black rounded-tr-sm font-medium" : msg.isError ? "bg-destructive/20 border border-destructive/30 text-destructive-foreground rounded-tl-sm" : "glass border border-white/10 text-foreground rounded-tl-sm"}`,
                  "data-ocid": isUser ? "chat.user_bubble" : "chat.ai_bubble",
                  "aria-label": `${isUser ? "You" : "FitAI"}: ${msg.content}`,
                  children: [
                    msg.isError && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 mb-1 text-destructive text-xs font-medium", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { size: 12 }),
                      " Error"
                    ] }),
                    msg.content
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: showTime && /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.span,
                {
                  initial: { opacity: 0, y: -4 },
                  animate: { opacity: 1, y: 0 },
                  exit: { opacity: 0, y: -4 },
                  className: "text-[10px] text-muted-foreground px-1",
                  children: formatTime(msg.timestamp)
                }
              ) })
            ]
          }
        )
      ]
    }
  );
}
function ConfirmClearDialog({
  onConfirm,
  onCancel
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      className: "fixed inset-0 z-50 flex items-center justify-center p-4",
      style: { background: "rgba(0,0,0,0.6)" },
      "data-ocid": "chat.dialog",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { scale: 0.92, opacity: 0 },
          animate: { scale: 1, opacity: 1 },
          exit: { scale: 0.92, opacity: 0 },
          transition: { duration: 0.18 },
          className: "glass-elevated rounded-2xl p-6 w-full max-w-xs border border-white/10",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-full bg-destructive/15 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 16, className: "text-destructive" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground", children: "Clear chat?" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-5", children: "This will permanently delete all your chat history with FitAI." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "data-ocid": "chat.cancel_button",
                  onClick: onCancel,
                  className: "flex-1 py-2 rounded-xl border border-white/15 text-sm text-foreground hover:bg-white/5 transition-smooth",
                  children: "Cancel"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "data-ocid": "chat.confirm_button",
                  onClick: onConfirm,
                  className: "flex-1 py-2 rounded-xl bg-destructive/80 hover:bg-destructive text-destructive-foreground text-sm font-medium transition-smooth",
                  children: "Clear"
                }
              )
            ] })
          ]
        }
      )
    }
  );
}
function ChatPage() {
  const { backend, isFetching } = useBackend();
  const { principal } = useAuth();
  const initials = principal ? principal.slice(-4).toUpperCase() : "U";
  const [messages, setMessages] = reactExports.useState([]);
  const [input, setInput] = reactExports.useState("");
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const [historyLoaded, setHistoryLoaded] = reactExports.useState(false);
  const [showClearConfirm, setShowClearConfirm] = reactExports.useState(false);
  const [hasApiKey, setHasApiKey] = reactExports.useState(null);
  const bottomRef = reactExports.useRef(null);
  const textareaRef = reactExports.useRef(null);
  const scrollToBottom = reactExports.useCallback(() => {
    var _a;
    (_a = bottomRef.current) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
  }, []);
  reactExports.useLayoutEffect(() => {
    scrollToBottom();
  }, [messages.length, isLoading]);
  reactExports.useEffect(() => {
    if (!backend || isFetching || historyLoaded) return;
    async function load() {
      try {
        const [history, apiKeyStatus] = await Promise.all([
          backend.getChatHistory(BigInt(50)),
          backend.hasGeminiApiKey()
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
  function autoResize() {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    const lineH = 24;
    const maxH = lineH * 3 + 24;
    el.style.height = `${Math.min(el.scrollHeight, maxH)}px`;
  }
  const sendMessage = reactExports.useCallback(
    async (text) => {
      const trimmed = text.trim();
      if (!trimmed || isLoading || !backend) return;
      const userMsg = {
        id: `u-${Date.now()}`,
        role: "user",
        content: trimmed,
        timestamp: /* @__PURE__ */ new Date()
      };
      setMessages((prev) => [
        ...prev.filter((m) => m.id !== "welcome"),
        userMsg
      ]);
      setInput("");
      if (textareaRef.current) textareaRef.current.style.height = "auto";
      setIsLoading(true);
      try {
        await backend.saveChatMessage("user", trimmed);
        const result = await backend.generateAIResponse(trimmed);
        if (result.__kind__ === "ok") {
          const aiMsg = {
            id: `a-${Date.now()}`,
            role: "assistant",
            content: result.ok,
            timestamp: /* @__PURE__ */ new Date()
          };
          setMessages((prev) => [...prev, aiMsg]);
        } else {
          const errMsg = {
            id: `err-${Date.now()}`,
            role: "assistant",
            content: result.err.includes("API key") ? "Failed to get response. Please add your Gemini API key in Profile settings." : result.err || "Failed to get a response. Please try again.",
            timestamp: /* @__PURE__ */ new Date(),
            isError: true
          };
          setMessages((prev) => [...prev, errMsg]);
        }
      } catch {
        const errMsg = {
          id: `err-${Date.now()}`,
          role: "assistant",
          content: "Failed to get response. Check your Gemini API key in Profile settings.",
          timestamp: /* @__PURE__ */ new Date(),
          isError: true
        };
        setMessages((prev) => [...prev, errMsg]);
      } finally {
        setIsLoading(false);
      }
    },
    [backend, isLoading]
  );
  const handleClear = reactExports.useCallback(async () => {
    setShowClearConfirm(false);
    if (!backend) return;
    await backend.clearChatHistory();
    setMessages([WELCOME]);
  }, [backend]);
  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }
  const canSend = input.trim().length > 0 && !isLoading && !!backend;
  const showStarters = messages.length <= 1 && !isLoading;
  const charsLeft = MAX_CHARS - input.length;
  if (!historyLoaded) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col h-[calc(100vh-4rem)] items-center justify-center gap-3",
        "data-ocid": "chat.loading_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full border-2 border-accent border-t-transparent animate-spin" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Loading chat history…" })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col h-[calc(100vh-4rem)] relative",
      "data-ocid": "chat.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0 px-4 pt-5 pb-3 border-b border-white/5 glass-elevated rounded-none", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(BotAvatar, { size: 40 }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-foreground leading-tight", children: "FitAI Assistant" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-accent animate-pulse" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-accent font-medium", children: "Online" }),
                hasApiKey === false && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "· No API key" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              "data-ocid": "chat.clear_history_button",
              onClick: () => setShowClearConfirm(true),
              className: "w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-smooth",
              "aria-label": "Clear chat history",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 15 })
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex-1 overflow-y-auto px-4 py-4 space-y-4 min-h-0",
            "data-ocid": "chat.messages_list",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatePresence, { initial: false, children: [
                messages.map((msg) => /* @__PURE__ */ jsxRuntimeExports.jsx(MessageBubble, { msg, initials }, msg.id)),
                isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(TypingIndicator, {}, "typing")
              ] }),
              messages.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0 },
                  animate: { opacity: 1 },
                  className: "flex flex-col items-center justify-center h-40 gap-3",
                  "data-ocid": "chat.empty_state",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { size: 36, className: "text-muted-foreground/40" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Start a conversation with FitAI" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: bottomRef })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: showStarters && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 8 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: 8 },
            className: "flex-shrink-0 px-4 pb-2",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mb-2 uppercase tracking-wider font-medium", children: "Quick questions" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 overflow-x-auto pb-1 no-scrollbar", children: STARTERS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "data-ocid": "chat.suggestion_button",
                  onClick: () => sendMessage(s),
                  disabled: isLoading || !backend,
                  className: "flex-shrink-0 px-3 py-1.5 rounded-full glass border border-white/15 text-xs text-muted-foreground hover:text-accent hover:border-accent/40 disabled:opacity-40 transition-smooth",
                  children: s
                },
                s
              )) })
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex-shrink-0 px-4 pb-4 pt-2 border-t border-white/5",
            style: {
              backdropFilter: "blur(12px)",
              background: "rgba(15,23,42,0.9)"
            },
            "data-ocid": "chat.input_form",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-end", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "textarea",
                    {
                      ref: textareaRef,
                      "data-ocid": "chat.input",
                      placeholder: "Ask your AI coach…",
                      value: input,
                      rows: 1,
                      maxLength: MAX_CHARS,
                      onChange: (e) => {
                        setInput(e.target.value);
                        autoResize();
                      },
                      onKeyDown: handleKeyDown,
                      disabled: isLoading || !backend,
                      className: "w-full px-4 py-3 rounded-xl glass border border-white/15 bg-transparent text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-accent/50 transition-smooth resize-none overflow-hidden disabled:opacity-50 leading-6",
                      style: { minHeight: "48px" },
                      "aria-label": "Message input"
                    }
                  ),
                  input.length > 400 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: `absolute bottom-2 right-3 text-[10px] tabular-nums ${charsLeft <= 20 ? "text-destructive" : "text-muted-foreground"}`,
                      children: charsLeft
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.button,
                  {
                    type: "button",
                    "data-ocid": "chat.send_button",
                    disabled: !canSend,
                    whileHover: canSend ? { scale: 1.06 } : {},
                    whileTap: canSend ? { scale: 0.94 } : {},
                    onClick: () => sendMessage(input),
                    className: "w-11 h-11 rounded-xl bg-gradient-to-br from-accent to-secondary flex items-center justify-center text-black shadow-lg hover:shadow-accent/30 transition-smooth disabled:opacity-40 flex-shrink-0",
                    "aria-label": "Send message",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { size: 16 })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground/50 mt-1.5 px-1", children: "Enter to send · Shift+Enter for new line" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: showClearConfirm && /* @__PURE__ */ jsxRuntimeExports.jsx(
          ConfirmClearDialog,
          {
            onConfirm: handleClear,
            onCancel: () => setShowClearConfirm(false)
          }
        ) })
      ]
    }
  );
}
export {
  ChatPage as default
};
