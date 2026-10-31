import { apiClient } from "@/lib/api-client";
import { Book as ApiBook } from "@/types/api";
import { BOOKS as LOCAL_BOOKS, Book as LocalBook } from "@/data/books";

export interface FetchBooksParams {
  search?: string;
  category?: string;
  language?: string;
  page?: number;
  limit?: number;
}

export interface BooksResponse {
  books: ApiBook[];
  total: number;
  page: number;
  totalPages: number;
  isFallback?: boolean;
}

/**
 * Adapter converting local books to ApiBook format for seamless fallback
 */
function mapLocalToApiBook(local: LocalBook): ApiBook {
  return {
    id: local.id,
    title: local.title,
    sinhalaTitle: local.sinhalaTitle,
    slug: local.id,
    isbn: null,
    author: local.author,
    publisher: "Shastraloka Heritage Press",
    price: local.price,
    discountPrice: local.originalPrice > local.price ? local.price : null,
    stock: local.inStock !== false ? 12 : 0,
    coverUrl: local.coverImage,
    samplePdfUrl: "https://assets.shastraloka.lk/samples/sample-folio.pdf",
    language:
      local.language === "Sinhala" || local.language === "English" || local.language === "Tamil"
        ? local.language
        : "English",
    pages: local.pages,
    publishedYear: 2024,
    categoryId: local.category,
    categoryName: local.category,
    isFeatured: !!local.featured,
    createdAt: new Date().toISOString(),
  };
}

export async function getBooks(params: FetchBooksParams = {}): Promise<BooksResponse> {
  try {
    const data = await apiClient.get<{ books: ApiBook[]; total?: number; page?: number; totalPages?: number }>(
      "/books",
      { params: params as Record<string, string | number | boolean | undefined> }
    );
    if (data && Array.isArray(data.books)) {
      return {
        books: data.books,
        total: data.total ?? data.books.length,
        page: data.page ?? 1,
        totalPages: data.totalPages ?? 1,
        isFallback: false,
      };
    }
  } catch (error) {
    console.warn("Backend API offline or unreachable, using local bookstore catalog fallback:", error);
  }

  // Fallback to local books
  let filtered = [...LOCAL_BOOKS];

  if (params.search) {
    const q = params.search.toLowerCase();
    filtered = filtered.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        (b.sinhalaTitle && b.sinhalaTitle.toLowerCase().includes(q))
    );
  }

  if (params.category && params.category !== "All" && params.category !== "All Books") {
    filtered = filtered.filter((b) => b.category.toLowerCase().includes(params.category!.toLowerCase()));
  }

  if (params.language && params.language !== "All") {
    filtered = filtered.filter((b) => b.language.toLowerCase() === params.language!.toLowerCase());
  }

  const mapped = filtered.map(mapLocalToApiBook);
  const page = params.page || 1;
  const limit = params.limit || 20;
  const start = (page - 1) * limit;

  return {
    books: mapped.slice(start, start + limit),
    total: mapped.length,
    page,
    totalPages: Math.ceil(mapped.length / limit) || 1,
    isFallback: true,
  };
}

export async function getBookById(idOrSlug: string): Promise<ApiBook | null> {
  try {
    const book = await apiClient.get<ApiBook>(`/books/${idOrSlug}`);
    if (book && book.id) return book;
  } catch {
    // fallback
  }

  const local = LOCAL_BOOKS.find((b) => b.id === idOrSlug);
  return local ? mapLocalToApiBook(local) : null;
}
