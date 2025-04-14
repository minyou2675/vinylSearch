package com.lpsearch;
import com.lpsearch.domain.Album;
import com.lpsearch.domain.Favorite;
import com.lpsearch.domain.User;
import com.lpsearch.dto.FavoriteRequestDto;
import com.lpsearch.repository.AlbumRepository;
import com.lpsearch.repository.AlbumStockRepository;
import com.lpsearch.repository.FavoriteRepository;
import com.lpsearch.repository.UserRepository;
import com.lpsearch.service.FavoriteService;
import jdk.jfr.Enabled;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;

import java.util.*;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

@Disabled
class FavoriteServiceTest {

    private FavoriteRepository favoriteRepository;
    private AlbumRepository albumRepository;
    private AlbumStockRepository albumStockRepository;
    private UserRepository userRepository;
    private FavoriteService favoriteService;

    private User masterUser;

    @BeforeEach
    void setUp() {
        // Mock 빈들 생성
        favoriteRepository = mock(FavoriteRepository.class);
        albumRepository = mock(AlbumRepository.class);
        albumStockRepository = mock(AlbumStockRepository.class);
        userRepository = mock(UserRepository.class);

        favoriteService = new FavoriteService(favoriteRepository, userRepository, albumRepository, albumStockRepository);

        // 마스터 유저 가정
        masterUser = new User();
        masterUser.setId(1L);
        masterUser.setUsername("master");

        when(userRepository.findById(1L)).thenReturn(Optional.of(masterUser));
    }

    @Test
    void testToggleFavorite_whenNewAlbum_shouldCreateFavorite() {
        // given
        FavoriteRequestDto dto = new FavoriteRequestDto();
        dto.setTitle("Test Title");
        dto.setArtist("Test Artist");
        dto.setImageUrl("http://image");
        dto.setReleaseDate("2025-01-01");
        dto.setProductUrl("http://product");
        dto.setSiteName("TowerRecords");
        dto.setCurrency("₩");
        dto.setPrice(10000);
        dto.setSoldOut(false);

        // albumRepository.findByTitleAndArtist
        when(albumRepository.findByTitleAndArtist(dto.getTitle(), dto.getArtist()))
                .thenReturn(Optional.empty());

        Album savedAlbum = new Album();
        savedAlbum.setId(1L);
        savedAlbum.setTitle(dto.getTitle());
        savedAlbum.setArtist(dto.getArtist());

        when(albumRepository.save(any(Album.class))).thenReturn(savedAlbum);
        when(albumStockRepository.existsByProductUrl(dto.getProductUrl())).thenReturn(false);
        when(favoriteRepository.findByUserAndAlbum(eq(masterUser), any(Album.class)))
                .thenReturn(Optional.empty());

        // when
        favoriteService.toggleFavorite(dto);

        // then
        verify(albumRepository, times(1)).save(any(Album.class));
        verify(albumStockRepository, times(1)).save(any());
        verify(favoriteRepository, times(1)).save(any(Favorite.class));
    }

    @Test
    void testToggleFavorite_whenAlreadyExists_shouldRemoveFavorite() {
        // given
        FavoriteRequestDto dto = new FavoriteRequestDto();
        dto.setTitle("Test Title");
        dto.setArtist("Test Artist");

        Album album = new Album();
        album.setId(1L);
        album.setTitle(dto.getTitle());
        album.setArtist(dto.getArtist());

        Favorite favorite = new Favorite();
        favorite.setUser(masterUser);
        favorite.setAlbum(album);

        when(albumRepository.findByTitleAndArtist(dto.getTitle(), dto.getArtist()))
                .thenReturn(Optional.of(album));
        when(albumStockRepository.existsByProductUrl(null)).thenReturn(true);
        when(favoriteRepository.findByUserAndAlbum(masterUser, album))
                .thenReturn(Optional.of(favorite));

        // when
        favoriteService.toggleFavorite(dto);

        // then
        verify(favoriteRepository, times(1)).delete(favorite);
    }
}