"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Tour } from "@/types";
import getToursData from "../../Tours/[id]/ToursData";
import TourCardReservation from "./tourCard";

const ReservationPage = () => {
  const params = useParams();
  const { id, date } = params as { id?: string; date?: string };

  const [poeples, setPoeples] = useState<{ adults: number; children: number; babies: number } | null>(null);

  useEffect(() => {
    if (params.poeples) {
      try {
        const decodedPoeples = JSON.parse(decodeURIComponent(params.poeples as string));
        setPoeples(decodedPoeples);
        localStorage.setItem("poeples", JSON.stringify(decodedPoeples));
      } catch (error) {
        console.error("Error parsing poeples data:", error);
      }
    } else {
      const storedPoeples = localStorage.getItem("poeples");
      if (storedPoeples) {
        setPoeples(JSON.parse(storedPoeples));
      } else {
        setPoeples({ adults: 0, children: 0, babies: 0 });
      }
    }
  }, [params.poeples]);

  if (!poeples) {
    return <div className="flex h-screen items-center justify-center"><p>Loading...</p></div>;
  }

  const numericId = id ? parseInt(id, 10) : NaN;
  const dateTour = date ? new Date(date) : new Date();

  console.log("Selected Date:", dateTour);
  console.log("Poeples Data:", poeples);

  const tour: Tour | undefined = getToursData().find((t) => t.id === numericId);

  if (!tour) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-xl font-semibold text-gray-500">Tour non trouvé</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-4 max-w-4xl">
        <TourCardReservation date={{ date: dateTour }} poeples={poeples} tour={tour} />
      </div>
    </div>
  );
};

export default ReservationPage;
