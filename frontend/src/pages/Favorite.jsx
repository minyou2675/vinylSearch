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
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import AuthMenu from '@/components/AuthMenu';

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

export default function Favorite() {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/favorites/1`, {
          credentials: 'include'
        });
        
        if (!res.ok) {
          navigate('/login');
          return;
        }

        const data = await res.json();
        setFavorites(data);
      } catch (err) {
        console.error("즐겨찾기 목록 가져오기 실패:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavorites();
  }, [navigate]);

  const handleFavoriteToggle = async (album) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/favorites/toggle`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          title: album.title,
          artist: album.artist,
          imageUrl: album.imageUrl,
          releaseDate: album.releaseDate,
          productUrl: album.productUrl,
          siteName: album.siteName,
          currency: album.currency,
          price: album.price,
          soldOut: album.soldOut
        })
      });

      if (res.ok) {
        setFavorites(prevFavorites =>
          prevFavorites.filter(item => item.id !== album.id)
        );
      }
    } catch (err) {
      console.error("즐겨찾기 토글 실패:", err);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="bg-white flex flex-row justify-center w-full min-h-screen">
      <div className="bg-white w-full max-w-screen-xl h-full relative p-4">
        <AuthMenu />
        <div className="w-[220px] h-screen fixed left-0 top-0 flex items-center justify-center bg-white z-10">
          <div className="rotate-[-90deg] origin-center">
            <h1 className="text-[120px] sm:text-[160px] lg:text-[200px] font-bold">
              <span className="text-[30px] sm:text-[100px] lg:text-[200px] font-bold text-black mr-2">
                e
              </span>
              <span className="text-[#065570]">LP</span>
              <span className="text-black">fənt</span>
            </h1>
          </div>
        </div>

        <div className="w-full max-w-[1800px] px-2">
          <h2 className="text-3xl font-bold mb-6">My Favorites</h2>

          <Card className="w-full max-w-none border-2 border-black border-opacity-[0.06] rounded-[7px] overflow-hidden">
            <CardContent className="p-0">
              <Table className="w-full table-fixed">
                <TableBody>
                  {favorites.map((album, index) => (
                    <React.Fragment key={`${album.id}-${index}`}>
                      <TableRow className="h-[250px] hover:bg-gray-100 cursor-pointer">
                        <TableCell className="w-[400px] p-0">
                          <img
                            src={album.imageUrl}
                            alt={`${album.title} cover`}
                            className="w-full h-auto max-h-[350px] object-cover rounded-md shadow"
                          />
                        </TableCell>

                        <TableCell>
                          <div className="flex flex-col items-start mt-4">
                            <StarIcon
                              onClick={(e) => {
                                e.stopPropagation();
                                handleFavoriteToggle(album);
                              }}
                              className="w-[25px] h-[25px] text-pink-400 mb-2 cursor-pointer"
                              fill="currentColor"
                            />
                            <div className="font-bold text-xl text-black">
                              <div className="truncate max-w-[200px]" title={album.artist}>
                                {album.artist}
                              </div>
                              <div className="truncate max-w-[200px]" title={album.title}>
                                {album.title}
                              </div>
                            </div>
                          </div>
                        </TableCell>

                        <TableCell className="text-center">
                          <div
                            className={`font-bold text-xl ${
                              album.soldOut ? "text-[#d33b59]" : "text-[#3e7eff]"
                            }`}
                          >
                            {album.soldOut ? "절판" : "재고 있음"}
                          </div>
                        </TableCell>

                        <TableCell className="text-center">
                          <div className="font-bold text-xl mb-2">출시일</div>
                          <div className="opacity-50 text-xl">
                            {album.releaseDate}
                          </div>
                        </TableCell>

                        <TableCell className="text-center">
                          <div className="font-bold text-xl mb-2">판매가</div>
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
                      {index < favorites.length - 1 && (
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
      </div>
    </div>
  );
}
