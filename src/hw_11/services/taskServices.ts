import { Task, SortCriteria } from '../types/types';
import { v4 as uuidv4 } from 'uuid';

export const filterTasks = (tasks: Task[], searchQuery: string): Task[] => {
    return tasks.filter(task =>
        task.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
};

export const sortTasks = (tasks: Task[], sortCriteria: SortCriteria): Task[] => {
    return tasks.slice().sort((a, b) => {
        if (sortCriteria === 'status') {
            return Number(a.completed) - Number(b.completed);
        }
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });
};

export const filterAndSortTasks = (tasks: Task[], searchQuery: string, sortCriteria: SortCriteria): Task[] => {
    const filteredTasks = filterTasks(tasks, searchQuery);
    return sortTasks(filteredTasks, sortCriteria);
};

export const toggleTaskComplete = (tasks: Task[], id: string): Task[] => (
    tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task)
);

export const deleteTask = (tasks: Task[], id: string): Task[] => (
    tasks.filter(task => task.id !== id)
);

export const editTaskContent = (tasks: Task[], id: string, name: string, content: string): Task[] => (
    tasks.map(task =>
        task.id === id ? { ...task, name, content, updatedAt: new Date() } : task
    )
);

export const countIncompleteTasks = (tasks: Task[]): number => (
    tasks.filter(task => !task.completed).length
);

export const createTask = (name: string, content: string, requiresConfirmation: boolean): Task => ({
    id: uuidv4(),
    name,
    content,
    createdAt: new Date(),
    updatedAt: new Date(),
    completed: false,
    requiresConfirmation
});

export const confirmEdit = (requiresConfirmation: boolean): boolean => {
    return !requiresConfirmation || window.confirm("Confirm edit?");
};
