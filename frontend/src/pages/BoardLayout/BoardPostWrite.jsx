import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthMenu from "@/components/AuthMenu";
import Logo from "@/components/Logo";
import { getToken } from "@/lib/utils";

const categories = [
  { id: 1, name: "자유게시판" },
  { id: 2, name: "음반리뷰" },
  { id: 3, name: "중고거래" },
  { id: 4, name: "공지사항" },
];

export default function BoardPostWrite() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("자유게시판");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // JWT 토큰 기반 로그인 상태 확인
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login", { state: { from: { pathname: "/board/write" } } });
      return;
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login", { state: { from: { pathname: "/board/write" } } });
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_NODE_SERVER_URL}/api/posts/write`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          content,
          category,
        }),
      });

      if (res.ok) {
        navigate("/board");
      } else if (res.status === 401) {
        localStorage.removeItem("token");
        navigate("/login", { state: { from: { pathname: "/board/write" } } });
      }
    } catch (err) {
      console.error("게시글 작성 실패:", err);
    }
  };

  return (
    <main className="bg-white flex w-full min-h-screen">
      <Logo />
      <div className="w-full max-w-[1800px] px-2">
        <AuthMenu />
        <div className="mt-10">
          <h1 className="text-3xl font-bold mb-6">게시글 작성</h1>
          <Card className="w-full border-2 border-black border-opacity-[0.06] rounded-[7px]">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="카테고리 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.name}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Input
                    placeholder="제목을 입력하세요"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="text-xl"
                  />
                </div>
                <div>
                  <Textarea
                    placeholder="내용을 입력하세요"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="min-h-[400px]"
                  />
                </div>
                <div className="flex justify-end gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/board")}
                  >
                    취소
                  </Button>
                  <Button type="submit">작성완료</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
