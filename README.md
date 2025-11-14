# 🧭 Social Support — Multi‑Step Form (React + TypeScript)

Social Support Application is a government service portal prototype that allows citizens to easily apply for financial assistance through a guided, multi-step form. The system collects personal, family, and financial information and uses AI assistance to help users describe their financial situation clearly and effectively. It is designed to be responsive, accessible, and bilingual (English/Arabic) for an inclusive user experience.

---

## 🔗 Preview

Run locally (see setup below) and open the printed localhost URL from Vite (typically http://localhost:5173 or a nearby port).

---

## 🚀 Tech Stack

- Framework/Build: Vite + React 19 + TypeScript
- Forms: react-hook-form
- State Management: Zustand
- Internationalization: React-i18next
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
- ✅ Multi-language support (English + Arabic)
- ✅ Persisted state across browser refresh (Zustand)
- ✅ Persisted, predictable validation using Zod
- ✅ Accessible dialogs, ARIA labels, and keyboard support
- ✅ Comprehensive unit tests

---

## 📦 Project Structure

```bash
src/
  App.tsx
  main.tsx
  assets/
    images/
      smart-step-flow.png
  components/
    common/
      ErrorBoundary.tsx
      Field.test.tsx
      Field.tsx
      LanguageSwitcher.tsx
      Loader.tsx
    ui/
      button.test.tsx
      button.tsx
      dialog.test.tsx
      dialog.tsx
      ErrorField.tsx
      input.tsx
      label.tsx
      progress.test.tsx
      progress.tsx
      textarea.tsx
  features/
    applicationForm/
      MultiStepForm.test.tsx
      MultiStepForm.tsx
      Stepper.test.tsx
      Stepper.tsx
      constants/
        familyfinancialInfo.ts
        formDefaults.ts
        personalInfo.ts
        situationDescription.ts
      modals/
        SubmissionSuccessModal.tsx
        SuggestionModal.tsx
      services/
        submitApplication.ts
      steps/
        FamilyFinancialInfo.tsx
        PersonalInfo.tsx
        SituationDescription.tsx
      types/
        formField.ts
  hooks/
    useAutoFillLocation.ts
    useDebouncedEffect.ts
  i18n/
    config.ts
    testInit.ts
    locales/
      ar.json
      en.json
  lib/
    openai/
      client.ts
      errors.ts
      getSuggestion.ts
      suggestionService.ts
      textAnalysis.ts
  schemas/
    schemas.test.ts
    validationSchema.ts
  store/
    formStore.ts
  styles/
    global.css
  test/
    setup.ts
  utils/
    cn.ts
    dateFormat.ts
    references.ts
    sanitize.ts
```

    
## ⚙️ Installation & Setup

### Prerequisites
- Node.js 18+ (recommended)
- npm (or yarn/pnpm if you prefer)

### Clone & Install

git clone https://github.com/pavinair14/social-support.git
cd social-support
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

## 🌐 Internationalization (i18n)

This project uses `react-i18next` + `i18next-browser-languagedetector` for runtime language switching (English / Arabic).
Smart Step includes React-i18next for multi-language support and seamless right-to-left (RTL) rendering.

### Supported Languages

- 🇺🇸 English (en)
- 🇦🇪 Arabic (ar)

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
