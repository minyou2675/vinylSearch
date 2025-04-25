import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Edit, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AuthMenu from "@/components/AuthMenu";
import Logo from "@/components/Logo";

export default function BoardPostView() {
  const [post, setPost] = useState(null);
  const [isAuthor, setIsAuthor] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          `${import.meta.env.VITE_NODE_SERVER_URL}/api/posts/${id}`,
          {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
          }
        );
        const data = await res.json();
        setPost(data);
        setIsAuthor(data.isAuthor);
      } catch (err) {
        console.error("게시글 조회 실패:", err);
      }
    };
    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("게시글을 삭제하시겠습니까?")) return;

    try {
      const token = localStorage.getItem("token");
      const user = getUserInfoFromToken(token);
      const userId = user.userId;
      if (userId !== post.authorId) {
        alert("게시글 삭제 권한이 없습니다.");
        return;
      }
      const res = await fetch(
        `${import.meta.env.VITE_NODE_SERVER_URL}/api/posts/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.ok) {
        navigate("/board");
      }
    } catch (err) {
      console.error("게시글 삭제 실패:", err);
    }
  };

  if (!post) return <div>Loading...</div>;

  return (
    <main className="bg-white flex w-full min-h-screen">
      <Logo />
      <div className="w-full max-w-[1800px] px-2">
        <AuthMenu />
        <div className="mt-10">
          <Card className="w-full border-2 border-black border-opacity-[0.06] rounded-[7px]">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
                  <div className="text-gray-600">
                    <span>작성자: {post.author}</span>
                    <span className="mx-4">|</span>
                    <span>
                      작성일: {new Date(post.createdAt).toLocaleDateString()}
                    </span>
                    <span className="mx-4">|</span>
                    <span className="flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      조회수: {post.views}
                    </span>
                  </div>
                </div>
                {isAuthor && (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => navigate(`/board/edit/${id}`)}
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      수정
                    </Button>
                    <Button variant="destructive" onClick={handleDelete}>
                      <Trash2 className="w-4 h-4 mr-2" />
                      삭제
                    </Button>
                  </div>
                )}
              </div>
              <div className="mt-8 min-h-[300px] whitespace-pre-wrap">
                {post.content}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
