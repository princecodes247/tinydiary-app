import { API_URL, SESSION_KEY } from '@/constants';
import { useStorageState } from '@/hooks/useStorageState';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useContext, createContext, type PropsWithChildren } from 'react';

const AuthContext = createContext<{
  signIn: (data: {
    email: string;
    password: string;
  }) => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState(SESSION_KEY);
  const mutation = useMutation({
    mutationFn: async (data: {
      email: string;
      password: string;
    }) => {
      const res = await axios.post(API_URL + '/auth/login', data);
      console.log({res, data})
      return res.data
    },
    onSuccess: (data) => {
      setSession(data.token);
      // setSession(JSON.stringify(data));
    },
    onError: (err) => {
      console.log({err})
    }
  })
  return (
    <AuthContext.Provider
      value={{
        signIn: ({
          email,
          password,
        }) => {
          mutation.mutate({email, password})
        },
        signOut: () => {
          setSession(null);
        },
        session,
        isLoading,
      }}>
      {children}
    </AuthContext.Provider>
  );
}
