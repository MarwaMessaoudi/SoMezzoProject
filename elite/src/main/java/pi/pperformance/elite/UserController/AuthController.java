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

import pi.pperformance.elite.Authentif.JwtUtils;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtils jwtUtil;

    @Autowired
    private UserDetailsService userDetailsService;

    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginRequest) {
        String email = loginRequest.get("email");
        String password = loginRequest.get("password");

        try {
            // Authenticate user using AuthenticationManager to validate credentials
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));

            // Load user details and generate JWT token
            final UserDetails userDetails = userDetailsService.loadUserByUsername(email);
            final String accessToken = jwtUtil.generateToken(userDetails.getUsername());
            //generate the refreshtoken
            final String refreshToken = jwtUtil.generateRefreshToken(userDetails.getUsername());

            // Return the generated JWT token in the response
            //return the refresh token as well
            return ResponseEntity.ok(Map.of(
            "accessToken", accessToken,
            "refreshToken", refreshToken
        ));
        } catch (AuthenticationException e) {
            // If authentication fails, return error response
            //maram: I changed the message so we can have more clarity about the error
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of(
                "message", "Invalid email or password!",
                "errorCode", "AUTH001"
            ));
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
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of(
                "message", "Invalid refresh token format!",
                "errorCode", "AUTH004"
            ));
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
