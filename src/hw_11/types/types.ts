export enum SortCriteria {
    CreatedAt = 'createdAt',
    Status = 'status',
}

export interface Task {
    id: string;
    name: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    completed: boolean;
    requiresConfirmation: boolean;
}

export interface TaskItemProps {
    task: Task;
    handleToggleComplete: (id: string) => void;
    handleDeleteTask: (id: string) => void;
    handleEditTask: (id: string, name: string, content: string) => void;
}

export interface TaskInputProps {
    handleAddTask: (name: string, content: string, requiresConfirmation: boolean) => void;
}

export interface SearchProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    handleSort: (criteria: SortCriteria) => void; 
}

export interface TaskStatisticsProps {
    totalTasks: number;
    incompleteTasks: number;
}
