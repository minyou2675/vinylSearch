package com.lpsearch.repository;


import com.lpsearch.domain.Site;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SiteRepository extends JpaRepository<Site,Long> {
}
