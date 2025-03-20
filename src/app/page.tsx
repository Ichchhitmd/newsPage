"use client";
import { useState } from "react";
import Image from "next/image";
import NewsCard from "./components/newsCard";
import newsData from "./data/news.json";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const uniqueTags = Array.from(
    new Set(newsData.map((news) => news.tag))
  ).sort();

  const filteredNews = newsData.filter((news) => {
    const matchesSearch = news.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag ? news.tag === selectedTag : true;
    return matchesSearch && matchesTag;
  });

  return (
    <main className="min-h-screen">
      <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px]">
        <Image
          src="/nature.jpg"
          alt="Hero Section Background"
          fill
          className="object-cover brightness-75"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 text-center px-4">
            Ichchhit's News
          </h1>

          <div className="w-full max-w-xl px-4">
            <input
              type="text"
              placeholder="Search news by title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 sm:px-6 py-2 sm:py-3 rounded-full text-gray-800 bg-white/90 backdrop-blur-sm 
                        border border-white/20 outline-none focus:ring-2 focus:ring-white/50
                        placeholder:text-gray-500 text-sm sm:text-base"
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
          <div className="w-full sm:w-52 flex-shrink-0">
            <div className="sticky top-4">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Categories
              </h2>
              <div className="flex sm:flex-col gap-2 overflow-x-auto sm:overflow-visible pb-2 sm:pb-0">
                <button
                  onClick={() => setSelectedTag(null)}
                  className={`min-w-max sm:w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    selectedTag === null
                      ? "bg-blue-100 text-blue-700"
                      : "hover:bg-gray-100 text-gray-600"
                  }`}
                >
                  All Categories
                </button>

                {uniqueTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`min-w-max sm:w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      selectedTag === tag
                        ? "bg-blue-100 text-blue-700"
                        : "hover:bg-gray-100 text-gray-600"
                    }`}
                  >
                    {tag}
                    <span className="ml-2 text-sm text-gray-400">
                      ({newsData.filter((news) => news.tag === tag).length})
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1">
            {filteredNews.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600">
                  No news found {searchQuery && `matching "${searchQuery}"`}
                  {selectedTag && ` in ${selectedTag}`}
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedTag(null);
                  }}
                  className="mt-4 text-blue-600 hover:text-blue-700"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {filteredNews.map((news) => (
                  <NewsCard key={news.id} news={news} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
