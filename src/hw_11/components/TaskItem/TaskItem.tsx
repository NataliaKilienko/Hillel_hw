import React, { useState } from 'react';
import { TaskItemProps } from '../../types/types';
import './TaskItem.css';

const TaskItem: React.FC<TaskItemProps> = ({ task, handleToggleComplete, handleDeleteTask, handleEditTask }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editName, setEditName] = useState(task.name);
    const [editContent, setEditContent] = useState(task.content);

    const handleSaveEdit = () => {
        if (editName.trim() && editContent.trim()) {
            handleEditTask(task.id, editName, editContent);
            setIsEditing(false);
        } else {
            alert("Task name and content cannot be empty!");
        }
    };
    
    return (
        <li className="task-item">
            <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggleComplete(task.id)}
            />
            {isEditing ? (
                <>
                    <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="edit-input"
                        placeholder="Task Name"
                    />
                    <input
                        type="text"
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        className="edit-input"
                        placeholder="Task Content"
                    />
                </>
            ) : (
                <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                    <strong>{task.name}</strong>: {task.content}
                </span>
            )}
            {isEditing ? (
                <button onClick={handleSaveEdit} className="save-btn">Save</button>
            ) : (
                <button onClick={() => setIsEditing(true)} className="edit-btn">Edit</button>
            )}
            <button onClick={() => handleDeleteTask(task.id)} className="delete-btn">X</button>
        </li>
    );
};

export default TaskItem;
