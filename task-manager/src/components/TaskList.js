import React, { useEffect, useState } from 'react';
import './TaskList.css';

function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8080/tasks')  // Replace with your API endpoint
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => setTasks(sortTasks(data)))
            .catch(error => setError('Error fetching tasks. Please try again later.'))
            .finally(() => setLoading(false));
    }, []);

    // Function to format the date without seconds
    const formatDateWithoutSeconds = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        };
        return date.toLocaleString(undefined, options);
    };

    // Function to handle checkbox change
    const handleCheckboxChange = (id, done) => {
        fetch(`http://localhost:8080/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ done }), // Send only the done status
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(updatedTask => {
                setTasks(prevTasks => sortTasks(
                    prevTasks.map(task =>
                        task.id === id ? { ...task, done: updatedTask.done } : task
                    )
                ));
            })
            .catch(error => setError('Error updating task. Please try again later.'));
    };

    // Function to handle task deletion
    const handleDelete = (id) => {
        fetch(`http://localhost:8080/tasks/${id}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
            })
            .catch(error => setError('Error deleting task. Please try again later.'));
    };

    // Function to sort tasks
    const sortTasks = (tasks) => {
        return tasks.slice().sort((a, b) => {
            if (a.done && !b.done) return 1;
            if (!a.done && b.done) return -1;
            return 0;
        });
    };

    if (loading) return <p className="loading">Loading tasks...</p>;
    if (error) return <p className="error-message">{error}</p>;

    return (
        <div className="task-list-container">
            <ul className="task-items">
                {tasks.map(task => (
                    <li
                        key={task.id}
                        className={`task-item ${task.done ? 'done' : ''}`}
                    >
                        <span
                            className="delete-icon"
                            onClick={() => handleDelete(task.id)}
                        >
                            &times; {/* You can use an icon library for a fancier icon */}
                        </span>
                        <h3 className="task-title">{task.title}</h3>
                        <p className="task-description">{task.description}</p>
                        <p className="task-dueDate">
                            Due Date: {formatDateWithoutSeconds(task.dueDate)}
                        </p>
                        <label>
                            <input
                                type="checkbox"
                                checked={task.done}
                                onChange={(e) => handleCheckboxChange(task.id, e.target.checked)}
                            />
                            Done
                        </label>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TaskList;
