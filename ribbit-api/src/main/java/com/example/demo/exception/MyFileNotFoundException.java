package com.example.demo.exception;

public class MyFileNotFoundException extends RuntimeException{

    public MyFileNotFoundException(String message){
        super(message);
    }
}
