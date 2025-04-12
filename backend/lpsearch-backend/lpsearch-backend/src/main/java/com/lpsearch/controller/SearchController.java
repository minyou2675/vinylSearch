package com.lpsearch.controller;

import com.lpsearch.dto.AlbumDto;
import com.lpsearch.service.CrawlingService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class SearchController {

    private final CrawlingService crawlingService;

    @GetMapping("/search")
    public List<AlbumDto> search(
        @RequestParam String keyword,
        @RequestParam(defaultValue = "true") boolean excludeSoldOut
    ){
        return crawlingService.searchAlbums(keyword, excludeSoldOut);
    }

}
