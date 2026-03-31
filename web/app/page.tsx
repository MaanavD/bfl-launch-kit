"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import TutorialTab from "./components/TutorialTab";
import VideoTab from "./components/VideoTab";
import BlogTab from "./components/BlogTab";
import StrategyTab from "./components/StrategyTab";
import BotTab from "./components/BotTab";

const TABS = [
  { id: "strategy", label: "Strategy" },
  { id: "blog", label: "Blog" },
  { id: "tutorial", label: "Tutorial" },
  { id: "video", label: "Video" },
  { id: "bot", label: "FluxBot" },
] as const;

type TabId = (typeof TABS)[number]["id"];

const TAB_IDS = TABS.map((t) => t.id) as unknown as TabId[];

function getTabFromHash(): TabId {
  if (typeof window === "undefined") return "strategy";
  const hash = window.location.hash.replace("#", "");
  return TAB_IDS.includes(hash as TabId) ? (hash as TabId) : "strategy";
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabId>("strategy");
  const prevIndexRef = useRef(0);
  const [slideDir, setSlideDir] = useState<"left" | "right" | "up">("right");
  const [mountKey, setMountKey] = useState(0);

  // Sync tab from hash after hydration (avoids SSR/client mismatch)
  useEffect(() => {
    const tab = getTabFromHash();
    if (tab !== "strategy") {
      prevIndexRef.current = TABS.findIndex((t) => t.id === tab);
      setActiveTab(tab);
    }
  }, []);

  useEffect(() => {
    window.location.hash = activeTab;
  }, [activeTab]);

  useEffect(() => {
    const onHashChange = () => {
      const tab = getTabFromHash();
      if (tab !== activeTab) switchTab(tab);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  });

  function switchTab(id: TabId) {
    const newIndex = TABS.findIndex((t) => t.id === id);
    if (id === activeTab) {
      setSlideDir("up");
      setMountKey((k) => k + 1);
    } else {
      setSlideDir(newIndex > prevIndexRef.current ? "left" : "right");
      prevIndexRef.current = newIndex;
      setActiveTab(id);
    }
  }

  return (
    <>
      <header className="header">
        <nav className="nav">
          <button onClick={() => switchTab("strategy")} className="logo" type="button">
            <img
              src="/bfl-logotype-black.svg"
              alt="Black Forest Labs"
              className="logo-img"
            />
          </button>
          <div className="tab-nav" role="tablist">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                className={`tab-btn${activeTab === tab.id ? " tab-btn--active" : ""}`}
                onClick={() => switchTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </nav>
      </header>

      <main>
        <div role="tabpanel" key={`${activeTab}-${mountKey}`} className="tab-panel" data-slide={slideDir}>
          {activeTab === "tutorial" && <TutorialTab />}
          {activeTab === "bot" && <BotTab />}
          {activeTab === "video" && <VideoTab />}
          {activeTab === "blog" && <BlogTab />}
          {activeTab === "strategy" && <StrategyTab />}
        </div>
      </main>

      <footer className="footer">
        <div className="footer-inner">
          <span className="footer-made">Built by Maanav Dalal</span>
          <span className="footer-copy">
            Independent FLUX.2 launch kit for the Black Forest Labs Developer Relations Engineer case study.
          </span>
        </div>
      </footer>
    </>
  );
}
