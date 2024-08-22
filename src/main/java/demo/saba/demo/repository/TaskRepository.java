package demo.saba.demo.repository;

import demo.saba.demo.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {

    @Query("SELECT t FROM Task t WHERE t.dueDate <= :dueDate")
    List<Task> findDueTasks(@Param("dueDate") LocalDateTime dueDate);
}
