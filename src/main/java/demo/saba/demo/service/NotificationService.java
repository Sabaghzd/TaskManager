package demo.saba.demo.service;

import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import org.springframework.stereotype.Service;

@Service
public class NotificationService {

    // Method to send a notification
    public void sendNotification(String token, String title, String body) {
        // Create a notification with the title and body
        Notification notification = Notification.builder()
                .setTitle(title)
                .setBody(body)
                .build();

        // Create a message with the provided token and notification payload
        Message message = Message.builder()
                .setToken(token)
                .setNotification(notification)
                .build();

        // Send the message synchronously
        try {
            String response = FirebaseMessaging.getInstance().send(message);
            System.out.println("Successfully sent message: " + response);
        } catch (Exception e) {
            System.err.println("Error sending message: " + e.getMessage());
        }
    }
}
