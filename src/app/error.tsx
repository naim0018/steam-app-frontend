'use client';

import ErrorDisplay from '@/components/ui/ErrorDisplay';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4">
        <ErrorDisplay error={error} fullScreen onRetry={reset} />
      </div>
    </main>
  );
} 