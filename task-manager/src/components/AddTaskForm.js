import React, { useState } from 'react';
import './AddTaskForm.css'; // Import the CSS file for styling

function AddTaskForm({ onTaskAdded }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');

    const handleSubmit = async (event) => {

        event.preventDefault();

        const newTask = {
            title,
            description,
            dueDate,
        };

        try {
            const response = await fetch('http://localhost:8080/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newTask),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            onTaskAdded(result);
            setTitle('');
            setDescription('');
            setDueDate('');

            window.location.reload();


        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    return (
        <form className="add-task-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="title">Title:</label>
                <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="description">Description:</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="dueDate">Due Date and Time:</label>
                <input
                    id="dueDate"
                    type="datetime-local"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    required
                />
            </div>
            <button type="submit" className="submit-button">Add Task</button>
        </form>
    );
}

export default AddTaskForm;
