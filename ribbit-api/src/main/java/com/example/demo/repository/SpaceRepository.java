package com.example.demo.repository;

import com.example.demo.model.Space;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SpaceRepository extends JpaRepository<Space,Long> {

    Optional<Space> findByName(String name);

    Page<Space> findAll(Pageable pageable);
}
