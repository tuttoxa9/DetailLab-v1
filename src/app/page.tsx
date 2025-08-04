"use client";

import { useState, useEffect } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Preloader from "@/components/Preloader";
import LoginModal from "@/components/LoginModal";
import Desktop from "@/components/Desktop";
import { Toaster } from "@/components/ui/sonner";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [showPreloader, setShowPreloader] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setAuthChecked(true);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handlePreloaderComplete = () => {
    setShowPreloader(false);
  };

  const handleLoginSuccess = () => {
    // Пользователь будет обновлен через onAuthStateChanged
  };

  if (showPreloader) {
    return <Preloader onComplete={handlePreloaderComplete} />;
  }

  if (loading || !authChecked) {
    return (
      <div className="fixed inset-0 bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen">
      {user ? (
        <Desktop />
      ) : (
        <LoginModal onSuccess={handleLoginSuccess} />
      )}
      <Toaster />
    </main>
  );
}
