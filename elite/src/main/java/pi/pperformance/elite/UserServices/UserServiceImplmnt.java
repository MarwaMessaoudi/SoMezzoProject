package pi.pperformance.elite.UserServices;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import okhttp3.*;
import java.io.IOException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import pi.pperformance.elite.UserRepository.UserRepository;
import pi.pperformance.elite.entities.User;

@Service
public class UserServiceImplmnt implements UserServiceInterface {

    private static final Logger logger = LoggerFactory.getLogger(UserServiceImplmnt.class);

    @Autowired
    private UserRepository UsrRepo;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    private final OkHttpClient client = new OkHttpClient();

    @Override
    public User addUser(User user) {
        // Hash the password before saving
        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);

        return UsrRepo.save(user);
    }

    @Override
    public String confirmEmployee(String email) {
        User user = UsrRepo.findByEmail(email);
        if (user == null) {
            return "Employee not found!";
        }

        // Update the employee's isActive field
        user.setIsActive(true);
        UsrRepo.save(user);

        try {
            sendConfirmationEmail(user.getEmail());
        } catch (IOException e) {
            logger.error("Failed to send confirmation email: {}", e.getMessage());
            return "Employee confirmed, but email failed: " + e.getMessage();
        }

        return "Employee confirmed and email sent!";
    }

    @Override
    public String testEmail() {
        try {
            sendConfirmationEmail("example@example.com");  // Replace with the email you want to test
            return "Email sent successfully!";
        } catch (IOException e) {
            logger.error("Error sending test email: {}", e.getMessage());
            return "Error sending email: " + e.getMessage();
        }
    }

    @Override
    public User findByEmail(String email) {
        return UsrRepo.findByEmail(email);  // Implementation of the inherited abstract method
    }

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
                .addHeader("Authorization", "Bearer 930b78f690722f34287d67a30754ef5e")
                .addHeader("Content-Type", "application/json")
                .build();

        Response response = client.newCall(request).execute();
        if (!response.isSuccessful()) {
            String responseBody = response.body().string();
            logger.error("Mailtrap error response: {}", responseBody);
            throw new IOException("Failed to send email: " + response.message() + " " + responseBody);
        }
    }
}
