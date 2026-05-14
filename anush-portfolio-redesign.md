# Anush Gupta — Portfolio Redesign Blueprint
**Version:** 1.0 | **Status:** READY FOR DEV | **Owner:** Anush Gupta | **Last Updated:** May 2026

---

## 🧠 THE CORE IDEA

> The entire portfolio IS a PM's workspace. Not a website that *talks about* a PM. A website that *feels like* a PM's actual Monday morning.

The visitor should feel like they accidentally opened a real internal tool — part Jira, part Notion, part Amplitude dashboard — and slowly realize they're looking at a person's career.

**One-line concept:** *"Anush's portfolio as a Product Requirement Document that ships itself."*

---

## 🎨 VISUAL DIRECTION

### Theme: Dark PM Ops Dashboard
- **Background:** Near-black (`#0d0e11`) — like Linear or Vercel's dashboard
- **Surface cards:** Dark gray (`#14161b`, `#1c1f27`) — layered depth
- **Borders:** Subtle 1px (`#252830`) — everything feels like a panel
- **Primary accent:** Electric blue (`#4f6ef7`) — Jira blue vibes
- **Secondary accent:** Purple (`#7c3aed`) — Notion purple
- **Green:** `#22c55e` for "shipped", "done", "live" statuses
- **Amber:** `#f59e0b` for "in progress", warnings
- **Red:** `#ef4444` for "blocked", critical metrics

### Typography
- **Display / Hero text:** Syne 800 — big, geometric, aggressive
- **Body / labels:** DM Sans — clean, modern, readable
- **ALL code-like things (ticket IDs, status tags, metrics, nav):** JetBrains Mono — this is the secret weapon that makes everything feel like a real dev/PM tool

### What makes it "out of the box"
1. Ticket IDs on every section (`AG-001`, `AG-002`, etc.)
2. Real sprint board with Anush's work as cards
3. Funnel chart built in pure CSS/SVG showing the 180% growth story
4. PRD-style "Objective" + "Success Metrics" layout for the about section
5. Roadmap timeline as the skills section
6. OKR progress bars for key results
7. Notion-style property table for contact
8. Amplitude-style metric cards (big number + sparkline)
9. Sticky "Currently viewing:" breadcrumb at the top like Jira
10. Footer looks like a Confluence page footer (last edited, contributors)

---

## 📐 LAYOUT STRUCTURE

```
FIXED TOP NAV
  └── Jira-style breadcrumb bar: "PORTFOLIO / AG / CURRENT-SPRINT / ABOUT-ANUSH"

SECTION 1 — HERO (ticket: AG-001)
SECTION 2 — PRD / ABOUT (ticket: AG-002)
SECTION 3 — METRICS DASHBOARD (ticket: AG-003)
SECTION 4 — SPRINT BOARD / EXPERIENCE (ticket: AG-004)
SECTION 5 — ROADMAP / SKILLS (ticket: AG-005)
SECTION 6 — CONTACT / NOTION PAGE (ticket: AG-006)

FOOTER — Confluence-style
```

---

## SECTION-BY-SECTION BREAKDOWN

---

### 🧩 SECTION 0 — TOP NAV

**Reference tool:** Jira top navigation

**Layout:**
```
[AG] ANUSH-PORTFOLIO          Home  About  Experience  Skills  Contact        ● Open to Work
```

**Design details:**
- Logo = `[AG]` in a Jira-project-style colored square (blue bg, white mono text)
- Nav links in JetBrains Mono, 11px, uppercase letter-spacing
- Right side: green pulsing dot + "Open to Work" in green mono text
- On scroll: nav gets a `backdrop-filter: blur(12px)` frosted glass effect
- Thin 1px bottom border that glows faintly blue on scroll

**Sticky breadcrumb BELOW the nav (15px tall strip):**
```
Projects > AG-PORTFOLIO > Current Sprint > Viewing: Hero
```
Updates dynamically via IntersectionObserver as user scrolls through sections.

---

### 🧩 SECTION 1 — HERO (AG-001)

