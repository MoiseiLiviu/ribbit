package com.example.demo.controller;

import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.model.Space;
import com.example.demo.repository.SpaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/spaces")
public class SpaceController {

    @Autowired
    private SpaceRepository spaceRepository;

    @PostMapping
    public Space createSpace(@Valid @RequestBody Space spaceRequest){
        Space space = new Space();
        space.setDescription(spaceRequest.getDescription());
        space.setName(spaceRequest.getName());
        try {
            return spaceRepository.save(space);
        }catch (DataIntegrityViolationException ex){
            throw new DataIntegrityViolationException("Space with this name already exists");
        }

    }

    @GetMapping
    public List<Space> getAllSpaces(@RequestParam(value = "page",defaultValue = "0")int page, @RequestParam(value = "size",defaultValue = "15")int size){
        Pageable pageable = PageRequest.of(page,size);
        return spaceRepository.findAll(pageable).getContent();
    }

    @GetMapping("/byName/{name}")
    public Space getSpaceByName(@PathVariable String name){
        return spaceRepository.findByName(name).orElseThrow(()->new ResourceNotFoundException("Space","Name",name));
    }
}
