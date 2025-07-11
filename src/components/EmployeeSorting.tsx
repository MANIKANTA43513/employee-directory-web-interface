import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SortOptions } from "@/types/employee";

interface EmployeeSortingProps {
  sortOptions: SortOptions;
  onSortChange: (field: SortOptions['field']) => void;
}

export function EmployeeSorting({ sortOptions, onSortChange }: EmployeeSortingProps) {
  const getSortIcon = (field: SortOptions['field']) => {
    if (sortOptions.field !== field) {
      return <ArrowUpDown className="w-4 h-4" />;
    }
    return sortOptions.direction === 'asc' ? 
      <ArrowUp className="w-4 h-4" /> : 
      <ArrowDown className="w-4 h-4" />;
  };

  const getSortButtonVariant = (field: SortOptions['field']) => {
    return sortOptions.field === field ? "default" : "ghost";
  };

  return (
    <div className="flex items-center space-x-2 mb-4">
      <span className="text-sm font-medium text-foreground">Sort by:</span>
      
      <Button
        variant={getSortButtonVariant('firstName')}
        size="sm"
        onClick={() => onSortChange('firstName')}
        className="flex items-center space-x-1"
      >
        <span>First Name</span>
        {getSortIcon('firstName')}
      </Button>
      
      <Button
        variant={getSortButtonVariant('lastName')}
        size="sm"
        onClick={() => onSortChange('lastName')}
        className="flex items-center space-x-1"
      >
        <span>Last Name</span>
        {getSortIcon('lastName')}
      </Button>
      
      <Button
        variant={getSortButtonVariant('department')}
        size="sm"
        onClick={() => onSortChange('department')}
        className="flex items-center space-x-1"
      >
        <span>Department</span>
        {getSortIcon('department')}
      </Button>
      
      <Button
        variant={getSortButtonVariant('role')}
        size="sm"
        onClick={() => onSortChange('role')}
        className="flex items-center space-x-1"
      >
        <span>Role</span>
        {getSortIcon('role')}
      </Button>
    </div>
  );
}