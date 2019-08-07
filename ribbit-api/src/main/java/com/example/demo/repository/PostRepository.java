package com.example.demo.repository;

import com.example.demo.model.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface PostRepository extends JpaRepository<Post,Long> {

    Optional<Post> findById(Long postId);

    Page<Post> findAll(Pageable pageable);

    List<Post> findByIdIn(List<Long> ids);

    Page<Post> findByIdIn(List<Long> ids,Pageable pageable);

    @Query("SELECT s.posts FROM Space s WHERE s.name = :name")
    Page<Post> getPostsByTag(@Param(value = "name")String name,Pageable pageable);

    Page<Post> findByTitleContaining(String title,Pageable pageable);

    Page<Post> findByCreatedBy(Long userId,Pageable pageable);
}
