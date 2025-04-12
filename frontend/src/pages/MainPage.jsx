import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Separator } from "@/components/ui/separator";
import React from "react";

export default function Desktop() {
  // Navigation menu items
  const navItems = [
    { label: "New Release", id: "new-release" },
    { label: "Discover", id: "discover" },
    { label: "My Favorite", id: "my-favorite" },
  ];

  return (
    <div className="bg-white flex flex-row justify-center w-full min-h-screen">
      <div className="bg-white w-full max-w-[1440px] h-[1024px] relative">
        {/* Navigation Menu */}
        <nav className="absolute w-[546px] h-[47px] top-12 right-[84px]">
          <NavigationMenu className="w-full">
            <NavigationMenuList className="flex justify-between w-full">
              {navItems.map((item, index) => (
                <React.Fragment key={item.id}>
                  <NavigationMenuItem>
                    <NavigationMenuLink className="[font-family:'Roboto-Regular',Helvetica] font-normal text-[#5e5e5e] text-3xl text-center tracking-[0] leading-7 whitespace-nowrap cursor-pointer">
                      {item.label}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  {index < navItems.length - 1 && (
                    <Separator
                      orientation="vertical"
                      className="h-[47px] w-[3px]"
                    />
                  )}
                </React.Fragment>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        {/* Decorative Lines */}
        <div className="absolute w-[1233px] h-[58px] top-[468px] left-[103px]">
          <Separator className="absolute w-[120px] h-1.5 top-[52px] left-0 bg-black" />
          <Separator className="absolute w-[1233px] h-1.5 top-5 left-0 bg-black" />
          <Separator className="absolute w-[302px] h-4 -top-4 left-[931px] bg-black" />
        </div>

        {/* Main Typography */}
        <Card className="absolute w-[1293px] h-[324px] top-[610px] left-[53px] border-none shadow-none">
          <CardContent className="relative w-[1291px] h-[324px] -top-px p-0">
            <div className="absolute w-[165px] top-0 left-0 [font-family:'Inter-Bold',Helvetica] font-bold text-black text-[240px] tracking-[0] leading-[normal]">
              e
            </div>
            <div className="absolute w-[967px] top-[26px] left-[134px] [font-family:'Inter-Bold',Helvetica] font-bold text-transparent text-[300px] tracking-[0] leading-[normal] whitespace-nowrap">
              <span className="text-[#065570]">LP</span>
              <span className="text-black">fənt</span>
            </div>
            <img
              className="absolute w-[458px] h-[95px] top-1.5 left-[833px]"
              alt="LP logo"
              src="../src/assets/나만의 LP 취향 발견하기 엘피펀트.png"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
