package pi.pperformance.elite.UserServices;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import okhttp3.*;
import java.io.IOException;
import pi.pperformance.elite.UserRepository.UserRepository;
import pi.pperformance.elite.entities.User;
import org.springframework.beans.factory.annotation.Value;

@Service
public class UserServiceImplmnt implements UserServiceInterface {

    @Autowired
    private UserRepository UsrRepo;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;


    private final OkHttpClient client = new OkHttpClient();  // Reusable client

    @Override
    public User addUser(User user) {
        // Hash the password before saving
        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);  // Set the hashed password

        return UsrRepo.save(user);
    }

    public User findByEmail(String email) {
        return UsrRepo.findByEmail(email);
    }

    // Method to confirm an employee
    /*public String confirmEmployee(String email) {
        // Fetch the employee record by email
        User user = UsrRepo.findByEmail(email);

        if (user == null) {
            return "Employee not found!";
        }

        // Update the employee's isActive field
        user.setIsActive(true);
        UsrRepo.save(user);

        // Send confirmation email
        try {
            sendConfirmationEmail(user.getEmail());
        } catch (IOException e) {
            return "Failed to send confirmation email: " + e.getMessage();
        }

        return "Employee confirmed and email sent!";
    }*/
    public String testEmail() {
        try {
            sendConfirmationEmail("marambrahmi60@gmail.com");  // Replace with the email you want to test
            return "Email sent successfully!";
        } catch (IOException e) {
            return "Error sending email: " + e.getMessage();
        }
    }
    // Method to send confirmation email using Mailtrap
    private void sendConfirmationEmail(String recipientEmail) throws IOException {
        MediaType mediaType = MediaType.parse("application/json");
        String emailJson = "{"
                + "\"from\":{\"email\":\"hello@demomailtrap.com\",\"name\":\"Mailtrap Test\"},"
                + "\"to\":[{\"email\":\"" + recipientEmail + "\"}],"
                + "\"subject\":\"Confirmation Email\","
                + "\"text\":\"Your account has been activated. You can now log in.\","
                + "\"category\":\"Integration Test\""
                + "}";

        RequestBody body = RequestBody.create(mediaType, emailJson);

        Request request = new Request.Builder()
                .url("https://send.api.mailtrap.io/api/send")
                .method("POST", body)
                .addHeader("Authorization", "Bearer " + "930b78f690722f34287d67a30754ef5e")  // Use the API key
                .addHeader("Content-Type", "application/json")
                .build();

        Response response = client.newCall(request).execute();
        if (!response.isSuccessful()) {
            String responseBody = response.body().string(); // Capture response body
            throw new IOException("Failed to send email: " + response.message() + " " + responseBody);
        }
    }
}
