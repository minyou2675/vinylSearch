import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Star as StarIcon } from "lucide-react";
import React, { useState, useRef } from "react";

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

  const storeRefs = useRef({});



  const handleSearch = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/search?keyword=${keyword}`
      );
      const data = await res.json();
      setResults(data);
      console.log(data);
    } catch (err) {
      console.error("검색 실패:", err);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleFavoriteToggle = (id) => {
    setResults((prevResults) =>
      prevResults.map((album) =>
        album.id === id
          ? { ...album, isFavorite: !album.isFavorite }
          : album
      )
    );
  };

  const filteredResults = results.filter((album) => {
    const matchSite =
      selectedSite === "all" || !selectedSite || album.siteName === selectedSite;
    const notSoldOut = !hideSoldOut || !album.soldOut;
    return matchSite && notSoldOut;
  });
  

  const handleStoreClick = (storeId) => {
    setSelectedSite(storeId);
    const node = storeRefs.current[storeId];
    if (node) {
      // 👉 예: 10px 정도 왼쪽으로 보정
      setIndicatorPosition(node.offsetLeft - 200); 
    }
  };
  
  return (
    <main className="bg-white flex w-full min-h-screen">
      {/* Left Logo Section */}
      <div className="w-[220px] h-screen fixed left-0 top-0 flex items-center justify-center bg-white z-10">
  <div className="rotate-[-90deg] origin-center">
    <h1 className="text-[120px] sm:text-[160px] lg:text-[200px] font-bold">
      <span className="text-[30px] sm:text-[100px] lg:text-[200px] font-bold text-black mr-2">e</span>
      <span className="text-[#065570]">LP</span>
      <span className="text-black">fənt</span>
    </h1>
  </div>
</div>
      

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
                    selectedSite === store.id ? "font-bold text-black" : "text-[#888]"
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
                    <TableRow className="h-[250px] hover:bg-gray-100 cursor-pointer"
                    >
                      {/* Album Image */}
                    <TableCell className="w-[400px] p-0">
                      <img
                        src={album.imageUrl}
                        alt={`${album.title} cover`}
                        className="w-full h-auto max-h-[350px] object-cover rounded-md shadow"
                      />
                    </TableCell>

                      {/* Artist + Title + Favorite */}
                      <TableCell>
  <div className="flex flex-col items-start mt-4">
    {album.isFavorite ? (
      <StarIcon
      onClick={(e) => {
        e.stopPropagation(); // Row 클릭 방지
        handleFavoriteToggle(album.id);
      }}
        className="w-[25px] h-[25px] text-pink-400 mb-2 cursor-pointer"
        fill="currentColor"
        strokeWidth={0}
      />
    ) : (
      <StarIcon
      onClick={(e) => {
        e.stopPropagation(); // Row 클릭 방지
        handleFavoriteToggle(album.id);
      }}
        className="w-[25px] h-[25px] text-[#141218] mb-2 cursor-pointer"
      />
    )}
    <div className="font-bold text-xl text-black">
      {album.artist} + {album.title}
    </div>
  </div>
</TableCell>

                      {/* 재고 */}
                      <TableCell className="text-center">
                        <div
                          className={`font-bold text-xl ${
                            album.soldOut ? "text-[#d33b59]" : "text-[#3e7eff]"
                          }`}
                        >
                          {album.soldOut ? "절판" : "재고 있음"}
                        </div>
                      </TableCell>

                      {/* 출시일 */}
                      <TableCell className="text-center">
                        <div className="font-bold text-xl mb-2">출시일</div>
                        <div className="opacity-50 text-xl">{album.releaseDate}</div>
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
                        <div className="opacity-50 text-xl">{album.price} {album.currency}</div>
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
      </div>
    </main>
  );
}
