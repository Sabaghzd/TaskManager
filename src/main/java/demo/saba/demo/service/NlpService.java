package demo.saba.demo.service;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import org.springframework.stereotype.Service;

@Service
public class NlpService {

    // URL of the Python NLP service
    private static final String NLP_SERVER_URL = "http://localhost:5001/nlp-task";

    // Method to process text
    public String processText(String text) {
        // Escape backslashes and double quotes in the text to ensure valid JSON formatting
        String escapedText = text.replace("\\", "\\\\").replace("\"", "\\\"");

        // Create the JSON payload string
        String requestPayload = "{ \"text\": \"" + escapedText + "\" }";

        // Set up headers for the HTTP request
        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/json");

        // Create an HttpEntity object with the payload and headers
        HttpEntity<String> requestEntity = new HttpEntity<>(requestPayload, headers);

        // Create a RestTemplate instance
        RestTemplate restTemplate = new RestTemplate();

        try {
            System.out.println("Sending request payload: " + requestPayload);
            // Send the request to the Python NLP service
            ResponseEntity<String> response = restTemplate.exchange(
                    NLP_SERVER_URL,
                    HttpMethod.POST,
                    requestEntity,
                    String.class
            );

            if (response.getStatusCode().is2xxSuccessful()) {
                System.out.println("Received response: " + response.getBody());
                return response.getBody();
            } else {
                System.err.println("Received non-successful response: " + response.getStatusCode());
                return "Error processing text";
            }
        } catch (RestClientException e) {
            System.err.println("Error occurred while making the request to " + NLP_SERVER_URL + ":");
            System.err.println("Payload: " + requestPayload);
            e.printStackTrace();
            return "Error processing text";
        }
    }

}
