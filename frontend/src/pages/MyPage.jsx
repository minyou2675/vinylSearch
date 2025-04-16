import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import AuthMenu from "@/components/AuthMenu";

export default function MyPage() {
  return (
    <div className="bg-white flex flex-row justify-center w-full min-h-screen">
      <div className="bg-white w-full max-w-screen-xl h-full relative p-4">
        <AuthMenu />
        <div className="mt-20">
          <h1 className="text-3xl font-bold mb-8">My Page</h1>
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">내 정보</h2>
              <p className="text-gray-600">여기에 사용자 정보가 표시됩니다.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
