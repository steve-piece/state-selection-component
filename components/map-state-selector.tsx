"use client"

import type React from "react"

import { useState, useMemo, useEffect, useRef } from "react"
import USAMap from "react-usa-map"
import { StateSelector } from "./state-selector"
import { US_STATES } from "@/lib/seed-data"

/**
 * Map State Selector
 *
 * A Typeform-style state selection component.
 */
export function MapStateSelector() {
  const [selectedState, setSelectedState] = useState<string | null>(null)
  const mapContainerRef = useRef<HTMLDivElement>(null)
  // Force dark mode
  const isDarkMode = true

  // Color schemes for light and dark modes
  const colors = useMemo(
    () => ({
      // Unselected states - liquid glass effect base colors
      unselected: "#3d2a5c", // Dark mode: darker muted purple (glass-like)
      // Selected state - prominent color
      selected: "#c4b5fd", // Dark mode: LIGHTER violet (stands out)
      // Default fill for states without data
      default: "#2d2244",
    }),
    [],
  )

  // Remove native SVG title tooltips after map renders
  useEffect(() => {
    if (mapContainerRef.current) {
      const svg = mapContainerRef.current.querySelector("svg")
      if (svg) {
        const titles = svg.querySelectorAll("title")
        titles.forEach((title) => title.remove())

        const allElements = svg.querySelectorAll("*")
        allElements.forEach((element) => {
          element.removeAttribute("title")
          element.removeAttribute("data-title")
        })

        svg.removeAttribute("title")
      }
    }
  }, [])

  // Get state map config with visual hierarchy and liquid glass styling
  const getStateMapConfig = () => {
    const config: Record<string, { fill: string }> = {}

    // All states get the unselected liquid glass color
    Object.keys(US_STATES).forEach((state) => {
      config[state] = {
        fill: colors.unselected,
      }
    })

    // Selected state gets prominent color (lighter in dark mode)
    if (selectedState) {
      config[selectedState] = {
        fill: colors.selected,
      }
    }

    return config
  }

  const handleStateClick = (event: React.MouseEvent<SVGPathElement>) => {
    const stateAbbr = (event.target as SVGPathElement).dataset.name
    if (stateAbbr) {
      setSelectedState(stateAbbr)
    }
  }

  const handleDropdownStateChange = (state: string) => {
    setSelectedState(state || null)
  }

  // Dynamic CSS for liquid glass effect on states
  const liquidGlassStyles = `
    /* Base state styling with liquid glass effect */
    [data-slot="usa-map-container"] > svg path {
      pointer-events: auto !important;
      cursor: pointer;
      transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
      transform-origin: center;
      transform-box: fill-box;
      /* Increased border opacity from 12% to 25% for better visibility */
      stroke: rgba(255, 255, 255, 0.25);
      stroke-width: 0.75;
    }

    /* ===== DARK MODE ===== */
    /* Unselected states - dark translucent glass */
    [data-slot="usa-map-container"] > svg path[fill="${colors.unselected}"] {
      filter: 
        drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))
        drop-shadow(inset 0 1px 0 rgba(255, 255, 255, 0.05));
      /* Increased border opacity from 12% to 25% */
      stroke: rgba(255, 255, 255, 0.25);
      stroke-width: 0.75;
    }

    /* Unselected hover - glass illuminates with bright white border */
    [data-slot="usa-map-container"] > svg path[fill="${colors.unselected}"]:hover {
      filter: 
        brightness(1.4) 
        saturate(1.5)
        drop-shadow(0 4px 20px rgba(139, 92, 246, 0.35))
        drop-shadow(0 0 12px rgba(255, 255, 255, 0.15));
      stroke: rgba(255, 255, 255, 0.7);
      stroke-width: 1.5;
    }

    /* Selected state - bright/lighter in dark mode */
    [data-slot="usa-map-container"] > svg path[fill="${colors.selected}"] {
      filter: 
        drop-shadow(0 0 20px rgba(196, 181, 253, 0.6))
        drop-shadow(0 4px 30px rgba(139, 92, 246, 0.4))
        drop-shadow(inset 0 1px 2px rgba(255, 255, 255, 0.2));
      /* Increased border opacity from 12% to 25% */
      stroke: rgba(255, 255, 255, 0.25);
      stroke-width: 0.75;
    }

    /* Selected hover - NO CHANGE (prevent UI shifts) */
    [data-slot="usa-map-container"] > svg path[fill="${colors.selected}"]:hover {
      filter: 
        drop-shadow(0 0 20px rgba(196, 181, 253, 0.6))
        drop-shadow(0 4px 30px rgba(139, 92, 246, 0.4))
        drop-shadow(inset 0 1px 2px rgba(255, 255, 255, 0.2));
      /* Increased border opacity from 12% to 25% */
      stroke: rgba(255, 255, 255, 0.25);
      stroke-width: 0.75;
    }

    /* Active/click state for all */
    [data-slot="usa-map-container"] > svg path:active {
      transform: scale(0.97);
    }

    /* Hide SVG titles */
    [data-slot="usa-map-container"] svg title {
      pointer-events: none !important;
      display: none !important;
    }

    /* Hide Washington D.C. indicator */
    [data-slot="usa-map-container"] > svg path[data-name="DC"],
    [data-slot="usa-map-container"] > svg circle,
    [data-slot="usa-map-container"] > svg ellipse {
      display: none !important;
    }
  `

  return (
    <div className="text-white rounded-xl border-0 p-3 md:p-4 lg:p-6 h-auto lg:h-[calc(100vh-200px)] min-h-[500px] transition-all duration-200 ease-in-out lg:py-7 md:space-y-8 my-[35px] mb-0 lg:pb-0">
      {/* State Selector Control */}
      <StateSelector selectedState={selectedState || ""} onStateChange={handleDropdownStateChange} />

      {/* Map with liquid glass background */}
      <div
        ref={mapContainerRef}
        data-slot="usa-map-container"
        className="relative rounded-lg p-[38px] md:p-[38px] lg:p-[38px] flex-1 flex items-center justify-center [&>svg]:w-full [&>svg]:h-auto [&>svg]:max-h-[600px] overflow-hidden lg:pt-[30px] lg:pb-[30px]"
        style={{
          // Liquid glass container background
          background:
            "linear-gradient(135deg, rgba(30, 27, 46, 0.95) 0%, rgba(45, 34, 68, 0.9) 50%, rgba(30, 27, 46, 0.95) 100%)",
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          border: "1px solid rgba(139, 92, 246, 0.15)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
        }}
      >
        {/* Gradient overlay for depth */}
        <div
          className="absolute inset-0 pointer-events-none rounded-lg"
          style={{
            background:
              "radial-gradient(ellipse at 30% 20%, rgba(139, 92, 246, 0.08) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(196, 181, 253, 0.05) 0%, transparent 50%)",
          }}
        />

        {/* Dynamic CSS for liquid glass states */}
        <style>{liquidGlassStyles}</style>

        <USAMap
          customize={getStateMapConfig()}
          defaultFill={colors.default}
          width={900}
          height={550}
          title=""
          onClick={handleStateClick}
        />
      </div>
    </div>
  )
}