**Reference tools:** Linear issue view + Amplitude hero numbers

**Left column (60% width):**

Top row of meta tags (all in JetBrains Mono):
```
[AG-001]  [● IN PROGRESS]  [Priority: P0]  [Sprint: Q2-2026]
```

Headline (Syne 800, massive):
```
ANUSH
GUPTA
```
Underline the second line with an animated gradient underline (blue → cyan → purple).

Sub-headline in JetBrains Mono, 13px, muted color:
```
> product_manager --mode=growth --environment=startup
```
Typewriter animate this line.

One-liner below in DM Sans:
```
I turn half-baked Notion docs into shipped products.
```

Two CTAs:
- `[ View PRD → ]` (filled blue button, mono font) — scrolls to About
- `[ Resume ↗ ]` (ghost button) — opens Drive link

**Right column (40% width) — THE STAT PANEL:**

A dark card that looks like an Amplitude metric widget:

```
┌─────────────────────────────┐
│  PARK+ MOTOR INSURANCE      │
│  ─────────────────────────  │
│                             │
│        180%                 │
│   User Growth               │
│                             │
│   8 wks  ████████░░  Done   │
│                             │
│  ↑ Quotes  ↑ Proposals      │
│    ↑ Purchases              │
└─────────────────────────────┘
```

- The `180%` is huge (Syne 800, 64px, gradient colored)
- Below it: a mini funnel SVG (3 bars getting narrower = quote → proposal → purchase)
- Progress bar for "8 weeks" shown as a sprint bar

---

### 🧩 SECTION 2 — PRD / ABOUT (AG-002)

**Reference tools:** Notion page + internal PRD document

**Section header looks like a Notion doc header:**
```
📄  Product Requirements Document
    Anush Gupta — Personal Brand v1.0
    Owner: Anush Gupta  |  Status: ✅ Approved  |  Last edited: May 2026
```

**Two-column layout:**

**Left: PRD-style structured content**

```
## Objective
Turn ambiguity into shipped product. Fast.

## Problem Statement
Most PMs wait for clarity before acting.
Anush thrives in the chaos before clarity arrives.

## User Persona (that's you, the recruiter)
You need someone who ships, not someone who plans to ship.

## Key Behaviors
- Owns the full loop: research → design → ship → measure
- Writes PRDs that devs actually read
- Asks "what does success look like" before writing a single line
```

Each section has a small Notion-style colored left border (blue, purple, green alternating).

**Right: Property table (pure Notion clone)**

```
┌──────────────────┬────────────────────────┐
│ Status           │ ● Open to Work         │
│ Role             │ Product Manager        │
│ Environment      │ Early-stage startup    │
│ Superpower       │ Ambiguity → Clarity    │
│ Stack            │ Figma·Jira·SQL·Notion  │
│ Location         │ Jaipur, India          │
│ Availability     │ Immediate              │
└──────────────────┴────────────────────────┘
```

Monospace font for the table. Borders thin 1px. Status row has the green pulsing dot.

**Below: Three trait pills (Jira label style)**
```
[🎯 Strategic Thinker]  [👥 User Advocate]  [🏆 Innovation Leader]
```

---

### 🧩 SECTION 3 — METRICS DASHBOARD (AG-003)

**Reference tools:** Amplitude / Mixpanel / Tableau

**Section title:**
```
📊  Product Analytics
    KPIs from Park+ Motor Insurance Internship
```

**Top row: 4 metric cards (Amplitude-style)**

```
┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐
│   180%   │  │  8 wks   │  │  3-step  │  │  100%    │
│ Growth   │  │ Timeline │  │  Funnel  │  │ Shipped  │
│ ↑ vs Q1  │  │ Sprint   │  │ Built    │  │ Ownership│
└──────────┘  └──────────┘  └──────────┘  └──────────┘
```

Each card: dark surface, 1px border, big mono number (blue or green), small label below, tiny sparkline or arrow.

**Main area: THE FUNNEL CHART**

