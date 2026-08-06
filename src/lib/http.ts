export class HttpError extends Error {
  status?: number;
  body?: unknown;
  url?: string;

  constructor(message: string, status?: number, body?: unknown, url?: string) {
    super(message);
    this.name = "HttpError";
    this.status = status;
    this.body = body;
    this.url = url;
  }
}

export async function fetchJson(
  url: string,
  init?: RequestInit,
  timeoutMs = 8000,
) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { signal: controller.signal, ...init });
    const text = await res.text();
    let data: unknown = text;
    try {
      data = text ? JSON.parse(text) : undefined;
    } catch {
      data = text;
    }

    if (!res.ok) {
      const errorMessage =
        (data as { message?: string })?.message ||
        `HTTP ${res.status} when fetching ${url}`;
      throw new HttpError(errorMessage, res.status, data, url);
    }
    return data;
  } catch (err: unknown) {
    const error = err as { name?: string; message?: string };
    if (error.name === "AbortError") {
      throw new HttpError(
        `Request timed out after ${timeoutMs}ms: ${url}`,
        0,
        null,
        url,
      );
    }
    if (err instanceof HttpError) throw err;
    throw new HttpError(
      error?.message ?? String(err),
      undefined,
      undefined,
      url,
    );
  } finally {
    clearTimeout(timer);
  }
}

export async function tryCandidates(
  urls: string[],
  init?: RequestInit,
  timeoutMs?: number,
) {
  let lastErr: unknown = null;
  for (const url of urls) {
    try {
      const result = await fetchJson(url, init, timeoutMs ?? 8000);
      return result;
    } catch (err) {
      lastErr = err;
      if (
        err instanceof HttpError &&
        err.status &&
        err.status >= 400 &&
        err.status < 600
      ) {
        throw err;
      }
    }
  }
  if (lastErr instanceof HttpError) throw lastErr;
  throw new HttpError(String(lastErr ?? "No candidate succeeded"));
}

const httpUtils = { HttpError, fetchJson, tryCandidates };
export default httpUtils;
