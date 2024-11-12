package com.example.projetintegration.api;
import com.example.projetintegration.models.User;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.POST;
public interface UserApiService {
    @POST("Users/add")
    Call<User> addUser(@Body User user);

}
