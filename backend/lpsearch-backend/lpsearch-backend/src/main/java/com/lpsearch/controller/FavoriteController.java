package com.lpsearch.controller;

import com.lpsearch.dto.FavoriteRequestDto;
import com.lpsearch.dto.FavoriteResponseDto;
import com.lpsearch.service.FavoriteService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/favorites")
@RequiredArgsConstructor
public class FavoriteController {
    private final FavoriteService favoriteService;

    @PostMapping("/toggle")
    public void toggleFavorite(@RequestBody FavoriteRequestDto request) {
        favoriteService.toggleFavorite(request);
    }

    @GetMapping("/{userId}")
    public List<FavoriteResponseDto> getFavorites(@PathVariable Long userId) {
        return favoriteService.getFavoriteAlbums(userId);
    }
}