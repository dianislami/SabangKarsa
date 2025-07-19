
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MapPin, Mail, Phone, Users } from "lucide-react";
import { Navbar } from "@/components/layouts/navbar";
import { Footer } from "@/components/layouts/footer";
import data from "../../data/about.json";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  bio: string;
}

const teamData: TeamMember[] = data;

export function AboutUs() {
  const [team, setTeam] = useState<TeamMember[]>([]);

  useEffect(() => {
    setTeam(teamData);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar id="navbar" />
    {/* Hero Section */}
    <section className="relative bg-gradient-to-br from-emerald-900/90 to-emerald-700/90 text-white overflow-hidden">
        <div className="absolute inset-0 -z-10">
            <img 
                src="/assets/destinasi/pantaiiboih.jpg" 
                alt="Sabang" 
                    loading="lazy"
                className="w-full h-full object-cover opacity-40"
            />
        </div>
        <div className="container mx-auto max-w-7xl px-4 py-20 md:py-28 flex flex-col items-center">
            <motion.h1 
                className="text-4xl md:text-6xl font-bold text-center mb-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                Tentang Jak Sabang
            </motion.h1>
            <motion.p 
                className="text-lg md:text-xl text-center max-w-3xl mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                Kami membantu Anda menikmati pengalaman wisata terbaik di Pulau Weh dengan layanan transportasi dan tur yang personal dan memukau.
            </motion.p>
            <motion.div 
                className="flex flex-wrap gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
            >
                <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
                    <Users className="w-5 h-5" />
                    <span>3+ Tahun Pengalaman</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
                    <MapPin className="w-5 h-5" />
                    <span>Tour Terbaik di Sabang</span>
                </div>
            </motion.div>
        </div>
    </section>

      {/* Mission & Vision Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Misi & Visi Kami
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="detail-box rounded-2xl p-6 md:p-8 shadow-lg bg-card">
              <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4">
                Misi
              </h3>
              <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
                Menyediakan pengalaman wisata yang autentik dan berkelanjutan di Sabang, dengan fokus pada pelayanan terbaik, pelestarian budaya lokal, dan keindahan alam Pulau Weh.
              </p>
            </div>
            <div className="detail-box rounded-2xl p-6 md:p-8 shadow-lg bg-card">
              <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4">
                Visi
              </h3>
              <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
                Menjadikan Sabang sebagai destinasi wisata kelas dunia yang dikenal karena keindahan alam, kekayaan kuliner, dan keramahan masyarakatnya.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 px-4 bg-muted/50 ">
        <div className="container mx-auto max-w-7xl">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Tim Kami
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-15 px-6 ">
            {team.map((member) => (
              <motion.div
                key={member.id}
                className="bg-card rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: member.id * 0.1 }}
              >
                <div className="relative h-48">
                  <img
                    src={member.image}
                    alt={member.name}
                        loading="eager"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/assets/destinasi/pantaiiboih.jpg";
                    }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {member.name}
                  </h3>
                  <p className="text-emerald-600 dark:text-emerald-400 font-semibold mb-2">
                    {member.role}
                  </p>
                  <p className="text-muted-foreground text-sm line-clamp-3">
                    {member.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Hubungi Kami
          </motion.h2>
          <motion.div
            className="detail-box rounded-2xl p-6 md:p-8 shadow-lg bg-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4">
                  Informasi Kontak
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    <p className="text-muted-foreground">
                      Jalan Perdagangan No. 123, Sabang, Pulau Weh, Aceh
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    <p className="text-muted-foreground">
                      info@jaksabang.com
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    <p className="text-muted-foreground">
                      +62 812-3456-7890
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4">
                  Kirim Pesan
                </h3>
                <p className="text-muted-foreground mb-4">
                  Hubungi kami untuk informasi lebih lanjut atau pertanyaan tentang layanan wisata di Sabang.
                </p>
                <Button
                  className="bg-emerald-500 hover:bg-emerald-600 text-white"
                  onClick={() => alert("Fitur kontak segera hadir!")}
                >
                  Kirim Pesan
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
