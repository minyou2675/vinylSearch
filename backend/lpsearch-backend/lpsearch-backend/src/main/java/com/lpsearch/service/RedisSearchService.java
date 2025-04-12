package com.lpsearch.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.lpsearch.domain.Album;
import com.lpsearch.dto.AlbumDto;
import jakarta.servlet.http.PushBuilder;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RedisSearchService {

    private final RedisTemplate<String, Object> redisTemplate;
    private final ObjectMapper objectMapper;


    private final Duration CACHE_TTL = Duration.ofMinutes(30); //캐시 유효시간

    public void saveSearchResult(String keyword, List<AlbumDto> result){
        String key = makeKey(keyword);
        redisTemplate.opsForValue().set(key, result, CACHE_TTL);
        System.out.println("Active saveSearchResult :"+keyword+" "+result);
    }
    public List<AlbumDto> getSearchResult(String keyword){
        String key = makeKey(keyword);
        Object value = redisTemplate.opsForValue().get(key);
        if(value != null && value instanceof List<?>){
            System.out.println("Active getSearchResult :"+keyword+" "+value);
            return objectMapper.convertValue(value, new TypeReference<List<AlbumDto>>() {});
        }
        return null;
    }
    private String makeKey(String keyword){
        return keyword.trim().toLowerCase();
    }
}
