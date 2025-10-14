import { useState } from "react";
import Header from "@/components/Header";
import StatCard from "@/components/StatCard";
import TempleCard from "@/components/TempleCard";
import CategoryTabs from "@/components/CategoryTabs";
import DonationChart from "@/components/DonationChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { DollarSign, Users, TrendingUp, Heart } from "lucide-react";

const Index = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  
  const temples = [
    {
      id: "1",
      name: "วัดพระธาตุดอยสุเทพราชวรวิหาร",
      location: "เชียงใหม่",
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80",
      raised: 245000,
      goal: 500000,
      category: "ก่อสร้าง",
    },
    {
      id: "2",
      name: "วัดโพธิ์",
      location: "กรุงเทพมหานคร",
      image: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=800&q=80",
      raised: 180000,
      goal: 300000,
      category: "ค่าน้ำไฟ",
    },
    {
      id: "3",
      name: "วัดอรุณราชวราราม",
      location: "กรุงเทพมหานคร",
      image: "https://images.unsplash.com/photo-1563492065599-3520f775eeed?w=800&q=80",
      raised: 120000,
      goal: 400000,
      category: "ถวายอาหาร",
    },
    {
      id: "4",
      name: "วัดพระแก้ว",
      location: "กรุงเทพมหานคร",
      image: "https://images.unsplash.com/photo-1583204233708-cb5ab08ee3d3?w=800&q=80",
      raised: 85000,
      goal: 250000,
      category: "การศึกษา",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8 space-y-12">
        {/* Hero Stats Section */}
        <section className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-foreground">
              ร่วมสร้างบุญกับวัดทั่วประเทศ
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              ระบบบริจาคที่โปร่งใส แสดงรายละเอียดค่าใช้จ่ายและความต้องการของวัดอย่างชัดเจน
            </p>
          </div>
          
          <div className="grid gap-4 md:grid-cols-3">
            <StatCard
              icon={DollarSign}
              label="ยอดบริจาครวมในระบบ"
              value="฿1.12M"
              trend="+12.5% จากเดือนที่แล้ว"
            />
            <StatCard
              icon={Users}
              label="จำนวนวัดที่เข้าร่วม"
              value="247"
              trend="วัด"
            />
            <StatCard
              icon={TrendingUp}
              label="โครงการที่สำเร็จ"
              value="38"
              trend="โครงการ"
            />
          </div>
        </section>

        {/* Donation Distribution Chart */}
        <section>
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary" />
                สัดส่วนหมวดบริจาค
              </CardTitle>
            </CardHeader>
            <CardContent>
              <DonationChart />
            </CardContent>
          </Card>
        </section>

        {/* Community Fund */}
        <section>
          <Card className="shadow-medium gradient-warm text-white">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold">กองทุนรวมเพื่อวัดที่ขาดแคลน</h3>
                  <p className="text-white/90 mt-1">
                    ช่วยเหลือวัดที่มีความต้องการเร่งด่วน
                  </p>
                </div>
                <Heart className="h-12 w-12 text-white/30" fill="currentColor" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>฿475,200</span>
                  <span>฿1,000,000</span>
                </div>
                <Progress value={47.52} className="h-3 bg-white/30" />
              </div>
              
              <div className="flex gap-3">
                <Button variant="secondary" size="sm" className="flex-1">
                  ฿100
                </Button>
                <Button variant="secondary" size="sm" className="flex-1">
                  ฿300
                </Button>
                <Button variant="secondary" size="sm" className="flex-1">
                  ฿500
                </Button>
                <Button variant="secondary" size="sm" className="flex-1">
                  จำนวนอื่น
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Recommended Temples */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-foreground">
                วัดที่ควรให้ความช่วยเหลือ
              </h3>
              <p className="text-muted-foreground mt-1">
                วัดที่มีความต้องการบริจาคมากที่สุด
              </p>
            </div>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {temples.map((temple) => (
              <TempleCard key={temple.id} {...temple} />
            ))}
          </div>
        </section>

        {/* Category Section */}
        <section className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-foreground">
              เลือกตามหมวดหมู่
            </h3>
            <p className="text-muted-foreground mt-1">
              บริจาคตามหมวดที่คุณสนใจ
            </p>
          </div>
          
          <CategoryTabs 
            activeCategory={activeCategory} 
            onCategoryChange={setActiveCategory}
          />
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {temples
              .filter(t => activeCategory === "all" || t.category === activeCategory)
              .map((temple) => (
                <TempleCard key={temple.id} {...temple} />
              ))}
          </div>
        </section>
      </main>
      
      <footer className="border-t bg-card py-8 mt-16">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© 2025 ปัจจัย 4.0 - เชื่อมศรัทธาให้โปร่งใส</p>
          <div className="flex gap-6 justify-center mt-4">
            <a href="#" className="hover:text-primary transition-colors">เกี่ยวกับเรา</a>
            <a href="#" className="hover:text-primary transition-colors">ติดต่อวัด</a>
            <a href="#" className="hover:text-primary transition-colors">ร่วมเป็น Partner</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
