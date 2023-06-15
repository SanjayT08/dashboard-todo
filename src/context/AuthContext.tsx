import React, { createContext, useState, useEffect, ReactNode } from "react";

type User = {
  id: string;
  username: string;
  // Add other properties according to your user data structure
};

interface AuthContextData {
  isAuthenticated: boolean;
  user: User | null;
  login: (username: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextData>({
  isAuthenticated: false,
  user: null,
  login: () => {},
  logout: () => {},
});

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Add your authentication check logic here
    // Example: Check if the user is already logged in and set the state accordingly

    // Replace the following example logic with your own authentication check
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (username: string, password: string) => {
    // Add your login logic here
    // Example: Perform API call to authenticate the user and set the state accordingly

    // Replace the following example logic with your own login logic
    const loggedInUser = {
      id: "1",
      username: username,
    };
    setIsAuthenticated(true);
    setUser(loggedInUser);
    localStorage.setItem("user", JSON.stringify(loggedInUser));
  };

  const handleLogout = () => {
    // Add your logout logic here
    // Example: Perform necessary actions to log out the user and clear the state

    // Replace the following example logic with your own logout logic
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login: handleLogin, logout: handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
