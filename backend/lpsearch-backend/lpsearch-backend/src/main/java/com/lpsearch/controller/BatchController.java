package com.lpsearch.controller;

import com.lpsearch.component.BatchJobRegistry;
import com.lpsearch.component.BatchLogStore;
import com.lpsearch.dto.BatchExecutionLog;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.lpsearch.batch.BatchJob;
import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import com.lpsearch.dto.BatchJobsDto;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/batch")
public class BatchController {
    private final BatchJobRegistry registry;
    private final BatchLogStore logStore;

    @GetMapping
    public List<BatchJobsDto> getJobStatusList() {
        return registry.getJobs().stream()
                .map(job -> {
                    List<BatchExecutionLog> logs = logStore.getLogs().stream()
                            .filter(log -> log.getBatchName().equals(job.getJobName()))
                            .sorted(Comparator.comparing(BatchExecutionLog::getEndTime).reversed())
                            .toList();

                    BatchExecutionLog last = logs.isEmpty() ? null : logs.get(0);
                    System.out.println("job.getJobName() =====> "+job.getJobName());
                    return new BatchJobsDto(
                            job.getJobName(),
                            last != null ? last.getEndTime() : null,
                            last != null ? last.getStatus() : "N/A"
                    );
                }).toList();
    }

    @GetMapping("/{jobName}/logs")
    public List<BatchExecutionLog> getLogs(@PathVariable String jobName) {
        System.out.println("getLogs =====> "+jobName);
        return logStore.getLogs().stream()
                .filter(log -> log.getBatchName().equals(jobName))
                .sorted(Comparator.comparing(BatchExecutionLog::getEndTime).reversed())
                .toList();
    }

    @PostMapping("/{jobName}/run")
    public ResponseEntity<String> runJob(@PathVariable String jobName) {
        var jobOpt = registry.getJobByName(jobName);
        if (jobOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        LocalDateTime startTime = LocalDateTime.now();
        String status = "Success";
        String message = "작업 성공";

        try {
            jobOpt.get().runNow();
        } catch (Exception e) {
            status = "Failed";
            message = "작업 실패: " + e.getMessage();
        }

        logStore.addLog(new BatchExecutionLog(jobName, startTime, LocalDateTime.now(), status, message));

        return ResponseEntity.ok("[" + jobName + "] " + "실행 완료.");
    }
}
