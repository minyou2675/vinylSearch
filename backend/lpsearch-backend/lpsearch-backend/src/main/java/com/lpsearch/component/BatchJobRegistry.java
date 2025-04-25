package com.lpsearch.component;

import com.lpsearch.batch.BatchJob;
import org.springframework.stereotype.Component;
import java.util.List;
import java.util.ArrayList;
import java.util.Optional;

@Component
public class BatchJobRegistry {
    private final List<BatchJob> jobs = new ArrayList<>();

    public void registerJob(BatchJob job) {
        jobs.add(job);
    }

    public List<BatchJob> getJobs() {
        return jobs;
    }

    public Optional<BatchJob> getJobByName(String jobName) {
        return jobs.stream()
            .filter(job -> job.getJobName().equals(jobName))
            .findFirst();
    }
}
