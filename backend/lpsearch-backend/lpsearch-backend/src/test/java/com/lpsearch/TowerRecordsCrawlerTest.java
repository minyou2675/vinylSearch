package com.lpsearch;

import com.lpsearch.crawler.TowerRecordsCrawler;
import com.lpsearch.dto.AlbumDto;
import com.lpsearch.repository.AlbumRepository;
import com.lpsearch.repository.AlbumStockRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.List;

import static org.springframework.test.util.AssertionErrors.assertFalse;

@SpringBootTest
class TowerRecordsCrawlerTest {

    @Autowired
    private TowerRecordsCrawler towerCrawler;
    
    @Test
    void testCrawl() {
        List<AlbumDto> result = towerCrawler.crawl("radiohead");

        assertFalse("크롤링 결과가 비어 있습니다!",result.isEmpty());
        result.forEach(album -> {
            System.out.println(album.getTitle() + " - " + album.getArtist());
        });
    }
}
