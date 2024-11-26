package pi.pperformance.elite.UserController;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import pi.pperformance.elite.Authentif.JwtUtils;
import pi.pperformance.elite.UserServices.UserServiceImplmnt;
import pi.pperformance.elite.entities.User;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtils jwtUtil;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    UserServiceImplmnt userServices;
    
    private static final Logger log = LoggerFactory.getLogger(AuthController.class);
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginRequest) {

        String email = loginRequest.get("email");
        String password = loginRequest.get("password");
        log.info("Authenticating user with email: {}", email);
        log.info("Authenticating user with password: {}", password);
        try {
            // Authenticate user using AuthenticationManager to validate credentials
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
            
            // Load user details and generate JWT token
            final UserDetails userDetails = userDetailsService.loadUserByUsername(email);
            //logs to clarify the bugs
            log.info("Authenticating the user: {}", userDetails);
            //the isActive process
            User user = userServices.findByEmail(email); // Fetch user entity from DB
            //troubleshooting
            log.info("Authenticating user with the corresponding email: {}", user);
            if (user == null || !user.getIsActive()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of(
                    "message", "Account is inactive!",
                    "errorCode", "AUTH002"
                ));
            }
            final String accessToken = jwtUtil.generateToken(userDetails.getUsername());
            //troubleshooting
            log.info("Access token: {}", accessToken);
            //generate the refreshtoken
            final String refreshToken = jwtUtil.generateRefreshToken(userDetails.getUsername());
            //troubleshooting
            log.info("Refresh Token", refreshToken);
            Boolean isActive = user.getIsActive();
            //troubleshooting
            log.info("isActive", isActive);
            // Return the generated JWT token in the response
            return ResponseEntity.ok(Map.of(
            "accessToken", accessToken,
            "refreshToken", refreshToken,
            "isActive", isActive
        ));
        } catch (AuthenticationException e) {
            // If authentication fails, return error response
            //changed the message so we can have more clarity about the error
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }
//maram
    @PostMapping("/refresh")
    public ResponseEntity<?> refreshAccessToken(@RequestBody Map<String, String> request){
        //extracting the refresh token from the request
        String refreshToken = request.get("refreshToken");
        if (refreshToken ==null){
            //checking if any problem happenned
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of( "message", "Refresh token is missing!",
            "errorCode", "AUTH003"));
        }

        //extracting email from the request
        String email;
        try{
            email = jwtUtil.extractEmail(refreshToken); // extract the email from the refresh token
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage()
                //Map.of(
                //"message", "Invalid refresh token format!",
                //"errorCode", "AUTH004"
            //)
            );
        }
        // Validate the refresh token using both email and token
    if (!jwtUtil.validateToken(refreshToken, email)) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of(
            "message", "Invalid or expired refresh token!",
            "errorCode", "AUTH005"
        ));
    }
        String newAccessToken = jwtUtil.generateToken(email);
        return ResponseEntity.ok(Map.of("accessToken", newAccessToken));
    }
}
