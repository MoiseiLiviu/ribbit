package com.example.demo.controller;

import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.model.DBFile;
import com.example.demo.payload.FileUploadResponse;
import com.example.demo.repository.DBFileRepository;
import com.example.demo.service.DBFileStorageService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@RestController
@RequestMapping("/api")
public class FileController {

    @Autowired
    private DBFileStorageService dbFileStorageService;

    @Autowired
    private DBFileRepository dbFileRepository;

    private Logger logger = LoggerFactory.getLogger(FileController.class);

    @PostMapping("/uploadImage")
    public FileUploadResponse uploadImage(@RequestParam("file") MultipartFile file) {
        DBFile dbFile = dbFileStorageService.saveImage(file);

        String downloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/downloadFile/{id}").buildAndExpand(dbFile.getId())
                .toUriString();
        return new FileUploadResponse(dbFile.getId(), dbFile.getFileName(), dbFile.getFileType(), downloadUri, file.getSize());
    }

    @GetMapping("/getImage/{imageId}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<byte[]> getFile(@PathVariable String imageId) {


        DBFile dbFile = dbFileRepository.findById(imageId).orElseThrow(()->new ResourceNotFoundException("Image","Id",imageId));

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(dbFile.getFileType()))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment: filename=\"" + dbFile.getFileName() + "\"")
                .body(dbFile.getData());
    }

}
