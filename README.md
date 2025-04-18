
---

## 기술 스택

### Backend
- Java 17
- Spring Boot 3
- Spring Data JPA
- Redis (검색 캐싱)
- MySQL (RDBMS)
- Jsoup (크롤링)

### Frontend
- React + Vite
- Tailwind CSS
- Shadcn UI
- Lucide Icons

### DevOps
- Docker Compose
- GitHub Actions (CI/CD //현재 CD부분 설계중)

---

## 데이터 모델

### 엔티티 관계

- **User**
  - 사용자 정보 (현재는 마스터 계정 기반 테스트)
- **Album**
  - 앨범 기본 정보 (title, artist, releaseDate 등)
- **AlbumStock**
  - 사이트별 판매 정보 (siteName, productUrl, price, soldOut 등)
- **Favorite**
  - 사용자-앨범 즐겨찾기 관계

---

## REST API 명세 (일부)

### [POST] `/api/search`
- LP 앨범 키워드 검색 (Redis 캐싱 우선)

### [POST] `/api/favorites/toggle`
- 즐겨찾기 토글 (등록/해제)

### [GET] `/api/favorites/{userId}`
- 특정 유저의 즐겨찾기 앨범 목록 조회
  
### [POST] `/api/auth/signup`
- 회원가입
  
### [POST] `/api/auth/login`
- 로그인 / 세션 생성
  
---

## 크롤링 전략

- Jsoup 기반 HTML 파싱
- `TowerRecordsCrawler`, `Yes24Crawler` 각각 구현(+추후 추가예쩡)
- `CrawlingService`에서 병렬 실행
- 검색어 기반 크롤링 후 Redis에 저장 (TTL 설정)
- Batch Scheduling을 이용하여 Redis 데이터를 주기적으로 DB에 이관

---

## 프론트엔드 주요 기능

- LP 앨범 검색창
- 사이트별 탭 필터링 및 강조 애니메이션
- `재고 있음/절판` 상태 표시
- `절판 숨기기` 체크박스
- 즐겨찾기 토글 및 강조
- `productUrl` 바로가기 링크
- 무한 스크롤 로딩

---
## 시퀀스 다이어그램
```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant API
    participant Backend
    participant DB
    participant Redis

    %% 로그인/회원가입 시퀀스
    User->>Frontend: 로그인/회원가입 요청
    Frontend->>API: 인증 API 호출
    API->>Backend: AuthController
    Backend->>DB: 사용자 정보 조회/저장
    DB-->>Backend: 사용자 데이터
    Backend-->>API: JWT 토큰 발급
    API-->>Frontend: 인증 결과
    Frontend->>Frontend: 인증 상태 업데이트
    Frontend-->>User: 로그인/회원가입 완료

    %% 즐겨찾기 시퀀스
    User->>Frontend: 즐겨찾기 페이지 접근
    Frontend->>API: 인증 상태 확인
    alt 미인증
        API-->>Frontend: 401 응답
        Frontend-->>User: 로그인 페이지로 리다이렉트
    else 인증됨
        Frontend->>API: 즐겨찾기 목록 요청
        API->>Backend: FavoriteController
        Backend->>DB: 즐겨찾기 데이터 조회
        DB-->>Backend: 즐겨찾기 목록
        Backend-->>API: JSON 응답
        API-->>Frontend: 즐겨찾기 목록
        Frontend-->>User: 즐겨찾기 목록 표시
    end

    %% 검색 시퀀스
    User->>Frontend: 검색어 입력
    Frontend->>API: 검색 요청
    API->>Backend: SearchController
    Backend->>Redis: 캐시 확인
    alt 캐시 히트
        Redis-->>Backend: 캐시된 데이터
    else 캐시 미스
        Backend->>Backend: 병렬 크롤링
        Backend->>Redis: 결과 캐싱
    end
    Backend-->>API: 페이지네이션된 결과
    API-->>Frontend: JSON 응답
    Frontend-->>User: 검색 결과 표시

    %% 즐겨찾기 토글 시퀀스
    User->>Frontend: 즐겨찾기 토글
    Frontend->>API: 토글 요청
    API->>Backend: FavoriteController
    Backend->>DB: 즐겨찾기 상태 업데이트
    DB-->>Backend: 업데이트 결과
    Backend-->>API: 성공 응답
    API-->>Frontend: 토글 결과
    Frontend->>Frontend: UI 업데이트
    Frontend-->>User: 즐겨찾기 상태 변경 표시



---

## 향후 개선사항

~~- 사용자 로그인 및 세션 기반 즐겨찾기 저장~~(업데이트 완료)
~~- 검색 결과 무한 스크롤 API 및 UI 구현~~(업데이트 완료)
- 모바일 UI 대응
- 실시간 검색어
- 다국어 대응(영어/한국어)

---

## 스크린샷
![메인화면](https://github.com/user-attachments/assets/5ab2465f-7c27-4b32-8274-6bc7b648cbcd)
<p align="center">메인화면</p>

![크롤링 기반 검색화면](https://github.com/user-attachments/assets/25fbcdb6-882d-4b87-b7b6-aa48ecad7315)
<p align="center">크롤링검색</p>

![즐겨찾기 화면](https://github.com/user-attachments/assets/c73476b7-118d-4d87-8296-45311563900a)
<p align="center">나의 즐겨찾기 화면</p>

![마이페이지 화면](https://github.com/user-attachments/assets/85a8a42d-aadf-443b-9608-d4b7fb28c71d)
<p align="center">마이페이지 화면 </p>
---

## 개발자

- 김유민 (Yumin Kim)
- GitHub: [github.com/minyou2675](https://github.com/minyou2675)
- 기술 스택: Java, Spring Boot, React, Docker, MySQL, Redis
