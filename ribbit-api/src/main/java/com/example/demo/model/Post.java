package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="post")
public class Post extends UserDateAudit{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(max=100,min=5)
    @Column(unique = true)
    private String title;

    @Size(max=250)
    private String content;

    @Size(max = 250)
    private String description;

    @ManyToMany(fetch = FetchType.LAZY,cascade = {CascadeType.MERGE,CascadeType.PERSIST})
    @JoinTable(name="posts_spaces",joinColumns = {@JoinColumn(name="question_id",referencedColumnName = "id")}, inverseJoinColumns = {@JoinColumn(name = "tag_id",referencedColumnName = "id")})
    private Set<Space> spaces = new HashSet<>();

    @JsonIgnore
    @OneToOne(fetch = FetchType.LAZY,optional = true)
    @JoinColumn(name = "image_id",referencedColumnName = "id",nullable = true)
    private DBFile image;

    public Post(){

    }

    public Post(@NotNull @Size(max = 100) String title,@NotNull String content,@NotNull @Size(max = 250)String description) {
        this.title = title;
        this.content = content;
        this.description = description;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public Set<Space> getSpaces() {
        return spaces;
    }

    public void setSpaces(Set<Space> spaces) {
        this.spaces = spaces;
    }

    public DBFile getImage() {
        return image;
    }

    public void setImage(DBFile image) {
        this.image = image;
    }
}
