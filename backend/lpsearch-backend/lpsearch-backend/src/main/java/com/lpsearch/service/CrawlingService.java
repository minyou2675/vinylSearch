package com.lpsearch.service;

import com.lpsearch.crawler.TowerRecordsCrawler;
import com.lpsearch.dto.AlbumDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.swing.*;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CrawlingService {
    private final TowerRecordsCrawler towerRecordsCrawler;
    private final RedisSearchService redisSearchService;

    public List<AlbumDto> searchAlbums(String keyword, boolean excludeSoldOut){
        List<AlbumDto> cached = redisSearchService.getSearchResult(keyword);
        if(cached != null && !cached.isEmpty()){
            System.out.println("Redis에서 검색 결과를 가져옴");
            return filter(cached, excludeSoldOut);
        }
        List<AlbumDto> crawled = towerRecordsCrawler.crawl(keyword);
        redisSearchService.saveSearchResult(keyword, crawled);
        System.out.println("크롤링 후 redis에 저장 완료");

        return filter(crawled, excludeSoldOut);
    }

    private List<AlbumDto> filter(List<AlbumDto> list, boolean excludeSoldOut){
        if (excludeSoldOut){
            return list.stream().filter(album -> !album.getSoldOut()).toList();
        }
        return list;
    }
}
