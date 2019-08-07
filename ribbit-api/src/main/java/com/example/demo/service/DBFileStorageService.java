package com.example.demo.service;

import com.example.demo.exception.FileStorageException;
import com.example.demo.model.DBFile;
import com.example.demo.repository.DBFileRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class DBFileStorageService {

    @Autowired
    private DBFileRepository dbFileRepository;

    @Autowired
    private UserRepository userRepository;

    public DBFile saveImage(MultipartFile file){
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());

        try{
            if(fileName.contains("..")){
                throw new FileStorageException("Sorry file contains invalid path sequence");
            }
            DBFile dbFile = new DBFile(file.getBytes(),file.getContentType(),fileName);
            return dbFileRepository.save(dbFile);
        }catch (IOException ex){
            throw new FileStorageException("Something went wrong while storing the file");
        }
    }
}
