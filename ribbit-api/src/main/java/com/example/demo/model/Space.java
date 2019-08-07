package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import org.hibernate.annotations.NaturalId;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "spaces",uniqueConstraints = {@UniqueConstraint(columnNames = {"name"})})
public class Space {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(max=300)
    private String description;

    @NotNull
    @Size(max=100,min=5)
    @NaturalId
    private String name;

    @ManyToMany(mappedBy = "spaces")
    @JsonBackReference
    private Set<Post> posts = new HashSet<>();

    public Space(String description, String name) {
        this.description = description;
        this.name = name;
    }

    public Space(){

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Post> getPosts() {
        return posts;
    }

    public void setPosts(Set<Post> posts) {
        this.posts = posts;
    }


}
