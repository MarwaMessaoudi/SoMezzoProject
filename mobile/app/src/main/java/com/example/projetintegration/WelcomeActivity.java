package com.example.projetintegration;

import android.os.Bundle;
import android.widget.TextView;
import androidx.appcompat.app.AppCompatActivity;

public class WelcomeActivity extends AppCompatActivity {

    private TextView welcomeMessage;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_welcome);

        welcomeMessage = findViewById(R.id.welcomeMessage);

        // Récupère le prénom transmis depuis RegistrationActivity
        String firstName = getIntent().getStringExtra("FIRST_NAME");

        // Affiche le message de bienvenue personnalisé
        welcomeMessage.setText("Bonjour " + firstName + "!");
    }
}
