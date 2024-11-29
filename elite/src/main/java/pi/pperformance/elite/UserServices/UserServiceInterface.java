package pi.pperformance.elite.UserServices;
import java.util.List;

import pi.pperformance.elite.entities.User;


//the service interface where we're going to declare the function we'll use in both the controller and the service class
public interface UserServiceInterface{
//please make sure to name the entity "User" so the code recognize it and most of the red underlined User will be gone
    public User addUser(User user);
    public User updateUser(Long id, User userDetails); 
    public void deleteUser(Long id);
    public	List<User> getAllUsers();
    public User getUserByEmail(String email);
    public User getUserById(Long id);
    public User findByEmail(String email);
    public List<User>getUsersByInactiveStatus();
}
