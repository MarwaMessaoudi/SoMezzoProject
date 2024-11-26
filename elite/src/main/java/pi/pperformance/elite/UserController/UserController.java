package pi.pperformance.elite.UserController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pi.pperformance.elite.UserServices.UserServiceInterface;
import pi.pperformance.elite.entities.User;

@CrossOrigin(origins = "http://localhost:3000") // Adjust the port if necessary
@RestController
@RequestMapping("/Users")
public class UserController {

    @Autowired
    private UserServiceInterface usrService;

    // Add function that allows us to add a user to the database
    @PostMapping("/add")
    public ResponseEntity<String> addUser(@RequestBody User user) {
        // Register the user with an inactive status
        User savedUser = usrService.addUser(user);

        // Returning a response indicating that the user needs approval by admin
        return ResponseEntity.ok("Registration successful! Your account is pending approval by an admin.");
    }

    @PostMapping("/confirm-employee")
    public ResponseEntity<?> confirmEmployee(@RequestParam String email) {
        try {
            String response = usrService.confirmEmployee(email);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/test-email")
    public String sendTestEmail() {
        return usrService.testEmail();  // Call the method to send the test email
    }
}
