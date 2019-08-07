package com.example.demo.controller;

import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.model.DBFile;
import com.example.demo.model.Post;
import com.example.demo.model.User;
import com.example.demo.payload.*;
import com.example.demo.repository.DBFileRepository;
import com.example.demo.repository.PostRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.security.CurrentUser;
import com.example.demo.security.UserPrincipal;
import com.example.demo.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DBFileRepository dbFileRepository;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private PostService postService;

    //Returns short user info (id,username,total upvotes,total downvotes)
    @GetMapping("/me")
    public UserSummary getUserSummary(@CurrentUser UserPrincipal currentUser){
        return new UserSummary(currentUser.getId(),currentUser.getUsername(),currentUser.getName(),userRepository.countPostsByUserId(currentUser.getId()),userRepository.countVotesByTypeAndCreator("positive",currentUser.getId()),userRepository.countVotesByTypeAndCreator("negative",currentUser.getId()));
    }

    //Used for client side validation
    @RequestMapping("/checkUsernameAvailability")
    public UserIdentityAvailabilty checkUsernameAvailability(@RequestParam(value = "username") String username) {
        boolean isAvailable = !userRepository.existsByUsername(username);
        return new UserIdentityAvailabilty(isAvailable);
    }

    //User for client side validation
    @RequestMapping("/checkEmailAvailability")
    public UserIdentityAvailabilty checkEmailAvailability(@RequestParam String email) {
        boolean isAvailable = !userRepository.existsByEmail(email);
        return new UserIdentityAvailabilty(isAvailable);
    }

    @PostMapping("/saved/{postId}")
    public ResponseEntity<?> addSavedPost(@PathVariable Long postId, @CurrentUser UserPrincipal currentUser){
        User user = userRepository.findById(currentUser.getId()).orElseThrow(()->new ResourceNotFoundException("User","Id",currentUser.getId()));
        Post post = postRepository.findById(postId).orElseThrow(()->new ResourceNotFoundException("Post","Id",postId));
        user.getSavedPosts().add(post);
        userRepository.save(user);
        return ResponseEntity.ok().body(new ApiResponse(true,"Post added to saved successfully"));
    }

    @GetMapping("/saved/{username}")
    public PagedResponse<PostResponse> getSavedPosts(@PathVariable String username,@RequestParam(value = "page",defaultValue = "0")int page,@RequestParam(value="size",defaultValue = "5")int size){
        User user = userRepository.findByUsername(username).orElseThrow(()->new ResourceNotFoundException("User","Username",username));
        Page<Post> postPage = userRepository.getSavedPostsByUser(user.getId(),postService.getDefaultPageableRequest(page,size));
        return postService.getPagedResponse(postPage);
    }

    //Get upvoted/downvoted by user posts
    @GetMapping("/{type}/{username}")
    public PagedResponse<PostResponse> getPostsByVoteTypeAndUserId(@PathVariable String username,@RequestParam(value = "page",defaultValue = "0")int page,@RequestParam(value="size",defaultValue = "5")int size,@PathVariable String type){
        User user = userRepository.findByUsername(username).orElseThrow(()->new ResourceNotFoundException("User","Username",username));
        return postService.getPostsByVoteTypeAndUserId(user,type,page,size);
    }

    @GetMapping("/myPosts/{username}")
    public PagedResponse<PostResponse> getPostsByUser(@PathVariable String username,@RequestParam(value="page",defaultValue = "0") int page,@RequestParam(value = "size",defaultValue = "3") int size){
        User user = userRepository.findByUsername(username).orElseThrow(()->new ResourceNotFoundException("User","Username",username));
        return postService.getPostsByUser(user,page,size);
    }

    //Two steps image updating:In this step the server finds the uploaded image id and updates the user.
    @PostMapping("/uploadProfileImage/{imageId}")
    public ApiResponse addImage(@PathVariable String imageId,@CurrentUser UserPrincipal currentUser){
        User user = userRepository.findById(currentUser.getId()).orElseThrow(()->new ResourceNotFoundException("User","Id",currentUser.getId()));
        DBFile oldImage = user.getImage();
        DBFile dbFile = dbFileRepository.findById(imageId).orElseThrow(()->new ResourceNotFoundException("DBFile","Id",imageId));
        user.setImage(dbFile);
        //delete old image if it exists
        if(oldImage!=null){
            dbFileRepository.delete(oldImage);
        }
        userRepository.save(user);

        return new ApiResponse(true,"Image uploaded successfully");
    }

    @GetMapping("/getProfileImage/{username}")
    public ResponseEntity<?> getImage(@PathVariable String username){
        User user = userRepository.findByUsername(username).orElseThrow(()->new ResourceNotFoundException("User","Username",username));
        DBFile dbFile = user.getImage();

        if(dbFile==null){
            return ResponseEntity.badRequest().body("No image found");
        }
            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(dbFile.getFileType()))
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment: filename=\"" + dbFile.getFileName() + "\"")
                    .body(dbFile.getData());

    }

    @GetMapping("/me/avatar")
    public ResponseEntity<?> getCurrentUserProfileImage(@CurrentUser UserPrincipal currentUser){
        User user = userRepository.findByUsername(currentUser.getUsername()).orElseThrow(()->new ResourceNotFoundException("User","Username",currentUser.getUsername()));
        DBFile dbFile = user.getImage();

        if(dbFile==null){
            return ResponseEntity.badRequest().body("No image found");
        }
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(dbFile.getFileType()))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment: filename=\"" + dbFile.getFileName() + "\"")
                .body(dbFile.getData());

    }

    @PutMapping
    public ApiResponse updateUser(@CurrentUser UserPrincipal currentUser,@RequestParam(value = "name")String name,@RequestParam(value = "username")String username){

        User user = userRepository.getOne(currentUser.getId());
        user.setName(name);
        user.setUsername(username);
        userRepository.save(user);

        return new ApiResponse(true,"User updated successfully");
    }

    @GetMapping("/info/{username}")
    public UserSummary getUserInfo(@PathVariable String username){

        User user = userRepository.findByUsername(username).orElseThrow(()->new ResourceNotFoundException("User","Username",username));
        return new UserSummary(user.getId(),user.getUsername(),user.getName(),userRepository.countPostsByUserId(user.getId()),userRepository.countVotesByTypeAndCreator("positive",user.getId()),userRepository.countVotesByTypeAndCreator("negative",user.getId()));
    }
}