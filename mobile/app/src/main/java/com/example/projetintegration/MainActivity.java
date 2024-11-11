package com.example.projetintegration;

import android.app.DatePickerDialog;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.DatePicker;
import android.widget.EditText;
import android.widget.Spinner;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.example.projetintegration.api.UserApiService;
import com.example.projetintegration.models.User;

import java.util.Calendar;

import retrofit2.Call;
import retrofit2.Callback;  // Import for handling asynchronous responses from Retrofit
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class MainActivity extends AppCompatActivity {

    // Declare UI elements for user input and the register button
    private EditText firstNameInput, lastNameInput, emailInput, birthDateInput, passwordInput, confirmPasswordInput;
    private Spinner roleSpinner;  // Spinner for selecting the user role
    private Button registerButton; // Button to submit the registration form

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // Initialize the UI elements
        firstNameInput = findViewById(R.id.firstNameInput);
        lastNameInput = findViewById(R.id.lastNameInput);
        emailInput = findViewById(R.id.emailInput);
        birthDateInput = findViewById(R.id.birthDateInput);
        roleSpinner = findViewById(R.id.roleSpinner);
        passwordInput = findViewById(R.id.passwordInput);
        confirmPasswordInput = findViewById(R.id.confirmPasswordInput);
        registerButton = findViewById(R.id.registerButton);

        // Set up a click listener for the birth date input to open a date picker dialog
        birthDateInput.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Initialize the calendar to the current date
                Calendar calendar = Calendar.getInstance();
                int year = calendar.get(Calendar.YEAR);
                int month = calendar.get(Calendar.MONTH);
                int day = calendar.get(Calendar.DAY_OF_MONTH);

                // Show a DatePickerDialog to select the birth date
                DatePickerDialog datePickerDialog = new DatePickerDialog(
                        MainActivity.this,
                        new DatePickerDialog.OnDateSetListener() {
                            @Override
                            public void onDateSet(DatePicker view, int selectedYear, int selectedMonth, int selectedDay) {
                                // Format the selected date and display it in the birth date input field
                                String date = selectedDay + "/" + (selectedMonth + 1) + "/" + selectedYear;
                                birthDateInput.setText(date);
                            }
                        },
                        year, month, day);
                datePickerDialog.show();
            }
        });

        // Register button click listener to validate and submit the form data
        registerButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                validateForm();  // Call to validate and process the form data
            }
        });
    }

    /**
     * Validates the form inputs and, if valid, sends the registration data to the server.
     */
    private void validateForm() {
        // Get text input values from EditText fields
        String firstName = firstNameInput.getText().toString().trim();
        String lastName = lastNameInput.getText().toString().trim();
        String email = emailInput.getText().toString().trim();
        String birthDate = birthDateInput.getText().toString().trim();
        String password = passwordInput.getText().toString();
        String confirmPassword = confirmPasswordInput.getText().toString();

        // Check if passwords match
        if (password.equals(confirmPassword)) {
            // Create a new User object with form data
            User newUser = new User(firstName, lastName, email, birthDate, roleSpinner.getSelectedItem().toString(), password);

            // Set up Retrofit for HTTP communication
            Retrofit retrofit = new Retrofit.Builder()
                    .baseUrl("http://192.168.176.1:8084/")  // Localhost IP for Android emulator; use actual server IP for a device
                    .addConverterFactory(GsonConverterFactory.create())  // JSON converter
                    .build();

            // Create an API service instance
            UserApiService apiService = retrofit.create(UserApiService.class);

            // Make the API call to register the new user
            Call<User> call = apiService.addUser(newUser);

            // Enqueue the call to process it asynchronously
            call.enqueue(new Callback<User>() {
                // On successful response from the server
                @Override
                public void onResponse(Call<User> call, Response<User> response) {
                    if (response.isSuccessful()) {
                        // Show a success message and navigate to the WelcomeActivity
                        Toast.makeText(MainActivity.this, "Registration successful", Toast.LENGTH_SHORT).show();
                        Intent intent = new Intent(MainActivity.this, WelcomeActivity.class);
                        startActivity(intent);
                    } else {
                        // Display error message if registration fails
                        Toast.makeText(MainActivity.this, "Registration failed: " + response.message(), Toast.LENGTH_LONG).show();
                    }
                }

                // On failure to connect to the server or receive a response
                @Override
                public void onFailure(Call<User> call, Throwable t) {
                    // Show error message in case of failure
                    Toast.makeText(MainActivity.this, "Error: " + t.getMessage(), Toast.LENGTH_LONG).show();
                }
            });
        } else {
            // Show a message if the passwords do not match
            Toast.makeText(this, "Passwords do not match", Toast.LENGTH_LONG).show();
        }
    }
}
