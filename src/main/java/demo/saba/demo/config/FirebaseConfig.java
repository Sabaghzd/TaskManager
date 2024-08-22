package demo.saba.demo.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.annotation.PostConstruct;
import java.io.FileInputStream;
import java.io.IOException;

@Configuration
public class FirebaseConfig {
    @Bean
    public FirebaseApp firebaseApp() throws IOException {
        // Load the service account key JSON file
        FileInputStream serviceAccount =
                new FileInputStream("/Users/sabaghasemzadehhassankolaei/Documents/demoTaskmng/taskmanager-c1378-d935c526b30e.json");

        // Initialize Firebase Options
        FirebaseOptions options = FirebaseOptions.builder()
                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                .build();

        // Initialize and return the Firebase App
        return FirebaseApp.initializeApp(options);
    }

}
