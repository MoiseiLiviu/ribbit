package com.example.demo.payload;

public class FileUploadResponse {

    private String fileName;
    private String contentType;
    private String fileDownloadUri;
    private long size;
    private String id;

    public FileUploadResponse(String id,String fileName, String contentType, String fileDownloadUri, long size) {
        this.id=id;
        this.fileName = fileName;
        this.contentType = contentType;
        this.fileDownloadUri = fileDownloadUri;
        this.size = size;

    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getContentType() {
        return contentType;
    }

    public void setContentType(String contentType) {
        this.contentType = contentType;
    }

    public String getFileDownloadUri() {
        return fileDownloadUri;
    }

    public void setFileDownloadUri(String fileDownloadUri) {
        this.fileDownloadUri = fileDownloadUri;
    }

    public long getSize() {
        return size;
    }

    public void setSize(long size) {
        this.size = size;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}
