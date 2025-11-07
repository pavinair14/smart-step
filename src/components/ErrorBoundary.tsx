import type { ReactNode } from 'react';
import { ErrorBoundary as ReactErrorBoundary, type FallbackProps } from 'react-error-boundary';
import type { ErrorInfo } from 'react';
import { AlertTriangle } from 'lucide-react';

interface ErrorBoundaryProps {
    children: ReactNode;
    fallback?: ReactNode;
}

const ErrorFallback = ({ resetErrorBoundary }: FallbackProps) => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-violet-200 to-violet-100 px-4">
            <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
                <AlertTriangle className="mx-auto mb-4 h-16 w-16 text-red-500" />

                <h1 className="text-2xl font-bold text-gray-900 mb-2">Oops! Something went wrong</h1>
                <p className="text-gray-600 mb-6">
                    We encountered an unexpected error. Please try again later.
                </p>

                <button
                    onClick={resetErrorBoundary}
                    className="px-6 py-3 bg-violet-900 text-white font-medium rounded-md 
                     hover:bg-violet-800 transition-colors focus:outline-none 
                     focus:ring-2 focus:ring-offset-2 focus:ring-violet-900"
                >
                    Reload Application
                </button>

                <p className="mt-4 text-sm text-gray-500">
                    If this problem persists, please contact support.
                </p>
            </div>
        </div>
    );
}

function logError(error: Error, errorInfo: ErrorInfo) {
    console.error('Error Boundary caught an error:', error, errorInfo);
}

export const ErrorBoundary = ({ children, fallback }: ErrorBoundaryProps) => {
    return (
        <ReactErrorBoundary
            FallbackComponent={fallback ? () => <>{fallback}</> : ErrorFallback}
            onError={logError}
            onReset={() => window.location.reload()}
        >
            {children}
        </ReactErrorBoundary>
    );
}
