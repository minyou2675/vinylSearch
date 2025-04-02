package main.java.com.lpsearch.domain;

import com.lpsearch.domain.AlbumStock;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Album {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String artist;
    private String coverImageUrl;
    private LocalDateTime lastUpdated;

    @OneToMany(mappedBy = "album", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<AlbumStock> stocks = new ArrayList<>();

}
