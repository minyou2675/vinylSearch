package com.lpsearch.repository;

import com.lpsearch.domain.Album;
import com.lpsearch.domain.Favorite;
import com.lpsearch.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
    Optional<Favorite> findByUserAndAlbum(User user, Album album);
    List<Favorite> findByUser(User user);

    void deleteByUserAndAlbum(User user, Album album);
}
