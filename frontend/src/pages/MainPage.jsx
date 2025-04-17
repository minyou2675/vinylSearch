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
import AuthMenu from "@/components/AuthMenu";

export default function Desktop() {
  // Navigation menu items
  const navItems = [
    { label: "New Release", id: "new-release" },
    { label: "Discover", id: "discover" },
    { label: "My Favorite", id: "my-favorite" },
  ];

  return (
    <div className="bg-white flex flex-row justify-center w-full min-h-screen">
      <div className="bg-white w-full max-w-screen-xl h-full relative p-4">
        <AuthMenu />
        {/* Navigation Menu */}
        <nav className="w-full max-w-md mx-auto mt-8">
          <NavigationMenu className="w-full">
            <NavigationMenuList className="flex justify-between w-full">
              {navItems.map((item, index) => (
                <React.Fragment key={item.id}>
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link
                        to={item.id === "discover" ? "/discover" : "#"}
                        className="font-normal text-[#5e5e5e] text-xl sm:text-2xl tracking-[0] leading-7 whitespace-nowrap cursor-pointer"
                      >
                        {item.label}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  {index < navItems.length - 1 && (
                    <Separator
                      orientation="vertical"
                      className="h-[47px] w-[2px]"
                    />
                  )}
                </React.Fragment>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        {/* Decorative Lines */}
        <div className="w-full mt-20">
          <Separator className="w-1/3 h-1.5 bg-black mb-2" />
          <Separator className="w-full h-1.5 bg-black mb-2" />
          <Separator className="w-3/4 h-1 bg-black" />
        </div>

        {/* Main Typography */}
        <Card className="w-full mt-16 border-none shadow-none">
          <CardContent className="relative w-full p-0 flex flex-col items-center">
            <div className="relative flex flex-row items-end justify-center">
              <div className="text-[80px] sm:text-[160px] lg:text-[240px] font-bold text-black mr-2">
                e
              </div>
              <div className="text-[120px] sm:text-[200px] lg:text-[300px] font-bold text-transparent whitespace-nowrap">
                <span className="text-[#065570]">LP</span>
                <span className="text-black">fənt</span>
              </div>
              <img
                className="absolute -top-12 right-0 w-[180px] sm:w-[220px] md:w-[260px] lg:w-[280px] object-contain"
                alt="LP logo"
                src="/assets/나만의 LP 취향 발견하기 엘피펀트.png"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
