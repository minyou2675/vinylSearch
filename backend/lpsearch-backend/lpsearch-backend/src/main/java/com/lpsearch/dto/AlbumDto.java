package com.lpsearch.dto;

import lombok.Data;

@Data
public class AlbumDto {
    private String title;         // 앨범명
    private String artist;        // 아티스트명
    private String imageUrl;      // 앨범 커버 이미지
    private String siteName;      // 판매 사이트 이름 (ex. Tower Records)
    private String productUrl;    // 해당 앨범의 구매 링크
    private Integer price;        // 가격 (단위: 엔 or 원)
    private Boolean soldOut;      // 절판 여부 (true = 품절)
    private String currency;      // 통화 (ex. JPY, KRW 등)
    private String releaseDate;   // 발매일
}
