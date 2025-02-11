export interface AuthState {
  user: null | {
    email: string;
    uid: string;
  };
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export interface SignInPayload {
  email: string;
  password: string;
}