package demo.saba.demo.service;

import demo.saba.demo.model.Task;
import demo.saba.demo.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private FirebaseService firebaseService;

    // Method to get all tasks
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    // Add a new task
    public Task addTask(Task task) {
        return taskRepository.save(task);
    }

    // Method to get due tasks
    public List<Task> getDueTasks(LocalDateTime dueDate) {
        return taskRepository.findDueTasks(dueDate);
    }

    // Method to check and notify due tasks
    public void checkAndNotifyDueTasks() {
        LocalDateTime now = LocalDateTime.now();
        List<Task> dueTasks = taskRepository.findDueTasks(now);

        for (Task task : dueTasks) {
            // Replace with the actual logic to get the user's FCM token
            String userToken = "USER_DEVICE_FCM_TOKEN"; // This should be retrieved dynamically
            String title = "Task Due";
            String message = "Task " + task.getTitle() + " is due at " + task.getDueDate();

            try {
                firebaseService.sendNotification(userToken, title, message);
            } catch (HttpClientErrorException | HttpServerErrorException e) {
                // Handle HTTP exceptions
                System.err.println("HTTP error occurred while sending notification for task: " + task.getId() + ". Status code: " + e.getStatusCode() + ", Error: " + e.getResponseBodyAsString());
            } catch (Exception e) {
                // Handle other exceptions
                System.err.println("Failed to send notification for task: " + task.getId() + ". Error: " + e.getMessage());
            }
        }
    }
}
