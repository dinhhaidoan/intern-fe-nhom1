export interface User {
  id: string;
  username: string;
  email: string;
  role: 'user' | 'admin';
  name: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}