package com.lpsearch.domain;

import jakarta.persistence.*;

import main.java.com.lpsearch.domain.Album;

@Entity
public class AlbumStock {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String siteName;
    private String productUrl;
    private int price;
    private Boolean soldOut;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "album_id")
    private Album album;
}
