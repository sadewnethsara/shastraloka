// app/global-error.tsx
'use client';

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <html lang="en">
            <body className="min-h-screen bg-[#FAF8F5] flex items-center justify-center p-4 text-stone-900 font-sans">
                <div className="max-w-md w-full bg-white border border-stone-200 rounded-2xl p-8 text-center space-y-5 shadow-sm">
                    <h1 className="text-2xl font-serif font-bold">
                        Shastraloka is temporarily unavailable
                    </h1>
                    <p className="text-sm text-stone-600">
                        We encountered a critical issue loading the bookstore. Please refresh
                        the page to continue shopping.
                    </p>
                    <button
                        onClick={() => reset()}
                        className="w-full py-3 px-6 rounded-xl bg-amber-900 hover:bg-amber-800 text-white font-medium text-sm transition-colors cursor-pointer"
                    >
                        Reload Bookstore
                    </button>
                    {error.digest && (
                        <p className="text-xs text-stone-400 font-mono">
                            Error ID: {error.digest}
                        </p>
                    )}
                </div>
            </body>
        </html>
    );
}