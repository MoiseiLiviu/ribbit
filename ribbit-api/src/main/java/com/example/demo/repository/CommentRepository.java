package com.example.demo.repository;

import com.example.demo.model.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface CommentRepository extends JpaRepository<Comment,Long> {

    Page<Comment> findByPostId(Long postId, Pageable pageable);

    Optional<Comment> findByIdAndPostId(Long id,Long postId);

    @Query("SELECT COUNT(c.id) FROM Comment c WHERE c.post.id=:postId")
    Long countCommentsForPost(@Param(value = "postId")Long postId);
}
