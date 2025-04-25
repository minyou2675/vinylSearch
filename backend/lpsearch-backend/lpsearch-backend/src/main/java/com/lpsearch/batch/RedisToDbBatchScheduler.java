package com.lpsearch.batch;

import com.lpsearch.dto.AlbumDto;
import com.lpsearch.service.AlbumSaveService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Set;
import com.lpsearch.service.AlbumSaveService;

@Component
@RequiredArgsConstructor
public class RedisToDbBatchScheduler implements BatchJob {

    private final RedisTemplate<String, Object> redisTemplate;
    private final AlbumSaveService albumSaveService;

    @Override
    public String getJobName() {
        return "RedisToDbBatchScheduler";
    }

    @Override
    public void runNow() {  
        saveRedisSearchResultsToDb();
    }
    // 30분마다 실행 (예시)
    @Scheduled(cron = "0 0/30 * * * *") // 매 30분마다
    public void saveRedisSearchResultsToDb() {
        System.out.println("🔁 Redis → DB 배치 저장 시작");

        // 1. Redis에 있는 모든 search:* 키 찾기
        Set<String> keys = redisTemplate.keys("search:*");

        if (keys == null || keys.isEmpty()) {
            System.out.println("📭 저장할 키 없음");
            return;
        }

        for (String key : keys) {
            Object value = redisTemplate.opsForValue().get(key);
            if (value instanceof List<?>) {
                List<?> rawList = (List<?>) value;

                for (Object obj : rawList) {
                    if (obj instanceof LinkedHashMap) {
                        // Redis에 저장된 JSON -> LinkedHashMap 으로 직렬화되었을 경우
                        AlbumDto dto = convertMapToAlbumDto((LinkedHashMap<?, ?>) obj);
                        albumSaveService.saveAlbumWithStock(dto);
                    } else if (obj instanceof AlbumDto dto) {
                        albumSaveService.saveAlbumWithStock(dto);
                    }
                }
            }

        }

        System.out.println("✅ Redis 데이터 DB 저장 완료");
    }

    private AlbumDto convertMapToAlbumDto(LinkedHashMap<?, ?> map) {
        AlbumDto dto = new AlbumDto();
        dto.setTitle((String) map.get("title"));
        dto.setArtist((String) map.get("artist"));
        dto.setImageUrl((String) map.get("imageUrl"));
        dto.setProductUrl((String) map.get("productUrl"));
        dto.setSiteName((String) map.get("siteName"));
        dto.setPrice((Integer) map.get("price"));
        dto.setSoldOut((Boolean) map.get("soldOut"));
        dto.setCurrency((String) map.get("currency"));
        return dto;
    }
}
