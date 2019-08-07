package com.example.demo.service;

import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.model.Comment;
import com.example.demo.model.User;
import com.example.demo.payload.CommentResponse;
import com.example.demo.payload.PagedResponse;
import com.example.demo.payload.UserSummary;
import com.example.demo.repository.CommentRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private PostService postService;

    @Autowired
    private UserRepository userRepository;

    public PagedResponse<CommentResponse> getCommentsByPost(int page,int size,Long postId){
         postService.validatePage(page,size);

        Pageable pageable = PageRequest.of(page,size, Sort.Direction.DESC,"createdAt");

        Page<Comment> commentPage = commentRepository.findByPostId(postId,pageable);

        List<CommentResponse> responseList = commentPage.map(comment -> {
            User user = userRepository.findById(comment.getCreatedBy()).orElseThrow(()->new ResourceNotFoundException("User","Id",comment.getCreatedBy()));
            UserSummary userSummary = new UserSummary(user.getId(),user.getUsername(),user.getName());
            return new CommentResponse(userSummary,comment);
        }).getContent();

        return new PagedResponse<>(responseList,commentPage.getNumber(),commentPage.getSize(),commentPage.getTotalElements(),commentPage.getTotalPages(),commentPage.isLast());
    }
}
