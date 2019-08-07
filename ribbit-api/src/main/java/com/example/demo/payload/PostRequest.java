package com.example.demo.payload;

import javax.persistence.Column;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class PostRequest {

    @NotNull
    @Size(max=100)
    @Column(unique = true)
    private String title;

    @NotNull
    private String content;

    @NotNull
    @Size(max = 250)
    private String description;

    private String[] spaces;

    private String image_id;

    public PostRequest(@NotNull @Size(max = 100) String title, @NotNull String content, @NotNull @Size(max = 250) String description, String[] spaces) {
        this.title = title;
        this.content = content;
        this.description = description;
        this.spaces = spaces;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String[] getSpaces() {
        return spaces;
    }

    public void setSpaces(String[] spaces) {
        this.spaces = spaces;
    }

    public String getImage_id() {
        return image_id;
    }

    public void setImage_id(String image_id) {
        this.image_id = image_id;
    }
}
