# Task Manager Application

A modern task management application featuring natural language processing (NLP) for parsing task descriptions, with a Spring Boot backend and a React frontend.

<img width="1362" alt="Screenshot 2024-08-22 at 20 42 16" src="https://github.com/user-attachments/assets/9ce644cc-ef09-4bbc-9085-59a5f2363ea3">

<img width="1310" alt="Screenshot 2024-08-22 at 20 42 06" src="https://github.com/user-attachments/assets/fae5cbb9-f16e-418e-aaa8-df8e0e43e718">


## Features

- **Task Management:** Create, view, and manage tasks.
- **Natural Language Processing (NLP):** Parse task descriptions to extract and categorize task details.
- **Responsive Design:** Accessible on both desktop and mobile devices.

## Technologies Used

- **Backend:** Spring Boot
- **Frontend:** React
- **NLP:** Python-based NLP service
- **Database:** PostgreSQL

## Getting Started

### Prerequisites

- **Java 11** or higher
- **Node.js** and **npm** (or **yarn**)
- **Python 3.6** or higher
- **Miniconda** or **virtualenv** for Python environment management
- **PostgreSQL** database

### Configuration

1. **Configure PostgreSQL Database:**

   Update your PostgreSQL database configuration in the Spring Boot application.

2. **Setup the Environment:**

   - For the **backend**, ensure proper configuration and database setup.
   - For the **frontend**, install the necessary dependencies.
   - For the **NLP service**, create a Python virtual environment and install dependencies.

3. **Firebase Configuration:**

   Ensure Firebase Cloud Messaging is properly set up if notifications are to be used in future developments.

## Testing

- **Backend:** Use tools like Postman to test API endpoints.
- **Frontend:** Interact with the application through the web interface.
- **NLP Service:** Test the NLP functionality to ensure proper parsing of task descriptions.

## Troubleshooting

- **RestClientException:** Verify the endpoint URL and server status.
- **ModuleNotFoundError for axios:** Install missing packages as needed.
- **Database Connection Issues:** Check PostgreSQL connectivity and credentials.

