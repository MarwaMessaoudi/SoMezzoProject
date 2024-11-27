package pi.pperformance.elite.UserController;

import java.util.ArrayList;
import java.util.List;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import pi.pperformance.elite.Authentif.JwtUtils;
import pi.pperformance.elite.UserServices.UserServiceInterface;
import pi.pperformance.elite.entities.User;
import pi.pperformance.elite.exceptions.AccountNotFoundException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;


@RestController
@RequestMapping("/Users")
public class UserController {

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private UserServiceInterface usrService; // Autowiring the service interface here to access the functions we declared there

    // Add function that allows us to add a user to the database
    @PostMapping("/add")
    public ResponseEntity<String> AddUser(@RequestBody User user) {
        User savedUser = usrService.addUser(user);  

        // Create authorities list with the user's role
        List<SimpleGrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(user.getRole().name()));  // Convert role to authority

        // Generate the token with authorities
        String token = jwtUtils.generateToken(savedUser.getEmail(), authorities);  // Pass authorities for token generation

        return ResponseEntity.ok("Token : " + token);
    }

    // Get all users
    @GetMapping("/alluser")
    public List<User> getAllUsers() {
        return usrService.getAllUsers();
    }

    // Get user by email with proper exception handling
    @GetMapping("/useremail/{email}")
    public ResponseEntity<?> getUserByEmail(@PathVariable String email) {
        try {
            User user = usrService.getUserByEmail(email);
            return ResponseEntity.ok(user); // Return user if found
        } catch (AccountNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage()); // Return 404 if not found
        }
    }

    // Get user by ID
    @GetMapping("/allid/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {
        User user = usrService.getUserById(id);
        if (user != null) {
            return ResponseEntity.ok(user); // Return user if found
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User with ID " + id + " not found");
        }
    }

    // Add user with a message indicating pending approval (inactive status assumed)
    @PostMapping("/addWithApproval")
    public ResponseEntity<String> addUserWithApproval(@RequestBody User user) {
        // Assuming user is registered with an inactive status
        User savedUser = usrService.addUser(user);

        // Returning a response indicating that the user needs approval by admin
        return ResponseEntity.ok("Registration successful! Your account is pending approval by an admin.");
    }

    // Update user details
    @PutMapping("/update/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User userDetails) {
        User updatedUser = usrService.updateUser(id, userDetails);
        return ResponseEntity.ok(updatedUser);
    }

    // Delete user by ID
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        usrService.deleteUser(id);
        return ResponseEntity.ok("User with ID " + id + " deleted successfully.");
    }

    // Find user by email
    @GetMapping("/findByEmail/{email}")
    public ResponseEntity<User> findByEmail(@PathVariable String email) {
        User user = usrService.findByEmail(email);
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
}
