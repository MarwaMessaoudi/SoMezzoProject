package pi.pperformance.elite.UserController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
    UserServiceInterface usrService; //autowiring the service interface here to access the functions we declared there

    //the add function that allow us to add a user to the database
    @PostMapping("/add")
    //please make sure to name the entity "User" so the code recognize it and most of the red underlined User will be gone
    public User AddUser (@RequestBody User user) {
        return usrService.addUser(user);
    }
    
    
}
