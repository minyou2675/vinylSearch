package com.lpsearch.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Setter
@Getter
public class AlbumStock {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String siteName;
    private String productUrl;
    private int price;
    private Boolean soldOut;
    private String currency;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "album_id")
    private Album album;
}
