package com.example.demo.payload;

public class UserIdentityAvailabilty {

    private boolean isAvailable;

    public UserIdentityAvailabilty(boolean isAvailable){
        this.isAvailable = isAvailable;

    }

    public boolean isAvailable() {
        return isAvailable;
    }

    public void setAvailable(boolean available) {
        isAvailable = available;
    }
}
