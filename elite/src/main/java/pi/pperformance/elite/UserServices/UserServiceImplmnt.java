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
    // cette fonction retourne liste de users
    @Override
    public List<User> getAllUsers(){
    	return UsrRepo.findAll()
;    	
    }

    // retourne un user par id et si n'existe pas retourne null
    @Override
    public User getUserById(Long id) {
        return UsrRepo.findById(id).orElse(null);
    }
    @Override


public User getUserByEmail(String email) {
    User user = UsrRepo.findByEmail(email);
    if (user == null) {
        throw new pi.pperformance.elite.exceptions.AccountNotFoundException("User with email " + email + " not found");
    }
    return user;
}

	
    // cette fonction permet de modifier les infos de users si existe snn retourner null
	@Override
    public User updateUser(Long id, User userDetails) {
        Optional<User> optionalUser =  UsrRepo.findById(id);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setFirst_name(userDetails.getFirst_name());
            user.setLast_name(userDetails.getLast_name());
            user.setEmail(userDetails.getEmail());
            user.setBirthDate(userDetails.getBirthDate());
            user.setRole(userDetails.getRole());
            user.setPassword(userDetails.getPassword());
            return  UsrRepo.save(user);
        }
        return null;
    }
    

    //cette methode cherché  le user par id a apres supprimer si existe snn affchier mssg 
	@Override
    public void deleteUser(Long id) {
        if (UsrRepo.existsById(id)) {
        	UsrRepo.deleteById(id);
        } else {
            throw new IllegalArgumentException("User with ID " + id +  " does not exist");
        }
    }

    public User findByEmail(String email) {
        return UsrRepo.findByEmail(email);
    }

}
