package com.example.demo.controller;

import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.model.DBFile;
import com.example.demo.model.Post;
import com.example.demo.model.Space;
import com.example.demo.payload.ApiResponse;
import com.example.demo.payload.PagedResponse;
import com.example.demo.payload.PostRequest;
import com.example.demo.payload.PostResponse;
import com.example.demo.repository.DBFileRepository;
import com.example.demo.repository.PostRepository;
import com.example.demo.repository.SpaceRepository;
import com.example.demo.security.CurrentUser;
import com.example.demo.security.UserPrincipal;
import com.example.demo.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.HashSet;
import java.util.Set;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private PostService postService;

    @Autowired
    private SpaceRepository spaceRepository;

    @Autowired
    private DBFileRepository dbFileRepository;

    @PostMapping
    public ResponseEntity createPost(@RequestBody PostRequest postRequest){

        Post post = new Post(postRequest.getTitle(),postRequest.getContent(),postRequest.getDescription());
        Set<Space> spaceSet = new HashSet<>();
        String[] spaces = postRequest.getSpaces();
        if(spaces.length>0){
            for(String space:spaces){
                Space space1 = spaceRepository.findByName(space).orElseThrow(()->new ResourceNotFoundException("Space","Name",space));
                space1.getPosts().add(post);
                spaceSet.add(space1);
            }
        }
        if(postRequest.getImage_id().length()>0){
            DBFile image = dbFileRepository.findById(postRequest.getImage_id()).orElseThrow(()->new ResourceNotFoundException("Image","Id",postRequest.getImage_id()));
            post.setImage(image);
        }
        post.setSpaces(spaceSet);
        postRepository.save(post);

        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/api/posts/{id}")
                .buildAndExpand(2).toUri();

        return ResponseEntity.created(location).body(new ApiResponse(true,"Post created successfully."));
    }

    @PutMapping("/{postId}")
    public Post updatePost(@PathVariable Long postId, @RequestBody Post postRequest){
        return postRepository.findById(postId).map(post->{
            post.setTitle(postRequest.getTitle());
            post.setDescription(postRequest.getDescription());
            post.setContent(postRequest.getContent());
            return postRepository.save(post);
        }).orElseThrow(()->new ResourceNotFoundException("Post","id",postId));
    }

    @DeleteMapping("/{postId}")
    public ResponseEntity<?> deletePost(@PathVariable Long id){
        return postRepository.findById(id).map(post->{
            postRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }).orElseThrow(()->new ResourceNotFoundException("Post","id",id));
    }

    @GetMapping
    public PagedResponse<PostResponse> getAllPosts(@RequestParam(value="page",defaultValue = "0") int page,@RequestParam(value = "size",defaultValue = "3") int size){
        return postService.getAllPosts(page,size);
    }

    @PreAuthorize("hasRole('ROLE_USER')")
    @PostMapping("/{postId}/votes")
    public PostResponse castVote(@RequestParam(value = "type") String type, @PathVariable(value = "postId") Long postId, @CurrentUser UserPrincipal currentUser){

       return postService.castVote(currentUser,postId,type);

    }

    @GetMapping("/bySpace/{spaceName}")
    public PagedResponse<PostResponse> getPostsBySpace(@PathVariable String spaceName,@RequestParam(value="page",defaultValue = "0") int page,@RequestParam(value = "size",defaultValue = "3") int size){

        return postService.getPostsBySpace(spaceName,page,size);
    }

    @GetMapping("/search")
    public PagedResponse<PostResponse> searchPostsByTitleInclusive(@RequestParam(value = "title")String title,@RequestParam(value="page",defaultValue = "0") int page,@RequestParam(value = "size",defaultValue = "3") int size){

        return postService.searchPostsByTitleContaining(title,page,size);
    }

}
