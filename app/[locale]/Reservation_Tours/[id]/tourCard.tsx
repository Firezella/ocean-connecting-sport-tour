"use client";
import React from "react";
import { Tour } from "@/types";
import { BackgroundGradient } from "@/Components/ui/background-gradient";
import Image from "next/image";

interface Poeples {
    adults: number;
    children: number;
    babies: number;
}

interface DATE {
    date: Date;
}

interface TourCardProps {
  tour: Tour;
  poeples: Poeples;
  date: DATE;
}

const TourCardReservation: React.FC<TourCardProps> = ({ poeples, tour, date }) => {
  return (
    <BackgroundGradient className="rounded-2xl max-w-md p-6 sm:p-8 bg-white dark:bg-zinc-900 shadow-xl">
      <div className="relative w-full h-56 sm:h-64 rounded-xl overflow-hidden">
        <Image
          src={tour.image}
          alt={tour.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: "cover" }}
          className="rounded-xl"
        />
      </div>

      <div className="mt-4">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">{tour.title}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-3">{tour.description}</p>

        <div className="mt-4">
          <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
            Adults: {poeples.adults} <br />
            Children: {poeples.children} <br />
            Babies: {poeples.babies} <br />
            Date: {date.date.toDateString()}
          </span>
        </div>
      </div>
    </BackgroundGradient>
  );
};

export default TourCardReservation;
