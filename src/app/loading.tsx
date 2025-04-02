import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function Loading() {
  return (
    <main className="min-h-screen bg-gray-900 flex items-center justify-center">
      <LoadingSpinner size="large" />
    </main>
  );
} 