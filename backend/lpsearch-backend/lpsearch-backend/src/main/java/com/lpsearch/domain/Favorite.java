package com.lpsearch.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Setter
@Getter
@Table(uniqueConstraints = {@UniqueConstraint(columnNames = {"user_id", "album_id"})})
public class Favorite {

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    private Album album;

    private LocalDateTime createdAt;


}
