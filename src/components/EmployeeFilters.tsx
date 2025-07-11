import { Search, Filter, RotateCcw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FilterOptions, Department, Role } from "@/types/employee";

interface EmployeeFiltersProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  onReset: () => void;
}

const departments: (Department | 'All')[] = ['All', 'IT', 'HR', 'Finance', 'Marketing', 'Sales', 'Operations'];
const roles: (Role | 'All')[] = ['All', 'Manager', 'Developer', 'Analyst', 'Coordinator', 'Specialist', 'Assistant'];

export function EmployeeFilters({ filters, onFiltersChange, onReset }: EmployeeFiltersProps) {
  const handleSearchChange = (value: string) => {
    onFiltersChange({ ...filters, searchTerm: value });
  };

  const handleDepartmentChange = (value: Department | 'All') => {
    onFiltersChange({ ...filters, department: value });
  };

  const handleRoleChange = (value: Role | 'All') => {
    onFiltersChange({ ...filters, role: value });
  };

  const hasActiveFilters = filters.searchTerm !== '' || filters.department !== 'All' || filters.role !== 'All';

  return (
    <Card className="mb-6 bg-card border-border">
      <CardContent className="p-4">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Filter Employees</span>
          </div>
          
          <div className="flex-1 min-w-[200px] max-w-sm">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by name or email..."
                value={filters.searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Select 
              value={filters.department} 
              onValueChange={(value: Department | 'All') => handleDepartmentChange(value)}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select 
              value={filters.role} 
              onValueChange={(value: Role | 'All') => handleRoleChange(value)}
            >
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                {roles.map((role) => (
                  <SelectItem key={role} value={role}>
                    {role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {hasActiveFilters && (
              <Button
                variant="outline"
                size="sm"
                onClick={onReset}
                className="flex items-center space-x-1"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset</span>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}