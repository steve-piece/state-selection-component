"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { MapStateSelector } from "@/components/map-state-selector";

export default function Home() {
  const isDarkMode = true;

  return (
    <div className="flex h-screen overflow-hidden bg-slate-950">
      <main className="flex-1 overflow-y-auto flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12 lg:py-[50px] lg:pb-0">
          <div className="w-full max-w-4xl space-y-[25px]">
            <div className="text-center space-y-2">
              <span className="text-sm font-semibold uppercase tracking-wider text-violet-400">
                Step 1 of 3
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
                Which state do you currently live in?
              </h1>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto mt-4">
                We need this to ensure we can provide services in your area.
              </p>
            </div>
            
            <MapStateSelector />
            
            
          </div>
        </div>
      </main>
    </div>
  );
}
