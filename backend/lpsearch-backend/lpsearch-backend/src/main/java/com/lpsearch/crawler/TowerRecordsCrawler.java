package com.lpsearch.crawler;

import com.lpsearch.domain.Album;
import com.lpsearch.dto.AlbumDto;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Component;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Component
public class TowerRecordsCrawler {

    private static final String BASE_URL = "https://tower.jp/search/item/";

    public List<AlbumDto> crawl(String keyword) {
        List<AlbumDto> results = new ArrayList<>();

        try {
            String searchUrl = BASE_URL + URLEncoder.encode(keyword, StandardCharsets.UTF_8);
            Document doc = Jsoup.connect(searchUrl).userAgent("Mozilla/5.0").get();

            Elements items = doc.select(".TOL-item-search-result-PC-result-tile-display-item");

            for (Element item : items) {
                AlbumDto dto = new AlbumDto();

                // 제목
                String title = item.selectFirst(".TOL-item-search-result-PC-result-display-contents-title a") != null
                        ? item.selectFirst(".TOL-item-search-result-PC-result-display-contents-title a").text()
                        : "제목 없음";

                // 아티스트
                String artist = item.selectFirst(".TOL-item-search-result-PC-result-display-contents-artist-name a") != null
                        ? item.selectFirst(".TOL-item-search-result-PC-result-display-contents-artist-name a").text()
                        : "아티스트 없음";
                // 발매일
                Element releaseElement = item.select("dl.item_detail_list dt:contains(発売日) + dd").first();
                String releaseDate = releaseElement != null ? releaseElement.text() : "";
                // 이미지
                String imageUrl = item.selectFirst(".TOL-item-search-result-PC-result-tile-display-img img") != null
                        ? item.selectFirst(".TOL-item-search-result-PC-result-tile-display-img img").absUrl("src")
                        : "";

                // 상품 링크
                String productUrl = item.selectFirst(".TOL-item-search-result-PC-result-tile-display-img a") != null
                        ? item.selectFirst(".TOL-item-search-result-PC-result-tile-display-img a").attr("href")
                        : "";

                // 가격 (할인가 우선)
                Element priceElement = item.selectFirst(".tr-item-block-info-price span");
                String priceText = priceElement != null
                        ? priceElement.text().replaceAll("[^0-9]", "")
                        : "";
                Integer price = priceText.isEmpty() ? null : Integer.parseInt(priceText);

                // 품절 여부 (카트 버튼 존재 여부)
                boolean soldOut = item.select(".cart-in").isEmpty();

                // 데이터 주입
                dto.setId(UUID.randomUUID());
                dto.setTitle(title);
                dto.setArtist(artist);
                dto.setImageUrl(imageUrl);
                dto.setProductUrl(productUrl);
                dto.setPrice(price);
                dto.setSoldOut(soldOut);
                dto.setSiteName("Tower Records");
                dto.setCurrency("JPY");
                dto.setReleaseDate(releaseDate);

                results.add(dto);
            }

        } catch (Exception e) {
            System.err.println("❌ 크롤링 실패: " + e.getMessage());
            e.printStackTrace();
        }

        return results;
    }

}
