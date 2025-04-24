package com.lpsearch.dto;

import lombok.Data;

@Data
public class FavoriteRequestDto {
    private Long userId;
    private String title;
    private String artist;
    private String imageUrl;
    private String releaseDate;
    private String productUrl;
    private String siteName;
    private String currency;
    private Integer price;
    private Boolean soldOut;
}
