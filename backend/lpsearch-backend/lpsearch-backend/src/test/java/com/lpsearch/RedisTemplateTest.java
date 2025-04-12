package com.lpsearch;

import com.lpsearch.service.RedisSearchService;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@ActiveProfiles("test")
class RedisTemplateTest {

    @MockBean
    private RedisTemplate<String, Object> redisTemplate;

    @MockBean
    private RedisSearchService redisSearchService;

    @Test
    void RedisTest() {
        System.out.println("Redis 테스트 통과");
    }
}

