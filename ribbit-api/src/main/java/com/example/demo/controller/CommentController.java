package com.example.demo.controller;

import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.model.Comment;
import com.example.demo.payload.CommentResponse;
import com.example.demo.payload.PagedResponse;
import com.example.demo.payload.PostResponse;
import com.example.demo.repository.CommentRepository;
import com.example.demo.repository.PostRepository;
import com.example.demo.service.CommentService;
import com.example.demo.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;


@RestController
@RequestMapping("/api/posts")
public class CommentController {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private CommentService commentService;

    @Autowired
    private PostService postService;

    @PreAuthorize("hasRole('ROLE_USER')")
    @PutMapping("/{postId}/comments/{commentId}")
    public Comment updateComment(@PathVariable(value = "postId") Long postId, @PathVariable(value = "commentId") Long commentId, @RequestBody @Valid Comment commentRequest){


        if(!postRepository.existsById(postId)){
            throw new ResourceNotFoundException("Post","Id",postId);
        }

        return commentRepository.findById(commentId).map(comment->{
            comment.setText(commentRequest.getText());
            return commentRepository.save(comment);
        }).orElseThrow(()->new ResourceNotFoundException("Comment","Id",commentId));
    }

    @PreAuthorize("hasRole('ROLE_USER')")
    @PostMapping("/{postId}/comments")
    public PostResponse createComment(@PathVariable(value = "postId") Long postId, @RequestBody @Valid Comment comment){
        return postRepository.findById(postId).map(post->{
            comment.setPost(post);
            commentRepository.save(comment);
            return postService.getPostResponse(post);
        }).orElseThrow(()->new ResourceNotFoundException("Post","id",postId));
    }

    @GetMapping("/{postId}/comments")
    public PagedResponse<CommentResponse> getCommentsByPost(@PathVariable Long postId,@RequestParam(value = "page",defaultValue = "0")int page,@RequestParam(value = "size",defaultValue = "3")int size){
        return commentService.getCommentsByPost(page,size,postId);
    }
}