A big SVG funnel (pure CSS/SVG, no library needed):

```
      ╔══════════════════════════════╗
      ║       QUOTE REQUESTS         ║   100%  (baseline)
      ╚══════════════════════════════╝
           ╔════════════════════╗
           ║     PROPOSALS      ║        ~60%
           ╚════════════════════╝
                ╔═══════════╗
                ║ PURCHASES ║             ~40%
                ╚═══════════╝

   Result: 180% growth in user flow across all stages
```

Each funnel stage is a different shade of the blue ramp. The bars animate in from 0 width on scroll (CSS `@keyframes`). Numbers count up using a JS counter triggered by IntersectionObserver.

**Below funnel: the "What I did" breakdown**

Three columns, each looks like a Jira epic:

```
[EPIC: CONVERSION]          [EPIC: ENGAGEMENT]        [EPIC: SCALE]
AG-CONV                     AG-ENG                    AG-SCL
────────────────            ──────────────────        ──────────────
● Funnel redesign           ● WhatsApp flows          ● Outbound calling
● Quote → Proposal UI       ● Retention triggers      ● Feature readiness
● Trust signals             ● Re-engagement           ● Infrastructure
Status: ✅ Shipped          Status: ✅ Shipped         Status: ✅ Shipped
```

---

### 🧩 SECTION 4 — SPRINT BOARD / EXPERIENCE (AG-004)

**Reference tools:** Jira Kanban Board

**Section title in mono:**
```
🗂️  Active Sprint — Q2 2026
    Board: ANUSH-GUPTA-CAREER
```

**Full Kanban board layout (4 columns):**

```
┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│  BACKLOG    │ │ IN PROGRESS │ │  REVIEW     │ │    DONE     │
├─────────────┤ ├─────────────┤ ├─────────────┤ ├─────────────┤
│             │ │             │ │             │ │             │
│ [AG-010]    │ │ [AG-007]    │ │             │ │ [AG-001]    │
│ System      │ │ DevOps &    │ │             │ │ Park+       │
│ Design      │ │ Docker      │ │             │ │ Internship  │
│ P2 · Skill  │ │ P1 · Learn  │ │             │ │ ✅ 180%     │
│             │ │             │ │             │ │             │
│ [AG-011]    │ │ [AG-008]    │ │             │ │ [AG-002]    │
│ PM          │ │ LLMs &      │ │             │ │ JECRC       │
│ Frameworks  │ │ LangChain   │ │             │ │ B.Tech CSE  │
│ P2 · Learn  │ │ P1 · Learn  │ │             │ │ ✅ Active   │
│             │ │             │ │             │ │             │
└─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘
```

**Each card design:**
- Dark card, 1px border, small colored priority dot (P0=red, P1=amber, P2=blue)
- Ticket ID in blue mono (`AG-007`)
- Title in DM Sans medium
- Labels as small colored chips at bottom
- "Done" column cards have green checkmark + metric if available

**Card hover state:** slight border glow (blue for in-progress, green for done), tiny tooltip with more detail.

**The Park+ card (in DONE) is the hero card:**
```
┌──────────────────────┐
│ [AG-001]  ✅ DONE    │
│                      │
│  Park+ — Motor Ins.  │
│  Product Intern      │
│                      │
│  Jun–Aug 2025        │
│  8 weeks             │
│                      │
│  [Growth: 180%] ↑    │
│  [Funnel] [WhatsApp] │
│  [Strategy] [UI/UX]  │
└──────────────────────┘
```

Click on any card → expands into a full Jira ticket view (modal or inline expansion) with full detail, sub-tasks, and tags.

---

### 🧩 SECTION 5 — ROADMAP / SKILLS (AG-005)

**Reference tools:** Jira Roadmap / ProductPlan / Linear Roadmap

**Section title:**
```
🗺️  Product Roadmap — Anush Gupta Skills
    View: Quarterly  |  Filter: All Skills  |  Group by: Domain
```

**Top: OKR Panel**

