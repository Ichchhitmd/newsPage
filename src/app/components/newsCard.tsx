import React from "react";
import Image from "next/image";
import Link from "next/link";

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

interface NewsCardProps {
  news: News;
}

const NewsCard : React.FC<NewsCardProps> = ({ news }) => {
  return (
    <div className="max-w-sm mx-auto border border-gray-200 rounded-lg shadow-md hover:shadow-lg bg-white text-left p-3">
        <Link href={`/news/${news.id}`}>
        
      <div className="relative">
        <Image
          src={news.imageUrl}
          alt={news.title}
          width={500}
          height={150}
          className="w-full h-56 object-cover rounded-t-lg"
        />
        <span className="absolute top-4 left-4 bg-gray-200 text-blue-600 text-xs font-semibold px-2 py-1 rounded">
          {news.tag}
        </span>
      </div>
      <div className="p-4">
       
          <h3 className=" text-lg font-semibold text-gray-800 mb-3 group-hover/title:text-blue-600 transition-colors duration-200">
            <span className="line-clamp-2 ">{news.title}</span>
          </h3>
          <p className="text-gray-600 font-normal text-sm line-clamp-2 mb-5">{news.content}</p>
         <div className="flex items-center space-x-3">
          <Image
            src={news.author.avatarUrl}
            alt={news.author.name}
            width={100}
            height={100}
            className="w-8 h-8 rounded-full object-cover"
          />
          <div className="flex justify-between w-full">
            <p className="text-sm font-medium text-gray-600">{news.author.name}</p>
            <p className="text-xs text-gray-500">{news.date}</p>
          </div>
        </div>
      </div>
        </Link>
    </div>
  );
};

export default NewsCard;