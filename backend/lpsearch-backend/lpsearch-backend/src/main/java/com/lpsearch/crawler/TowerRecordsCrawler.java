package com.lpsearch.crawler;

import com.lpsearch.dto.AlbumDto;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class TowerRecordsCrawler {

    private static final String BASE_URL = "https://tower.jp/search/item/";

    public List<AlbumDto> crawl(String keyword) {
        List<AlbumDto> results = new ArrayList<>();
        try {
            // 검색어 공백 처리 및 URL 구성
            String searchUrl = BASE_URL + keyword.replace(" ", "%20");

            // HTML 가져오기
            Document doc = Jsoup.connect(searchUrl)
                    .userAgent("Mozilla/5.0") // 필요 시 User-Agent 추가
                    .get();

            // 크롤링할 대상 선택
            Elements items = doc.select(".item"); // 여기는 실제 클래스명으로 수정 필요

            for (Element item : items) {
                AlbumDto dto = new AlbumDto();

                // 제목
                dto.setTitle(item.select(".title").text());

                // 아티스트
                dto.setArtist(item.select(".artist").text());

                // 이미지
                dto.setImageUrl(item.select("img").attr("abs:src"));

                // 상품 링크
                String relativeUrl = item.select("a").attr("href");
                dto.setProductUrl("https://tower.jp" + relativeUrl);

                // 가격
                String priceText = item.select(".price").text().replaceAll("[^0-9]", "");
                dto.setPrice(priceText.isEmpty() ? null : Integer.parseInt(priceText));

                // 사이트명
                dto.setSiteName("Tower Records");

                // 통화
                dto.setCurrency("JPY");

                // 품절 여부: 텍스트 내 sold out, 在庫なし 등의 키워드 체크
                String itemText = item.text().toLowerCase();
                dto.setSoldOut(itemText.contains("sold out") || itemText.contains("在庫なし"));

                results.add(dto);
            }

        } catch (Exception e) {
            System.err.println("❌ TowerRecords 크롤링 실패: " + e.getMessage());
            e.printStackTrace();
        }

        return results;
    }
    }
