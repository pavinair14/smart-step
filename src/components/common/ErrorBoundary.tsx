import type { ReactNode } from "react";
import {
    ErrorBoundary as ReactErrorBoundary,
    type FallbackProps,
} from "react-error-boundary";
import type { ErrorInfo } from "react";
import { AlertTriangle } from "lucide-react";
import { useTranslation } from "react-i18next";

interface ErrorBoundaryProps {
    children: ReactNode;
    fallback?: ReactNode;
}

/* Error Fallback Component */
const ErrorFallback = ({ resetErrorBoundary }: FallbackProps) => {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-violet-200 to-violet-100 px-4">
            <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8 text-center">
                <div className="flex items-center justify-center mb-4">
                    <AlertTriangle
                        className="mx-auto mb-4 mr-3 h-12 w-12 text-red-500"
                        aria-hidden="true"
                    />

                    <h1 className="sm:!text-4xl !text-xl font-bold text-gray-900 mb-2">
                        {t("errorBoundary.title")}
                    </h1>
                </div>

                <p className="text-gray-600 text-lg mb-8">
                    {t("errorBoundary.description")}
                </p>

                <button
                    onClick={resetErrorBoundary}
                    className="
            px-6 py-3 bg-violet-900 text-white font-medium rounded-md 
            hover:bg-violet-800 transition-colors 
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-900
          "
                >
                    {t("errorBoundary.reload")}
                </button>

                <p className="mt-4 text-sm text-gray-500">
                    {t("errorBoundary.contactSupport")}
                </p>
            </div>
        </div>
    );
};

/* Error Logger */
function logError(error: Error, errorInfo: ErrorInfo) {
    console.error("Error Boundary caught:", error, errorInfo);
}

/* ErrorBoundary Wrapper */
export const ErrorBoundary = ({ children, fallback }: ErrorBoundaryProps) => {
    return (
        <ReactErrorBoundary
            FallbackComponent={
                fallback ? () => <>{fallback}</> : ErrorFallback
            }
            onError={logError}
            onReset={() => window.location.reload()}
        >
            {children}
        </ReactErrorBoundary>
    );
};
