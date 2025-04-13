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
import React, { useState } from "react";

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
  { id: 1, name: "타워레코드" },
  { id: 2, name: "서울바이닐" },
  { id: 3, name: "LP랜드" },
  { id: 4, name: "YES24" },
];

const navTabs = [
  { id: 1, name: "New Release", value: "new-release" },
  { id: 2, name: "Discover", value: "discover" },
  { id: 3, name: "My Favorite", value: "my-favorite" },
];

export default function DiscoverTest() {
  const [results, setResults] = useState(albumData);
  const [keyword, setKeyword] = useState("");

  const handleSearch = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/search?keyword=${keyword}`
      );
      const data = await res.json();
      setResults(data);
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

  return (
    <main className="bg-white flex w-full min-h-screen">
      {/* Left Logo Section */}
      <div className="w-[220px] flex items-center justify-center relative">
        <div className="rotate-[-90deg] origin-center">
          <h1 className="text-[120px] sm:text-[160px] lg:text-[200px] font-bold">
          <span className="text-[30px] sm:text-[100px] lg:text-[200px] bottom-[50px] font-bold text-black mr-2">e</span>
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
            <div className="absolute left-0 top-0 flex space-x-1">
              <div className="w-1 h-11 bg-gray-300 rounded-sm" />
              <div className="w-1 h-11 bg-gray-300 rounded-sm" />
            </div>
          </div>
          <div className="flex justify-between">
            {storeData.map((store) => (
              <div key={store.id} className="w-[95px] text-center text-lg">
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

        {/* Album Listings */}
        <Card className="w-full border-2 border-black border-opacity-[0.06] rounded-[7px] overflow-hidden">
          <CardContent className="p-0">
            <Table className="w-full">
              <TableBody>
                {results.map((album, index) => (
                  <React.Fragment key={album.id}>
                    <TableRow className="h-[250px] hover:bg-gray-100 cursor-pointer">
                      {/* Album Image */}
                      <TableCell className="w-[350px] p-0">
                      {album.imageUrl ? (
                            <img
                              src={album.imageUrl}
                              alt={`${album.title} cover`}
                              className="w-[250px] h-[250px] object-cover"
                            />
                          ) : (
                            <div className="w-[190px] h-[190px] bg-[#d9d9d9]" />
                          )}
                      </TableCell>

                      {/* Artist + Title + Favorite */}
                      <TableCell>
  <div className="flex flex-col items-start mt-4">
    {album.isFavorite ? (
      <StarIcon
        onClick={() => handleFavoriteToggle(album.id)}
        className="w-[25px] h-[25px] text-pink-400 mb-2 cursor-pointer"
        fill="currentColor"
        strokeWidth={0}
      />
    ) : (
      <StarIcon
        onClick={() => handleFavoriteToggle(album.id)}
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
                            album.inStock ? "text-[#d33b59]" : "text-[#3e7eff]"
                          }`}
                        >
                          {album.inStock ? "재고 있음" : "절판"}
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
                        <div className="opacity-50 text-xl">{album.price}</div>
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
