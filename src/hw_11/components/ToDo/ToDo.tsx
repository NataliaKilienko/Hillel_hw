import React, { useState, useCallback, useMemo } from 'react';
import { Task, SortCriteria } from '../../types/types';
import TaskInput from '../TaskInput/TaskInput';
import TaskItem from '../TaskItem/TaskItem';
import SearchBar from '../SearchBar/SearchBar';
import TaskStatistics from '../TaskStatistics/TaskStatistics';
import './ToDo.css';
import { toggleTaskComplete, deleteTask, editTaskContent, filterAndSortTasks, countIncompleteTasks, createTask, confirmEdit } from '../../services/taskServices';

const ToDo: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [sortCriteria, setSortCriteria] = useState<SortCriteria>(SortCriteria.CreatedAt);

    const totalTasks = tasks.length;
    const incompleteTasks = countIncompleteTasks(tasks);

    const handleAddTask = useCallback((name: string, content: string, requiresConfirmation: boolean) => {
        if (!name.trim() || !content.trim()) return;
        
        const newTask = createTask(name, content, requiresConfirmation);
        setTasks(prevTasks => [...prevTasks, newTask]);
    }, []);

    const handleToggleComplete = useCallback((id: string) => {
        setTasks(prevTasks => toggleTaskComplete(prevTasks, id));
    }, []);

    const handleDeleteTask = useCallback((id: string) => {
        setTasks(prevTasks => deleteTask(prevTasks, id));
    }, []);

    const handleEditTask = useCallback((id: string, name: string, content: string) => {
        const taskToEdit = tasks.find(task => task.id === id);
        if (taskToEdit && !confirmEdit(taskToEdit.requiresConfirmation)) return;
        setTasks(prevTasks => editTaskContent(prevTasks, id, name, content));
    }, [tasks]);

    const handleSort = useCallback((criteria: SortCriteria) => {
        setSortCriteria(criteria);
    }, []);

    const filteredAndSortedTasks = useMemo(() => {
        return filterAndSortTasks(tasks, searchQuery, sortCriteria);
    }, [tasks, searchQuery, sortCriteria]);

    return (
        <div className="container">
            <h1>To-Do List</h1>

            <TaskInput handleAddTask={handleAddTask} />

            <SearchBar 
                searchQuery={searchQuery} 
                setSearchQuery={setSearchQuery} 
                handleSort={handleSort} 
            />

            <TaskStatistics totalTasks={totalTasks} incompleteTasks={incompleteTasks} />

            <ul>
                {filteredAndSortedTasks.map(task => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        handleToggleComplete={handleToggleComplete}
                        handleDeleteTask={handleDeleteTask}
                        handleEditTask={handleEditTask}
                    />
                ))}
            </ul>
        </div>
    );
};

export default ToDo;
