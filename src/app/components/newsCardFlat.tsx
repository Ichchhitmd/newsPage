import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface Author {
  name: string;
  avatarUrl: string;
}

interface News {
  id: number;
  title: string;
  tag: string;
  imageUrl: string;
  author: Author;
  date: string;
  content: string[];
}

interface NewsCardFlatProps {
  news: News;
}

const NewsCardFlat = ({ news }: NewsCardFlatProps) => {
  return (
    <div className="flex border border-gray-200 rounded-lg shadow-md hover:shadow-lg bg-white">
      <Link href={`/news/${news.id}`} className="flex items-center w-[35rem] p-2">
        <div className="relative w-44 h-28 flex-shrink-0 overflow-hidden rounded-l-lg">
          <Image
            src={news.imageUrl}
            alt={news.title}
            width={176}
            height={112}
            className="w-full h-full object-[50%_50%] object-cover"
          />
        </div>

        <div className="p-2 flex flex-col gap-2">
          <h2 className="text-md font-semibold text-gray-800 ">{news.title}</h2>
          <p className="text-sm text-gray-500 ">{news.author.name}</p>
          <p className="text-sm text-gray-400 ">{news.date}</p>
        </div>
      </Link>
    </div>
  );
};

export default NewsCardFlat;
