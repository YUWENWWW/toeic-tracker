# 📚 TOEIC Tracker

A personal TOEIC exam preparation tracker built with Angular 22.  
Track practice sessions, analyze weak points, manage vocabulary, and record mock exam scores.

🔗 **Live Demo**: https://yuwenwww.github.io/toeic-tracker/

---

## Features

| Page | Description |
|------|-------------|
| 🏠 Dashboard | KPI overview — days left, weekly practice days, total hours, accuracy |
| ✏️ Practice Log | Add / delete practice records by Part, with real-time accuracy calculation |
| 📊 Weakness Analysis | Per-Part accuracy bar charts with color-coded performance indicators |
| 📖 Vocabulary | Word bank with 3-tier status tracking (unknown / learning / mastered) |
| 📝 Mock Exams | Record full mock exam scores, track progress trend vs. target (785) |

---

## Tech Stack

- **Framework**: Angular 22 (Standalone Components)
- **State Management**: Angular Signals (`signal`, `computed`)
- **Routing**: Angular Router with lazy loading
- **Storage**: localStorage (no backend required)
- **Styling**: Pure CSS with CSS nesting
- **Deployment**: GitHub Pages via gh-pages

---

## Angular Concepts Demonstrated

- Standalone components with `imports` array
- Reactive state with `signal()` and `computed()`
- Two-way data binding with `FormsModule`
- Lazy-loaded routes with `loadComponent`
- Dependency injection with `inject()`
- Template control flow with `@if` / `@for` (Angular 17+ syntax)
- Service layer with localStorage persistence

---

## Project Structure
---

## Getting Started

```bash
git clone https://github.com/YUWENWWW/toeic-tracker.git
cd toeic-tracker
npm install
ng serve
```

Open `http://localhost:4200`

---

## Deploy

```bash
npm run deploy
```

Builds and publishes to `gh-pages` branch automatically.

---

## Background

Built as **Project D** in a self-directed Angular learning roadmap.  
Designed for personal TOEIC preparation (target: 785, exam date: 2026/10/18).  
Intentionally uses localStorage over a backend to keep the architecture simple  
and demonstrate pure Angular frontend capabilities.

**Learning roadmap:**
- ✅ Project D — TOEIC Tracker (this project)
- 🔜 Project A — PKI Certificate Management Dashboard (Spring Boot backend)
- 🔜 Project C — ETF Investment Dashboard (Anthropic API integration)
