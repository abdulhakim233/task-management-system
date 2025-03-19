
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { SlidersHorizontalIcon } from 'lucide-react';

interface TaskFilterProps {
  currentFilters: {
    status: string;
    sortBy: string;
    sortOrder: string;
  };
  onFilterChange: (filters: any) => void;
}

const TaskFilter: React.FC<TaskFilterProps> = ({ currentFilters, onFilterChange }) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-secondary/50 rounded-lg">
      <div className="flex items-center mr-2">
        <SlidersHorizontalIcon className="h-4 w-4 mr-2" />
        <span className="text-sm font-medium">Filters:</span>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-1">
        <div className="space-y-1">
          <Label htmlFor="status-filter" className="text-xs">Status</Label>
          <Select
            value={currentFilters.status}
            onValueChange={(value) => onFilterChange({ status: value })}
          >
            <SelectTrigger id="status-filter" className="h-9">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-1">
          <Label htmlFor="sort-by" className="text-xs">Sort by</Label>
          <Select
            value={currentFilters.sortBy}
            onValueChange={(value) => onFilterChange({ sortBy: value })}
          >
            <SelectTrigger id="sort-by" className="h-9">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="due_date">Due Date</SelectItem>
              <SelectItem value="title">Title</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-1">
          <Label htmlFor="sort-order" className="text-xs">Order</Label>
          <Select
            value={currentFilters.sortOrder}
            onValueChange={(value) => onFilterChange({ sortOrder: value })}
          >
            <SelectTrigger id="sort-order" className="h-9">
              <SelectValue placeholder="Order" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">Ascending</SelectItem>
              <SelectItem value="desc">Descending</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default TaskFilter;
