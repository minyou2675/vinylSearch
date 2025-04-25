package com.lpsearch.batch;

public interface BatchJob {
    String getJobName();
    void runNow();
}
