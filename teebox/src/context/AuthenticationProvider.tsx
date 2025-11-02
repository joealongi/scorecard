import * as React from "react";

import type { User } from "../types/UserTypes";

interface AuthenticationContext {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const AuthenticationContext = React.createContext<AuthenticationContext>(
  {
    user: null,
    setUser: () => {},
  }
);

export const AuthenticationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = React.useState<User | null>(null);

  return (
    <AuthenticationContext.Provider value={{ user, setUser }}>
      {children}
    </AuthenticationContext.Provider>
  );
};
