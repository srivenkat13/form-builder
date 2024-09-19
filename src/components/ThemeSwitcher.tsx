"use client";

import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { MoonIcon, SunIcon, DesktopIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <>
      <Tabs value={theme} onValueChange={(value) => setTheme(value)}>
        <TabsList className="border">
          <TabsTrigger
            value="light"
            className={theme === "light" ? "selected-tab" : ""}
          >
            <SunIcon className="h-[1rem] w-[1rem]" />
          </TabsTrigger>
          <TabsTrigger value="dark"  className={theme === 'dark' ? 'selected-tab' : ''}>
            <MoonIcon className="h-[1rem] w-[1rem] rotate-90 transition-all dark:rotate-0" />
          </TabsTrigger>
          <TabsTrigger value="light">
            <DesktopIcon className="h-[1rem] w-[1.rem]" />
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </>
  );
};

export default ThemeSwitcher;
