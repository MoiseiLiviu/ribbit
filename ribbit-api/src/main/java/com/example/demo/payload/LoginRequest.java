package com.example.demo.payload;

import javax.validation.constraints.NotBlank;

public class LoginRequest {

    @NotBlank
    private String password;

    @NotBlank
    private String usernameOrEmail;

    public LoginRequest(@NotBlank String usernameOrEmail,@NotBlank String password) {
        this.password = password;
        this.usernameOrEmail = usernameOrEmail;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUsernameOrEmail() {
        return usernameOrEmail;
    }

    public void setUsernameOrEmail(String usernameOrEmail) {
        this.usernameOrEmail = usernameOrEmail;
    }
}
