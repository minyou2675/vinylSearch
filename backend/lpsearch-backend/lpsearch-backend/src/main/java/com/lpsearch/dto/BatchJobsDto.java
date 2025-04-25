package com.lpsearch.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BatchJobsDto {
    private String jobName;
    private LocalDateTime lastExecutedTime;
    private String lastStatus;

}
