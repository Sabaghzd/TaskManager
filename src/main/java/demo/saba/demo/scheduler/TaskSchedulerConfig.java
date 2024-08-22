package demo.saba.demo.scheduler;


import demo.saba.demo.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

@Configuration
@EnableScheduling
public class TaskSchedulerConfig {

    @Autowired
    private TaskService taskService;

    @Scheduled(cron = "0 * * * * *") // Runs every minute
    public void checkDueTasks() {
        // Logic to check and handle tasks due for notification
        taskService.checkAndNotifyDueTasks();
    }
}
