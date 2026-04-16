# Design Brief

## Direction

**Bold Athletic** — Premium AI-powered gym fitness platform. Dark gradient foundation (#0F172A) with vibrant fitness green accents (#22C55E) and bright cyan secondary (#38BDF8). Glassmorphic cards, animated sticky bottom navigation, performance-focused interactive elements.

## Tone

High-confidence, energetic maximalism — Every surface treated intentionally with glassmorphism, gradient accents, and purposeful animations. No flat ghost text. Brutally clear hierarchy and interactive feedback drive engagement and motivation.

## Differentiation

Animated glassmorphic card stacks with cyan-green gradient underlays + app-like sticky bottom nav with micro-interactions. Framer Motion choreography ties movement to fitness progress tracking and data visualization.

## Color Palette

| Token      | OKLCH            | Role                               |
| ---------- | ---------------- | ---------------------------------- |
| background | 0.145 0.02 260   | Dark charcoal-blue foundation      |
| foreground | 0.92 0.01 260    | Near-white text on dark            |
| card       | 0.18 0.02 260    | Frosted glass card bases           |
| primary    | 0.65 0.18 135    | Vibrant fitness green (accent)     |
| secondary  | 0.75 0.15 210    | Bright interactive cyan            |
| muted      | 0.22 0.02 260    | Subtle dividers, inactive states   |
| accent     | 0.65 0.18 135    | Green — active states, CTAs        |
| destructive| 0.55 0.22 25     | Warning/danger states              |

## Typography

- Display: Space Grotesk — Bold athletic headers, hero text, navigation labels
- Body: Bricolage Grotesque — Body copy, UI labels, lists
- Mono: Geist Mono — Code snippets, metrics, numeric data
- Scale: Hero `text-5xl md:text-7xl font-bold`, H2 `text-3xl md:text-5xl font-bold`, Labels `text-xs font-semibold uppercase tracking-widest`, Body `text-base md:text-lg`

## Elevation & Depth

Glassmorphic layering: frosted glass cards (bg-card/40 + backdrop-blur-md) with inset white borders (1px, 10–15% opacity) sit above dark background. Shadows create depth hierarchy: subtle (glass), elevated (card-glass), premium (glass-elevated). No neon glow — refined material depth.

## Structural Zones

| Zone    | Background              | Border/Treatment                | Notes                                               |
| ------- | ----------------------- | ------------------------------- | --------------------------------------------------- |
| Header  | background              | Subtle border-b border-white/5  | Title, logo, dark/light toggle                      |
| Content | Alternating glass cards | white/10 on glass, white/15 on elevated | Main dashboard, exercises, chat sections            |
| Nav     | glass-nav (frosted)     | white/10 with rounded-full      | Sticky bottom: Dashboard, Chat, Exercises, Profile  |
| Footer  | background/50           | border-t border-white/5         | Minimal: secondary text, links                      |

## Spacing & Rhythm

Mobile-first dense spacing (gap-3, gap-4) with larger gaps on `md:` (gap-6, gap-8). Section padding: `px-4 py-6` mobile, `px-6 py-8` desktop. Card stacks use negative margin overlap for visual density. Micro-spacing within components: label-to-input `space-y-1`, form groups `space-y-4`.

## Component Patterns

- Buttons: Primary green (bg-accent, text-foreground), secondary cyan (bg-secondary/20 border border-secondary), hover adds brightness + scale-105, active darkens
- Cards: `.card-glass` — rounded-xl, 10% opacity white bg with backdrop-blur-md, white/10 border, shadow-xl
- Badges: Rounded-full, small padding, accent or secondary color with opacity, monospace font for metrics
- Nav items: Relative positioning, animated underline (absolute bottom bar in accent green), active state uses `nav-active` utility
- Inputs: bg-input/60, border-white/10, focus ring-accent, placeholder text-muted-foreground/50

## Motion

- Entrance: Page sections fade-in (0.4s ease-out), slide-up from bottom (0.4s). Staggered card reveals with 50ms delays per card.
- Hover: Buttons scale-105 with transition-smooth, cards lift (shadow-elevated) with 0.2s easing. Nav icons rotate slightly on hover.
- Decorative: Pulse-glow on active workout status (2s infinite), gradient text animations on hero metrics, shimmer on loading states.

## Constraints

- No rainbow palettes — green + cyan + dark foundation only
- Glassmorphism on ALL cards — never flat bg-card
- Backdrop-blur minimum 8px (md), 12px (lg)
- All text on dark must pass WCAG AA (≥7:1 ratio) — use foreground or secondary-foreground only
- Border colors: white with 5–15% opacity only, no grey tokens
- Animations: Cubic-bezier(0.4, 0, 0.2, 1) default, max 0.5s duration for micro-interactions

## Signature Detail

Animated gradient accent bar beneath active bottom nav items — thin cyan-green line that transitions smoothly as tabs change. Reinforces fitness brand color while maintaining athletic UI clarity. Paired with subtle scale-up of nav icon on active state.

## Dark Mode Only

This app is dark mode primary. No light mode toggle required unless requested later. All tokens tuned for dark mode readability and atmospheric depth.
