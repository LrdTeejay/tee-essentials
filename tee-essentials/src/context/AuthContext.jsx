import { createContext, useContext, useState } from 'react';
import { load, save, remove } from '../utils/storage';
import { hashPassword } from '../utils/helpers';

const AuthContext = createContext(null);

// The session lives in localStorage ("Remember me") or sessionStorage
function readSession() {
  return load('tee_session', null) || load('tee_session', null, sessionStorage);
}

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(() => load('tee_users', []));
  const [user, setUser] = useState(() => {
    const email = readSession();
    return load('tee_users', []).find((u) => u.email === email) || null;
  });

  const persistUsers = (next) => {
    setUsers(next);
    save('tee_users', next);
  };

  function startSession(email, remember) {
    remove('tee_session');
    save('tee_session', email, remember ? localStorage : sessionStorage);
  }

  async function signup({ name, email, country, password }) {
    const cleanEmail = email.trim().toLowerCase();
    if (users.some((u) => u.email === cleanEmail)) {
      throw new Error('An account with this email already exists. Log in instead.');
    }
    const newUser = {
      name: name.trim(),
      email: cleanEmail,
      country,
      phone: '',
      address: { line1: '', city: '', state: '', postcode: '' },
      passwordHash: await hashPassword(password),
      createdAt: new Date().toISOString(),
    };
    persistUsers([...users, newUser]);
    startSession(cleanEmail, true);
    setUser(newUser);
    return newUser;
  }

  async function login({ email, password, remember }) {
    const cleanEmail = email.trim().toLowerCase();
    const found = users.find((u) => u.email === cleanEmail);
    if (!found || found.passwordHash !== (await hashPassword(password))) {
      throw new Error("That email and password don't match an account on this device.");
    }
    startSession(cleanEmail, remember);
    setUser(found);
    return found;
  }

  function logout() {
    remove('tee_session');
    setUser(null);
  }

  function updateProfile(fields) {
    const updated = { ...user, ...fields };
    persistUsers(users.map((u) => (u.email === user.email ? updated : u)));
    setUser(updated);
  }

  return (
    <AuthContext.Provider value={{ user, signup, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
