package com.lpsearch;

import com.lpsearch.crawler.Yes24Crawler;
import com.lpsearch.dto.AlbumDto;
import jdk.jfr.Enabled;
import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.io.IOException;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@Disabled
@ExtendWith(MockitoExtension.class)
class Yes24CrawlerTest {

    @InjectMocks
    private Yes24Crawler yes24Crawler;

    @Mock
    private Connection mockConnection;

    @Mock
    private Document mockDocument;

    @BeforeEach
    void setUp() throws IOException {
        Mockito.mockStatic(Jsoup.class)
                .when(() -> Jsoup.connect(Mockito.anyString()))
                .thenReturn(mockConnection);

        when(mockConnection.get()).thenReturn(mockDocument);
    }

    @Test
    void testCrawl_shouldReturnParsedAlbums() throws IOException {
        // Mock 하나의 앨범 아이템
        Element mockAlbumElement = new Element("li");
        mockAlbumElement.html("""
            <div class="itemUnit">
              <div class="item_info">
                <div class="info_row info_name">
                  <a class="gd_name" href="/product/goods/123">Album Title</a>
                </div>
                <div class="info_row info_pubGrp">
                  <span class="authPub info_auth"><a>Dua Lipa</a></span>
                </div>
                <div class="info_row info_price">
                  <strong class="txt_num"><em class="yes_b">57,200</em>원</strong>
                </div>
              </div>
              <div class="item_img">
                <img src="https://image.yes24.com/goods/123/L" />
              </div>
            </div>
        """);

        Elements mockElements = new Elements(mockAlbumElement);
        when(mockDocument.select("#yesSchList .itemUnit")).thenReturn(mockElements);

        // 크롤링 실행
        List<AlbumDto> result = yes24Crawler.crawl("듀아리파");

        // 검증
        assertThat(result).hasSize(1);
        assertThat(result.get(0).getTitle()).contains("Album Title");
        assertThat(result.get(0).getArtist()).contains("Dua Lipa");
        assertThat(result.get(0).getImageUrl()).contains("https://image.yes24.com");
        assertThat(result.get(0).getPrice()).isEqualTo("57200");
    }
}
