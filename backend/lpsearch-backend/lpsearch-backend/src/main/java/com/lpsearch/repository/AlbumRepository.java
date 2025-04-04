package com.lpsearch.repository;

import com.lpsearch.domain.Album;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AlbumRepository extends JpaRepository<Album, Long> {
    List<Album> findByTitleContaining(String keyword);
    Optional<Album> findByTitleAndArtist(String title, String artist);
}
