//discover 페이지와 유사한 페이지
// 게시판 페이지
// 게시판 페이지는 게시글 목록을 보여주고, 게시글을 작성하고, 게시글을 수정하고, 게시글을 삭제할 수 있는 기능을 제공합니다.
// 게시글은 제목, 내용, 작성자, 작성일, 조회수, 좋아요 수, 댓글 수, 첨부파일 등의 정보를 포함합니다.
// 게시글은 게시판 카테고리에 속합니다.

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Edit, Trash2 } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthMenu from "@/components/AuthMenu";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";

const categories = [
  { id: 1, name: "자유게시판" },
  { id: 2, name: "음반리뷰" },
  { id: 3, name: "중고거래" },
  { id: 4, name: "공지사항" },
];

export default function BoardPost() {
  const [posts, setPosts] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("자유게시판");
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // JWT 토큰 기반 로그인 상태 확인
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // 게시글 목록 조회
  const fetchPosts = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const token = localStorage.getItem("token");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const res = await fetch(
        `${
          import.meta.env.VITE_NODE_SERVER_URL
        }/api/posts?category=${selectedCategory}&keyword=${keyword}&page=${currentPage}`,
        {
          headers,
        }
      );
      const data = await res.json();

      // 데이터가 배열인지 확인하고, 필요한 경우 배열로 변환
      if (Array.isArray(data)) {
        setPosts(data);
      } else if (data.content && Array.isArray(data.content)) {
        // 페이지네이션 응답인 경우
        setPosts(data.content);
      } else {
        console.error("Unexpected API response format:", data);
        setPosts([]);
      }
    } catch (err) {
      console.error("게시글 조회 실패:", err);
      setPosts([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [selectedCategory, currentPage]);

  const handleSearch = () => {
    setCurrentPage(0);
    fetchPosts();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <main className="bg-white flex w-full min-h-screen">
      {/* Left Logo Section */}
      <Logo />
      {/* Right Content */}
      <div className="w-full max-w-[1800px] px-2">
        <AuthMenu />
        {/* Search Bar and Write Button */}
        <div className="mt-10 mb-6 flex gap-4">
          <div className="relative h-16 bg-[#b0b0b026] rounded-[17px] flex-1">
            <Search className="absolute w-[38px] h-[38px] top-[13px] left-[15px] text-[#848484]" />
            <Input
              className="h-16 pl-16 bg-transparent border-none text-[#848484] text-[23px] placeholder:text-[#848484]"
              placeholder="게시글 검색"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          <Button
            className="h-16 px-8 text-xl bg-[#065570] hover:bg-[#054459]"
            onClick={() => {
              if (!isLoggedIn) {
                navigate("/login", {
                  state: { from: { pathname: "/board/write" } },
                });
                return;
              }
              navigate("/board/write");
            }}
          >
            글쓰기
          </Button>
        </div>

        {/* Category Tabs */}
        <div className="mb-6">
          <Tabs value={selectedCategory} className="w-full">
            <TabsList className="bg-transparent gap-8 justify-center">
              {categories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  className="text-xl text-[#5e5e5e] data-[state=active]:font-bold"
                >
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Posts List */}
        <Card className="w-full border-2 border-black border-opacity-[0.06] rounded-[7px] overflow-hidden">
          <CardContent className="p-0">
            <Table>
              <TableBody>
                {posts.map((post, index) => (
                  <React.Fragment key={post.id}>
                    <TableRow className="hover:bg-gray-100 cursor-pointer">
                      <TableCell className="font-bold">{post.title}</TableCell>
                      <TableCell>{post.username}</TableCell>
                      <TableCell>
                        {new Date(post.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>조회 {post.views}</TableCell>
                      <TableCell>
                        {isLoggedIn && post.isAuthor && (
                          <div className="flex gap-2">
                            <Edit className="w-5 h-5" />
                            <Trash2 className="w-5 h-5 text-red-500" />
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                    {index < posts.length - 1 && (
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

        {/* Pagination */}
        <div className="flex justify-center mt-6 mb-8">
          <div className="flex gap-2">
            {[...Array(5)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i)}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-lg
                  ${
                    currentPage === i
                      ? "bg-[#065570] text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
