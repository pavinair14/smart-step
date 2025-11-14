import { LanguageSwitcher } from './components/common/LanguageSwitcher';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { useTranslation } from 'react-i18next';
import { MultiStepForm } from './features/applicationForm/components/MultiStepForm';

function App() {
  const { t } = useTranslation();

  return (
    <ErrorBoundary>
      <div className="min-h-screen h-full flex flex-col items-center bg-stone-100 pt-8 pb-0 sm:pb-16">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 bg-white text-slate-800 p-2 rounded shadow"
        >
          {t('messages.skipToMainContent')}
        </a>

        {/* Header section */}
        <header role="banner">
          <LanguageSwitcher />
          <h1 className="pb-4 z-10 text-violet-900 font-semibold !text-4xl sm:!text-5xl text-center tracking-tight">
            {t('app.title')}
          </h1>
        </header>

        {/* form section */}
        <main
          id="main-content"
          role="main"
          className="z-10 w-full h-full max-w-4xl px-10 py-6 bg-white rounded-xl shadow-xl"
        >
          <MultiStepForm />
        </main>
      </div>
    </ErrorBoundary>
  );
}

export default App;
