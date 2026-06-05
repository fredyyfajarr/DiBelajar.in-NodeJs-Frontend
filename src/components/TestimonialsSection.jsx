import React, { useState, useEffect } from 'react';
import { Star, Quote, ArrowLeft, ArrowRight } from 'lucide-react';

const testimonials = [
  {
    quote: 'Overall, pengalaman saya dengan DiBelajar.in sangat positif. Kursus-kursusnya komprehensif dan instruktur sangat berpengetahuan. Saya merasa lebih percaya diri dalam keterampilan coding saya sekarang.',
    name: 'Eka Revandi',
    role: 'Cloud Engineer',
    company: 'Google LLC',
    avatar: 'https://wallpapercave.com/wp/wp4099280.jpg',
    rating: 5,
  },
  {
    quote: 'DiBelajar.in benar-benar mengubah cara saya belajar coding. Materinya mudah diikuti dan proyek-proyek praktisnya sangat membantu saya memahami konsep-konsep sulit.',
    name: 'Kevin Ardiansyah',
    role: 'Frontend Developer',
    company: 'Creative Studio',
    avatar: 'https://tse3.mm.bing.net/th/id/OIP.DVYMCPfSlOMOHo1GpeWaSAHaFt?pid=Api&P=0&h=180',
    rating: 5,
  },
  {
    quote: 'Saya sangat merekomendasikan DiBelajar.in kepada siapa saja yang ingin memulai karir di bidang teknologi. Kursusnya terstruktur dengan baik dan komunitasnya sangat mendukung.',
    name: 'Fredy Fajar',
    role: 'Backend Developer',
    company: 'Tech Solutions',
    avatar: 'https://imgcdn.stablediffusionweb.com/2024/12/19/ca8b5efe-8d21-4a63-9efa-cdb484e1dd99.jpg',
    rating: 5,
  },
  {
    quote: 'Kursus-kursus di DiBelajar.in sangat up-to-date dengan tren industri terbaru. Saya merasa siap untuk menghadapi tantangan di dunia kerja setelah menyelesaikan beberapa kursus di sini.',
    name: 'Yudi Setiawan',
    role: 'Data Scientist',
    company: 'Analytics Pro',
    avatar: 'https://r2.erweima.ai/imgcompressed/compressed_15f5c0cd99eb85e3030688d4d5f38afb.webp',
    rating: 5,
  },
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  return (
    <section className="py-20 bg-transparent relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-purple-300/30 to-pink-300/30 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-pink-300/30 to-purple-300/30 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-2xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full text-sm font-medium mb-6 border border-purple-200">
            <Star className="w-4 h-4 mr-2" />
            Testimoni Pelajar
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-purple-800 bg-clip-text text-transparent mb-6">
            Apa Kata Mereka?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Pengalaman nyata dari ribuan pelajar yang telah mengubah karir mereka bersama kami
          </p>
        </div>

        {/* Main testimonial display */}
        <div className="relative">
          <div className="bg-white backdrop-blur-sm rounded-3xl shadow-2xl shadow-purple-500/10 p-8 md:p-12 mb-8 border border-white/20">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              {/* Quote section */}
              <div className="flex-1 text-center lg:text-left">
                <Quote className="w-12 h-12 text-purple-500 mb-6 mx-auto lg:mx-0" />
                <blockquote className="text-2xl md:text-3xl font-medium text-gray-800 leading-relaxed mb-8">
                  "{testimonials[currentIndex].quote}"
                </blockquote>
                
                {/* Rating */}
                <div className="flex justify-center lg:justify-start mb-6">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>

              {/* Profile section */}
              <div className="flex flex-col items-center">
                <div className="relative mb-6">
                  <img
                    src={testimonials[currentIndex].avatar}
                    alt={testimonials[currentIndex].name}
                    className="w-24 h-24 rounded-full shadow-xl ring-4 ring-white object-cover"
                  />
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                </div>
                
                <div className="text-center">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">
                    {testimonials[currentIndex].name}
                  </h4>
                  <p className="text-purple-600 font-medium mb-1">
                    {testimonials[currentIndex].role}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {testimonials[currentIndex].company}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation controls */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <button
              onClick={prevTestimonial}
              className="p-3 rounded-full bg-white/80 hover:bg-white shadow-lg hover:shadow-xl transition-all duration-300 group border border-gray-200"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600 group-hover:text-purple-600 transition-colors" />
            </button>
            
            {/* Dots indicator */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-purple-600 w-8' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
            
            <button
              onClick={nextTestimonial}
              className="p-3 rounded-full bg-white/80 hover:bg-white shadow-lg hover:shadow-xl transition-all duration-300 group border border-gray-200"
            >
              <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-purple-600 transition-colors" />
            </button>
          </div>
        </div>

        {/* Grid of all testimonials (mobile-friendly) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-16">
          {testimonials.map((testimonial, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`p-4 rounded-xl transition-all duration-300 text-left group ${
                index === currentIndex
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg scale-105'
                  : 'bg-white hover:bg-purple-50 text-gray-900 shadow-md hover:shadow-lg'
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-sm">{testimonial.name}</p>
                  <p className={`text-xs ${
                    index === currentIndex ? 'text-purple-200' : 'text-gray-500'
                  }`}>
                    {testimonial.role}
                  </p>
                </div>
              </div>
              <p className={`text-sm line-clamp-2 ${
                index === currentIndex ? 'text-purple-100' : 'text-gray-600'
              }`}>
                "{testimonial.quote}"
              </p>
            </button>
          ))}
        </div>

        {/* Stats section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
        <div className="group text-center p-8 bg-white/90 backdrop-blur-lg rounded-3xl shadow-xl border border-purple-100/50 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-2">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-pink-600/5 opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-500"></div>
          <div className="relative">
            <div className="text-5xl font-black bg-gradient-to-r from-purple-600 via-purple-500 to-pink-600 bg-clip-text text-transparent mb-3 transform transition-transform group-hover:scale-110">10K+</div>
            <div className="text-gray-700 font-semibold text-lg">Pelajar Bergabung</div>
          </div>
        </div>

        <div className="group text-center p-8 bg-white/90 backdrop-blur-lg rounded-3xl shadow-xl border border-pink-100/50 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/20 hover:-translate-y-2" style={{animationDelay: '0.2s'}}>
          <div className="absolute inset-0 bg-gradient-to-br from-pink-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-500"></div>
          <div className="relative">
            <div className="text-5xl font-black bg-gradient-to-r from-pink-600 via-pink-500 to-purple-600 bg-clip-text text-transparent mb-3 transform transition-transform group-hover:scale-110">95%</div>
            <div className="text-gray-700 font-semibold text-lg">Tingkat Kepuasan</div>
          </div>
        </div>

        <div className="group text-center p-8 bg-white/90 backdrop-blur-lg rounded-3xl shadow-xl border border-purple-100/50 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-2" style={{animationDelay: '0.4s'}}>
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-pink-600/5 opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-500"></div>
          <div className="relative">
            <div className="text-5xl font-black bg-gradient-to-r from-purple-600 via-purple-500 to-pink-600 bg-clip-text text-transparent mb-3 transform transition-transform group-hover:scale-110">4.9</div>
            <div className="text-gray-700 font-semibold text-lg">Rating Rata-rata</div>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
