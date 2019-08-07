package com.example.demo.service;

import com.example.demo.exception.BadRequestException;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.model.*;
import com.example.demo.payload.PagedResponse;
import com.example.demo.payload.PostResponse;
import com.example.demo.repository.*;
import com.example.demo.security.CurrentUser;
import com.example.demo.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Base64;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private VoteRepository voteRepository;

    @Autowired
    private SpaceRepository spaceRepository;

    @Autowired
    private DBFileRepository dbFileRepository;

    Pageable commentPageable = PageRequest.of(0,3,Sort.Direction.DESC,"createdAt");

    public PagedResponse<PostResponse> getAllPosts(int page,int size){
        validatePage(page,size);

        Page<Post> posts= postRepository.findAll(getDefaultPageableRequest(page,size));
        List<Post> postsList = posts.getContent();
        if(posts.getTotalElements()==0){
            return new PagedResponse<>(Collections.emptyList(),posts.getNumber(),posts.getSize(),posts.getTotalElements(),posts.getTotalPages(),posts.isLast());
        }
        List<PostResponse> responses = getResponseList(postsList);

        return new PagedResponse<>(responses,posts.getNumber(),posts.getSize(),posts.getTotalElements(),posts.getTotalPages(),posts.isLast());
    }

    public PostResponse castVote(UserPrincipal currentUser,Long postId,String type){

        Post post = postRepository.findById(postId).orElseThrow(()->new ResourceNotFoundException("Post","Id",postId));
        User user = userRepository.getOne(currentUser.getId());
        Vote vote = new Vote();
        vote.setPost(post);
        vote.setUser(user);
        vote.setType(type);
    try {
        voteRepository.save(vote);
    }catch (DataIntegrityViolationException ex){
        throw new DataIntegrityViolationException("User already voted this post");
    }
    return getPostResponse(postRepository.findById(postId).get());
    }

    public PagedResponse<PostResponse> getPostsByUser(User user,int page, int size){
        validatePage(page,size);

        Page<Post> postPage = postRepository.findByCreatedBy(user.getId(),getDefaultPageableRequest(page,size));

        List<Post> postList = postPage.getContent();

        return getPagedResponse(postPage);

    }

    public PagedResponse<PostResponse> getPostsBySpace(String name,int page,int size){
        validatePage(page,size);

        Pageable pageable = PageRequest.of(page,size,Sort.Direction.DESC,"name");

        Page<Post> postsPage = postRepository.getPostsByTag(name,pageable);

        return getPagedResponse(postsPage);

     }

    public PagedResponse<PostResponse> searchPostsByTitleContaining(String title,int page,int size){
        validatePage(page,size);

        Page<Post> postPage = postRepository.findByTitleContaining(title,getDefaultPageableRequest(page,size));

        return getPagedResponse(postPage);
    }

    public PagedResponse<PostResponse> getPostsByVoteTypeAndUserId(User user,String type,int page,int size){


        Page<Post> postsPage = userRepository.getPostsByVoteTypeAndUser(type,user.getId(),getDefaultPageableRequest(page,size));

        return getPagedResponse(postsPage);
    }

    public PagedResponse<PostResponse> getPagedResponse(Page<Post> postPage){

        List<Post> posts = postPage.getContent();

        return new PagedResponse<>(getResponseList(posts),postPage.getNumber(),postPage.getSize(),postPage.getTotalElements(),postPage.getTotalPages(),postPage.isLast());
    }

    private List<PostResponse> getResponseList(List<Post> posts){

        return posts.stream().map(post->
                getPostResponse(post)).collect(Collectors.toList());
    }

    public PostResponse getPostResponse(Post post){

        User creator = userRepository.findById(post.getCreatedBy()).orElseThrow(()->new ResourceNotFoundException("User","Id",post.getCreatedBy()));
        int upvotes = voteRepository.getVoteCountByType("positive",post.getId());
        int downvotes = voteRepository.getVoteCountByType("negative",post.getId());
        String base64 = post.getImage()!=null? Base64.getEncoder().encodeToString(post.getImage().getData()):null;

        return new PostResponse(creator.getUsername(),upvotes,downvotes,commentRepository.countCommentsForPost(post.getId()),base64,post);
    }

    public Pageable getDefaultPageableRequest(int page,int size){
        return PageRequest.of(page,size, Sort.Direction.DESC,"createdAt");
    }

    public void validatePage(int page,int size){
        if(page<0){
            throw new BadRequestException("Invalid page number");
        }
        if(size>100){
            throw  new BadRequestException("Invalid page size");
        }
    }
}