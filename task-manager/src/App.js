import React, { useState, useEffect } from 'react';
import AddTaskForm from './components/AddTaskForm';
import TaskList from './components/TaskList';
import TaskInput from './components/TaskInput';
import './App.css'; // Import updated CSS

function App() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // index.js or App.js
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            const swUrl = `${process.env.PUBLIC_URL}/firebase-messaging-sw.js`;

            navigator.serviceWorker.register(swUrl).then(registration => {
                console.log('Service Worker registered with scope:', registration.scope);
            }).catch(error => {
                console.error('Service Worker registration failed:', error);
            });
        });
    }

    // Fetch tasks from the backend
    const fetchTasks = async () => {
        try {
            const response = await fetch('http://localhost:8080/tasks');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setTasks(data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
            setError('Failed to load tasks. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleTaskAdded = (newTask) => {
        setTasks([...tasks, newTask]);
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Task Manager</h1>
                <p>Your personal assistant for managing tasks efficiently.</p>
            </header>
            <div className="main-container">
                <div className="left-column">
                    <section className="add-task-section">
                        <h2>Add a New Task</h2>
                        <AddTaskForm onTaskAdded={handleTaskAdded} />
                    </section>
                    <section className="task-input-section">
                        <h2>Task Input via Voice</h2>
                        <TaskInput />
                    </section>
                </div>
                <div className="right-column">
                    {loading ? (
                        <p>Loading tasks...</p>
                    ) : error ? (
                        <p className="error-message">{error}</p>
                    ) : tasks.length === 0 ? (
                        <p>No tasks available. Please add a new task.</p>
                    ) : (
                        <TaskList tasks={tasks} />
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
