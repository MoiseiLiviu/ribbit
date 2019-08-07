package com.example.demo.repository;

import com.example.demo.model.Vote;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface VoteRepository extends JpaRepository<Vote,Long> {

    @Query("SELECT COUNT(v.id) FROM Vote v WHERE v.post.id=:postId and v.type=:type")
    int getVoteCountByType(@Param("type") String type,@Param("postId") Long postId);

    @Query("SELECT v.post.id FROM Vote v WHERE v.user.id=:userId")
    Page <Long> findPostIdsByUserId(@Param("userId") Long userId, Pageable pageable);

    @Query("SELECT v.post.id FROM Vote v WHERE v.user.id=:userId and v.type='positive'")
    List<Long> findPostsUpvotedByUser(@Param("userId")Long userId);
 }
