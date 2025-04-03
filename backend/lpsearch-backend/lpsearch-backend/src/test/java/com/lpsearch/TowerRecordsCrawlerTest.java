package com.lpsearch;

import com.lpsearch.crawler.TowerRecordsCrawler;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.springframework.test.util.AssertionErrors.assertFalse;

@SpringBootTest
class TowerRecordsCrawlerTest {

    @Autowired
    private TowerRecordsCrawler towerCrawler;

    @Test
    void testCrawl() {
        List<AlbumDto> result = towerCrawler.crawl("radiohead");

        assertFalse(result.isEmpty());
        result.forEach(album -> {
            System.out.println(album.getTitle() + " - " + album.getArtist());
        });
    }
}
