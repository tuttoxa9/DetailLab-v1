import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./firebase";

// Основная аутентификация
export const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user, error: null };
  } catch (error: unknown) {
    return { user: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    return { error: null };
  } catch (error: unknown) {
    return { error: error instanceof Error ? error.message : 'Unknown error' };
  }
};

// Второй уровень защиты для настроек (hardcoded пароль)
const SETTINGS_PASSWORD = "wash8";

export const validateSettingsPassword = (password: string): boolean => {
  return password === SETTINGS_PASSWORD;
};

// Хранение состояния доступа к настройкам в sessionStorage
export const setSettingsAccess = (hasAccess: boolean) => {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('settingsAccess', hasAccess.toString());
  }
};

export const getSettingsAccess = (): boolean => {
  if (typeof window !== 'undefined') {
    return sessionStorage.getItem('settingsAccess') === 'true';
  }
  return false;
};

export const clearSettingsAccess = () => {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem('settingsAccess');
  }
};
