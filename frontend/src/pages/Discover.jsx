import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Star as StarIcon } from "lucide-react";
import React from "react";

// Data for album listings
const albumData = [
  {
    id: 1,
    artist: "아티스트 - 음반명",
    inStock: true,
    releaseDate: "2025.03.11",
    salePrice: "50,000원",
    releasePrice: "70,000원",
    isFavorite: true,
  },
  {
    id: 2,
    artist: "아티스트 - 음반명",
    inStock: false,
    releaseDate: "2025.03.11",
    salePrice: "50,000원",
    releasePrice: "70,000원",
    isFavorite: false,
  },
  {
    id: 3,
    artist: "아티스트 - 음반명",
    inStock: true,
    releaseDate: "2025.03.11",
    salePrice: "50,000원",
    releasePrice: "70,000원",
    isFavorite: false,
  },
];

// Data for store tabs
const storeData = [
  { id: 1, name: "타워레코드" },
  { id: 2, name: "서울바이닐" },
  { id: 3, name: "LP랜드" },
  { id: 4, name: "YES24" },
];

// Navigation tabs data
const navTabs = [
  { id: 1, name: "New Release", value: "new-release" },
  { id: 2, name: "Discover", value: "discover" },
  { id: 3, name: "My Favorite", value: "my-favorite" },
];

export default function Desktop() {
  return (
    <main className="bg-white flex flex-row justify-center w-full min-h-screen">
      <div className="bg-white w-full max-w-[1440px] relative">
        {/* Logo Section */}
        <div className="absolute left-0 top-0 h-full w-[200px] flex flex-col items-center">
          <div className="rotate-[-90deg] origin-center mt-[350px]">
            <h1 className="text-[200px] font-bold">
              <span className="text-[#065570]">LP</span>
              <span className="text-black">fənt</span>
            </h1>
          </div>
        </div>

        {/* Main Content */}
        <div className="ml-[300px] mr-[50px] pt-[100px]">
          {/* Search Bar */}
          <div className="mb-10">
            <div className="relative h-16 bg-[#b0b0b026] rounded-[17px]">
              <Search className="absolute w-[38px] h-[38px] top-[13px] left-[15px] text-[#848484]" />
              <Input
                className="h-16 pl-16 bg-transparent border-none text-[#848484] text-[23px] placeholder:text-[#848484]"
                placeholder="아티스트 명 혹은 LP음반 명 입력하기"
              />
            </div>
          </div>

          {/* Store Selection */}
          <div className="mb-10">
            <div className="relative h-11 mb-2">
              <div className="h-4 bg-color-background-default-tertiary rounded-[2px_16px_16px_2px] relative">
                <div className="absolute w-1 h-1 top-1.5 left-1.5 bg-[#4a4459] rounded-sm" />
                <div className="absolute w-1 h-1 top-1.5 left-[308px] bg-[#4a4459] rounded-sm" />
                <div className="absolute w-1 h-1 top-1.5 left-[610px] bg-[#4a4459] rounded-sm" />
                <div className="absolute w-1 h-1 top-1.5 left-[909px] bg-[#4a4459] rounded-sm" />
              </div>
              <div className="absolute left-0 top-0 flex space-x-1">
                <div className="w-1 h-11 bg-color-background-neutral-default rounded-sm" />
                <div className="w-1 h-11 bg-color-background-neutral-default rounded-sm" />
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

          {/* Navigation Tabs */}
          <div className="absolute left-[60px] top-[356px] rotate-[-90deg] origin-top-left">
            <Tabs defaultValue="discover" className="w-[546px]">
              <TabsList className="bg-transparent gap-8">
                {navTabs.map((tab) => (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.value}
                    className={`text-3xl text-[#5e5e5e] data-[state=active]:font-bold data-[state=active]:bg-transparent data-[state=active]:shadow-none`}
                  >
                    {tab.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          {/* Album Listings */}
          <Card className="border-2 border-black border-opacity-[0.06] rounded-[7px] overflow-hidden">
            <CardContent className="p-0">
              <Table>
                <TableHeader className="hidden">
                  <TableRow>
                    <TableHead>Album</TableHead>
                    <TableHead>Artist</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Release Date</TableHead>
                    <TableHead>Sale Price</TableHead>
                    <TableHead>Release Price</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {albumData.map((album, index) => (
                    <React.Fragment key={album.id}>
                      <TableRow className="h-[190px] hover:bg-transparent">
                        <TableCell className="w-[190px] p-0">
                          <div className="w-[190px] h-[190px] bg-[#d9d9d9]" />
                        </TableCell>
                        <TableCell className="relative">
                          <div className="absolute top-5 left-2">
                            {album.isFavorite ? (
                              <div className="w-[25px] h-[25px] relative">
                                <div className="relative w-[13px] h-3.5 top-[5px] left-1.5">
                                  <div className="w-[13px] h-[5px] top-1 bg-[#f19edc] rotate-[92.29deg] absolute left-0" />
                                  <div className="absolute w-[13px] h-2.5 top-1 left-0 bg-[#f19edc]" />
                                </div>
                              </div>
                            ) : (
                              <StarIcon className="w-[25px] h-[25px] text-[#141218] opacity-[0.16]" />
                            )}
                          </div>
                          <div className="mt-[60px] [font-family:'Inter-Bold',Helvetica] font-bold text-black text-xl">
                            {album.artist}
                          </div>
                          <div
                            className={`mt-5 [font-family:'Inter-Bold',Helvetica] font-bold text-xl ${album.inStock ? "text-[#3e7eff]" : "text-[#d33b59]"}`}
                          >
                            {album.inStock ? "재고 있음" : "절판"}
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="[font-family:'Inter-Bold',Helvetica] font-bold text-black text-xl mb-2">
                            출시일
                          </div>
                          <div className="opacity-50 [font-family:'Inter-Regular',Helvetica] text-black text-xl">
                            {album.releaseDate}
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="[font-family:'Inter-Bold',Helvetica] font-bold text-black text-xl mb-2">
                            판매가
                          </div>
                          <div className="opacity-50 [font-family:'Inter-Regular',Helvetica] text-black text-xl">
                            {album.salePrice}
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="[font-family:'Inter-Bold',Helvetica] font-bold text-black text-xl mb-2">
                            발매가
                          </div>
                          <div className="opacity-50 [font-family:'Inter-Regular',Helvetica] text-black text-xl">
                            {album.releasePrice}
                          </div>
                        </TableCell>
                      </TableRow>
                      {index < albumData.length - 1 && (
                        <TableRow>
                          <TableCell colSpan={5} className="p-0">
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
    </main>
  );
}
