package com.lpsearch.service;

import com.lpsearch.domain.Album;
import com.lpsearch.domain.AlbumStock;
import com.lpsearch.domain.Favorite;
import com.lpsearch.domain.User;
import com.lpsearch.dto.AlbumDto;
import com.lpsearch.dto.FavoriteRequestDto;
import com.lpsearch.dto.FavoriteResponseDto;
import com.lpsearch.repository.AlbumRepository;
import com.lpsearch.repository.AlbumStockRepository;
import com.lpsearch.repository.FavoriteRepository;
import com.lpsearch.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

// ✅ FavoriteService
@Service
@RequiredArgsConstructor
public class FavoriteService {
    private final FavoriteRepository favoriteRepository;
    private final UserRepository userRepository;
    private final AlbumRepository albumRepository;
    private final AlbumStockRepository albumStockRepository;

    public void toggleFavorite(FavoriteRequestDto dto) {
        // 고정 마스터 유저
        Long userId = dto.getUserId();
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("사용자 없음"));

        Optional<Album> optionalAlbum = albumRepository.findByTitleAndArtist(dto.getTitle(), dto.getArtist());

        Album album = optionalAlbum.orElseGet(() -> {
            Album newAlbum = new Album();
            newAlbum.setTitle(dto.getTitle());
            newAlbum.setArtist(dto.getArtist());
            newAlbum.setCoverImageUrl(dto.getImageUrl());
            newAlbum.setReleaseDate(dto.getReleaseDate());
            newAlbum.setLastUpdated(LocalDateTime.now());
            return albumRepository.save(newAlbum);
        });

        // 앨범 스톡 정보는 중복 저장하지 않음
        if (dto.getProductUrl() != null && !albumStockRepository.existsByProductUrl(dto.getProductUrl())) {
            AlbumStock stock = new AlbumStock();
            stock.setAlbum(album);
            stock.setSiteName(dto.getSiteName());
            stock.setProductUrl(dto.getProductUrl());
            stock.setPrice(dto.getPrice());
            stock.setCurrency(dto.getCurrency());
            stock.setSoldOut(dto.getSoldOut());
            albumStockRepository.save(stock);
        }

        // 즐겨찾기 추가/삭제
        favoriteRepository.findByUserAndAlbum(user, album).ifPresentOrElse(
                favoriteRepository::delete,
                () -> {
                    Favorite newFav = new Favorite();
                    newFav.setUser(user);
                    newFav.setAlbum(album);
                    newFav.setCreatedAt(LocalDateTime.now());
                    favoriteRepository.save(newFav);
                }
        );
    }

    public List<FavoriteResponseDto> getFavoriteAlbums(Long userId) {
        User user = userRepository.findById(userId).orElseThrow();
        return favoriteRepository.findByUser(user).stream()
                .map(fav -> FavoriteResponseDto.from(fav.getAlbum()))
                .collect(Collectors.toList());
    }
}
