package com.lpsearch.service;

import com.lpsearch.domain.Album;
import com.lpsearch.domain.AlbumStock;
import com.lpsearch.dto.AlbumDto;
import com.lpsearch.repository.AlbumRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AlbumSaveService {

    private final AlbumRepository albumRepository;

    public void saveAlbumWithStock(AlbumDto dto) {
        Album album = albumRepository.findByTitleAndArtist(dto.getTitle(), dto.getArtist())
                .orElseGet(() -> {
                    Album newAlbum = new Album();
                    newAlbum.setTitle(dto.getTitle());
                    newAlbum.setArtist(dto.getArtist());
                    newAlbum.setCoverImageUrl(dto.getImageUrl());
                    newAlbum.setLastUpdated(LocalDateTime.now());
                    return newAlbum;
                });

        AlbumStock stock = new AlbumStock();
        stock.setSiteName(dto.getSiteName());
        stock.setProductUrl(dto.getProductUrl());
        stock.setPrice(dto.getPrice());
        stock.setSoldOut(dto.getSoldOut());
        stock.setAlbum(album);

        album.getStocks().add(stock);
        albumRepository.save(album);
    }
}