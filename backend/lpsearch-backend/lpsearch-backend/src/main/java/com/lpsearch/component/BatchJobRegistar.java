package com.lpsearch.component;

import org.springframework.stereotype.Component;
import org.springframework.beans.factory.InitializingBean;
import lombok.RequiredArgsConstructor;
import com.lpsearch.batch.RedisToDbBatchScheduler;

@Component
@RequiredArgsConstructor
public class BatchJobRegistar implements InitializingBean {
    private final BatchJobRegistry batchJobRegistry;
    private final RedisToDbBatchScheduler redisToDbBatchScheduler;

    @Override
    public void afterPropertiesSet() {
        batchJobRegistry.registerJob(redisToDbBatchScheduler);
    }
}
