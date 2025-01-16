"use client";
import Image from "next/image";
import React, { useState } from "react";
import newsData from "../../data/news.json";
import { FaXTwitter } from "react-icons/fa6";
import { useParams, useRouter } from "next/navigation";
import NewsCardFlat from "@/app/components/newsCardFlat";
import { FaArrowLeft, FaFacebookF, FaLinkedinIn } from "react-icons/fa";

const NewsDetail = () => {
  const params = useParams();
  const router = useRouter();
  const [imageError, setImageError] = useState(false);

  const id = parseInt(params.id as string, 10);
  const newsItem = newsData.find((news) => news.id === id);

  if (!newsItem) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-semibold text-gray-800">
          Article Not Found
        </h2>
        <p className="mt-2 text-gray-600">
          The article you&apos;re looking for doesn&apos;t exist.
        </p>
        <button
          onClick={() => router.back()}
          className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-700"
        >
          <FaArrowLeft className="w-4 h-4 mr-2" />
          Go Back
        </button>
      </div>
    );
  }

  const relatedNews = newsData.filter(
    (news) => news.tag === newsItem.tag && news.id !== newsItem.id
  );

  const shareUrl = `${process.env.NEXT_PUBLIC_APP_URL}/news/${newsItem.id}`;
  const shareText = `Check out this article: ${newsItem.title} by ${newsItem.author.name}`;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <button
        onClick={() => router.push("/")}
        className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors mb-6"
      >
        <FaArrowLeft className="w-4 h-4 mr-2" />
        Back
      </button>

      <div className="flex flex-col lg:flex-row gap-24">
        <article className="flex-1 max-w-4xl">
          <div className="relative">
            <div className=" mt-8 aspect-video rounded-xl overflow-hidden bg-gray-100">
              <Image
                src={imageError ? "/herosectionbg.jpeg" : newsItem.imageUrl}
                alt={newsItem.title}
                fill
                className="object-cover rounded-lg"
                onError={() => setImageError(true)}
              />
            </div>
            <div className="flex flex-col gap-4 bg-white p-5 shadow-xl rounded-lg absolute -bottom-28 md:-bottom-20 w-2/3 left-10">
              <div className="flex flex-wrap items-center">
                <span className="inline-block bg-blue-100 text-blue-600 text-xs font-medium px-3 py-1 rounded-full">
                  {newsItem.tag}
                </span>
                <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mt-4 leading-tight">
                  {newsItem.title}
                </h1>
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative w-12 h-12">
                  <Image
                    src={newsItem.author.avatarUrl}
                    alt={newsItem.author.name}
                    fill
                    className="rounded-full object-cover ring-2 ring-gray-100"
                  />
                </div>
                <div className="flex gap-8 items-center">
                  <p className="text-base font-medium text-gray-800">
                    {newsItem.author.name}
                  </p>
                  <p className="text-sm text-gray-500">{newsItem.date}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end mt-36 md:mt-28">
            <div className="flex items-center gap-4">
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                  shareUrl
                )}&text=${encodeURIComponent(shareText)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                <FaFacebookF className="text-blue-600 w-6 h-6" />
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                  shareUrl
                )}&text=${encodeURIComponent(shareText)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity ml-2"
              >
                <FaXTwitter className="text-blue-600 w-6 h-6" />
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                  shareUrl
                )}&text=${encodeURIComponent(shareText)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity ml-2"
              >
                <FaLinkedinIn className="text-blue-600 w-6 h-6" />
              </a>
            </div>
          </div>

          <div className="mt-8 space-y-6 text-gray-700 text-lg leading-relaxed">
            {newsItem.content.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {newsItem.quote && (
            <blockquote className="mt-8 bg-blue-50 p-6 border-l-4 border-blue-600 rounded-r-lg">
              <p className="text-blue-800 italic text-lg">{newsItem.quote}</p>
            </blockquote>
          )}
        </article>
        {relatedNews.length > 0 && (
          <aside className="lg:w-80 space-y-6 mt-8 top-4">
            <h2 className="text-xl font-semibold text-gray-800">
              More About {newsItem.tag}
            </h2>
            <div className="flex flex-col gap-6 md:flex-wrap ">
              {relatedNews.slice(0, 2).map((news) => (
                <NewsCardFlat key={news.id} news={news} />
              ))}
            </div>
          </aside>
        )}

      </div>
    </div>
  );
};

export default NewsDetail;