```
Q2 2026 OKRs
─────────────────────────────────────────────────────

O1: Become a top 1% early-career PM
  KR1: Ship real product with measurable impact     ████████████████████ 100%  ✅
  KR2: Master data-driven product decisions          ██████████████░░░░░░  70%  🔄
  KR3: Build system design foundation                ████████░░░░░░░░░░░░  40%  🔄

O2: Build a full technical PM toolkit
  KR1: SQL + Python for analytics                   ████████████████░░░░  80%  🔄
  KR2: DevOps/Docker fundamentals                   ██████░░░░░░░░░░░░░░  30%  🔄
  KR3: LLM/AI product integration                   ████████░░░░░░░░░░░░  40%  🔄
```

Progress bars animated on scroll. Green = done (100%), amber = in progress, gray = not started.

**Main: Skill Roadmap Timeline**

Four swim lanes (one per skill domain), each with blocks placed on a horizontal time axis:

```
             Q3 2024        Q4 2024        Q1 2025        Q2 2025        NOW
             ──────────────────────────────────────────────────────────────→

STRATEGY     [Roadmapping]──[Competitive Analysis]────[Park+ Strategy]────●
USER         [Interviews]──────[Journey Mapping]──────[Park+ Research]────●
ANALYTICS    [SQL Basics]──────[KPI Tracking]──────────[A/B + Funnels]────●
TECH         [Spring Boot]─[React]──[Docker]──[LLMs]─────────────────────●
```

Each block is a rounded pill. Color by domain (blue = strategy, purple = user, green = analytics, amber = tech). Tooltip on hover shows detail.

**Bottom: Tools Grid (Figma-component-shelf style)**

Icons + labels in a tight grid, each with a mastery level indicator:

```
┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
│  Figma   │ │   Jira   │ │  Notion  │ │   Miro   │ │   SQL    │
│ ████████ │ │ ████████ │ │ ████████ │ │ ██████░░ │ │ ███████░ │
│ Advanced │ │ Advanced │ │ Advanced │ │ Mid      │ │ Mid      │
└──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────────┘
┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
│ Tableau  │ │  Excel   │ │  Slack   │ │  Python  │ │Analytics │
│ ██████░░ │ │ ████████ │ │ ████████ │ │ █████░░░ │ │ ██████░░ │
│ Mid      │ │ Advanced │ │ Advanced │ │ Mid      │ │ Mid      │
└──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────────┘
```

Tool icon (SVG or emoji), name, mini progress bar, level label. Cards have 1px border + hover glow.

---

### 🧩 SECTION 6 — CONTACT / NOTION PAGE (AG-006)

**Reference tools:** Notion page + Linear "New Issue" form

**Section looks like a Notion page with a callout + database:**

```
💬  Let's Build Something

    ╔══════════════════════════════════════════════════════╗
    ║  💡 Ready to discuss your next product challenge?    ║
    ║     I'm available for PM roles, internships,         ║
    ║     and product consulting.                          ║
    ╚══════════════════════════════════════════════════════╝
```

**Below: Notion database / property table for links**

```
┌──────────┬─────────────────────────────────────────────────────┐
│ Type     │ Link                                                │
├──────────┼─────────────────────────────────────────────────────┤
│ 📧 Email │ anushgupta105@gmail.com              [Copy] [Open↗] │
│ 💼 LinkedIn│ linkedin.com/in/anush-gupta105     [Copy] [Open↗] │
│ 💻 GitHub│ github.com/solmyst                  [Copy] [Open↗] │
│ 📄 Resume│ Google Drive                        [Copy] [Open↗] │
└──────────┴─────────────────────────────────────────────────────┘
```

Monospace font. Each row has a colored icon, label, the link (truncated), and two action buttons (copy to clipboard + open in new tab). Copy button shows a checkmark for 2s after click.

**Below: "Assign to Anush" — Linear-style new issue form**

A dark input card styled like Linear's new issue modal:

