package pi.pperformance.elite.UserServices;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import pi.pperformance.elite.UserRepository.UserRepository;
import pi.pperformance.elite.entities.User;

@Service
public class UserServiceImplmnt implements UserServiceInterface {

    @Autowired
    private UserRepository UsrRepo;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Override
    public User addUser(User user) {
        // Hash the password before saving
        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);  // Set the hashed password

        return UsrRepo.save(user);
    }
}
