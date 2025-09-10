/**
 * Defines the structure for error responses received from the API.
 * This helps with consistent error handling and message extraction.
 */
export interface ApiErrorResponse {
  statusCode?: number;
  statusMessage?: string;
  message?: string;
  error?: string;
  fatal?: boolean;
  [key: string]: unknown;
}