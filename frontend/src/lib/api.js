/**
 * API client — wraps fetch with base URL and auth headers.
 * For MVP, falls back to mock data when API is unavailable.
 */

import { API_URL } from "./constants";

class ApiClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async request(path, options = {}) {
    const url = `${this.baseUrl}${path}`;
    const headers = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    // Add auth token if available
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("vibes_user");
      if (user) {
        headers["Authorization"] = `Bearer mock-token`;
      }
    }

    try {
      const response = await fetch(url, { ...options, headers });
      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.detail || `API error: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.warn(`API request failed: ${path}`, error.message);
      throw error;
    }
  }

  get(path) {
    return this.request(path, { method: "GET" });
  }

  post(path, body) {
    return this.request(path, { method: "POST", body: JSON.stringify(body) });
  }

  patch(path, body) {
    return this.request(path, { method: "PATCH", body: JSON.stringify(body) });
  }

  delete(path) {
    return this.request(path, { method: "DELETE" });
  }
}

export const api = new ApiClient(API_URL);
