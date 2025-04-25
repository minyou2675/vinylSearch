package com.lpsearch.component;

import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;
import com.lpsearch.dto.BatchExecutionLog;
import org.springframework.stereotype.Component;

@Component
public class BatchLogStore {
    private final List<BatchExecutionLog> logs = new CopyOnWriteArrayList<>();

    public void addLog(BatchExecutionLog log) {
        logs.add(log);
    }

    public List<BatchExecutionLog> getLogs() {
        return logs;
    }
}
