import React from 'react';
import Image from 'next/image';
import { FaBookmark } from 'react-icons/fa';

const RecommendedPlaces = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <header className="mb-6 rounded-md bg-blue-500 p-4 text-white">
        <h1 className="text-xl font-bold">추천 여행지</h1>
      </header>

      <main>
        <h2 className="mb-4 text-2xl font-semibold">추천 국내 여행지</h2>
        <div className="space-y-8">
          <div className="flex flex-col justify-between">
            <p className="text-lg font-bold">사랑하는 사람과 함께</p>
            <span className="text-sm text-gray-600">로맨틱한 국내 여행지</span>
          </div>
          {[...Array(3)].map((_, index) => (
            <div key={index} className="flex rounded-md bg-white p-4 shadow-md">
              <div className="relative mr-4 h-48 w-48 rounded-md bg-gray-300">
                <button className="absolute left-2 top-2 rounded-full bg-black bg-opacity-50 p-1 text-white">
                  <FaBookmark size={20} />
                </button>
                <Image
                  src="/placeholder.png"
                  alt="추천 이미지"
                  width={192}
                  height={192}
                  className="rounded-md object-cover"
                />
                <div className="absolute bottom-2 right-2 rounded bg-opacity-50 p-1 text-xs font-bold text-white">
                  여기에 글자들어갈 예정
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default RecommendedPlaces;
