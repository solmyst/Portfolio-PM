# Implementation Document: Anush Gupta — PRD-Style Portfolio Website

**Document Owner:** Anush Gupta  
**Version:** v1.0  
**Status:** Ready for Development  
**Contact:** anushgupta105@gmail.com | linkedin.com/in/anush-gupta105  

---

## 1. Executive Summary & Vision

### The Core Idea
When a recruiter, hiring manager, or founder opens this website, they should experience a moment of recognition: *"Wait, is this Google Docs?"* Then immediately feel delight when they realize it's a PRD — and the product being specced is **Anush Gupta, PM.**

The entire website is a single-page application that mimics the Google Docs UI with pixel-level accuracy. The "document" displayed is a living PRD/resume hybrid. Every Google Docs UI element — the toolbar, sidebar outline, sharing button, comment bubbles — is recreated in HTML/CSS and made interactive in ways that serve the portfolio.

### Why This Works
- Recruiters live in Google Docs. The UI is muscle memory for them.
- The PRD format signals PM fluency — they know the format, they respect it.
- The interaction design tells a story: this candidate *thinks* in product.
- It is unforgettable. No other portfolio does this.

---

## 2. Technical Architecture

### 2.1 Stack Recommendation

| Layer | Technology | Why |
|---|---|---|
| Framework | React (Vite) or plain HTML/CSS/JS | Either works. React for easier state management of interactive features. |
| Styling | Pure CSS with CSS Variables | No Tailwind — we need pixel-perfect control of the Docs aesthetic |
| Fonts | Google Fonts: "Google Sans" (via CDN) or Inter as fallback | Docs uses Google Sans |
| Icons | Material Symbols / Material Icons (Google's own icon font) | Critical for authenticity — not Heroicons, not Lucide, not Font Awesome |
| Animations | CSS keyframes + JS IntersectionObserver | No heavy animation libraries needed |
| Hosting | Vercel / Netlify / GitHub Pages | All work fine |

### 2.2 File Structure

```
/
├── index.html
├── styles/
│   ├── reset.css
│   ├── docs-ui.css          # All Google Docs chrome: header, toolbar, sidebar
│   ├── document.css         # The document body itself (paper, typography)
│   ├── comments.css         # Comment bubble system
│   └── animations.css       # Typing cursor, scroll animations
├── scripts/
│   ├── main.js              # Init, scroll tracking, section highlighting
│   ├── comments.js          # Comment panel open/close logic
│   ├── toolbar.js           # Toolbar button interactions (fake but interactive)
│   └── typing-effect.js     # Typewriter for key stats
├── assets/
│   ├── favicon.ico          # Google Docs blue favicon (recreate it)
│   └── og-image.png         # Open Graph: screenshot of the "document"
└── README.md
```

---

## 3. The Google Docs Chrome (UI Shell) — Pixel-Perfect Recreation

This is the most important section. Every detail here must be exact.

### 3.1 Browser Tab / Favicon

- **Favicon:** Blue document icon — identical to Google Docs favicon. Create a 32×32 SVG with a white page, folded top-right corner, and blue fill. Exact blue: `#4285F4` (Google blue).
- **Tab title format:** `Anush_Gupta_PRD_v1.0 - Google Docs` — exactly as shown in the screenshots. This appears in the browser tab before the user even clicks.

```html
<title>Anush_Gupta_PRD_v1.0 - Google Docs</title>
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
```

### 3.2 Top Header Bar

**Exact layout (left to right):**

```
[Docs icon] [Filename] [Star icon] [Clock icon] [Move icon]     [Comment icon] [History icon] [Present icon] [Share button] [Avatar]
```

**Specifications:**

| Element | Detail |
|---|---|
| Background color | `#FFFFFF` |
| Height | `64px` |
| Bottom border | `1px solid #E0E0E0` |
| Docs icon | Blue document SVG, 24×24px, left-padded 16px |
| Filename | `Anush_Gupta_PRD_v1.0` — font: Google Sans, 18px, color `#202124`. Clicking it makes it a live `<input>` that auto-reverts. |
| Star icon (☆) | Material Symbol `star_border`, 20px, color `#5F6368`. Clicking fills it gold (`#FBBC04`). |
| Clock icon | Material Symbol `history`, 20px, `#5F6368`. Hover tooltip: "See version history" |
| Share button | Blue pill: `background: #1A73E8`, color white, border-radius 4px, padding 8px 24px, font 14px Google Sans "Share". On hover: `#1557B0`. On click: opens a fake Share modal (see Section 3.6). |
| Avatar | Round `40px` circle, initials "AG", background `#A8C7FA`, text color `#0B57D0` — matches the screenshots exactly |
| Right-side icons | Comment icon (speech bubble), History icon, Present icon — all Material Symbols, 20px, `#5F6368`, spaced 8px apart, hover: `rgba(0,0,0,0.08)` circular bg |

**CSS for header:**
```css
.docs-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 64px;
  background: #FFFFFF;
  border-bottom: 1px solid #E0E0E0;
  display: flex;
  align-items: center;
  padding: 0 8px;
  z-index: 100;
  font-family: 'Google Sans', 'Product Sans', Arial, sans-serif;
}
```

### 3.3 Menu Bar (Second Row)

The second row below the header contains the menu items:

```
File   Edit   View   Insert   Format   Tools   Extensions   Help
```

**Specifications:**
- Height: `36px`
- Background: `#FFFFFF`
- Items: font 14px Google Sans, color `#202124`, padding `4px 8px`, border-radius 4px
- Hover state: `background: #F1F3F4`
- Bottom border: none (blends into toolbar)
- Each menu item is clickable and opens a *realistic-looking dropdown* with a few fake menu options (see Section 3.7 for dropdown specs)

### 3.4 Toolbar (Third Row) — The Hardest Part

This is where most portfolio attempts fail. The icons look "clunky" because they use generic icon libraries. **You must use Material Symbols (Google's actual icon font) at the exact sizes Docs uses.**

**Import Material Symbols:**
```html
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet">
```

**Full Toolbar Layout (left to right):**

```
[Undo] [Redo] [Print] [Spell check] | [Zoom: 100%▾] | [Normal text▾] | [Arial▾] | [11▾] | [B] [I] [U] [A▾ color] | [Highlight] [Link] [Comment] [Image] | [Align L] [Align C] [Align R] | [Line spacing▾] | [List: bullet] [List: numbered] | [Indent L] [Indent R] | [Clear formatting]
```

**Toolbar Specifications:**

| Property | Value |
|---|---|
| Height | `40px` |
| Background | `#F8F9FA` |
| Border bottom | `1px solid #E0E0E0` |
| Icon buttons | `28px × 28px`, border-radius `4px`, Material Symbols at `20px`, color `#444746` |
| Icon hover | `background: rgba(0,0,0,0.08)` |
| Icon active | `background: rgba(0,0,0,0.12)` |
| Dividers | `1px solid #C7C7C7`, height `20px`, `margin: 0 4px` |
| Dropdowns (zoom, style, font) | Outlined pill, `background: transparent`, `border: 1px solid transparent`, on hover `border-color: #C7C7C7`, `background: #F1F3F4` |

**Critical: Exact Material Symbol names to use:**

```
undo, redo, print, spellcheck
zoom_in (for zoom selector)
text_fields (for Normal text)
font_download (for font selector)  
format_bold, format_italic, format_underlined
format_color_text, format_color_fill
link, add_comment, image
format_align_left, format_align_center, format_align_right
format_line_spacing
format_list_bulleted, format_list_numbered
format_indent_decrease, format_indent_increase
format_clear
```

**Font selector dropdown shows:** Arial (selected), Times New Roman, Courier New, Georgia, Verdana — purely decorative but must look real.

**Zoom selector:** Shows "100%" with a dropdown arrow. Clicking opens fake dropdown: 50%, 75%, 90%, 100% (checked), 110%, 125%, 150%, 200%.

**The B, I, U buttons must be actively stateful** — clicking B makes the button background `#D3E3FD` (blue tint) to indicate active state.

### 3.5 Left Sidebar — Document Outline

This is the navigation sidebar that mirrors the screenshot exactly.

**Specifications:**
```
Width: 240px
Position: Fixed, left side
Top: 140px (below header + menu + toolbar)
Background: #FFFFFF
Font: Google Sans 13px
```

**Sidebar Header:**
```
"DOCUMENT OUTLINE"
font: Google Sans, 11px, weight 500, color #444746, letter-spacing 0.8px, all-caps
```

**Outline Items:**
```
PRD: Anush Gupta          (h1 level — bold, 13px, blue on active)
1. Executive Summary      (h2 level — 13px, indented 8px)
2. Target Audience        (h2 level)
3. Core Capabilities      (h2 level)
  3.1 Motor Insurance Engine  (h3 level — indented 16px, 12px)
  3.2 Technical Foundation    (h3 level)
4. UX & Product Designs   (h2 level)
5. Functional Requirements (h2 level)
6. Success Metrics        (h2 level — HIGHLIGHTED on scroll to this section)
7. Release Plan & Contact (h2 level)
```

**Active state (changes as user scrolls):**
- Active section: `color: #1A73E8`, left border `2px solid #1A73E8`, `background: #EAF1FC`, padding-left `6px`
- Inactive: `color: #202124`, no background
- Hover: `background: #F1F3F4`

**Scroll tracking:** Use `IntersectionObserver` to track which `<section>` is currently in viewport. On change, update the active item in the sidebar.

**Clicking sidebar items** smoothly scrolls to the corresponding section (CSS `scroll-behavior: smooth`).

### 3.6 The Share Modal (Interactive Easter Egg)

When the user clicks the blue "Share" button, a modal opens that looks *exactly* like the Google Docs share dialog:

```
┌─────────────────────────────────────────────┐
│  Share "Anush_Gupta_PRD_v1.0"          [✕]  │
├─────────────────────────────────────────────┤
│  Add people and groups                       │
│  [anushgupta105@gmail.com              ] [✉] │
│                                              │
│  People with access                          │
│  👤 Anush Gupta (you)         Owner          │
│  🌐 Anyone with the link      Viewer         │
│                                              │
│  General access                              │
│  [🌐 Anyone with the link ▾]  [Viewer ▾]    │
│                                              │
│  [Copy link]                    [Done]       │
└─────────────────────────────────────────────┘
```

**The Copy link button**, when clicked:
1. Copies `linkedin.com/in/anush-gupta105` to clipboard
2. Changes button text to "✓ Link copied!" for 2 seconds
3. This is the CTA — it gets the recruiter to his LinkedIn

**Done button** closes the modal.

---

## 4. The Document Body — Layout & Typography

### 4.1 Page Layout

The document area mimics A4 paper in a browser window:

```css
.docs-canvas {
  background: #F8F9FA;        /* Gray canvas background */
  min-height: 100vh;
  padding-top: 140px;         /* Below all three header rows */
  padding-left: 240px;        /* Left sidebar width */
}

.document-page {
  background: #FFFFFF;        /* White paper */
  width: 816px;               /* Google Docs default page width */
  min-height: 1056px;         /* A4 height */
  margin: 24px auto;
  padding: 96px 96px;         /* 1-inch margins (96px at 96dpi) */
  box-shadow: 0 1px 4px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05);
}
```

**Responsive behavior:**
- Below 1200px: sidebar collapses (toggle button appears)
- Below 900px: document width becomes `calc(100vw - 32px)`, padding reduces to 48px
- Mobile: Single column, no sidebar, minimal toolbar

### 4.2 Typography System

**This must match Google Docs default typography exactly:**

| Element | Font | Size | Weight | Color | Spacing |
|---|---|---|---|---|---|
| H1 (PRD title) | Arial | 26px | Bold (700) | `#202124` | margin-bottom: 16px |
| H2 (Section headers) | Arial | 18px | Bold (700) | `#202124` | margin-top: 28px, margin-bottom: 8px |
| H3 (Subsection) | Arial | 14px | Bold (700) | `#202124` | margin-top: 20px |
| Body text | Arial | 11pt (14.67px) | Normal (400) | `#202124` | line-height: 1.5 |
| Table header | Arial | 11pt | Bold | `#202124` | — |
| Table cell | Arial | 11pt | Normal | `#202124` | padding: 8px 16px |
| Hyperlinks | Arial | 11pt | Normal | `#1155CC` | text-decoration: underline |
| Bold inline | Arial | 11pt | Bold | `#202124` | — |

**Why Arial?** Google Docs default document font is Arial. Using any other font breaks the illusion.

### 4.3 Document Structure — Full Section-by-Section Spec

#### The Header Table (Meta block)

Recreate the exact table from the PRD screenshot:

```html
<table class="prd-header-table">
  <tr>
    <td class="label">Product Name</td>
    <td class="value link">Anush Gupta</td>
  </tr>
  <tr>
    <td class="label">Status</td>
    <td class="value">
      <span class="status-dot"></span>
      <strong>Ready for Deployment</strong>
    </td>
  </tr>
  <tr>
    <td class="label">Document Owner</td>
    <td class="value link">anushgupta105@gmail.com</td>
  </tr>
  <tr>
    <td class="label">Repository</td>
    <td class="value link">github.com/solmyst</td>
  </tr>
</table>
```

**Status dot:** `8px` circle, `background: #34A853` (Google green), `display: inline-block`, `margin-right: 6px`, `border-radius: 50%`, `vertical-align: middle`.

**Table CSS:**
```css
.prd-header-table {
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 32px;
}
.prd-header-table td {
  border: 1px solid #D0D0D0;
  padding: 8px 16px;
  font-size: 14.67px;
  font-family: Arial, sans-serif;
}
.prd-header-table .label {
  font-weight: bold;
  width: 200px;
  color: #202124;
}
.prd-header-table .value.link {
  color: #1155CC;
  text-decoration: underline;
  cursor: pointer;
}
```

#### Section 1: Executive Summary

```
1. Executive Summary & Problem Statement
────────────────────────────────────────────

The Problem: [body text explaining PM paralysis problem]

The Solution (Anush): [body text explaining Anush as the solution]
```

**"The Problem:" and "The Solution (Anush):"** are styled as inline bold spans — the Docs way.

**Typing cursor animation:** The document title at top shows a blinking `|` cursor initially, as if someone just finished typing it. Animate it for 1.5 seconds then remove it.

#### Section 2: Target Audience

A simple table with two columns:
- Column 1: Audience segment (Founders, Hiring Managers, etc.)
- Column 2: Their "pain point" that Anush solves

#### Section 3: Core Capabilities

Two subsections (3.1 and 3.2) with skills tables similar to the screenshot — Product Strategy, User Research, Data & Analytics, Technical Fluency, Software Stack rows.

The table in screenshot 2 should be recreated with the exact styling: bordered cells, bold left column, normal right column.

#### Section 6: Success Metrics (KPIs)

Bullet list with bold stat prefix — exactly as in screenshot 2:
- **180%** User Growth achieved against baseline (Park+ Internship)
- **8 Weeks** Sprint Duration consistently met (100% on-time delivery)
- **3** Conversion Funnel Stages architected and shipped
- **100%** End-to-end Feature Ownership

**Animation opportunity:** When this section scrolls into view, use a counter animation to count up from 0 to each metric number (180, 8, 3, 100).

#### Section 7: Release Plan & Contact

```
7. Release Plan & Contact
────────────────────────────────────────────
Next Action: Ready to deploy Anush into your team's ecosystem? Trigger an 
integration call below:

• Email: anushgupta105@gmail.com
• LinkedIn: linkedin.com/in/anush-gupta105
• GitHub: github.com/solmyst
```

**The CTA is subtle but clear.** No big colored button. Just hyperlinked text — staying in-character.

---

## 5. The Comment System — The Most Delightful Feature

This is what makes the portfolio memorable. Pre-populated comment bubbles appear on the document, exactly like real Google Docs comments. They represent social proof and guide reading.

### 5.1 Comment Bubble Architecture

**How comments work in real Docs:**
- A yellow highlight on the document text
- A comment card on the right margin (outside the document)
- Connected by a thin line on hover

**Implementation:**

```html
<!-- In document body: wrap text in a highlight span -->
<span class="comment-anchor" data-comment-id="comment-1">
  Brilliant PRD format.
</span>

<!-- In comment panel: -->
<div class="comment-card" id="comment-1">
  <div class="comment-header">
    <div class="avatar">HR</div>
    <div class="meta">
      <span class="name">Recruiter</span>
      <span class="time">10:45 AM Today</span>
    </div>
  </div>
  <p class="comment-text">
    Brilliant PRD format. Let's schedule an interview—we need builders like this on the team.
  </p>
  <div class="comment-actions">
    <button class="reply-btn">Reply</button>
    <button class="resolve-btn">Resolve ✓</button>
  </div>
</div>
```

### 5.2 Pre-Populated Comments (All 6)

Place these comments at specific document locations:

**Comment 1 — on the Title**
```
Avatar: HR (green, initials)
Name: Head of Product, Series B Startup
Time: 2 days ago
Text: "Whoever built this website understands product. Already sent to our CTO."
```

**Comment 2 — on "Ready for Deployment" status**
```
Avatar: VK (blue)
Name: Hiring Manager, Fintech
Time: Yesterday
Text: "Love that the status says 'Ready for Deployment.' Someone hire this person."
```

**Comment 3 — on Section 3 (Core Capabilities)**
```
Avatar: SA (orange)
Name: Founder, EdTech Startup
Time: 1 hour ago
Text: "LLMs/LangChain + SQL + Figma + 0-to-1 product thinking. This is exactly what we need."
```

**Comment 4 — on the 180% User Growth metric**
```
Avatar: PM (purple)
Name: Senior PM, Growth Stage
Time: 3 hours ago
Text: "180% growth? What was the baseline? Either way, this is the kind of PM we've been searching for."
Replied by Anush: "Started from 0 MAU — hit 180% of our target in 8 weeks. Happy to walk through the full case in an interview."
```

**Comment 5 — on the Success Metrics section (exactly as in screenshots)**
```
Avatar: HR (green)
Name: Recruiter
Time: 10:45 AM Today
Text: "Brilliant PRD format. Let's schedule an interview—we need builders like this on the team."
```

**Comment 6 — on Section 7 (Release Plan)**
```
Avatar: IG (red)
Name: CTO, Early Stage
Time: 45 minutes ago
Text: "Triggered. Emailing now."
```

### 5.3 Comment Styling

**Comment card:**
```css
.comment-card {
  position: absolute;
  right: -320px;       /* Outside the document */
  width: 280px;
  background: #FFFFFF;
  border: 1px solid #E0E0E0;
  border-radius: 8px;
  padding: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.12);
  font-family: 'Google Sans', Arial, sans-serif;
  font-size: 13px;
}
```

**Avatar (matches screenshot exactly):**
```css
.comment-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #34A853;  /* or #1A73E8, #EA4335 etc. — varies by commenter */
  color: white;
  font-size: 12px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
```

**Text highlight in document:**
```css
.comment-anchor {
  background: rgba(255, 214, 0, 0.4);  /* Yellow highlight */
  cursor: pointer;
  transition: background 0.15s;
}
.comment-anchor:hover,
.comment-anchor.active {
  background: rgba(255, 214, 0, 0.7);
}
```

### 5.4 Comment Interactions

- **Click on highlighted text:** Animates the corresponding comment card (slight scale up, border becomes `#FBBC04`)
- **Click "Reply" button:** Opens a small textarea inside the comment card. On submit, adds the reply as a nested comment.
- **Click "Resolve ✓":** Comment card fades out (opacity 0, transform translateX(20px)), document highlight disappears. After 1.5s, a small "1 resolved comment" appears in the top margin (matching Docs behavior).
- **Comment counter in header:** The speech bubble icon in the header shows a badge count. It starts at 6, decreases as comments are resolved.

---

## 6. Additional Google Docs Interactions

### 6.1 Toolbar Button Behaviors

Every toolbar button must react even if it does nothing real:

| Button | Behavior |
|---|---|
| Undo (Ctrl+Z) | Nothing changes, but the button flashes active state for 150ms |
| Bold (B) | Toggles active state (blue bg). If text is selected on the page, applies `font-weight: bold` to selection (using `document.execCommand` or Selection API) |
| Italic (I) | Same as Bold but italic |
| Underline (U) | Same but underline |
| Format: Normal text | Nothing happens, dropdown just closes |
| Zoom: 100% | On click, dropdown opens. Selecting 150% scales `.document-page { transform: scale(1.5) }` with CSS transition. Selecting 75% scales down. |
| Print | `window.print()` |
| Spell check | Adds a red squiggly underline under a random word for 2 seconds, then removes it — a visual gag |

### 6.2 Cursor-in-Document Effect

The document title has a blinking cursor on page load:

```css
@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

.typing-cursor::after {
  content: '|';
  animation: blink 1s step-end infinite;
  color: #4285F4;
  font-weight: 100;
  margin-left: 2px;
}
```

After 3 seconds of being visible, the cursor fades out — simulating the user stopping their edit.

### 6.3 "Last Edit" Status

In the header filename area, a small timestamp appears:

```
Anush_Gupta_PRD_v1.0  ☆  📁
           ↓
All changes saved in Drive
```

The "All changes saved" text appears in the menu bar area (between the file menu and the toolbar). It should be grayed out (`#5F6368`, 13px) and occasionally flicker through states:
1. (idle) "All changes saved in Drive"
2. (on any click) "Saving..." for 800ms
3. "All changes saved in Drive" again

### 6.4 Fake "Editing" Indicator

In the toolbar area, far right, show:
```
Editing ▾
```
Clicking this opens a dropdown:
```
● Editing
○ Suggesting  
○ Viewing
```
Selecting "Suggesting" changes the cursor to a teal color and adds a teal left-border to any paragraph you'd hover over. Pure visual theater.

### 6.5 Page Break Visual

Between sections 3 and 4, add a page break:
```css
.page-break {
  border: none;
  height: 0;
  margin: 24px -96px;
  position: relative;
}
.page-break::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 24px;
  background: #F8F9FA;  /* canvas color — creates visual gap between pages */
  border-top: 1px solid #E0E0E0;
  border-bottom: 1px solid #E0E0E0;
}
```

### 6.6 Word Count (Footer)

At the very bottom of the document, show:
```
[Page 1 of 2]               [Word count: 847 words]
```

This is purely static text but adds to the illusion.

---

## 7. Mobile Responsiveness

Mobile is a challenge for the Google Docs aesthetic — there is no sidebar, the toolbar must be simplified, and the document must still be readable.

### 7.1 Mobile Layout

```
Breakpoint: < 768px

Changes:
1. Sidebar: hidden (replaced by hamburger menu that slides it in from left)
2. Toolbar: collapses to 1 row with only the most common icons
3. Document page: full-width with 24px padding (instead of 96px)
4. Comment cards: hidden by default, appear in a bottom sheet when user taps highlighted text
5. Header: filename truncates to "Anush_Gupta..." if too long
6. Share button: remains visible — it's the main CTA
```

### 7.2 Mobile Comment Bottom Sheet

When a user taps highlighted text on mobile:
```
A bottom sheet slides up (50% screen height) showing:
- The comment card at full width
- Swipe down to dismiss
- Share button at the bottom
```

---

## 8. SEO & Open Graph

### 8.1 Meta Tags

```html
<meta name="description" content="Anush Gupta — Product Manager. PRD-style portfolio. Ready for deployment.">
<meta property="og:title" content="Anush_Gupta_PRD_v1.0 - Google Docs">
<meta property="og:description" content="A PM who ships. View the PRD.">
<meta property="og:image" content="/og-image.png">
<meta property="og:type" content="website">
<meta name="twitter:card" content="summary_large_image">
```

### 8.2 OG Image

The Open Graph image should look like a **screenshot of the Google Docs interface** showing the PRD header table. When someone shares the URL on LinkedIn or WhatsApp, the preview shows a Google Doc — they'll click it out of curiosity.

**Design the OG image to be 1200×630px showing:**
- The Google Docs browser chrome (partial)
- The PRD header table with "Ready for Deployment" in green
- The document title
- One comment bubble with "Brilliant PRD format..."

---

## 9. Animations & Microinteractions

### 9.1 Page Load Sequence

Execute in order on page load:

| Delay | Animation |
|---|---|
| 0ms | Header appears (slide down from top, `translateY(-64px)` → `0`) |
| 150ms | Menu bar fades in |
| 300ms | Toolbar fades in |
| 450ms | Sidebar slides in from left |
| 600ms | Document page fades in (opacity 0 → 1, `translateY(20px)` → `0`) |
| 1000ms | Typing cursor appears on document title |
| 3000ms | First comment card slides in from right |
| 4000ms | Second comment card slides in |

This sequence feels like watching a Google Doc load.

### 9.2 Scroll Animations

Use `IntersectionObserver` with `threshold: 0.3`:

| Element | Animation |
|---|---|
| Section headings | Fade in + `translateY(10px)` → `0`, duration 400ms |
| Tables | Fade in, no movement |
| Stat numbers | Count-up animation (see Section 9.3) |
| Comment cards | They stay visible but scale up slightly when their section is in view |

### 9.3 Stat Counter Animation

For the Success Metrics section:

```javascript
function animateCounter(el, target, suffix = '') {
  const duration = 1200;
  const start = performance.now();
  const update = (time) => {
    const elapsed = time - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(eased * target);
    el.textContent = current + suffix;
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}
```

Call when section scrolls into view:
- `180%` counts from 0 to 180
- `8 Weeks` counts from 0 to 8
- `3` counts from 0 to 3
- `100%` counts from 0 to 100

---

## 10. The "Recruiter Easter Eggs"

These hidden interactions reward curious users:

### 10.1 Konami Code
If user types: `↑↑↓↓←→←→BA`, the entire document "glitches" for 500ms (brief shake animation), then a comment appears from "Anush Gupta": "Nice. You'd fit right in here."

### 10.2 Triple-click Easter Egg
Triple-clicking the document title selects it and opens a fake "Rename" inline edit. On blur, it reverts to "Anush_Gupta_PRD_v1.0" with an animation.

### 10.3 Print Mode
When user hits Ctrl+P (or clicks Print in the toolbar), `window.print()` is called. The print stylesheet removes the Docs chrome and prints just the document — useful if a recruiter actually wants to print it.

```css
@media print {
  .docs-header, .menu-bar, .toolbar, .sidebar, .comment-card { display: none !important; }
  .docs-canvas { padding: 0; }
  .document-page { box-shadow: none; margin: 0; }
}
```

### 10.4 The "Hire" Link
In the footer of the document, the text "Trigger an integration call below:" — clicking the word "integration" opens the Share modal (the main CTA). This is the hidden path to contact.

---

## 11. Color Reference — Exact Google Docs Colors

```css
:root {
  /* Google UI Colors */
  --google-blue: #1A73E8;
  --google-blue-hover: #1557B0;
  --google-blue-light: #D3E3FD;
  --google-red: #EA4335;
  --google-green: #34A853;
  --google-yellow: #FBBC04;
  
  /* Docs UI */
  --toolbar-bg: #F8F9FA;
  --canvas-bg: #F8F9FA;
  --text-primary: #202124;
  --text-secondary: #5F6368;
  --text-link: #1155CC;
  --border-default: #E0E0E0;
  --border-medium: #C7C7C7;
  
  /* Document */
  --page-bg: #FFFFFF;
  --page-shadow: 0 1px 4px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05);
  
  /* Highlight */
  --comment-highlight: rgba(255, 214, 0, 0.4);
  --comment-highlight-active: rgba(255, 214, 0, 0.7);
}
```

---

## 12. Performance Requirements

| Metric | Target |
|---|---|
| First Contentful Paint | < 1.2s |
| Largest Contentful Paint | < 2.5s |
| Time to Interactive | < 3.5s |
| Cumulative Layout Shift | < 0.1 |

**To achieve these:**
- Preload the Google Sans font
- Lazy load comment card interactions with `IntersectionObserver`
- No heavy JS frameworks unless React is used (and even then, keep bundle < 150KB)
- Images: only the OG image and the Docs favicon (both tiny)

---

## 13. Accessibility

Even though this is a portfolio site, accessibility matters for professionalism:

- All icon buttons have `aria-label` attributes
- Comment highlights have `role="mark"` and `aria-label="Highlighted — 1 comment"`
- Sidebar navigation has `role="navigation"` and `aria-label="Document outline"`
- Color is never the only differentiator (all status indicators also have text)
- Keyboard navigation: Tab through interactive elements, Enter activates, Escape closes modals
- `prefers-reduced-motion` respected: counter animations and slide-ins are disabled, only fades remain

---

## 14. Known Implementation Challenges & Solutions

| Challenge | Solution |
|---|---|
| Comment cards positioning on different screen sizes | Use `position: absolute` on the document container, calculate card top from the anchor element's `offsetTop` |
| Toolbar overflow on narrow screens | Use `overflow-x: auto` with hidden scrollbar on toolbar row |
| Font matching exact Google Docs feel | Use Arial for document body (it's what Docs uses). Use Google Sans for Docs UI chrome. |
| Sidebar overlap on small tablets | At 900px–1200px, sidebar overlays document instead of pushing it (adds semi-transparent backdrop) |
| Resolve comment animation | `transition: opacity 0.4s, transform 0.4s` + JS removes from DOM after transition ends |
| Share modal accessibility | `role="dialog"`, `aria-modal="true"`, focus trap on open, Escape closes |

---

## 15. Launch Checklist

- [ ] Browser tab shows correct title and Docs favicon
- [ ] All three header rows render correctly (header, menu, toolbar)
- [ ] Toolbar icons are Material Symbols, not any other icon library
- [ ] Sidebar outline correctly highlights active section on scroll
- [ ] All 6 comment cards are positioned correctly beside their anchors
- [ ] Share modal opens and Copy Link copies LinkedIn URL
- [ ] Bold/Italic/Underline buttons have active states
- [ ] Zoom dropdown works (scales document)
- [ ] Counter animation fires for Success Metrics section
- [ ] Comments can be resolved (fade + counter decrements)
- [ ] Print stylesheet hides chrome
- [ ] Mobile layout: sidebar hidden, bottom sheet for comments
- [ ] OG image shows a Google Docs screenshot
- [ ] Lighthouse score > 90 on Performance, Accessibility, Best Practices
- [ ] All links open in new tab
- [ ] Keyboard navigation works throughout

---

*"Ship the candidate. Not the resume."*

— Anush Gupta, PM | anushgupta105@gmail.com | github.com/solmyst
