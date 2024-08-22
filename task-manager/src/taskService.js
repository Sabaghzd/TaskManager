
const API_URL = 'http://localhost:8080/tasks';

export const getAllTasks = () => {
    return fetch(API_URL).then(response => response.json());
};

export const createTask = (task) => {
    return fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
    }).then(response => response.json());
};

export const getTaskById = (id) => {
    return fetch(`${API_URL}/${id}`).then(response => response.json());
};

export const deleteTask = (id) => {
    return fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });
};