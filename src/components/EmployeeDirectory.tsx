import { useState, useMemo } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmployeeCard } from "./EmployeeCard";
import { EmployeeForm } from "./EmployeeForm";
import { EmployeeFilters } from "./EmployeeFilters";
import { EmployeePagination } from "./EmployeePagination";
import { EmployeeSorting } from "./EmployeeSorting";
import { Employee, EmployeeFormData, FilterOptions, SortOptions } from "@/types/employee";
import { initialEmployees } from "@/data/employees";
import { useToast } from "@/hooks/use-toast";

export function EmployeeDirectory() {
  const { toast } = useToast();
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  
  const [filters, setFilters] = useState<FilterOptions>({
    department: 'All',
    role: 'All',
    searchTerm: ''
  });
  
  const [sortOptions, setSortOptions] = useState<SortOptions>({
    field: 'firstName',
    direction: 'asc'
  });

  // Filter and search logic
  const filteredEmployees = useMemo(() => {
    return employees.filter(employee => {
      const matchesDepartment = filters.department === 'All' || employee.department === filters.department;
      const matchesRole = filters.role === 'All' || employee.role === filters.role;
      const searchTerm = filters.searchTerm.toLowerCase();
      const matchesSearch = searchTerm === '' ||
        employee.firstName.toLowerCase().includes(searchTerm) ||
        employee.lastName.toLowerCase().includes(searchTerm) ||
        employee.email.toLowerCase().includes(searchTerm);
      
      return matchesDepartment && matchesRole && matchesSearch;
    });
  }, [employees, filters]);

  // Sort logic
  const sortedEmployees = useMemo(() => {
    return [...filteredEmployees].sort((a, b) => {
      const { field, direction } = sortOptions;
      let aValue = a[field];
      let bValue = b[field];
      
      if (typeof aValue === 'string') aValue = aValue.toLowerCase();
      if (typeof bValue === 'string') bValue = bValue.toLowerCase();
      
      if (aValue < bValue) return direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredEmployees, sortOptions]);

  // Pagination logic
  const totalPages = Math.ceil(sortedEmployees.length / itemsPerPage);
  const paginatedEmployees = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedEmployees.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedEmployees, currentPage, itemsPerPage]);

  const handleAddEmployee = () => {
    setEditingEmployee(null);
    setIsFormOpen(true);
  };

  const handleEditEmployee = (employee: Employee) => {
    setEditingEmployee(employee);
    setIsFormOpen(true);
  };

  const handleDeleteEmployee = (id: string) => {
    const employee = employees.find(emp => emp.id === id);
    setEmployees(prev => prev.filter(emp => emp.id !== id));
    
    toast({
      title: "Employee Deleted",
      description: `${employee?.firstName} ${employee?.lastName} has been removed from the directory.`,
      variant: "destructive"
    });
    
    // Reset to first page if current page becomes empty
    const newTotalPages = Math.ceil((filteredEmployees.length - 1) / itemsPerPage);
    if (currentPage > newTotalPages && newTotalPages > 0) {
      setCurrentPage(1);
    }
  };

  const handleFormSubmit = (data: EmployeeFormData, id?: string) => {
    if (id) {
      // Edit existing employee
      setEmployees(prev => prev.map(emp => 
        emp.id === id ? { ...emp, ...data } : emp
      ));
    } else {
      // Add new employee
      const newEmployee: Employee = {
        id: (employees.length + 1).toString(),
        ...data
      };
      setEmployees(prev => [...prev, newEmployee]);
    }
  };

  const handleSortChange = (field: SortOptions['field']) => {
    setSortOptions(prev => ({
      field,
      direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleFiltersReset = () => {
    setFilters({
      department: 'All',
      role: 'All',
      searchTerm: ''
    });
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-primary text-primary-foreground py-8 mb-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Employee Directory</h1>
              <p className="text-primary-foreground/80">
                Manage your team members and their information
              </p>
            </div>
            <Button
              onClick={handleAddEmployee}
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Employee
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-8">
        {/* Filters */}
        <EmployeeFilters
          filters={filters}
          onFiltersChange={setFilters}
          onReset={handleFiltersReset}
        />

        {/* Sorting */}
        <EmployeeSorting
          sortOptions={sortOptions}
          onSortChange={handleSortChange}
        />

        {/* Results count */}
        <div className="mb-4">
          <p className="text-sm text-muted-foreground">
            Showing {sortedEmployees.length} of {employees.length} employees
          </p>
        </div>

        {/* Employee Cards Grid */}
        {paginatedEmployees.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {paginatedEmployees.map((employee) => (
              <EmployeeCard
                key={employee.id}
                employee={employee}
                onEdit={handleEditEmployee}
                onDelete={handleDeleteEmployee}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground mb-4">No employees found</p>
            <p className="text-sm text-muted-foreground mb-6">
              {filters.searchTerm || filters.department !== 'All' || filters.role !== 'All'
                ? 'Try adjusting your filters or search terms'
                : 'Get started by adding your first employee'
              }
            </p>
            <Button onClick={handleAddEmployee}>
              <Plus className="w-4 h-4 mr-2" />
              Add Employee
            </Button>
          </div>
        )}

        {/* Pagination */}
        {sortedEmployees.length > 0 && (
          <EmployeePagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={sortedEmployees.length}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
        )}
      </div>

      {/* Employee Form Modal */}
      <EmployeeForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        employee={editingEmployee}
      />
    </div>
  );
}