package demo.saba.demo.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;

    private String description;

    private boolean useNlp; // New field

    private String processedDescription;
    private boolean notified;

    private boolean done; // New field for completion status



    private LocalDateTime dueDate;


    public boolean isDone() {
        return done;
    }

    public void setDone(boolean done) {
        this.done = done;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }


    public void setId(Long id) {
        this.id = id;
    }

    // Getter for title
    public String getTitle() {
        return title;
    }

    // Setter for title
    public void setTitle(String title) {
        this.title = title;
    }
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getProcessedDescription() {
        return processedDescription;
    }

    public void setProcessedDescription(String processedDescription) {
        this.processedDescription = processedDescription;
    }

    public LocalDateTime getDueDate() {
        return dueDate;
    }

    public boolean isUseNlp() {
        return useNlp;
    }

    public void setUseNlp(boolean useNlp) {
        this.useNlp = useNlp;
    }

    public void setDueDate(LocalDateTime dueDate) {
        this.dueDate = dueDate;
    }

    public boolean isNotified() {
        return notified;
    }

    public void setNotified(boolean notified) {
        this.notified = notified;
    }

}

