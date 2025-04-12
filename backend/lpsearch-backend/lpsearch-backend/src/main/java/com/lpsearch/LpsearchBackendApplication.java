package com.lpsearch;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling

public class LpsearchBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(LpsearchBackendApplication.class, args);
	}

}
