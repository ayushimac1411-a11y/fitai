import {
  Activity,
  BarChart3,
  Brain,
  Dumbbell,
  Flame,
  MessageCircle,
  Shield,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useAuth } from "../hooks/useAuth";

const FEATURES = [
  {
    icon: <Activity size={22} />,
    title: "Smart BMI Tracker",
    desc: "Instant BMI calculation with personalized health insights based on your body metrics.",
    color: "from-accent/20 to-accent/5",
    iconColor: "text-accent",
    borderColor: "border-accent/20",
  },
  {
    icon: <Brain size={22} />,
    title: "AI Meal & Workout Plans",
    desc: "Gemini AI generates custom weekly diet and workout plans tailored to your goals.",
    color: "from-secondary/20 to-secondary/5",
    iconColor: "text-secondary",
    borderColor: "border-secondary/20",
  },
  {
    icon: <Dumbbell size={22} />,
    title: "Exercise Library",
    desc: "Animated exercise guides with correct form tips and injury prevention warnings.",
    color: "from-purple-500/20 to-purple-500/5",
    iconColor: "text-purple-400",
    borderColor: "border-purple-500/20",
  },
  {
    icon: <Flame size={22} />,
    title: "Daily Streaks",
    desc: "Stay motivated with workout and diet completion streaks tracked every day.",
    color: "from-orange-500/20 to-orange-500/5",
    iconColor: "text-orange-400",
    borderColor: "border-orange-500/20",
  },
  {
    icon: <BarChart3 size={22} />,
    title: "Progress Dashboard",
    desc: "Visual charts for weight trends, calorie intake, and weekly workout completions.",
    color: "from-accent/20 to-secondary/10",
    iconColor: "text-accent",
    borderColor: "border-accent/20",
  },
  {
    icon: <MessageCircle size={22} />,
    title: "AI Fitness Coach",
    desc: "Chat with your personal AI coach for real-time fitness advice and motivation.",
    color: "from-secondary/20 to-accent/10",
    iconColor: "text-secondary",
    borderColor: "border-secondary/20",
  },
];

const STATS = [
  { value: "10K+", label: "Active Users" },
  { value: "50K+", label: "Workouts Logged" },
  { value: "98%", label: "Goal Achievement" },
  { value: "4.9★", label: "User Rating" },
];

export function LandingPage() {
  const { login, isLoggingIn } = useAuth();

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-screen-xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-secondary flex items-center justify-center">
              <Zap size={16} className="text-black" />
            </div>
            <span className="text-lg font-display font-bold gradient-text">
              FitAI
            </span>
          </div>
          <motion.button
            data-ocid="landing.login_button"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={login}
            disabled={isLoggingIn}
            className="px-4 py-2 rounded-lg bg-accent text-black text-sm font-semibold transition-smooth hover:bg-accent/90 disabled:opacity-60"
          >
            {isLoggingIn ? "Connecting..." : "Get Started"}
          </motion.button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-14 overflow-hidden">
        {/* Radial background glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-accent/5 blur-3xl" />
          <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-secondary/5 blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border-accent/30 mb-6"
          >
            <Zap size={12} className="text-accent" />
            <span className="text-xs font-medium text-accent">
              AI-Powered Fitness Platform
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-display font-bold leading-tight mb-4"
          >
            <span className="gradient-text">Transform</span>
            <br />
            <span className="text-foreground">Your Fitness</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed"
          >
            Your AI-powered fitness companion — personalized meal plans, smart
            workout routines, and real-time coaching to help you achieve your
            peak performance.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3 justify-center mb-12"
          >
            <motion.button
              data-ocid="landing.cta_primary"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={login}
              disabled={isLoggingIn}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-accent to-secondary text-black font-bold text-base shadow-lg shadow-accent/25 hover:shadow-accent/40 transition-smooth disabled:opacity-60"
            >
              <span className="flex items-center gap-2 justify-center">
                <Shield size={18} />
                {isLoggingIn
                  ? "Connecting..."
                  : "Get Started with Internet Identity"}
              </span>
            </motion.button>
            <motion.button
              data-ocid="landing.cta_secondary"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() =>
                document
                  .getElementById("features")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="px-8 py-4 rounded-xl glass border border-white/20 text-foreground font-semibold text-base hover:bg-white/10 transition-smooth"
            >
              Explore Features
            </motion.button>
          </motion.div>

          {/* Hero image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative rounded-2xl overflow-hidden card-glass mx-auto max-w-3xl"
          >
            <img
              src="/assets/generated/fitai-hero.dim_1200x600.jpg"
              alt="FitAI fitness dashboard preview"
              className="w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />

            {/* Floating stat pills */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="absolute bottom-6 left-4 glass px-3 py-2 rounded-xl"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="text-xs font-medium text-foreground">
                  BMI: 23.4 — Healthy
                </span>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="absolute bottom-6 right-4 glass px-3 py-2 rounded-xl"
            >
              <div className="flex items-center gap-2">
                <Flame size={12} className="text-orange-400" />
                <span className="text-xs font-medium text-foreground">
                  🔥 14 Day Streak!
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-muted/20 border-y border-white/5 py-12">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl font-display font-bold gradient-text mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="max-w-screen-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-3">
              Everything You Need to
              <span className="gradient-text"> Reach Your Goals</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              A complete fitness ecosystem powered by AI — from planning to
              execution to tracking.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map((feature, i) => (
              <motion.div
                key={feature.title}
                data-ocid={`features.item.${i + 1}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ scale: 1.02, y: -2 }}
                className={`card-glass p-5 bg-gradient-to-br ${feature.color} border ${feature.borderColor} transition-smooth cursor-default`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 bg-background/40 ${feature.iconColor}`}
                >
                  {feature.icon}
                </div>
                <h3 className="font-display font-semibold text-foreground mb-1.5">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-muted/20 border-t border-white/5 py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-secondary flex items-center justify-center mx-auto mb-5 shadow-xl shadow-accent/25">
              <Zap size={28} className="text-black" />
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-3">
              Ready to Start Your
              <span className="gradient-text"> Fitness Journey?</span>
            </h2>
            <p className="text-muted-foreground mb-8">
              Join thousands of users transforming their health with AI-powered
              personalized guidance.
            </p>
            <motion.button
              data-ocid="landing.cta_bottom"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={login}
              disabled={isLoggingIn}
              className="px-10 py-4 rounded-xl bg-gradient-to-r from-accent to-secondary text-black font-bold text-base shadow-lg shadow-accent/30 hover:shadow-accent/50 transition-smooth disabled:opacity-60"
            >
              <span className="flex items-center gap-2 justify-center">
                <Shield size={18} />
                {isLoggingIn
                  ? "Connecting..."
                  : "Start for Free — Internet Identity"}
              </span>
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card/40 border-t border-white/5 py-6 px-4">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Zap size={14} className="text-accent" />
            <span>FitAI — Your AI Fitness Companion</span>
          </div>
          <span>
            © {new Date().getFullYear()}. Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              caffeine.ai
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
