package pi.pperformance.elite.entities;

import java.io.Serializable;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Transient;

import java.util.Collection;
//instead of this importation for the date attribute, I used this so the database can store it from the JSON file: import java.sql.Date; 
import java.util.Date;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails; 



@Entity
public class User implements Serializable, UserDetails {

@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;
private String first_name;
private String last_name;
private String email;
private Date birthDate;

@Enumerated(EnumType.STRING)
private Role role;

private String password;
private boolean isActive; 
//to avoid adding this attribute to the database
@Transient
private String confirm_password;


//the enttity constructor
public User(String FN, String LN, String mail, Role role, String pwd,Boolean Active){
    this.first_name=FN;
    this.last_name=LN;
    this.email=mail;
    this.role=role;
    this.password = pwd;
    this.birthDate = new Date();
    this.isActive=false;
}
public void setId(Long id) {
    this.id = id;
}
public void setFirst_name(String first_name) {
    this.first_name = first_name;
}
public void setLast_name(String last_name) {
    this.last_name = last_name;
}
public void setEmail(String email) {
    this.email = email;
}
public void setBirthDate(Date birthDate) {
    this.birthDate = birthDate;
}
public void setRole(Role role) {
    this.role = role;
}
public void setPassword(String password) {
    this.password = password;
}
public void setConfirm_password(String confirm_password) {
    this.confirm_password = confirm_password;
}
public Long getId() {
    return id;
}
public String getFirst_name() {
    return first_name;
}
public String getLast_name() {
    return last_name;
}
public String getEmail() {
    return email;
}
public Date getBirthDate() {
    return birthDate;
}
public Role getRole() {
    return role;
}
public String getPassword() {
    return password;
}
public String getConfirm_password() {
    return confirm_password;
}

public void setIsActive(Boolean isactive) {
    this.isActive = isactive;
}


public boolean getIsActive() {
    return isActive;
}

public User() {
}  

@Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_" + this.role.name()));
    }
    @Override
    public String getUsername() {
        return email;  // Treat email as the username for authentication
    }

  

    @Override
    public boolean isAccountNonExpired() {
        return true;  // Assuming account doesn't expire
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;  // Assuming account is not locked
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;  // Assuming credentials don't expire
    }

    @Override
    public boolean isEnabled() {
        return isActive;  // Account is enabled if active
    }
}
