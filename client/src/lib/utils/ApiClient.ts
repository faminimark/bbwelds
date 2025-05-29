import { getCookie } from ".";
import { SERVER_URL } from '$env/static/private';

class ApiClient {
    private baseUrl: string;
    private headers: Record<string, string>;
    
  constructor(baseUrl: string, headers: Record<string, string> = {}, token: string) {
    this.baseUrl = baseUrl;
    this.headers = {...headers, 'x-auth-token': `Authorization ${token}`};
  }

  /**
   * Performs a GET request to the specified endpoint.
   * @param endpoint The API endpoint to request.
   * @param requestHeaders Additional headers for this specific request.
   * @returns A Promise that resolves with the response data.  Uses 'any' to avoid overly complex type definitions for this example.  In a real application, you'd use a more specific type.
   */
  async get(endpoint: string, requestHeaders: Record<string, string> = {}): Promise<any> {
    const url = `${this.baseUrl}/${endpoint}`;
    const allHeaders = { ...this.headers, ...requestHeaders }; // Combine default and request headers
    const response = await fetch(url, {
      method: 'GET',
      headers: allHeaders,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json(); // Assumes the response is JSON.  You might need to handle other content types.
  }

  /**
   * Performs a POST request to the specified endpoint.
   * @param endpoint The API endpoint to request.
   * @param data The data to send in the request body.  Uses 'any' for simplicity, but in a real app, define a specific type.
   * @param requestHeaders Additional headers for this specific request.
   * @returns A Promise that resolves with the response data.
   */
  async post(endpoint: string, data: any, requestHeaders: Record<string, string> = {}): Promise<any> {
    const url = `${this.baseUrl}/${endpoint}`;
    const allHeaders = { ...this.headers, ...requestHeaders, 'Content-Type': 'application/json' }; //  Ensure Content-Type is set for POST
    const response = await fetch(url, {
      method: 'POST',
      headers: allHeaders,
      body: JSON.stringify(data), // Convert data to JSON
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }

  /**
   * Performs a PUT request to the specified endpoint.
   * @param endpoint The API endpoint to request.
   * @param data The data to send in the request body.
   * @param requestHeaders Additional headers for this specific request.
   * @returns A Promise that resolves with the response data.
   */
  async put(endpoint: string, data: any, requestHeaders: Record<string, string> = {}): Promise<any> {
    const url = `${this.baseUrl}/${endpoint}`;
    const allHeaders = { ...this.headers, ...requestHeaders, 'Content-Type': 'application/json' };
    const response = await fetch(url, {
      method: 'PUT',
      headers: allHeaders,
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }

  /**
   * Performs a DELETE request to the specified endpoint.
   * @param endpoint The API endpoint to request.
   * @param requestHeaders Additional headers for this specific request.
   * @returns A Promise that resolves with the response data.
   */
  async delete(endpoint: string, requestHeaders: Record<string, string> = {}): Promise<any> {
    const url = `${this.baseUrl}/${endpoint}`;
    const allHeaders = { ...this.headers, ...requestHeaders };
    const response = await fetch(url, {
      method: 'DELETE',
      headers: allHeaders,
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }
}


const apiClient = new ApiClient(SERVER_URL, {}, getCookie('auth-token') ?? '')
export default apiClient;