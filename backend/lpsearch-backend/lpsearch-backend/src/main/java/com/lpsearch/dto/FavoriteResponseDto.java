package com.lpsearch.dto;

import com.lpsearch.domain.Album;
import com.lpsearch.domain.AlbumStock;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FavoriteResponseDto {
    private Long id;
    private String title;
    private String artist;
    private String imageUrl;
    private String releaseDate;
    private String productUrl;
    private String siteName;
    private String currency;
    private Integer price;
    private Boolean soldOut;
    private Boolean isFavorite;
    public static FavoriteResponseDto from(Album album) {
        // 가장 최근 AlbumStock (예: 첫 번째)
        AlbumStock stock = album.getStocks().isEmpty() ? null : album.getStocks().get(0);

        return FavoriteResponseDto.builder()
                .id(album.getId()) // 프론트 식별용
                .title(album.getTitle())
                .artist(album.getArtist())
                .imageUrl(album.getCoverImageUrl())
                .releaseDate(album.getReleaseDate())
                .siteName(stock != null ? stock.getSiteName() : null)
                .productUrl(stock != null ? stock.getProductUrl() : null)
                .price(stock != null ? stock.getPrice() : null)
                .currency(stock != null ? stock.getCurrency() : null)
                .soldOut(stock != null ? stock.getSoldOut() : false)
                .isFavorite(true) // 즐겨찾기 목록에서는 항상 true
                .build();
    }

}
