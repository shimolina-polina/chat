import { User } from 'firebase/auth';

export default interface IAuthState {
    user: User | null;
    isLoading: boolean;
    error: string | null;
  }
  