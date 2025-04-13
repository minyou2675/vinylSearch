package com.lpsearch.crawler;

import com.lpsearch.dto.AlbumDto;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Component
public class Yes24Crawler {

    public List<AlbumDto> crawl(String keyword) {
        List<AlbumDto> results = new ArrayList<>();
        try {
            String url = String.format(
                    "https://www.yes24.com/product/search?qdomain=음반&query=%s&domain=MUSIC&dispNo2=003001033",
                    URLEncoder.encode(keyword, StandardCharsets.UTF_8)
            );            System.out.println("URL :"+url);
            Document doc = Jsoup.connect(url)
                    .userAgent("Mozilla/5.0")
                    .get();

            Elements items = doc.select("#yesSchList .itemUnit");

            List<AlbumDto> albums = new ArrayList<>();
            for (Element item : items) {
                AlbumDto dto = new AlbumDto();

                String title = item.selectFirst(".info_name .gd_name") != null
                        ? item.selectFirst(".info_name .gd_name").text()
                        : "";
                String artist = item.selectFirst(".info_pubGrp .info_auth") != null
                        ? item.selectFirst(".info_pubGrp .info_auth").text()
                        : "";
                String priceText = item.selectFirst(".info_price .yes_b") != null
                        ? item.selectFirst(".info_price .yes_b").text().replace(",", "")
                        : "0";

                int price = Integer.parseInt(priceText); // 이제 오류 없음
                String imageUrl = item.selectFirst(".img_item img") != null
                        ? item.selectFirst(".img_item img").attr("src")
                        : "";
                String productUrl = item.selectFirst(".gd_name") != null
                        ? "https://www.yes24.com" + item.selectFirst(".gd_name").attr("href")
                        : "";

                dto.setId(UUID.randomUUID());
                dto.setTitle(title);
                dto.setArtist(artist);
                dto.setImageUrl(imageUrl);
                dto.setProductUrl(productUrl);
                dto.setPrice(price);
                dto.setSoldOut(false);
                dto.setSiteName("Tower Records");
                dto.setCurrency("JPY");
                dto.setReleaseDate("");

                results.add(dto);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        return results;
    }
}
