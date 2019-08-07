package com.example.demo.payload;

import com.example.demo.model.Post;

public class PostResponse {

    private String creatorUsername;
    private int upvotes;
    private int downvotes;
    private Long commentsNumber;
    private String base64;
    private Post post;

    public PostResponse(String creatorUsername, int upvotes, int downvotes, Long commentsNumber, String base64, Post post) {
        this.creatorUsername = creatorUsername;
        this.upvotes = upvotes;
        this.downvotes = downvotes;
        this.commentsNumber = commentsNumber;
        this.base64 = base64;
        this.post = post;
    }

    public int getUpvotes() {
        return upvotes;
    }

    public void setUpvotes(int upvotes) {
        this.upvotes = upvotes;
    }

    public int getDownvotes() {
        return downvotes;
    }

    public void setDownvotes(int downvotes) {
        this.downvotes = downvotes;
    }

    public Long getCommentsNumber() {
        return commentsNumber;
    }

    public void setCommentsNumber(Long commentsNumber) {
        this.commentsNumber = commentsNumber;
    }

    public String getBase64() {
        return base64;
    }

    public void setBase64(String base64) {
        this.base64 = base64;
    }

    public String getCreatorUsername() {
        return creatorUsername;
    }

    public void setCreatorUsername(String creatorUsername) {
        this.creatorUsername = creatorUsername;
    }

    public Post getPost() {
        return post;
    }

    public void setPost(Post post) {
        this.post = post;
    }
}
