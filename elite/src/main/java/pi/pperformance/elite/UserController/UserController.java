package pi.pperformance.elite.UserController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import pi.pperformance.elite.Authentif.JwtUtils;
import pi.pperformance.elite.UserServices.UserServiceInterface;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import pi.pperformance.elite.entities.User;

//import Cross-Origin Resource Sharing to ensure that spring API accepts requests from react app 
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "http://localhost:3000") // Adjust the port if necessary

@RestController
@RequestMapping("/Users")
public class UserController {
	@Autowired
	private JwtUtils jwtUtils;
    @Autowired
    UserServiceInterface usrService; //autowiring the service interface here to access the functions we declared there

    //the add function that allow us to add a user to the database
    @PostMapping("/add")
    public ResponseEntity<String> AddUser(@RequestBody User user) {
        User savedUser = usrService.addUser(user);  

        String token = jwtUtils.generateToken(savedUser.getEmail()); 

       return ResponseEntity.ok("Token : "+" "+token);
       }}
