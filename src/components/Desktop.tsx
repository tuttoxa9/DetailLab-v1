"use client";

import { useState } from "react";
import { logout } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { LogOut, Settings, FileText, Calendar, BarChart3 } from "lucide-react";
import HomePage from "./pages/HomePage";
import RecordsPage from "./pages/RecordsPage";
import ReportsPage from "./pages/ReportsPage";
import SettingsPage from "./pages/SettingsPage";

type PageType = "home" | "records" | "reports" | "settings";

export default function Desktop() {
  const [currentPage, setCurrentPage] = useState<PageType>("home");

  const handleLogout = async () => {
    await logout();
    window.location.reload();
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage />;
      case "records":
        return <RecordsPage />;
      case "reports":
        return <ReportsPage />;
      case "settings":
        return <SettingsPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: "url('/background.jpg')"
      }}
    >
      {/* Overlay для лучшей читаемости */}
      <div className="absolute inset-0 bg-white bg-opacity-50 backdrop-blur-xl"></div>

      {/* Верхняя панель меню в стиле macOS */}
      <div className="relative z-10 bg-white bg-opacity-80 backdrop-blur-md border-b border-gray-200">
        <div className="px-6 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-1">
            {/* Кнопки управления окном */}
            <div className="flex space-x-2">
              {/* <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div> */}
            </div>
            <div className="ml-4 font-semibold text-gray-800">Detail Lab</div>
          </div>

          <nav className="flex items-center space-x-4">
            <Button
              variant={currentPage === "home" ? "default" : "ghost"}
              size="sm"
              onClick={() => setCurrentPage("home")}
              className="flex items-center space-x-2"
            >
              <FileText className="w-4 h-4" />
              <span>Ведомость</span>
            </Button>

            <Button
              variant={currentPage === "records" ? "default" : "ghost"}
              size="sm"
              onClick={() => setCurrentPage("records")}
              className="flex items-center space-x-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Записи</span>
            </Button>

            <Button
              variant={currentPage === "reports" ? "default" : "ghost"}
              size="sm"
              onClick={() => setCurrentPage("reports")}
              className="flex items-center space-x-2"
            >
              <BarChart3 className="w-4 h-4" />
              <span>Отчёты</span>
            </Button>

            <Button
              variant={currentPage === "settings" ? "default" : "ghost"}
              size="sm"
              onClick={() => setCurrentPage("settings")}
              className="flex items-center space-x-2"
            >
              <Settings className="w-4 h-4" />
              <span>Настройки</span>
            </Button>

            <div className="w-px h-6 bg-gray-300"></div>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="flex items-center space-x-2 text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <LogOut className="w-4 h-4" />
              <span>Выход</span>
            </Button>
          </nav>
        </div>
      </div>

      {/* Основной контент */}
      <div className="relative z-10 p-6">
        {renderPage()}
      </div>
    </div>
  );
}
