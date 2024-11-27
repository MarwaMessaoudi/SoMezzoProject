package pi.pperformance.elite.UserController;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import pi.pperformance.elite.Authentif.JwtUtils;
import org.springframework.web.bind.annotation.*;
import pi.pperformance.elite.UserServices.UserServiceInterface;
import pi.pperformance.elite.entities.User;

//import Cross-Origin Resource Sharing to ensure that spring API accepts requests from react app 
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;


@CrossOrigin(origins = "http://localhost:3000") // Adjust the port if necessary
@RestController
@RequestMapping("/Users")
public class UserController {

    @Autowired
    private UserServiceInterface usrService;

    @PostMapping("/add")
    public ResponseEntity<?> addUser(@RequestBody User user) {
        // Check if email already exists
        if (usrService.findByEmail(user.getEmail()) != null) {
            return ResponseEntity.badRequest().body("Email already exists.");
        }

        // Save the new user
        User savedUser = usrService.addUser(user);

        // Return success response
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
