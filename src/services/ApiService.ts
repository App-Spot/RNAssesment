type CreateUserPayload = { name: string ; email: string; password: string };

export interface ApiService {
  createUser(data: CreateUserPayload): Promise<any>;
}

class JSONPlaceholderApiService implements ApiService {
  async createUser(data: CreateUserPayload): Promise<any> {
    const response = await fetch('https://jsonplaceholder.typicode.com/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  }
}

export const apiService = new JSONPlaceholderApiService();