```
┌─────────────────────────────────────────────────────────────┐
│  New Message                                    AG-INBOX    │
│  ──────────────────────────────────────────────────────     │
│  Title:  _______________________________________________    │
│  Email:  _______________________________________________    │
│  Message:                                                   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                                                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  Priority: [P0] [P1] [P2]    [ Assign to Anush → ]        │
└─────────────────────────────────────────────────────────────┘
```

Priority selector works as a toggle (P0/P1/P2 buttons). Submit button says "Assign to Anush →" in mono font. On submit: success state shows a Jira-style "Ticket created: AG-INBOX-XXX" confirmation.

---

### 🧩 FOOTER — Confluence Style

```
─────────────────────────────────────────────────────────────────
  ANUSH-GUPTA-PORTFOLIO                     Last edited: May 2026
  Space: Personal Brand                     Contributors: Anush G.
  Page: Home                                Version: 1.0.0

  Built with: React  |  Designed in: Figma  |  Tracked in: Jira
  © 2026 Anush Gupta · anushgupta105@gmail.com
─────────────────────────────────────────────────────────────────
```

Full-width dark bar. Mono font throughout. Faint top border.

---

## ⚙️ INTERACTIONS & ANIMATIONS

| Interaction | Behavior |
|---|---|
| Page load | Sections fade in staggered with `animation-delay` (0.1s per section) |
| Scroll | IntersectionObserver triggers: metric counters count up, progress bars fill, funnel bars expand |
| Nav breadcrumb | Updates current section name as user scrolls |
| Kanban card hover | Border glow + subtle scale(1.02) |
| Kanban card click | Expands inline or opens modal with full ticket detail |
| Metric numbers | Count from 0 to value over 1.2s with easing when in viewport |
| Funnel bars | Animate width from 0 to final % over 0.8s staggered |
| OKR bars | Fill left to right over 1s when section enters viewport |
| Tool cards hover | Faint blue glow on border |
| Contact copy button | Text changes to "Copied ✓" for 2s |
| Contact form submit | Shows "AG-INBOX-[random 3 digit] created ✅" |
| Cursor | Custom cursor: small circle + ticket-ID tooltip that follows mouse (optional, nice touch) |

---

## 🏗️ TECH STACK RECOMMENDATION

| Layer | Choice | Why |
|---|---|---|
| Framework | React (Vite) | Fast, component-based, easy to manage sections |
| Styling | Tailwind CSS | Utility-first, fast to build PM-dark-theme |
| Animations | Framer Motion | Clean entrance animations, IntersectionObserver wrappers |
| Charts/Funnel | Custom SVG | No library bloat, full control over funnel design |
| Icons | Lucide React | Clean, consistent, has all PM tool icons |
| Fonts | Google Fonts (Syne + DM Sans + JetBrains Mono) | Load all three, use mono heavily |
| Hosting | Vercel | Free, instant deploy, custom domain |
| Contact form | Formspree or EmailJS | No backend needed |

---

## 📁 COMPONENT TREE (for dev handoff)

```
App
├── Nav
│   ├── NavLogo
│   ├── NavLinks
│   ├── NavStatus (green dot + "Open to Work")
│   └── BreadcrumbBar (sticky, updates on scroll)
│
├── HeroSection (AG-001)
│   ├── TicketMeta (ticket ID, status, priority, sprint)
│   ├── HeroHeadline
│   ├── HeroTerminal (typewriter effect)
│   ├── HeroCTA
│   └── StatPanel (metric card + mini funnel)
│
├── PRDSection (AG-002)
│   ├── NotionHeader (doc title + metadata)
│   ├── PRDContent (objective, problem, persona, behaviors)
│   ├── PropertyTable (status, role, environment, etc.)
│   └── TraitPills
│
├── MetricsDashboard (AG-003)
│   ├── MetricCard × 4
│   ├── FunnelChart (SVG)
│   └── EpicColumns × 3 (Conversion, Engagement, Scale)
│
├── SprintBoard (AG-004)
│   ├── BoardHeader (sprint name, board name)
│   ├── KanbanColumn × 4 (Backlog, In Progress, Review, Done)
│   │   └── KanbanCard (expandable on click)
│   └── CardModal (expanded Jira ticket view)
│
├── RoadmapSection (AG-005)
│   ├── OKRPanel (objectives + key results with progress bars)
│   ├── SkillTimeline (swimlane roadmap)
│   └── ToolsGrid (tool cards with mastery bars)
│
├── ContactSection (AG-006)
│   ├── NotionCallout
│   ├── LinkDatabase (table with copy + open buttons)
│   └── LinearForm (message form styled as Linear issue)
│
└── Footer (Confluence-style)
```

