"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Lock, Users, Settings, Palette, Plus, Edit, Trash2 } from "lucide-react";
import { validateSettingsPassword, setSettingsAccess, getSettingsAccess, clearSettingsAccess } from "@/lib/auth";
import type { Employee, Service, Organization } from "@/types";

export default function SettingsPage() {
  const [hasAccess, setHasAccess] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<"appearance" | "employees" | "services" | "organizations">("appearance");
  const [theme, setTheme] = useState<"light" | "dark" | "black">("light");

  // Моковые данные
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: "1",
      name: "Иван Петров",
      position: "Мойщик",
      salaryType: "percentage",
      salaryRate: 30,
      active: true,
      createdAt: new Date(),
    },
    {
      id: "2",
      name: "Анна Смирнова",
      position: "Детейлер",
      salaryType: "fixedPlusPercentage",
      salaryRate: 20,
      fixedSalary: 15000,
      active: true,
      createdAt: new Date(),
    },
  ]);

  const [services, setServices] = useState<Service[]>([
    {
      id: "1",
      name: "Комплексная мойка",
      price: 1500,
      category: "Мойка",
      duration: 60,
      active: true,
      createdAt: new Date(),
    },
    {
      id: "2",
      name: "Химчистка салона",
      price: 2500,
      category: "Химчистка",
      duration: 120,
      active: true,
      createdAt: new Date(),
    },
  ]);

  const [organizations, setOrganizations] = useState<Organization[]>([
    {
      id: "1",
      name: "ООО Авто+",
      contactPerson: "Петров И.И.",
      phone: "+7 (999) 123-45-67",
      email: "info@autoplus.ru",
      discount: 10,
      active: true,
      createdAt: new Date(),
    },
  ]);

  useEffect(() => {
    setHasAccess(getSettingsAccess());
  }, []);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (validateSettingsPassword(password)) {
      setSettingsAccess(true);
      setHasAccess(true);
      setPassword("");
    } else {
      setError("Неверный пароль");
    }
  };

  const handleLogout = () => {
    clearSettingsAccess();
    setHasAccess(false);
  };

  if (!hasAccess) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="bg-white bg-opacity-95 backdrop-blur-md shadow-lg w-96">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-red-100 rounded-full">
                <Lock className="w-8 h-8 text-red-600" />
              </div>
            </div>
            <CardTitle className="text-xl">Доступ к настройкам</CardTitle>
            <p className="text-gray-600 text-sm">
              Для входа в настройки требуется дополнительный пароль
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <Label htmlFor="settings-password">Пароль</Label>
                <Input
                  id="settings-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Введите пароль"
                  className="mt-1"
                  required
                />
              </div>

              {error && (
                <div className="p-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg">
                  {error}
                </div>
              )}

              <Button type="submit" className="w-full">
                Войти в настройки
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "appearance":
        return (
          <Card className="bg-white bg-opacity-95 backdrop-blur-md shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Palette className="w-5 h-5" />
                <span>Внешний вид</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-base font-medium">Тема оформления</Label>
                <p className="text-sm text-gray-600 mb-3">
                  Выберите тему интерфейса приложения
                </p>
                <Select value={theme} onValueChange={(value: "light" | "dark" | "black") => setTheme(value)}>
                  <SelectTrigger className="w-64">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">☀️ Светлая</SelectItem>
                    <SelectItem value="dark">🌙 Тёмная</SelectItem>
                    <SelectItem value="black">⚫ Чёрная</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="pt-4 border-t">
                <Button>Сохранить настройки</Button>
              </div>
            </CardContent>
          </Card>
        );

      case "employees":
        return (
          <Card className="bg-white bg-opacity-95 backdrop-blur-md shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>Сотрудники</span>
                </CardTitle>
                <Button className="flex items-center space-x-2">
                  <Plus className="w-4 h-4" />
                  <span>Добавить</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Имя</TableHead>
                    <TableHead>Должность</TableHead>
                    <TableHead>Тип оплаты</TableHead>
                    <TableHead>Ставка</TableHead>
                    <TableHead>Статус</TableHead>
                    <TableHead>Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employees.map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell className="font-medium">{employee.name}</TableCell>
                      <TableCell>{employee.position}</TableCell>
                      <TableCell>
                        {employee.salaryType === "percentage" ? "Процент" : "Оклад + %"}
                      </TableCell>
                      <TableCell>
                        {employee.salaryType === "percentage"
                          ? `${employee.salaryRate}%`
                          : `${employee.fixedSalary?.toLocaleString()} ₽ + ${employee.salaryRate}%`
                        }
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          employee.active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}>
                          {employee.active ? "Активен" : "Неактивен"}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        );

      case "services":
        return (
          <Card className="bg-white bg-opacity-95 backdrop-blur-md shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="w-5 h-5" />
                  <span>Услуги</span>
                </CardTitle>
                <Button className="flex items-center space-x-2">
                  <Plus className="w-4 h-4" />
                  <span>Добавить</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Название</TableHead>
                    <TableHead>Категория</TableHead>
                    <TableHead>Цена</TableHead>
                    <TableHead>Длительность</TableHead>
                    <TableHead>Статус</TableHead>
                    <TableHead>Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {services.map((service) => (
                    <TableRow key={service.id}>
                      <TableCell className="font-medium">{service.name}</TableCell>
                      <TableCell>{service.category}</TableCell>
                      <TableCell>{service.price.toLocaleString()} ₽</TableCell>
                      <TableCell>{service.duration} мин</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          service.active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}>
                          {service.active ? "Активна" : "Неактивна"}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        );

      case "organizations":
        return (
          <Card className="bg-white bg-opacity-95 backdrop-blur-md shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>Организации</span>
                </CardTitle>
                <Button className="flex items-center space-x-2">
                  <Plus className="w-4 h-4" />
                  <span>Добавить</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Название</TableHead>
                    <TableHead>Контактное лицо</TableHead>
                    <TableHead>Телефон</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Скидка</TableHead>
                    <TableHead>Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {organizations.map((org) => (
                    <TableRow key={org.id}>
                      <TableCell className="font-medium">{org.name}</TableCell>
                      <TableCell>{org.contactPerson}</TableCell>
                      <TableCell>{org.phone}</TableCell>
                      <TableCell>{org.email}</TableCell>
                      <TableCell>{org.discount}%</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Заголовок */}
      <Card className="bg-white bg-opacity-95 backdrop-blur-md shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-semibold text-gray-900">
                Настройки системы
              </CardTitle>
              <p className="text-gray-600 mt-1">
                Управление параметрами приложения
              </p>
            </div>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="text-red-600 hover:text-red-700"
            >
              Выйти из настроек
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Вкладки */}
      <Card className="bg-white bg-opacity-95 backdrop-blur-md shadow-lg">
        <CardContent className="p-0">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab("appearance")}
              className={`px-6 py-4 text-sm font-medium border-b-2 ${
                activeTab === "appearance"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Внешний вид
            </button>
            <button
              onClick={() => setActiveTab("employees")}
              className={`px-6 py-4 text-sm font-medium border-b-2 ${
                activeTab === "employees"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Сотрудники
            </button>
            <button
              onClick={() => setActiveTab("services")}
              className={`px-6 py-4 text-sm font-medium border-b-2 ${
                activeTab === "services"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Услуги
            </button>
            <button
              onClick={() => setActiveTab("organizations")}
              className={`px-6 py-4 text-sm font-medium border-b-2 ${
                activeTab === "organizations"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Организации
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Содержимое вкладки */}
      {renderTabContent()}
    </div>
  );
}
