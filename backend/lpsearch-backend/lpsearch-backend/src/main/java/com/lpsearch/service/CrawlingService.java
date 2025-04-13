package com.lpsearch.service;

import com.lpsearch.crawler.TowerRecordsCrawler;
import com.lpsearch.crawler.Yes24Crawler;
import com.lpsearch.dto.AlbumDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.swing.*;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

@Service
@RequiredArgsConstructor
public class CrawlingService {
    private final TowerRecordsCrawler towerRecordsCrawler;
    private final Yes24Crawler yes24Crawler;
    private final RedisSearchService redisSearchService;

    //병렬 처리를 위한 스레드 풀 지정
    private final ExecutorService executor = Executors.newFixedThreadPool(2);
    public List<AlbumDto> searchAlbums(String keyword, boolean excludeSoldOut){
        List<AlbumDto> cached = redisSearchService.getSearchResult(keyword);
        if(cached != null && !cached.isEmpty()){
            System.out.println("Redis에서 검색 결과를 가져옴");
            return filter(cached, excludeSoldOut);
        }
        // Redis에 없으면 병렬로 크롤링 수행
        CompletableFuture<List<AlbumDto>> towerFuture =
                CompletableFuture.supplyAsync(() -> towerRecordsCrawler.crawl(keyword), executor);

        CompletableFuture<List<AlbumDto>> yes24Future =
                CompletableFuture.supplyAsync(() -> yes24Crawler.crawl(keyword), executor);

        // 두 결과를 합치고 Redis에 저장
        List<AlbumDto> result = towerFuture.thenCombine(yes24Future, (tower, yes24) -> {
            tower.addAll(yes24);
            redisSearchService.saveSearchResult(keyword, tower);
            return tower;
        }).join();

        System.out.println("크롤링 후 redis에 저장 완료");

        return result;
    }

    private List<AlbumDto> filter(List<AlbumDto> list, boolean excludeSoldOut){
        if (excludeSoldOut){
            return list.stream().filter(album -> !album.getSoldOut()).toList();
        }
        return list;
    }
}
