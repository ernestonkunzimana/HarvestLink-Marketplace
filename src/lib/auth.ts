import { User, UserRole } from '@/types';
import { mockUsers } from './mock-data';

export class AuthService {
  private static instance: AuthService;
  private currentUser: User | null = null;

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async login(phone: string, otp: string): Promise<User | null> {
    // Mock OTP validation (always accept "123456")
    if (otp !== '123456') {
      throw new Error('Invalid OTP');
    }

    // Find user by phone
    const user = mockUsers.find(u => u.phone === phone);
    if (!user) {
      throw new Error('User not found');
    }

    this.currentUser = user;
    if (typeof window !== 'undefined') {
      localStorage.setItem('currentUser', JSON.stringify(user));
    }
    return user;
  }

  async signup(userData: {
    name: string;
    email: string;
    phone: string;
    role: UserRole;
    organization?: string;
  }): Promise<User> {
    const newUser: User = {
      id: Date.now().toString(),
      ...userData
    };

    // In a real app, this would save to backend
    this.currentUser = newUser;
    if (typeof window !== 'undefined') {
      localStorage.setItem('currentUser', JSON.stringify(newUser));
    }
    return newUser;
  }

  getCurrentUser(): User | null {
    if (typeof window === 'undefined') {
      // Server-side rendering - return null
      return null;
    }
    
    if (!this.currentUser) {
      const stored = localStorage.getItem('currentUser');
      if (stored) {
        this.currentUser = JSON.parse(stored);
      }
    }
    return this.currentUser;
  }

  logout(): void {
    this.currentUser = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('currentUser');
    }
  }

  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }
}

export const authService = AuthService.getInstance();