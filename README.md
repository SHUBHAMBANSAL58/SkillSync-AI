# SkillSync AI 4.0 — AI Career Intelligence & Job Readiness Ecosystem

> **Tagline:** Build Skills. Prove Your Value. Get Hired.  
> **Repository:** `skillsync-ai`  
> **Platform Category:** Full-Stack AI Career Intelligence SaaS

---

## 🌟 Executive Overview

**SkillSync AI 4.0** is an enterprise-grade AI career intelligence and job readiness platform designed for software engineering students, new graduates, and career changers. It transforms fragmented, subjective job preparation into an objective, evidence-based development journey orchestrated by an autonomous four-agent software organization.

Unlike decorative career portals, SkillSync AI integrates:
- **Four Autonomous AI Agents** (Planner, Designer, Builder, Tester) operating through a shared state machine, task queues, and automated QA verification.
- **ATS Resume Intelligence** with deterministic keyword density scoring, multi-version switching, and AI STAR accomplishment formulation.
- **Placement Eligibility Checker** auditing candidate CGPA, graduation batch, degree streams, and backlogs against employer cutoffs with transparent reasoning.
- **Evidence-Based Skill Verification Centre** providing technical exams and an in-browser code challenge test runner (self-declared skills are never verified without empirical test passes).
- **AI Interview Arena 2.0** featuring timed simulations, dual-dimension scoring (Technical Depth + Communication Clarity), and exemplary model answers.
- **AI Career Mentor** powered by multi-turn Gemini models (`gemini-4-argon`, `gemini-3.8-flash`, `gemini-3.1-flash-lite`) with specialized engineering leadership personas.
- **Interactive 3D Skill Galaxy** rendered with Three.js depicting real-time competency clusters with graceful softwareGL fallback.
- **AI Career Asset Studio** supporting high-resolution 1K, 2K, and 4K portfolio visual generation via `gemini-3-pro-image-preview`.
- **Firebase Firestore & Auth** with production security rules enforcing user data isolation and role-based permissions.

---

## 🤖 The Four AI Agent Management System

The platform features an integrated **AI Agent Command Centre** managing software evolution through four distinct roles:

```
[PLANNER AGENT]  --->  [DESIGNER AGENT]  --->  [BUILDER AGENT]  --->  [TESTER AGENT]
  (Strategos AI)           (Aura UX)              (Forge Core)           (Sentron QA)
        ^                                                                     |
        |_______________________ Handoff & QA Feedback Loop _________________|
```

1. **Planner Agent (Strategos AI)**: Chief Strategist. Inspects requirements, audits database plans, prioritizes development milestones (M1–M8), and manages technical risk.
2. **Designer Agent (Aura UX)**: Visual Experience Architect. Enforces midnight glassmorphism tokens (`#080B18`), responsive UI reflow, and 3D visual depth.
3. **Builder Agent (Forge Core)**: Chief Software Engineer. Implements full-stack TypeScript components, server-side `@google/genai` proxies, and safe state machines.
4. **Tester Agent (Sentron QA)**: Security & QA Chief. Runs automated unit tests (`node:test` via `npx tsx --test`), audits ATS calculations, checks RBAC permissions, and flags regressions.

---

## 📦 Complete 17 Core Modules Architecture

1. **Smart Dashboard**: Real-time career readiness index, 14-day velocity streak, weekly goal progress, and active career quests.
2. **Career DNA Diagnostic**: Algorithmic evaluation of engineering archetypes (e.g. *Systems & Full-Stack AI Polymath*).
3. **Resume Lab & ATS Intelligence**: PDF upload, extraction, and keyword scoring.
4. **Smart Job Match Engine**: Match percentages and gap analysis across vetted industry roles.
5. **AI Skill Gap Analyzer**: Benchmark against Silicon Valley hiring bars with time-to-mastery targets.
6. **Career Mission Control**: Sprint boards and daily velocity tracking.
7. **AI Learning Roadmap**: Step-by-step curriculum with estimated hours and practical project prompts.
8. **AI Career Mentor**: Multi-turn chat interface with specialized engineering personas.
9. **AI Interview Arena 2.0**: Timed technical & behavioral simulation with dual-metric scoring.
10. **Developer Growth Arena**: In-browser coding challenges with sandboxed virtual test runner.
11. **Opportunity Radar**: Filterable internships and entry-level engineering roles.
12. **Internship Application Tracker**: Multi-stage Kanban pipeline (Wishlist ➔ Applied ➔ Screening ➔ Interviewing ➔ Offer ➔ Rejected).
13. **GitHub Profile Analyzer**: Real GitHub REST API integration auditing public repositories, languages, stars, and READMEs.
14. **Project & Portfolio Studio**: Transparent 100-point rubric evaluation for technical portfolio showcases.
15. **AI Resume & Portfolio Builder**: Modern ATS-compliant formatting and print-to-PDF export.
16. **Reports & Achievements**: Verified badge showcases and printable executive progress reports.
17. **Platform Admin & Settings**: Role-based access control, system metrics, and moderation.

---

## 🛠️ Tech Stack & Integrations

- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Motion, Lucide Icons, Three.js
- **Backend**: Node.js, Express, Vite Dev Server Proxy Middleware
- **Database & Auth**: Firebase Firestore & Firebase Authentication (`gen-lang-client-0444726115`)
- **AI Models**: Google GenAI SDK (`@google/genai`)
  - `gemini-4-argon`: Complex reasoning and architectural deliberation
  - `gemini-3.8-flash`: General mentorship, ATS evaluation, and interview simulation
  - `gemini-3.1-flash-lite`: Rapid career queries and instant coaching
  - `gemini-3-pro-image-preview`: High-resolution 1K, 2K, and 4K portfolio asset generation
- **External APIs**: GitHub REST API v3

---

## 🧪 Automated Testing & Verification

Core business logic is decoupled into pure modules and tested with Node's native test runner:

```bash
# Run pure logic unit tests (ATS calculation & Placement Eligibility)
npx --yes tsx --test src/utils/atsCalculator.test.ts src/utils/eligibilityChecker.test.ts
```

All 6 unit tests pass deterministically in under 350ms.

---

## 🚀 Getting Started

### Prerequisites
- Node.js >= 20.x
- npm >= 10.x

### Installation
```bash
# 1. Clone repository
git clone https://github.com/alexrivers-dev/skillsync-ai.git
cd skillsync-ai

# 2. Install dependencies
npm install

# 3. Configure environment variables in .env
GEMINI_API_KEY="your-gemini-api-key"

# 4. Start development server
npm run dev
```

Visit `http://localhost:3000` to interact with the platform.
