package pi.pperformance.elite.UserController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import pi.pperformance.elite.Authentif.JwtUtils;
import pi.pperformance.elite.UserServices.UserServiceImplmnt;
import pi.pperformance.elite.UserServices.UserServiceInterface;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import pi.pperformance.elite.entities.User;

//import Cross-Origin Resource Sharing to ensure that spring API accepts requests from react app 
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

@CrossOrigin(origins = "http://localhost:3000") // Adjust the port if necessary

@RestController
@RequestMapping("/Users")
public class UserController {
	@Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private UserServiceImplmnt userService;

    @Autowired
    private UserServiceInterface usrService; // Autowiring the service interface here to access the functions we declared there

    // Add function that allows us to add a user to the database
    @PostMapping("/add")
    public ResponseEntity<String> addUser(@RequestBody User user) {
        // Register the user with an inactive status
        User savedUser = usrService.addUser(user);
        
        // Returning a response indicating that the user needs approval by admin
        return ResponseEntity.ok("Registration successful! Your account is pending approval by an admin.");
    }
   /*  @PostMapping("/confirm-employee")
    public ResponseEntity<?> confirmEmployee(@RequestParam String email) {
        try {
             ;
            return ResponseEntity.ok().body(userService.sendConfirmationEmail(email).ToS);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }*/
     @GetMapping("/test-email")
    public String sendTestEmail() {
        return userService.testEmail();  // Call the method to send the test email
    }
}
