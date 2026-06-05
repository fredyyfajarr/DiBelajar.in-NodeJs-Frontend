 
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import StaticStarRating from "./StaticStarRating"; // Ditambahkan dari versi kolaborator

const CourseCard = ({ course }) => {
  const thumbnailUrl =
    course.thumbnail ||
    "https://placehold.co/600x400/7c3aed/white?text=DiBelajar.in";

  // Menggunakan efek hover yang lebih dinamis dari kolaborator
  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
    hover: { scale: 1.05, boxShadow: "0 15px 30px rgba(0,0,0,0.1)" },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Link
        to={`/courses/${course.slug || course._id}`}
        className="group h-full bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 flex flex-col"
      >
        {/* Thumbnail */}
        <div className="relative">
          {/* Mempertahankan aspect-video agar responsif */}
          <img
            src={thumbnailUrl}
            alt={course.title}
            className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Mempertahankan badge gradien dari versi Anda */}
          <span className="absolute top-3 right-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 text-xs font-semibold rounded-full shadow-md">
            GRATIS
          </span>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-grow">
          <div className="flex-grow">
            {/* Mempertahankan efek hover gradien pada judul */}
            <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 group-hover:bg-clip-text transition-all duration-300">
              {course.title}
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Oleh {course.instructorId?.name || "Instruktur Ahli"}
            </p>
          </div>
          
          {/* Fitur baru: Rating Bintang dari kolaborator */}
          <div className="mt-2">
            <StaticStarRating
              rating={course.averageRating}
              reviewCount={course.reviewCount}
            />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CourseCard;
