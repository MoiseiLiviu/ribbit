package com.example.demo.payload;

import com.example.demo.model.DBFile;

public class UserSummary {

    private Long id;

    private String username;

    private String name;

    private DBFile dbFile;

    private Long postsCount;

    private Long totalUpvotes;

    private Long totalDownvotes;

    public UserSummary(Long id, String username, String name) {
        this.id = id;
        this.username = username;
        this.name = name;
    }

    public UserSummary(Long id, String username, String name, Long postsCount,Long totalUpvotes,Long totalDownvotes) {
        this.id = id;
        this.username = username;
        this.name = name;
        this.postsCount = postsCount;
        this.totalDownvotes = totalDownvotes;
        this.totalUpvotes = totalUpvotes;}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getPostsCount() {
        return postsCount;
    }

    public void setPostsCount(Long postsCount) {
        this.postsCount = postsCount;
    }

    public Long getTotalUpvotes() {
        return totalUpvotes;
    }

    public void setTotalUpvotes(Long totalUpvotes) {
        this.totalUpvotes = totalUpvotes;
    }

    public Long getTotalDownvotes() {
        return totalDownvotes;
    }

    public void setTotalDownvotes(Long totalDownvotes) {
        this.totalDownvotes = totalDownvotes;
    }
}
