"use client"

import Image from "next/image";
import Container from "../components/Container";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Home() {

    const { data: session } = useSession();
    if (!session) redirect("/login");
    console.log(session)

    const FeatureCard = ({ icon, title, description }) => (
      <div className="p-6 bg-white rounded-lg shadow-md">
        <div className="mb-4 text-4xl text-blue-500">{icon}</div>
        <h3 className="mb-2 text-xl font-semibold">{title}</h3>
      </div>
    );
    
    // Main content
    const MainContent = () => (
      <main className="container px-4 py-8 mx-auto">
        <section className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-800">Welcome to Learn Scape</h1>
          <p className="p-5 text-left text-gray-600 te5xt-xl ">
            บทความ: การเรียนรู้นอกห้องเรียนผ่านเกมและเทคโนโลยี: ก้าวใหม่ของการศึกษาวัฒนธรรมท้องถิ่นในยุคดิจิทัล การเรียนรู้ไม่จำเป็นต้องจำกัดอยู่แค่ในห้องเรียนอีกต่อไป แอปพลิเคชันใหม่สำหรับการเรียนรู้วัฒนธรรมท้องถิ่นของจังหวัดขอนแก่นได้นำเสนอวิธีการเรียนรู้แบบใหม่ที่น่าตื่นเต้นและมีประสิทธิภาพ
    แอปพลิเคชันนี้ได้นำเอาเทคโนโลยีสมัยใหม่ มาผสมผสานกับแนวคิดการเรียนรู้ผ่านประสบการณ์จริง ผู้ใช้สามารถสำรวจสถานที่สำคัญทางวัฒนธรรมในขอนแก่นได้อย่างสะดวกและสนุกสนาน พร้อมทั้งเก็บภาพและข้อมูลไว้ในคอลเลกชันส่วนตัว ทำให้การเรียนรู้กลายเป็นการผจญภัยที่น่าจดจำ
    การเพิ่มองค์ประกอบของเกม (Gamification) เข้าไปในแอปทำให้การเรียนรู้มีความสนุกสนานมากขึ้น ผู้ใช้สามารถรับความท้าทายต่างๆ เช่น การเยี่ยมชมสถานที่ครบตามเป้าหมาย ซึ่งช่วยกระตุ้นให้เกิดความอยากเรียนรู้มากขึ้น ทำให้การเข้าถึงความรู้เป็นเรื่องง่าย ไม่ต้องเสียเวลาค้นหาจากหลายแหล่ง เหมาะสำหรับผู้เรียนทุกวัยสิ่งที่เราอยากให้ดีขึ้นคือ การพัฒนาระบบการแข่งขันและการร่วมมือระหว่างผู้ใช้ และมีเรื่องปฎิทินเทศการณ์ จะได้ไม่พลากงานสำคัญเกี่ยวกับวัฒนธรรมของขอนแก่น โดยข้อมูลถูกนำเสนอในรูปแบบที่เข้าใจง่ายและน่าสนใจ 
          </p>
        </section>
    
        <section className="mb-12">
          <h2 className="mb-8 text-3xl font-semibold text-center">Key Features</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <FeatureCard
              icon="🗓️"
              title="Event"
              description="ปฏิทินกิจกรรมและกิจกรรมที่น่าสนใจ"
            />
            <FeatureCard
              icon="🗺️"
              title="Map Tracking"
              description="คำนวณระยะทางบนแผนที่โดยใช้ Google Map"
            />
            <FeatureCard
              icon="📚"
              title="Collection"
              description="สะสมและเก็บความทรงจำในการท่องเที่ยว สถานที่"
            />
          </div>
        </section>
      </main>
    );
    
    const Block_Traval = () => (
      <main>
        <section className="p-8 text-center bg-gray-100 rounded-lg">
          <h2 className="mb-6 text-3xl font-semibold">Latest Travel Tips & Stories</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* บทความที่ 1 */}
            <div className="overflow-hidden bg-white rounded-lg shadow-md">
              <Image
                src="/blog1.jpg"
                alt="Hidden Beaches"
                width={300}
                height={200}
                layout="responsive"
              />
              <div className="p-4">
                <h3 className="mb-2 text-xl font-bold">5 Hidden Beaches in Thailand</h3>
                <p className="text-gray-600">
                  ค้นพบหาดลับที่สวยงามและเงียบสงบ ซึ่งนักท่องเที่ยวส่วนใหญ่ยังไม่เคยไป!
                </p>
                <a
                  href="/blog/hidden-beaches"
                  className="inline-block mt-4 text-blue-500 hover:underline"
                >
                  Read More →
                </a>
              </div>
            </div>
    
            {/* บทความที่ 2 */}
            <div className="overflow-hidden bg-white rounded-lg shadow-md">
              <Image
                src="/blog2.jpg"
                alt="Packing Tips"
                width={300}
                height={200}
                layout="responsive"
              />
              <div className="p-4">
                <h3 className="mb-2 text-xl font-bold">10 Essential Packing Tips</h3>
                <p className="text-gray-600">
                  เตรียมตัวให้พร้อมกับคำแนะนำเกี่ยวกับสิ่งที่ควรนำติดตัวไปในทุกทริป!
                </p>
                <a
                  href="/blog/packing-tips"
                  className="inline-block mt-4 text-blue-500 hover:underline"
                >
                  Read More →
                </a>
              </div>
            </div>
    
            {/* บทความที่ 3 */}
            <div className="overflow-hidden bg-white rounded-lg shadow-md">
              <Image
                src="/blog3.jpg"
                alt="Travel on a Budget"
                width={300}
                height={200}
                layout="responsive"
              />
              <div className="p-4">
                <h3 className="mb-2 text-xl font-bold">Travel on a Budget</h3>
                <p className="text-gray-600">
                  เคล็ดลับการเดินทางประหยัดที่ช่วยให้คุณสนุกได้โดยไม่ต้องใช้จ่ายเกินงบ!
                </p>
                <a
                  href="/blog/travel-on-budget"
                  className="inline-block mt-4 text-blue-500 hover:underline"
                >
                  Read More →
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
    
    
    // Footer
    const Footer = () => (
      <footer className="py-8 text-white bg-blue-600">
        <div className="container mx-auto text-center">
          <h2 className="mb-4 text-3xl font-semibold">Ready to Get Started?</h2>
          <Link href="/Signup" className="px-6 py-3 text-xl font-semibold text-blue-600 transition duration-300 bg-white rounded-full hover:bg-blue-100">
            Sign Up Now
          </Link>
        </div>
      </footer>
    );

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar session={session} />
      <MainContent />
      <Block_Traval />
      <Footer />
    </div>


    // <main>
    //   <Container>
    //     <Navbar session={session} />
    //       <div className="flex-grow text-center p-10">
    //         <h3 className="text-5xl">Welcome, {session?.user?.name}</h3>
    //         <p className="text-2xl mt-3">Your email address: {session?.user?.email}</p>
    //         <p className="text-2xl mt-3">Your user role: {session?.user?.role}</p>
    //       </div>
    //     <Footer />
    //   </Container>
    // </main>
    
  );
}
