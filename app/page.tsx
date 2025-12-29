"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { MapStateSelector } from "@/components/map-state-selector";

export default function Home() {
  const isDarkMode = true;

  return (
    <div className="flex h-screen overflow-hidden bg-slate-950">
      <main className="flex-1 overflow-y-auto flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12">
          <div className="w-full max-w-4xl space-y-8">
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
            
            <div className="flex justify-center pt-8">
              <div className="transition-all duration-200 hover:scale-105 active:scale-95">
                <button
                  className="size-16 rounded-full flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, rgba(30, 27, 46, 0.95) 0%, rgba(45, 34, 68, 0.9) 50%, rgba(30, 27, 46, 0.95) 100%)",
                    backdropFilter: "blur(20px) saturate(180%)",
                    WebkitBackdropFilter: "blur(20px) saturate(180%)",
                    border: "1px solid rgba(139, 92, 246, 0.15)",
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)"
                  }}
                >
                  <ChevronRight 
                    className="text-white" 
                    size={40} 
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
