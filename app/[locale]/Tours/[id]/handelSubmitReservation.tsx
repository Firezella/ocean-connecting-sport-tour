"use client"; 

import React from "react";
import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

interface Poeples {
    adults: number;
    children: number;
    babies: number;
}

interface TourReservationProps {
    id: number;
    poeples: Poeples;
    date: Date;
}

const TourReservationComponent: React.FC<TourReservationProps> = ({ id, poeples, date }) => {
    const locale = useLocale();
    const router = useRouter();
    const tt = useTranslations("homepage.tours");

    const handleSubmitReservation = (e: React.FormEvent) => {
        e.preventDefault();

        const formattedDate = date.toISOString().split("T")[0];
        console.log("Submitting poeples:", poeples);

        const poeplesEncoded = encodeURIComponent(JSON.stringify(poeples));

        // ✅ Store poeples in localStorage before navigation
        localStorage.setItem("poeples", JSON.stringify(poeples));

        router.replace(`/${locale}/Reservation_Tours/${id}?poeples=${poeplesEncoded}&date=${formattedDate}`);
    };

    return (
        <form onSubmit={handleSubmitReservation}>
            <button
                type="submit"
                className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-full shadow-md 
                           hover:bg-blue-700 transition-all duration-300 ease-in-out
                           focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
            >
                {tt("form.Confirm_Reservation")}
            </button>
        </form>
    );
};

export default TourReservationComponent;
