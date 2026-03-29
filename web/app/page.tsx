"use client";

import { useState, useRef } from "react";
import TutorialTab from "./components/TutorialTab";
import VideoTab from "./components/VideoTab";
import BlogTab from "./components/BlogTab";
import StrategyTab from "./components/StrategyTab";

const TABS = [
  { id: "strategy", label: "Strategy" },
  { id: "tutorial", label: "Tutorial" },
  { id: "video", label: "Video" },
  { id: "blog", label: "Blog" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabId>("strategy");
  const prevIndexRef = useRef(0);
  const [slideDir, setSlideDir] = useState<"left" | "right" | "up">("right");
  const [mountKey, setMountKey] = useState(0);

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
          <div className="nav-links">
            <a
              href="https://bfl.ai"
              target="_blank"
              rel="noopener noreferrer"
            >
              BFL
            </a>
            <a
              href="https://docs.bfl.ml"
              target="_blank"
              rel="noopener noreferrer"
            >
              Docs
            </a>
            <a
              href="https://dashboard.bfl.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-cta"
            >
              Get API Key
            </a>
          </div>
        </nav>
      </header>

      <main>
        <div role="tabpanel" key={`${activeTab}-${mountKey}`} className="tab-panel" data-slide={slideDir}>
          {activeTab === "tutorial" && <TutorialTab />}
          {activeTab === "video" && <VideoTab />}
          {activeTab === "blog" && <BlogTab />}
          {activeTab === "strategy" && <StrategyTab />}
        </div>
      </main>

      <footer className="footer">
        <div className="footer-inner">
          <span className="footer-made">Made with ❤️ by Maanav Dalal</span>
          <span className="footer-copy">&copy; 2026 Black Forest Labs. All rights reserved.</span>
        </div>
      </footer>
    </>
  );
}
