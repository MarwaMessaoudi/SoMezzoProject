package pi.pperformance.elite.Authentif;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

@Component  // Mark this class as a Spring Bean to be managed by Spring's application context
public class JwtRequestFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtils jwtUtil;  // Injecting the JwtUtils class, which provides utility methods for JWT operations

    @Autowired
    private UserDetailsService userDetailsService;  // Injecting the UserDetailsService to load user details from the database

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {
        
        // Extract JWT token from the Authorization header
        final String authorizationHeader = request.getHeader("Authorization");  // Retrieve the "Authorization" header from the HTTP request

        String email = null;  // Initialize the email variable to store the extracted email address
        String jwtToken = null;  // Initialize the jwtToken variable to store the extracted JWT token

        // Check if header contains "Bearer " and extract token
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {  
            // If the Authorization header exists and starts with "Bearer " (indicating a JWT token)
            jwtToken = authorizationHeader.substring(7);  // Extract the JWT token by removing the "Bearer " prefix
            email = jwtUtil.extractEmail(jwtToken);  // Use the JwtUtils class to extract the email  from the JWT token
        }

        // Validate the token and set the SecurityContext if valid
        if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            // If an email is extracted and there is no existing authentication in the SecurityContext (i.e., the user is not authenticated yet)
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(email);  
            // Load the user details from the database using the email address (which is used as the username)

            // Validate token and user details
            if (jwtUtil.validateToken(jwtToken, userDetails.getUsername())) {
                // If the JWT token is valid (using JwtUtils to validate the token with the user's username)

                // Set authentication in the security context
                UsernamePasswordAuthenticationToken authToken =  
                        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                // Create an Authentication object (UsernamePasswordAuthenticationToken) with the userDetails, authorities, and no password

                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));  
                // Set additional authentication details (e.g., the remote address of the request) using WebAuthenticationDetailsSource

                SecurityContextHolder.getContext().setAuthentication(authToken);  
                // Set the authentication object in the SecurityContextHolder, which makes the user authenticated for the current request
            }
        }
        
        chain.doFilter(request, response); // Continue with the filter chain to process the next filter or the requested endpoint
    
}}
