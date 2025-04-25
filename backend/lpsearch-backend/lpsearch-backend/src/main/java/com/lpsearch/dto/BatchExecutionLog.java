package com.lpsearch.dto;

import java.time.LocalDateTime;
import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BatchExecutionLog {
    private String batchName;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private String status;
    private String message;
}
