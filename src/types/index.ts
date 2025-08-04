export interface Employee {
  id: string;
  name: string;
  position: string;
  salaryType: 'percentage' | 'fixedPlusPercentage';
  salaryRate: number; // процент или фиксированная ставка
  fixedSalary?: number; // для типа fixedPlusPercentage
  active: boolean;
  createdAt: Date;
}

export interface Service {
  id: string;
  name: string;
  price: number;
  category: string;
  duration: number; // в минутах
  active: boolean;
  createdAt: Date;
}

export interface Organization {
  id: string;
  name: string;
  contactPerson: string;
  phone: string;
  email: string;
  discount: number; // процент скидки
  active: boolean;
  createdAt: Date;
}

export interface ServiceRecord {
  id: string;
  date: Date;
  employeeId: string;
  employeeName: string;
  serviceId: string;
  serviceName: string;
  servicePrice: number;
  clientType: 'individual' | 'organization';
  clientName: string;
  organizationId?: string;
  discount: number;
  finalPrice: number;
  employeeSalary: number;
  shift: 'morning' | 'evening';
  notes?: string;
  createdAt: Date;
}

export interface Appointment {
  id: string;
  date: Date;
  time: string;
  clientName: string;
  clientPhone: string;
  serviceId: string;
  serviceName: string;
  employeeId: string;
  employeeName: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
  createdAt: Date;
}

export interface AppSettings {
  id: string;
  activeTheme: 'light' | 'dark' | 'black';
  salaryCalculationMethod: 'percentage' | 'fixedPlusPercentage';
  companyName: string;
  companyLogo?: string;
  updatedAt: Date;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'employee';
  active: boolean;
  createdAt: Date;
}
