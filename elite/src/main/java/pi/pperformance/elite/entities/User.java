package pi.pperformance.elite.entities;

import java.io.Serializable;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Transient;
//instead of this importation for the date attribute, I used this so the database can store it from the JSON file: import java.sql.Date; 
import java.util.Date; 



@Entity
public class User implements Serializable {

@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;
private String first_name;
private String last_name;
private String email;
private Date birthDate;
private String role;
private String password;
//to avoid adding this attribute to the database
@Transient
private String confirm_password;


//the enttity constructor
public User(String FN, String LN, String mail, String role, String pwd){
    this.first_name=FN;
    this.last_name=LN;
    this.email=mail;
    this.role=role;
    this.password = pwd;
    this.birthDate = new Date();
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
public void setRole(String role) {
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
public String getRole() {
    return role;
}
public String getPassword() {
    return password;
}
public String getConfirm_password() {
    return confirm_password;
}

    
}
