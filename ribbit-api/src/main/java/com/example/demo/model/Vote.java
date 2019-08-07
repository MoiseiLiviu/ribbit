package com.example.demo.model;

import javax.persistence.*;

@Entity
@Table(name="vote",uniqueConstraints = @UniqueConstraint(columnNames = {
        "user_id","post_id"
}))
public class Vote extends DateAudit{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String type;

    @ManyToOne(fetch = FetchType.LAZY,optional = false)
    @JoinColumn(name="user_id",referencedColumnName = "id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY,optional = false)
    @JoinColumn(name="post_id",referencedColumnName = "id")
    private Post post;

    public Vote(String type, User user, Post post) {
        this.type = type;
        this.user = user;
        this.post = post;
    }

    public Vote(){

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Post getPost() {
        return post;
    }

    public void setPost(Post post) {
        this.post = post;
    }
}
