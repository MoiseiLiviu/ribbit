package com.example.demo.payload;

import com.example.demo.model.Comment;

public class CommentResponse {

    private UserSummary userSummary;

    private Comment comment;

    public CommentResponse(UserSummary userSummary, Comment comment) {
        this.userSummary = userSummary;
        this.comment = comment;
    }

    public UserSummary getUserSummary() {
        return userSummary;
    }

    public void setUserSummary(UserSummary userSummary) {
        this.userSummary = userSummary;
    }

    public Comment getComment() {
        return comment;
    }

    public void setComment(Comment comment) {
        this.comment = comment;
    }
}
