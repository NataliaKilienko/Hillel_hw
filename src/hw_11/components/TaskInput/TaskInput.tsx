import React, { useState } from 'react';
import { TaskInputProps } from '../../types/types';
import './TaskInput.css';

const TaskInput: React.FC<TaskInputProps> = ({ handleAddTask }) => {
    const [formState, setFormState] = useState<{ name: string; content: string; confirmationRequired: boolean }>({
        name: '',
        content: '',
        confirmationRequired: false,
    });

    const handleAdd = () => {
        if (formState.name.trim() && formState.content.trim()) {
            handleAddTask(formState.name, formState.content, formState.confirmationRequired);
            setFormState({ name: '', content: '', confirmationRequired: false });
        } else {
            alert("Both Name and Content fields are required.");
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormState(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormState(prevState => ({
            ...prevState,
            confirmationRequired: e.target.checked,
        }));
    };

    return (
        <div className="task-input">
            <input
                type="text"
                name="name"
                value={formState.name}
                onChange={handleInputChange}
                placeholder="Task Name"
                className="input"
            />
            <input
                type="text"
                name="content"
                value={formState.content}
                onChange={handleInputChange}
                placeholder="Task Content"
                className="input"
            />
            <button onClick={handleAdd} className="button">
                Add Task
            </button>
            <label>
                <input
                    type="checkbox"
                    checked={formState.confirmationRequired}
                    onChange={handleCheckboxChange}
                />
                Requires Confirmation
            </label>
        </div>    
    );
};

export default TaskInput;
