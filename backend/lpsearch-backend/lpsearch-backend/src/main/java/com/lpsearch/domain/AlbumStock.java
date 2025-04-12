package com.lpsearch.domain;

import jakarta.persistence.*;
import lombok.Setter;

@Entity
@Setter
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
