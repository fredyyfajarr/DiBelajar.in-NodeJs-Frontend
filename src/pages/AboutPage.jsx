/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  BookOpen, 
  Heart, 
  Target, 
  Award, 
  Globe,
  Lightbulb,
  Star,
  Zap
} from 'lucide-react';

const AboutPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const stats = [
    { number: "10,000+", label: "Siswa Aktif", icon: Users },
    { number: "500+", label: "Kursus Tersedia", icon: BookOpen },
    { number: "50+", label: "Instruktur Ahli", icon: Award },
    { number: "98%", label: "Kepuasan Siswa", icon: Star }
  ];

  const values = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Pembelajaran untuk Semua",
      description: "Kami percaya pendidikan berkualitas harus dapat diakses oleh semua orang, tanpa terkecuali.",
      gradient: "from-purple-500 to-purple-600",
      bgGradient: "from-purple-50 to-purple-100",
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Inovasi Berkelanjutan",
      description: "Terus berinovasi dalam metode pembelajaran untuk memberikan pengalaman terbaik.",
      gradient: "from-pink-500 to-rose-500",
      bgGradient: "from-pink-50 to-pink-100",
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Fokus pada Hasil",
      description: "Setiap kursus dirancang dengan tujuan jelas untuk membantu mencapai target karir Anda.",
      gradient: "from-purple-600 to-pink-600",
      bgGradient: "from-purple-50 to-pink-50",
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Komunitas Global",
      description: "Bergabung dengan komunitas pembelajar dari seluruh dunia untuk saling berbagi pengalaman.",
      gradient: "from-indigo-500 to-purple-500",
      bgGradient: "from-indigo-50 to-purple-50",
    }
  ];

  const team = [
    {
      name: "Fredy Fajar",
      role: "Backend Engineer",
      description: "Merancang dan mengembangkan sistem backend yang efisien dan scalable.",
      gradient: "from-purple-600 to-pink-600",
      image: "/isak.png"
    },
    {
      name: "Eka Revandi",
      role: "Frontend Engineer",
      description: "Mengembangkan antarmuka pengguna yang intuitif dan responsif untuk pengalaman belajar yang lebih baik.",
      gradient: "from-pink-500 to-rose-500",
      image: "/revan.jpg"
    },
  ];

  return (
    <div className="min-h-screen bg-transparent">
      {/* Hero Section */}
      <div className="relative py-20 overflow-hidden bg-transparent">
        {/* Background Decorations */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-purple-300/30 to-pink-300/30 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-pink-300/30 to-purple-300/30 rounded-full blur-xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-2xl"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            variants={titleVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Tentang
              </span>
              <br />
              <span className="text-gray-800">DiBelajar.in</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-600 leading-relaxed mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Platform pembelajaran online terdepan yang menghubungkan jutaan siswa 
              dengan instruktur terbaik dari seluruh dunia.
            </motion.p>

            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            />
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-gradient-to-r from-purple-50/50 to-pink-50/50">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  className="text-center group"
                >
                  <motion.div
                    className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl group-hover:scale-110 transition-transform duration-300"
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <Icon className="w-8 h-8 text-purple-600" />
                  </motion.div>
                  <motion.h3 
                    className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2"
                    initial={{ scale: 0.8 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    {stat.number}
                  </motion.h3>
                  <p className="text-gray-600 font-medium">{stat.label}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            className="max-w-4xl mx-auto text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Misi Kami
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-8 rounded-full"></div>
            <p className="text-xl text-gray-600 leading-relaxed">
              Kami berkomitmen untuk mendemokratisasi akses terhadap pendidikan berkualitas tinggi. 
              Dengan teknologi terdepan dan pendekatan pembelajaran yang inovatif, kami membantu 
              setiap individu mencapai potensi terbaik mereka dan meraih kesuksesan dalam karir impian.
            </p>
          </motion.div>

          {/* Values Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.4, ease: "easeOut" } 
                }}
                className="group relative"
              >
                {/* Glowing Border Effect */}
                <div className={`absolute -inset-0.5 bg-gradient-to-br ${value.gradient} rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm`}></div>
                
                {/* Main Content */}
                <div className="relative bg-white rounded-3xl p-8 shadow-xl group-hover:shadow-2xl transition-all duration-500">
                  {/* Icon */}
                  <motion.div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${value.bgGradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="text-gray-700">
                      {value.icon}
                    </div>
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold mb-4 group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                    {value.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>

                  {/* Bottom accent */}
                  <motion.div
                    className={`mt-6 w-12 h-1 bg-gradient-to-r ${value.gradient} rounded-full opacity-0 group-hover:opacity-100 group-hover:w-20 transition-all duration-500`}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-20 bg-gradient-to-r from-purple-50/30 to-pink-50/30">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Tim Kami
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-8 rounded-full"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Dibalik kesuksesan DiBelajar.in adalah tim yang passionate dan berpengalaman 
              dalam dunia pendidikan dan teknologi.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {team.map((member, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -15 }}
                className="group text-center"
              >
                <div className="relative bg-white rounded-3xl p-8 shadow-xl group-hover:shadow-2xl transition-all duration-500">
                  {/* Avatar Foto */}
                    <motion.div
                      className="w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden shadow-lg group-hover:scale-110 transition-transform duration-300"
                      whileHover={{ rotate: [0, -5, 5, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  {/* Name */}
                  <h3 className="text-2xl font-bold mb-2 group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                    {member.name}
                  </h3>

                  {/* Role */}
                  <p className={`text-lg font-semibold mb-4 bg-gradient-to-r ${member.gradient} bg-clip-text text-transparent`}>
                    {member.role}
                  </p>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed">
                    {member.description}
                  </p>

                  {/* Bottom accent */}
                  <motion.div
                    className={`mt-6 w-16 h-1 bg-gradient-to-r ${member.gradient} rounded-full mx-auto opacity-0 group-hover:opacity-100 group-hover:w-24 transition-all duration-500`}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Tech Stack Section */}
      <div className="py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Tech Stack
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-8 rounded-full"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Platform DiBelajar.in dibangun dengan teknologi modern dan terdepan untuk memberikan 
              pengalaman pembelajaran yang optimal dan performa terbaik.
            </p>
          </motion.div>

          {/* Tech Categories - Vertical Layout */}
          <div className="space-y-16">
            {/* Frontend */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold mb-12 text-gray-800">Frontend</h3>
              <div className="flex justify-center">
                <div className="grid grid-cols-2 md:grid-cols-2 gap-8 max-w-md">
                  <motion.div
                    className="group bg-white rounded-2xl p-8 transition-all duration-300"
                    whileHover={{ y: -8, scale: 1.05 }}
                  >
                    <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                      <img 
                        src="/icons/React.svg" 
                        alt="React" 
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">React</h4>
                    <p className="text-sm text-gray-600">UI Library</p>
                  </motion.div>

                  <motion.div
                    className="group bg-white rounded-2xl p-8 transition-all duration-300"
                    whileHover={{ y: -8, scale: 1.05 }}
                  >
                    <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                      <img 
                        src="/icons/Tailwind CSS.svg" 
                        alt="Tailwind CSS" 
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">Tailwind CSS</h4>
                    <p className="text-sm text-gray-600">CSS Framework</p>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Backend */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold mb-12 text-gray-800">Backend</h3>
              <div className="flex justify-center">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-2xl">
                  <motion.div
                    className="group bg-white rounded-2xl p-8 transition-all duration-300"
                    whileHover={{ y: -8, scale: 1.05 }}
                  >
                    <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                      <img 
                        src="/icons/Node.js.svg" 
                        alt="Node.js" 
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">Node.js</h4>
                    <p className="text-sm text-gray-600">Runtime Environment</p>
                  </motion.div>

                  <motion.div
                    className="group bg-white rounded-2xl p-8 transition-all duration-300"
                    whileHover={{ y: -8, scale: 1.05 }}
                  >
                    <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                      <img 
                        src="/icons/Express.svg" 
                        alt="Express.js" 
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">Express.js</h4>
                    <p className="text-sm text-gray-600">Web Framework</p>
                  </motion.div>

                  <motion.div
                    className="group bg-white rounded-2xl p-8 transition-all duration-300 col-span-2 md:col-span-1"
                    whileHover={{ y: -8, scale: 1.05 }}
                  >
                    <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                      <img 
                        src="/icons/MongoDB.svg" 
                        alt="MongoDB" 
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">MongoDB</h4>
                    <p className="text-sm text-gray-600">NoSQL Database</p>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Tools & Cloud */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold mb-12 text-gray-800">Tools & Cloud</h3>
              <div className="flex justify-center">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl">
                  <motion.div
                    className="group bg-white rounded-2xl p-8 transition-all duration-300"
                    whileHover={{ y: -8, scale: 1.05 }}
                  >
                    <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                      <img 
                        src="/icons/AWS.svg" 
                        alt="AWS" 
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">AWS</h4>
                    <p className="text-sm text-gray-600">Cloud Provider</p>
                  </motion.div>

                  <motion.div
                    className="group bg-white rounded-2xl p-8 transition-all duration-300"
                    whileHover={{ y: -8, scale: 1.05 }}
                  >
                    <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                      <img 
                        src="/icons/Figma.svg" 
                        alt="Figma" 
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">Figma</h4>
                    <p className="text-sm text-gray-600">UI/UX Design</p>
                  </motion.div>

                  <motion.div
                    className="group bg-white rounded-2xl p-8 transition-all duration-300"
                    whileHover={{ y: -8, scale: 1.05 }}
                  >
                    <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                      <img 
                        src="/icons/WebStorm.svg" 
                        alt="WebStorm" 
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">WebStorm</h4>
                    <p className="text-sm text-gray-600">IDE</p>
                  </motion.div>

                  <motion.div
                    className="group bg-white rounded-2xl p-8 transition-all duration-300"
                    whileHover={{ y: -8, scale: 1.05 }}
                  >
                    <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                      <img 
                        src="/icons/Nodemon.svg" 
                        alt="Nodemon" 
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">Nodemon</h4>
                    <p className="text-sm text-gray-600">Development Tool</p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Tech Stack Features */}
          <motion.div
            className="mt-16 bg-gradient-to-br from-purple-50/50 to-pink-50/50 rounded-3xl p-8 md:p-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-purple-600" />
                </div>
                <h4 className="text-lg font-bold mb-2 text-gray-800">Performa Tinggi</h4>
                <p className="text-gray-600 text-sm">
                  Dioptimalkan untuk kecepatan dan responsivitas maksimal
                </p>
              </motion.div>

              <motion.div
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-purple-600" />
                </div>
                <h4 className="text-lg font-bold mb-2 text-gray-800">Scalable</h4>
                <p className="text-gray-600 text-sm">
                  Arsitektur yang dapat menangani jutaan pengguna
                </p>
              </motion.div>

              <motion.div
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-purple-600" />
                </div>
                <h4 className="text-lg font-bold mb-2 text-gray-800">Modern</h4>
                <p className="text-gray-600 text-sm">
                  Menggunakan teknologi terbaru dan best practices
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="inline-flex items-center justify-center w-20 h-20 mb-8 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full"
              whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.5 }}
            >
              <Zap className="w-10 h-10 text-purple-600" />
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Siap Bergabung?
              </span>
            </h2>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Bergabunglah dengan ribuan siswa lainnya dan mulai perjalanan pembelajaran 
              yang akan mengubah hidup Anda selamanya.
            </p>

            <motion.button
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Mulai Belajar Sekarang
              <motion.span
                className="ml-2"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
