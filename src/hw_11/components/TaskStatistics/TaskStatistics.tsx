import React from 'react';
import { TaskStatisticsProps } from '../../types/types';

const TaskStatistics: React.FC<TaskStatisticsProps> = ({ totalTasks, incompleteTasks }) => (
    <p>Total Tasks: {totalTasks} | Incomplete Tasks: {incompleteTasks}</p>
);

export default TaskStatistics;
