"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Plus, DollarSign, Users, TrendingUp } from "lucide-react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import type { ServiceRecord } from "@/types";

export default function HomePage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedShift, setSelectedShift] = useState<"all" | "morning" | "evening">("all");
  const [records, setRecords] = useState<ServiceRecord[]>([]);

  // Моковые данные для демонстрации
  useEffect(() => {
    const mockRecords: ServiceRecord[] = [
      {
        id: "1",
        date: new Date(),
        employeeId: "emp1",
        employeeName: "Иван Петров",
        serviceId: "svc1",
        serviceName: "Комплексная мойка",
        servicePrice: 1500,
        clientType: "individual",
        clientName: "Частный клиент",
        discount: 0,
        finalPrice: 1500,
        employeeSalary: 450,
        shift: "morning",
        createdAt: new Date(),
      },
      {
        id: "2",
        date: new Date(),
        employeeId: "emp2",
        employeeName: "Анна Смирнова",
        serviceId: "svc2",
        serviceName: "Химчистка салона",
        servicePrice: 2500,
        clientType: "organization",
        clientName: "ООО Авто+",
        organizationId: "org1",
        discount: 10,
        finalPrice: 2250,
        employeeSalary: 675,
        shift: "morning",
        createdAt: new Date(),
      },
    ];
    setRecords(mockRecords);
  }, [selectedDate]);

  const filteredRecords = records.filter(record => {
    if (selectedShift === "all") return true;
    return record.shift === selectedShift;
  });

  const totalRevenue = filteredRecords.reduce((sum, record) => sum + record.finalPrice, 0);
  const totalSalaries = filteredRecords.reduce((sum, record) => sum + record.employeeSalary, 0);
  const uniqueEmployees = new Set(filteredRecords.map(record => record.employeeId)).size;

  const handleExport = async () => {
    const { exportToWord } = await import("@/lib/export");
    await exportToWord(filteredRecords, selectedDate);
  };

  return (
    <div className="space-y-6">
      {/* Заголовок и управление */}
      <Card className="bg-white bg-opacity-95 backdrop-blur-md shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-semibold text-gray-900">
                Ведомость ежедневная
              </CardTitle>
              <p className="text-gray-600 mt-1">
                {format(selectedDate, "d MMMM yyyy", { locale: ru })}
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                onClick={handleExport}
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700"
              >
                <Download className="w-4 h-4" />
                <span>Экспорт</span>
              </Button>
              <Button className="flex items-center space-x-2 bg-green-600 hover:bg-green-700">
                <Plus className="w-4 h-4" />
                <span>Добавить</span>
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Календарь и управление */}
        <div className="space-y-4">
          <Card className="bg-white bg-opacity-95 backdrop-blur-md shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Выбор даты</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                className="rounded-md border"
              />
            </CardContent>
          </Card>

          <Card className="bg-white bg-opacity-95 backdrop-blur-md shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Смена</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={selectedShift} onValueChange={(value: string) => setSelectedShift(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все смены</SelectItem>
                  <SelectItem value="morning">Утренняя</SelectItem>
                  <SelectItem value="evening">Вечерняя</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </div>

        {/* Основной контент */}
        <div className="lg:col-span-3 space-y-6">
          {/* Статистика */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-white bg-opacity-95 backdrop-blur-md shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Выручка</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {totalRevenue.toLocaleString()} ₽
                    </p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-full">
                    <DollarSign className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white bg-opacity-95 backdrop-blur-md shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Зарплаты</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {totalSalaries.toLocaleString()} ₽
                    </p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-full">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white bg-opacity-95 backdrop-blur-md shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Сотрудников</p>
                    <p className="text-2xl font-bold text-gray-900">{uniqueEmployees}</p>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-full">
                    <TrendingUp className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Таблица записей */}
          <Card className="bg-white bg-opacity-95 backdrop-blur-md shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Выполненные работы</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Сотрудник</TableHead>
                    <TableHead>Услуга</TableHead>
                    <TableHead>Клиент</TableHead>
                    <TableHead>Цена</TableHead>
                    <TableHead>Скидка</TableHead>
                    <TableHead>Итого</TableHead>
                    <TableHead>Зарплата</TableHead>
                    <TableHead>Смена</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">{record.employeeName}</TableCell>
                      <TableCell>{record.serviceName}</TableCell>
                      <TableCell>{record.clientName}</TableCell>
                      <TableCell>{record.servicePrice.toLocaleString()} ₽</TableCell>
                      <TableCell>{record.discount}%</TableCell>
                      <TableCell className="font-medium">
                        {record.finalPrice.toLocaleString()} ₽
                      </TableCell>
                      <TableCell className="text-green-600 font-medium">
                        {record.employeeSalary.toLocaleString()} ₽
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            record.shift === "morning"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {record.shift === "morning" ? "Утро" : "Вечер"}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {filteredRecords.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  Нет записей за выбранную дату и смену
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
