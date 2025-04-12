package com.lpsearch;

import com.lpsearch.crawler.TowerRecordsCrawler;
import com.lpsearch.dto.AlbumDto;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.redis.core.RedisTemplate;

import java.time.Duration;
import java.util.List;

@SpringBootTest
public class RedisTemplateTest {

    @MockBean
    private RedisTemplate<String, Object> redisTemplate;

    @MockBean
    private TowerRecordsCrawler towerRecordsCrawler;

    public void saveToRedis(List<AlbumDto> albumList, String keyword){
        String key = "search:" + keyword.toLowerCase();
        redisTemplate.opsForValue().set(key, albumList, Duration.ofMinutes(30));
    }

    public List<AlbumDto> getFromRedis(String keyword){
        String key = "search:" + keyword.toLowerCase();
        Object result = redisTemplate.opsForValue().get(key);
        return result != null ? (List<AlbumDto>) result : null;
    }

    @Test
    public void RedisTest(){
        List<AlbumDto> testAlbums = towerRecordsCrawler.crawl("radiohead");
        saveToRedis(testAlbums, "radiohead");

        List<AlbumDto> cached = getFromRedis("radiohead");
        System.out.println("Redis에서 꺼낸 결과 수 :" + cached.size());
    }
}
