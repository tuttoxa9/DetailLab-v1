"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart3, TrendingUp, Users, DollarSign, Download, Calendar } from "lucide-react";
import { format, startOfMonth, endOfMonth, subMonths } from "date-fns";
import { ru } from "date-fns/locale";

type ReportType = "revenue" | "employees" | "services" | "clients";

export default function ReportsPage() {
  const [reportType, setReportType] = useState<ReportType>("revenue");
  const [period, setPeriod] = useState<string>("current-month");

  const getPeriodDates = (periodType: string) => {
    const now = new Date();
    switch (periodType) {
      case "current-month":
        return {
          start: startOfMonth(now),
          end: endOfMonth(now),
          label: format(now, "MMMM yyyy", { locale: ru })
        };
      case "last-month":
        const lastMonth = subMonths(now, 1);
        return {
          start: startOfMonth(lastMonth),
          end: endOfMonth(lastMonth),
          label: format(lastMonth, "MMMM yyyy", { locale: ru })
        };
      default:
        return {
          start: startOfMonth(now),
          end: endOfMonth(now),
          label: format(now, "MMMM yyyy", { locale: ru })
        };
    }
  };

  const currentPeriod = getPeriodDates(period);

  // Моковые данные для отчетов
  const mockRevenueData = [
    { date: "2024-01-01", revenue: 45000, orders: 23 },
    { date: "2024-01-02", revenue: 52000, orders: 28 },
    { date: "2024-01-03", revenue: 38000, orders: 19 },
  ];

  const mockEmployeeData = [
    { name: "Иван Петров", totalRevenue: 150000, totalSalary: 45000, ordersCount: 78 },
    { name: "Анна Смирнова", totalRevenue: 180000, totalSalary: 54000, ordersCount: 92 },
    { name: "Сергей Козлов", totalRevenue: 120000, totalSalary: 36000, ordersCount: 65 },
  ];

  const mockServiceData = [
    { name: "Комплексная мойка", count: 145, revenue: 217500, avgPrice: 1500 },
    { name: "Химчистка салона", count: 78, revenue: 195000, avgPrice: 2500 },
    { name: "Полировка кузова", count: 32, revenue: 128000, avgPrice: 4000 },
  ];

  const renderReportContent = () => {
    switch (reportType) {
      case "revenue":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-white/60 backdrop-blur-xl shadow-lg border-none">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-700 text-shadow">Общая выручка</p>
                      <p className="text-2xl font-bold text-gray-900 text-shadow">
                        {mockRevenueData.reduce((sum, item) => sum + item.revenue, 0).toLocaleString()} ₽
                      </p>
                    </div>
                    <DollarSign className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/60 backdrop-blur-xl shadow-lg border-none">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-700 text-shadow">Средний чек</p>
                      <p className="text-2xl font-bold text-gray-900 text-shadow">
                        {Math.round(
                          mockRevenueData.reduce((sum, item) => sum + item.revenue, 0) /
                          mockRevenueData.reduce((sum, item) => sum + item.orders, 0)
                        ).toLocaleString()} ₽
                      </p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/60 backdrop-blur-xl shadow-lg border-none">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-700 text-shadow">Заказов</p>
                      <p className="text-2xl font-bold text-gray-900 text-shadow">
                        {mockRevenueData.reduce((sum, item) => sum + item.orders, 0)}
                      </p>
                    </div>
                    <BarChart3 className="w-8 h-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-white/60 backdrop-blur-xl shadow-lg border-none">
              <CardHeader>
                <CardTitle className="text-shadow">Ежедневная выручка</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Дата</TableHead>
                      <TableHead>Выручка</TableHead>
                      <TableHead>Заказов</TableHead>
                      <TableHead>Средний чек</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockRevenueData.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{format(new Date(item.date), "d MMMM", { locale: ru })}</TableCell>
                        <TableCell className="font-medium">{item.revenue.toLocaleString()} ₽</TableCell>
                        <TableCell>{item.orders}</TableCell>
                        <TableCell>{Math.round(item.revenue / item.orders).toLocaleString()} ₽</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        );

      case "employees":
        return (
          <Card className="bg-white/60 backdrop-blur-xl shadow-lg border-none">
            <CardHeader>
              <CardTitle className="text-shadow">Отчет по сотрудникам</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Сотрудник</TableHead>
                    <TableHead>Заказов</TableHead>
                    <TableHead>Общая выручка</TableHead>
                    <TableHead>Зарплата</TableHead>
                    <TableHead>Эффективность</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockEmployeeData.map((employee, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{employee.name}</TableCell>
                      <TableCell>{employee.ordersCount}</TableCell>
                      <TableCell>{employee.totalRevenue.toLocaleString()} ₽</TableCell>
                      <TableCell className="text-green-600">
                        {employee.totalSalary.toLocaleString()} ₽
                      </TableCell>
                      <TableCell>
                        {Math.round((employee.totalRevenue / employee.ordersCount)).toLocaleString()} ₽/заказ
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
          <Card className="bg-white/60 backdrop-blur-xl shadow-lg border-none">
            <CardHeader>
              <CardTitle className="text-shadow">Отчет по услугам</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Услуга</TableHead>
                    <TableHead>Количество</TableHead>
                    <TableHead>Выручка</TableHead>
                    <TableHead>Средняя цена</TableHead>
                    <TableHead>Доля в выручке</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockServiceData.map((service, index) => {
                    const totalRevenue = mockServiceData.reduce((sum, s) => sum + s.revenue, 0);
                    const share = (service.revenue / totalRevenue * 100).toFixed(1);

                    return (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{service.name}</TableCell>
                        <TableCell>{service.count}</TableCell>
                        <TableCell>{service.revenue.toLocaleString()} ₽</TableCell>
                        <TableCell>{service.avgPrice.toLocaleString()} ₽</TableCell>
                        <TableCell>{share}%</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        );

      case "clients":
        return (
          <Card className="bg-white/60 backdrop-blur-xl shadow-lg border-none">
            <CardHeader>
              <CardTitle className="text-shadow">Отчет по клиентам</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500 text-shadow">
                Отчет по клиентам в разработке
              </div>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Заголовок и управление */}
      <Card className="bg-white/60 backdrop-blur-xl shadow-lg border-none">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-semibold text-gray-900 text-shadow-lg">
                Отчёты и аналитика
              </CardTitle>
              <p className="text-gray-700 mt-1 text-shadow">
                Период: {currentPeriod.label}
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                className="flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Экспорт</span>
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Фильтры */}
      <Card className="bg-white/60 backdrop-blur-xl shadow-lg border-none">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <label className="text-sm font-medium text-gray-700 mb-2 block text-shadow">
                Тип отчета
              </label>
              <Select value={reportType} onValueChange={(value: ReportType) => setReportType(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="revenue">Выручка</SelectItem>
                  <SelectItem value="employees">Сотрудники</SelectItem>
                  <SelectItem value="services">Услуги</SelectItem>
                  <SelectItem value="clients">Клиенты</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1">
              <label className="text-sm font-medium text-gray-700 mb-2 block text-shadow">
                Период
              </label>
              <Select value={period} onValueChange={setPeriod}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="current-month">Текущий месяц</SelectItem>
                  <SelectItem value="last-month">Прошлый месяц</SelectItem>
                  <SelectItem value="quarter">Квартал</SelectItem>
                  <SelectItem value="year">Год</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Содержание отчета */}
      {renderReportContent()}
    </div>
  );
}
