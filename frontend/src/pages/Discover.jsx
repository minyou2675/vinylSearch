import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Star as StarIcon } from "lucide-react";
import React, { useState, useRef, useEffect, useCallback } from "react";
import AuthMenu from "@/components/AuthMenu";
import { useNavigate } from "react-router-dom";
import Logo from "@/components/Logo";
import { getUserInfoFromToken } from "@/lib/utils";

const albumData = [
  {
    id: 1,
    artist: "아티스트",
    title: "음반명 1",
    inStock: true,
    releaseDate: "2025.03.11",
    price: "50,000원",
    currency: "₩",
    isFavorite: true,
  },
  {
    id: 2,
    artist: "아티스트",
    title: "음반명 2",
    inStock: false,
    releaseDate: "2025.03.11",
    price: "60,000원",
    currency: "₩",
    isFavorite: false,
  },
];

const storeData = [
  { id: "all", name: "전체" },
  { id: "TowerRecords", name: "타워레코드" },
  // { id: 2, name: "서울바이닐" },
  { id: "LPLand", name: "LP랜드" },
  { id: "Yes24", name: "YES24" },
];

const navTabs = [
  { id: 1, name: "New Release", value: "new-release" },
  { id: 2, name: "Discover", value: "discover" },
  { id: 3, name: "My Favorite", value: "my-favorite" },
];

