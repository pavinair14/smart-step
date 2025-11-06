---

# 🧭 Smart Step — Multi‑Step Form (React + TypeScript)

A progressive, accessible multi-step form built with React, TypeScript, and Vite. It features schema-driven validation (Zod), seamless step navigation, and AI-assisted writing for text areas.

---

## 🔗 Preview

Run locally (see setup below) and open the printed localhost URL from Vite (typically http://localhost:5173 or a nearby port).

---

## 🚀 Tech Stack

- Framework/Build: Vite + React 19 + TypeScript
- Forms: react-hook-form
- Validation: Zod
- Styling: Tailwind CSS + Shadcn UI
- Animations: Framer Motion
- Icons: lucide-react
- Testing: Jest + React Testing Library + jest-dom
- AI Suggestion: OpenAI client

---

## ✨ Features

- ✅ Multi-step flow with per-step validation
- ✅ Instant validation feedback (onChange)
- ✅ AI “Help me write” suggestions for descriptions
- ✅ Persisted, predictable validation using Zod
- ✅ Accessible dialogs, ARIA labels, and keyboard support
- ✅ Comprehensive unit tests

---

## 📦 Project Structure

```bash
src/
  components/
    MultiStepForm.tsx
    Stepper.tsx
    shared/
      Field.tsx
    steps/
      personalInfo/
      familyfinancialInfo/
      situationDescription/
  services/
    aiClient.ts
    mockSubmitAPI.ts
  lib/
    utils.ts
```
    
## ⚙️ Installation & Setup

### Prerequisites
- Node.js 18+ (recommended)
- npm (or yarn/pnpm if you prefer)

### Clone & Install

git clone https://github.com/pavinair14/smart-step.git
cd smart-step
npm install


### Environment Variables (optional for AI)
If you want AI suggestions to use a real API key at runtime, create `.env` in the project root:

```
VITE_OPENAI_API_KEY=sk-your-key
```

Note: In tests, the AI client is mocked, so no real network calls are made.

### Start the Dev Server
```bash
npm run dev
```
Open the printed URL (e.g., http://localhost:5173/). Vite will choose another port if 5173 is busy.

### Run Tests
```bash
npm test            # run full suite
npm run test:watch  # watch mode
npm run test:coverage
```
Coverage report will be generated under `coverage/lcov-report/index.html`.

### Lint & Type Check
```bash
npm run lint
```

### Build for Production
```bash
npm run build
```
The build output goes to `dist/`.

---

## 🧪 Testing Strategy

- Jest + React Testing Library for unit and interaction tests
- jsdom test environment
- AI client is mocked for deterministic tests

Common scripts:
```bash
npm test
npm run test:watch
npm run test:coverage
```

---

## 🔒 Environment

At runtime, the OpenAI client reads `import.meta.env.VITE_OPENAI_API_KEY` if available. During tests, a local mock is used, so no real calls are performed.

---

## ♿ Accessibility

- Inputs wired with accessible labels
- Dialogs with appropriate roles, ARIA, and focus management
- Reduced motion respected where applicable

---

## 📈 Performance Notes

- Memoized presentational components (`Stepper`, `Field`)
- `useCallback` for stable handlers; `useMemo` for derived view models
- Narrow `watch` subscriptions to reduce re-renders

---

## 🤝 Contributing

PRs and issues are welcome. Please include/adjust tests when changing behavior.

---

## 📄 License

MIT
