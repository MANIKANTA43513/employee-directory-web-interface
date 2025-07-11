import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Mail, User, Building, Briefcase } from "lucide-react";
import { Employee } from "@/types/employee";

interface EmployeeCardProps {
  employee: Employee;
  onEdit: (employee: Employee) => void;
  onDelete: (id: string) => void;
}

export function EmployeeCard({ employee, onEdit, onDelete }: EmployeeCardProps) {
  const getDepartmentColor = (department: string) => {
    const colors = {
      'IT': 'bg-primary text-primary-foreground',
      'HR': 'bg-success text-success-foreground',
      'Finance': 'bg-warning text-warning-foreground',
      'Marketing': 'bg-destructive text-destructive-foreground',
      'Sales': 'bg-accent text-accent-foreground',
      'Operations': 'bg-secondary text-secondary-foreground'
    };
    return colors[department as keyof typeof colors] || 'bg-muted text-muted-foreground';
  };

  const getRoleColor = (role: string) => {
    const colors = {
      'Manager': 'bg-primary/10 text-primary border-primary/20',
      'Developer': 'bg-success/10 text-success border-success/20',
      'Analyst': 'bg-warning/10 text-warning border-warning/20',
      'Coordinator': 'bg-destructive/10 text-destructive border-destructive/20',
      'Specialist': 'bg-accent/10 text-accent border-accent/20',
      'Assistant': 'bg-secondary/10 text-secondary border-secondary/20'
    };
    return colors[role as keyof typeof colors] || 'bg-muted/10 text-muted border-muted/20';
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-200 hover:-translate-y-1 bg-card border-border">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center">
              <User className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-foreground">
                {employee.firstName} {employee.lastName}
              </h3>
              <p className="text-sm text-muted-foreground">ID: {employee.id}</p>
            </div>
          </div>
          <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(employee)}
              className="hover:bg-primary hover:text-primary-foreground"
            >
              <Edit className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDelete(employee.id)}
              className="hover:bg-destructive hover:text-destructive-foreground"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Mail className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-foreground">{employee.email}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Building className="w-4 h-4 text-muted-foreground" />
            <Badge className={getDepartmentColor(employee.department)}>
              {employee.department}
            </Badge>
          </div>
          
          <div className="flex items-center space-x-2">
            <Briefcase className="w-4 h-4 text-muted-foreground" />
            <Badge variant="outline" className={getRoleColor(employee.role)}>
              {employee.role}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}