export default function Discover() {
  const [results, setResults] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [selectedSite, setSelectedSite] = useState("all");
  const [indicatorPosition, setIndicatorPosition] = useState(0);
  const [hideSoldOut, setHideSoldOut] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pageSize = 10;
  const observerTarget = useRef(null);
  const storeRefs = useRef({});
  const navigate = useNavigate();

  // JWT 토큰 기반 로그인 상태 확인
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userInfo = getUserInfoFromToken(token);
    setIsLoggedIn(!!userInfo);
  }, []);

  const handleSearch = async (page = 0) => {
    if (isLoading) return;
    setIsLoading(true);

    const startTime = performance.now();
    const searchStartTime = new Date().toISOString();

    try {
      const res = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/api/search?keyword=${keyword}&page=${page}&size=${pageSize}&excludeSoldOut=${hideSoldOut}`
      );
      const data = await res.json();

      const endTime = performance.now();
      const searchTime = endTime - startTime;

      // 성능 로깅
      console.log(`[${searchStartTime}] Search Performance Metrics:
        - Total Search Time: ${searchTime.toFixed(2)}ms
        - Keyword: ${keyword}
        - Page: ${page}
        - Results Count: ${data.content.length}
        - Has More: ${data.content.length === pageSize}
      `);

      // 렌더링 시작 시간 측정
      const renderStartTime = performance.now();

      if (page === 0) {
        setResults(data.content);
      } else {
        setResults((prev) => [...prev, ...data.content]);
      }
      setHasMore(data.content.length === pageSize);
      setCurrentPage(page);

      // 렌더링 완료 시간 측정
      const renderEndTime = performance.now();
      console.log(`[${searchStartTime}] Render Performance:
        - Render Time: ${(renderEndTime - renderStartTime).toFixed(2)}ms
        - Total Operation Time: ${(renderEndTime - startTime).toFixed(2)}ms
      `);
    } catch (err) {
      console.error("검색 실패:", err);
      const errorTime = performance.now();
      console.log(`[${searchStartTime}] Error Performance:
        - Time until Error: ${(errorTime - startTime).toFixed(2)}ms
        - Error: ${err.message}
      `);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFavoriteToggle = async (album) => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/favorites/toggle`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            userId: userInfo.userId,
            title: album.title,
            artist: album.artist,
            imageUrl: album.imageUrl,
            releaseDate: album.releaseDate,
            productUrl: album.productUrl,
            siteName: album.siteName,
            currency: album.currency,
            price: album.price,
            soldOut: album.soldOut,
          }),
        }
      );

      if (res.ok) {
        setResults((prevResults) =>
          prevResults.map((item) =>
            item.id === album.id
              ? { ...item, isFavorite: !item.isFavorite }
              : item
          )
        );
      }
    } catch (err) {
      console.error("즐겨찾기 토글 실패:", err);
      if (err.response?.status === 401) {
        // 토큰이 만료된 경우
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        navigate("/login");
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setCurrentPage(0);
      setResults([]);
      handleSearch(0);
    }
  };

  const filteredResults = results.filter((album) => {
    const matchSite =
      selectedSite === "all" ||
      !selectedSite ||
      album.siteName === selectedSite;
    const matchSoldOut = !hideSoldOut || !album.soldOut;
    return matchSite && matchSoldOut;
  });

  const handleStoreClick = (storeId) => {
    setSelectedSite(storeId);
    const node = storeRefs.current[storeId];
    if (node) {
      const indicatorWidth = 2; // indicator의 너비 (2개의 선)
      const indicatorOffset = (node.offsetWidth - indicatorWidth) / 2; // 중앙 정렬을 위한 오프셋
      setIndicatorPosition(node.offsetLeft + indicatorOffset);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          handleSearch(currentPage + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [currentPage, hasMore, isLoading]);

  return (
    <div className="bg-white flex flex-row justify-center w-full min-h-screen">
      <div className="bg-white w-full max-w-screen-xl h-full relative p-4">
        <AuthMenu />
        {/* Left Logo Section */}
        <Logo />

        {/* Right Content */}
        <div className="w-full max-w-[1800px] px-2">
          {/* Search Bar */}
          <div className="mt-10 mb-6">
            <div className="relative h-16 bg-[#b0b0b026] rounded-[17px]">
              <Search className="absolute w-[38px] h-[38px] top-[13px] left-[15px] text-[#848484]" />
              <Input
                className="h-16 pl-16 bg-transparent border-none text-[#848484] text-[23px] placeholder:text-[#848484]"
                placeholder="아티스트 명 혹은 LP음반 명 입력하기"
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
          </div>

          {/* Store Selection */}
          <div className="mb-8">
            <div className="relative h-11 mb-2">
              <div className="h-4 bg-gray-200 rounded-[2px_16px_16px_2px]" />
              {/* 움직이는 Indicator */}
              <div
                className="absolute top-0 flex space-x-1 transition-all duration-300 ease-in-out"
                style={{ left: `${indicatorPosition}px` }}
              >
                <div className="w-1 h-11 bg-gray-300 rounded-sm" />
                <div className="w-1 h-11 bg-gray-300 rounded-sm" />
              </div>
            </div>
            <div className="flex justify-between">
              {storeData.map((store) => (
                <div
                  key={store.id}
                  ref={(el) => (storeRefs.current[store.id] = el)}
                  className={`w-[95px] text-center text-lg cursor-pointer ${
                    selectedSite === store.id
                      ? "font-bold text-black"
                      : "text-[#888]"
                  }`}
                  onClick={() => handleStoreClick(store.id)}
                >
                  {store.name}
                </div>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-6">
            <Tabs defaultValue="discover" className="w-full">
              <TabsList className="bg-transparent gap-8 justify-center">
                {navTabs.map((tab) => (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.value}
                    className="text-xl text-[#5e5e5e] data-[state=active]:font-bold"
                    onClick={() => {
                      if (tab.value === "my-favorite") {
                        if (!isLoggedIn) {
                          navigate("/login");
                        } else {
                          navigate("/favorite");
                        }
                      }
                    }}
                  >
                    {tab.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          <div className="flex items-center mb-4">
            <input
              id="hideSoldOut"
              type="checkbox"
              className="mr-2"
              checked={hideSoldOut}
              onChange={(e) => setHideSoldOut(e.target.checked)}
            />
            <label htmlFor="hideSoldOut" className="text-sm text-gray-700">
              절판 음반 숨기기
            </label>
          </div>

          {/* Album Listings */}
          <Card className="w-full max-w-none border-2 border-black border-opacity-[0.06] rounded-[7px] overflow-hidden">
            <CardContent className="p-0">
              <Table className="w-full table-fixed">
                <TableBody>
                  {filteredResults.map((album, index) => (
                    <React.Fragment key={`${album.id}-${index}`}>
                      <TableRow className="h-[250px] hover:bg-gray-100 cursor-pointer">
                        {/* Album Image */}
                        <TableCell className="w-[400px] p-0">
                          <div className="w-full h-[250px] flex items-center justify-center">
                            <img
                              src={album.imageUrl}
                              alt={`${album.title} cover`}
                              className="w-auto h-full object-contain rounded-md shadow"
                              onError={(e) => {
                                e.target.src =
                                  "https://via.placeholder.com/400x400?text=No+Image";
                              }}
                            />
                          </div>
                        </TableCell>

                        {/* Artist + Title + Favorite */}
                        <TableCell>
                          <div className="flex flex-col items-start mt-4">
                            <StarIcon
                              className={`w-6 h-6 cursor-pointer ${
                                album.isFavorite
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-gray-400"
                              }`}
                              onClick={() => handleFavoriteToggle(album)}
                            />
                            <div className="font-bold text-xl text-black">
                              <div
                                className="truncate max-w-[200px]"
                                title={album.artist}
                              >
                                {album.artist}
                              </div>
                              <div
                                className="truncate max-w-[200px]"
                                title={album.title}
                              >
                                {album.title}
                              </div>
                            </div>
                          </div>
                        </TableCell>

                        {/* 재고 */}
                        <TableCell className="text-center">
                          <div
                            className={`font-bold text-xl ${
                              album.soldOut
                                ? "text-[#d33b59]"
                                : "text-[#3e7eff]"
                            }`}
                          >
                            {album.soldOut ? "절판" : "재고 있음"}
                          </div>
                        </TableCell>

                        {/* 출시일 */}
                        <TableCell className="text-center">
                          <div className="font-bold text-xl mb-2">출시일</div>
                          <div className="opacity-50 text-xl">
                            {album.releaseDate}
                          </div>
                        </TableCell>

                        {/* 판매가 */}
                        <TableCell className="text-center">
                          <div className="font-bold text-xl mb-2">판매가</div>
                          <div className="opacity-50 text-xl">
                            {album.price} {album.currency}
                          </div>
                        </TableCell>

                        {/* 발매가 */}
                        <TableCell className="text-center">
                          <div className="font-bold text-xl mb-2">발매가</div>
                          <div className="opacity-50 text-xl">
                            {album.price} {album.currency}
                          </div>
                        </TableCell>

                        <TableCell className="text-center">
                          <a
                            href={album.productUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline hover:text-blue-800"
                          >
                            바로가기
                          </a>
                        </TableCell>
                      </TableRow>
                      {index < results.length - 1 && (
                        <TableRow>
                          <TableCell colSpan={6} className="p-0">
                            <Separator className="w-full h-px bg-black opacity-10" />
                          </TableCell>
                        </TableRow>
                      )}
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Loading Indicator */}
          <div
            ref={observerTarget}
            className="h-20 flex items-center justify-center"
          >
            {isLoading && <div className="text-gray-500">로딩 중...</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