---

## 🎨 COLOR & TYPOGRAPHY TOKENS

```css
/* COLORS */
--bg:         #0d0e11   /* page background */
--surface-1:  #14161b   /* card background */
--surface-2:  #1c1f27   /* nested card / input */
--border-1:   #252830   /* default border */
--border-2:   #2e3340   /* hover / emphasis border */
--text:       #e8eaf0   /* primary text */
--muted-1:    #6b7280   /* secondary text */
--muted-2:    #9ca3af   /* placeholder / labels */
--accent:     #4f6ef7   /* blue — Jira primary */
--accent-2:   #7c3aed   /* purple — Notion */
--green:      #22c55e   /* done / shipped / open to work */
--amber:      #f59e0b   /* in progress / warning */
--red:        #ef4444   /* blocked / critical */
--cyan:       #06b6d4   /* gradient highlight */
--pink:       #ec4899   /* accent pop (use sparingly) */

/* TYPOGRAPHY */
--font-display: 'Syne', sans-serif          /* Hero headlines only */
--font-body:    'DM Sans', sans-serif       /* All body text */
--font-mono:    'JetBrains Mono', monospace /* Ticket IDs, nav, labels, tables */

/* FONT SIZES */
--text-hero:   clamp(52px, 7vw, 96px)  /* Hero name */
--text-h2:     32px                    /* Section titles */
--text-h3:     20px                    /* Card titles */
--text-body:   15px                    /* Body copy */
--text-label:  11px                    /* Mono tags, ticket IDs */
--text-small:  10px                    /* Breadcrumbs, meta */

/* SPACING */
--section-gap: 120px  /* between major sections */
--card-pad:    20px   /* inside cards */
--border-r:    6px    /* card border radius */
--border-r-sm: 3px    /* tag/pill border radius */
```

---

## 🔖 COPY / CONTENT (ready to paste in)

### Hero tagline options (pick one):
- `> product_manager --mode=growth --environment=startup`
- `> shipping ideas since 2024 // currently: open_to_work`
- `> turning half-baked docs into shipped products`

### About (PRD Objective block):
> Turn ambiguity into shipped product. Fast. Give me a half-formed idea, a broken Figma flow, or a 3-bullet Notion doc — I'll turn it into something real. I thrive in the productive chaos of early-stage startups where the answer isn't in the playbook yet.

### Metric callout:
> 180% user growth. 8 weeks. Zero excuses.

### Contact CTA:
> Ready to discuss your next product challenge? Let's build something worth measuring.

---

## ✅ DEV CHECKLIST

- [ ] Mobile responsive (Kanban board collapses to vertical list on mobile)
- [ ] All animations respect `prefers-reduced-motion`
- [ ] Metric counters trigger only once (use a flag after first IntersectionObserver fire)
- [ ] Contact form has validation (email format, required fields)
- [ ] All external links open in `_blank` with `rel="noopener noreferrer"`
- [ ] Breadcrumb updates correctly for all 6 sections
- [ ] Kanban modal closes on Escape key + backdrop click
- [ ] Copy buttons work with `navigator.clipboard.writeText()`
- [ ] Fonts preloaded in `<head>` to avoid layout shift
- [ ] OG meta tags set (title, description, image) for LinkedIn share
- [ ] Page title: `Anush Gupta — Product Manager`

---

*Blueprint by Claude · For implementation use in React / Kiro / any modern framework*
*Questions? Ping Anush at anushgupta105@gmail.com*
