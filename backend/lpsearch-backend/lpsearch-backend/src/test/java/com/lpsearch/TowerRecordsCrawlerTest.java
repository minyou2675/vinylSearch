package com.lpsearch;

import com.lpsearch.crawler.TowerRecordsCrawler;
import com.lpsearch.dto.AlbumDto;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;


import static org.mockito.Mockito.mock;

@ExtendWith(SpringExtension.class)
@ContextConfiguration(classes = {TowerRecordsCrawlerTest.TestCrawlerConfig.class})
public class TowerRecordsCrawlerTest {

    @Autowired
    private TowerRecordsCrawler towerCrawler;

    @Test
    void testCrawl() {
        // fake or real test data
    }

    @TestConfiguration
    static class TestCrawlerConfig {
        @Bean
        public TowerRecordsCrawler towerRecordsCrawler() {
            return mock(TowerRecordsCrawler.class);
        }
    }
}
