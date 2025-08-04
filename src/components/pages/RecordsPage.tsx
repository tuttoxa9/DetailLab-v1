"use client";

import { useState, useEffect } from "react";
import {
  collection,
  query,
  onSnapshot,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, List, CalendarDays, Clock, Phone, User } from "lucide-react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import type { Appointment } from "@/types";

type ViewMode = "list" | "calendar";

export default function RecordsPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const q = query(collection(db, "appointments"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const appointmentsData: Appointment[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        appointmentsData.push({
          id: doc.id,
          ...data,
          date: (data.date as Timestamp).toDate(),
          createdAt: (data.createdAt as Timestamp).toDate(),
        } as Appointment);
      });
      setAppointments(appointmentsData);
    });

    return () => unsubscribe();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "scheduled":
        return "Запланировано";
      case "completed":
        return "Выполнено";
      case "cancelled":
        return "Отменено";
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white bg-opacity-95 backdrop-blur-md shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-semibold text-gray-900">
                Записи на мойку
              </CardTitle>
              <p className="text-gray-600 mt-1">
                Управление предварительными записями клиентов
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="flex items-center space-x-2"
                >
                  <List className="w-4 h-4" />
                  <span>Список</span>
                </Button>
                <Button
                  variant={viewMode === "calendar" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("calendar")}
                  className="flex items-center space-x-2"
                >
                  <CalendarDays className="w-4 h-4" />
                  <span>Календарь</span>
                </Button>
              </div>

              <Button className="flex items-center space-x-2 bg-green-600 hover:bg-green-700">
                <Plus className="w-4 h-4" />
                <span>Новая запись</span>
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {viewMode === "list" ? (
        <Card className="bg-white bg-opacity-95 backdrop-blur-md shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg">Список записей</CardTitle>
            <p className="text-sm text-gray-600">
              {format(selectedDate, "d MMMM yyyy", { locale: ru })}
            </p>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Время</TableHead>
                  <TableHead>Клиент</TableHead>
                  <TableHead>Телефон</TableHead>
                  <TableHead>Услуга</TableHead>
                  <TableHead>Сотрудник</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead>Примечания</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {appointments
                  .filter(
                    (appointment) =>
                      appointment.date.toDateString() === selectedDate.toDateString()
                  )
                  .map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span>{appointment.time}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <User className="w-4 h-4 text-gray-500" />
                          <span>{appointment.clientName}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4 text-gray-500" />
                          <span>{appointment.clientPhone}</span>
                        </div>
                      </TableCell>
                      <TableCell>{appointment.serviceName}</TableCell>
                      <TableCell>{appointment.employeeName}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            appointment.status
                          )}`}
                        >
                          {getStatusText(appointment.status)}
                        </span>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">
                        {appointment.notes || "—"}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="bg-white bg-opacity-95 backdrop-blur-md shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Календарь записей</CardTitle>
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

          <div className="lg:col-span-2">
            <Card className="bg-white bg-opacity-95 backdrop-blur-md shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">
                  Записи на {format(selectedDate, "d MMMM yyyy", { locale: ru })}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {appointments
                    .filter(
                      (appointment) =>
                        appointment.date.toDateString() ===
                        selectedDate.toDateString()
                    )
                    .map((appointment) => (
                      <div
                        key={appointment.id}
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center space-x-3">
                              <span className="font-semibold text-lg">
                                {appointment.time}
                              </span>
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                  appointment.status
                                )}`}
                              >
                                {getStatusText(appointment.status)}
                              </span>
                            </div>

                            <div className="text-gray-900">
                              <p className="font-medium">{appointment.clientName}</p>
                              <p className="text-sm text-gray-600">
                                {appointment.clientPhone}
                              </p>
                            </div>

                            <div className="text-sm">
                              <p>
                                <span className="font-medium">Услуга:</span>{" "}
                                {appointment.serviceName}
                              </p>
                              <p>
                                <span className="font-medium">Мастер:</span>{" "}
                                {appointment.employeeName}
                              </p>
                              {appointment.notes && (
                                <p>
                                  <span className="font-medium">Примечания:</span>{" "}
                                  {appointment.notes}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              Редактировать
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className={
                                appointment.status === "completed"
                                  ? "text-red-600 hover:text-red-700"
                                  : "text-green-600 hover:text-green-700"
                              }
                            >
                              {appointment.status === "completed"
                                ? "Отменить"
                                : "Выполнено"}
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}

                  {appointments.filter(
                    (appointment) =>
                      appointment.date.toDateString() ===
                      selectedDate.toDateString()
                  ).length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      Нет записей на выбранную дату
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
