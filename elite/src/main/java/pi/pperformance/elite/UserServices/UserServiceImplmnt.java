package pi.pperformance.elite.UserServices;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pi.pperformance.elite.UserRepository.UserRepository;
import pi.pperformance.elite.UserServices.UserServiceInterface;
import pi.pperformance.elite.entities.User;
import java.util.List;

//the sevice class where we're going to develop the functions from the interface
@Service
//it's red underlined because we didn't declare all the inherited functions from the repository, we only need the add function in this step
public class UserServiceImplmnt implements UserServiceInterface{

    @Autowired
    private UserRepository UsrRepo;
    
    @Override
    //please make sure to name the entity "User" so the code recognize it and most of the red underlined User will be gone
    public User addUser (User user)
    {
        return UsrRepo.save(user);
    }
    
}
