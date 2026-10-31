/**
 * Shastraloka Universal API Client
 * Seamlessly routes requests through Next.js proxy (/api/backend/*) on client
 * or directly to NEXT_PUBLIC_BACKEND_URL on SSR with forwarded session cookies.
 */

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined>;
}

async function request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const isServer = typeof window === "undefined";
  const normalizedEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;

  let url: string;
  const headers = new Headers(options.headers || {});

  if (!headers.has("Content-Type") && !(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  if (isServer) {
    // Server-side (SSR) execution: Call backend directly and forward cookies
    url = `${BACKEND_URL}/api${normalizedEndpoint}`;
    try {
      const { cookies } = await import("next/headers");
      const cookieStore = await cookies();
      const cookieHeader = cookieStore.toString();
      if (cookieHeader) {
        headers.set("Cookie", cookieHeader);
      }
    } catch {
      // Outside Next.js request context (e.g., static generation phase)
    }
  } else {
    // Client-side browser execution: Use Next.js rewrite proxy to bypass CORS
    url = `/api/backend${normalizedEndpoint}`;
    options.credentials = "include";
  }

  // Append query parameters if provided
  if (options.params) {
    const urlObj = new URL(url, isServer ? BACKEND_URL : window.location.origin);
    Object.entries(options.params).forEach(([key, val]) => {
      if (val !== undefined && val !== null) {
        urlObj.searchParams.set(key, String(val));
      }
    });
    url = urlObj.toString();
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let errorMessage = `API request failed with status ${response.status}`;
    try {
      const errorData = await response.json();
      if (errorData.message) errorMessage = errorData.message;
      else if (errorData.error) errorMessage = errorData.error;
    } catch {
      // Non-JSON error response
    }
    throw new Error(errorMessage);
  }

  // Handle empty 204 responses
  if (response.status === 204) {
    return {} as T;
  }

  return response.json() as Promise<T>;
}

export const apiClient = {
  get: <T>(endpoint: string, options?: RequestOptions) =>
    request<T>(endpoint, { ...options, method: "GET" }),

  post: <T>(endpoint: string, data?: unknown, options?: RequestOptions) =>
    request<T>(endpoint, {
      ...options,
      method: "POST",
      body: data instanceof FormData ? data : JSON.stringify(data),
    }),

  put: <T>(endpoint: string, data?: unknown, options?: RequestOptions) =>
    request<T>(endpoint, {
      ...options,
      method: "PUT",
      body: data instanceof FormData ? data : JSON.stringify(data),
    }),

  patch: <T>(endpoint: string, data?: unknown, options?: RequestOptions) =>
    request<T>(endpoint, {
      ...options,
      method: "PATCH",
      body: data instanceof FormData ? data : JSON.stringify(data),
    }),

  delete: <T>(endpoint: string, options?: RequestOptions) =>
    request<T>(endpoint, { ...options, method: "DELETE" }),
};
