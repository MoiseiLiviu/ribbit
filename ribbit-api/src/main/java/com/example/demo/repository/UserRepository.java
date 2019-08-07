package com.example.demo.repository;

import com.example.demo.model.Post;
import com.example.demo.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {

    Optional<User> findByEmail(String email);

    Optional<User> findByUsername(String username);

    Optional<User> findByUsernameOrEmail(String username,String email);

    List<User> findByIdIn(List<Long> userIds);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);

    @Query("SELECT COUNT(p.id) FROM Post p WHERE p.createdBy = :userId")
    Long countPostsByUserId(@Param(value = "userId") Long userId);

    @Query("SELECT v.post FROM Vote v WHERE v.type=:type AND v.user.id=:userId")
    Page<Post> getPostsByVoteTypeAndUser(@Param(value ="type")String type, @Param(value ="userId")Long userId, Pageable pageable);

    @Query("SELECT COUNT(p.id) FROM Vote v INNER JOIN v.post p WHERE v.type=:type AND p.createdBy=:userId")
    Long countVotesByTypeAndCreator(@Param(value = "type")String type, @Param(value = "userId")Long userId);

    @Query("SELECT p FROM User u INNER JOIN u.savedPosts p WHERE u.id = :userId")
    Page<Post> getSavedPostsByUser(@Param(value = "userId")Long userId,Pageable pageable);
}
