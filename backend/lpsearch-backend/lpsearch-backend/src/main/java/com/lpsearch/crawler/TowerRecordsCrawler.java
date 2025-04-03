package com.lpsearch.crawler;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Component;

@Component
public class TowerRecordsCrawler {

    public static void main(String[] args) {
        String searchQuery = "검색어"; // 검색하고자 하는 LP의 키워드
        String url = "https://tower.jp/search/item/" + searchQuery;

        try {
            // 웹페이지 가져오기
            Document doc = Jsoup.connect(url).get();

            // 상품 목록 파싱
            Elements products = doc.select(".itemlist .item");

            for (Element product : products) {
                String title = product.select(".title").text();
                String artist = product.select(".artist").text();
                String price = product.select(".price").text();
                String availability = product.select(".availability").text();

                System.out.println("제목: " + title);
                System.out.println("아티스트: " + artist);
                System.out.println("가격: " + price);
                System.out.println("재고 상태: " + availability);
                System.out.println("-----------------------------------");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
