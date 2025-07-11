export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  department: Department;
  role: Role;
}

export type Department = 'IT' | 'HR' | 'Finance' | 'Marketing' | 'Sales' | 'Operations';

export type Role = 'Manager' | 'Developer' | 'Analyst' | 'Coordinator' | 'Specialist' | 'Assistant';

export interface EmployeeFormData {
  firstName: string;
  lastName: string;
  email: string;
  department: Department;
  role: Role;
}

export interface FilterOptions {
  department: Department | 'All';
  role: Role | 'All';
  searchTerm: string;
}

export interface SortOptions {
  field: 'firstName' | 'lastName' | 'email' | 'department' | 'role';
  direction: 'asc' | 'desc';
}