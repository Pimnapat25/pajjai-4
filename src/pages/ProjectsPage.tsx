import { useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { MapPin, Target, Search, Filter } from "lucide-react";

type ProjectDetail = {
  id: number;
  name: string;
  temple: string;
  location: string;
  image: string;
  raised: number;
  goal: number;
  status: "ongoing" | "completed";
  category: string;
  details: {
    materials: Array<{ name: string; qty: string; unitCost: number; subtotal: number }>;
    equipment: Array<{ name: string; days: number; dailyRate: number; subtotal: number }>;
    labor: Array<{ role: string; count: number; days: number; dailyRate: number; subtotal: number }>;
    permits?: Array<{ name: string; cost: number }>;
    notes?: string;
    totalEstimated: number;
  };
};

const projects: ProjectDetail[] = [
  {
    id: 1,
    name: "สร้างศาลาการเปรียญ",
    temple: "วัดพระธาตุดอยสุเทพ",
    location: "เชียงใหม่",
    image: "public/images/images.jpg",
    raised: 845000,
    goal: 1200000,
    status: "ongoing",
    category: "ก่อสร้าง",
    details: {
      materials: [
        { name: "ปูนซีเมนต์ปอร์ตแลนด์", qty: "300 ถุง", unitCost: 180, subtotal: 54000 },
        { name: "เหล็กเส้น 12 มม.", qty: "2,000 กก.", unitCost: 22, subtotal: 44000 },
        { name: "ทรายหยาบ", qty: "80 คิว", unitCost: 600, subtotal: 48000 },
        { name: "หินคลุก", qty: "60 คิว", unitCost: 750, subtotal: 45000 },
        { name: "ไม้แบบ/นั่งร้าน", qty: "เหมาจ่าย", unitCost: 0, subtotal: 35000 },
      ],
      equipment: [
        { name: "เครื่องผสมคอนกรีต", days: 15, dailyRate: 1500, subtotal: 22500 },
        { name: "เครื่องตัดเหล็ก", days: 10, dailyRate: 1200, subtotal: 12000 },
      ],
      labor: [
        { role: "ช่างก่อสร้าง", count: 6, days: 20, dailyRate: 800, subtotal: 96000 },
        { role: "ผู้ช่วยช่าง", count: 4, days: 20, dailyRate: 600, subtotal: 48000 },
      ],
      permits: [
        { name: "ค่าแบบและวิศวกร", cost: 30000 },
      ],
      notes: "โครงสร้างคสล. พื้นที่ใช้สอย 120 ตร.ม.",
      totalEstimated: 364500,
    },
  },
  {
    id: 2,
    name: "บูรณะพระอุโบสถ",
    temple: "วัดอรุณราชวราราม",
    location: "กรุงเทพฯ",
    image: "public/images/download.jpg",
    raised: 320000,
    goal: 500000,
    status: "ongoing",
    category: "บูรณะ",
    details: {
      materials: [
        { name: "สีทาภายใน/ภายนอก เกรด A", qty: "400 ลิตร", unitCost: 350, subtotal: 140000 },
        { name: "น้ำยาเช็ดล้าง/กันเชื้อรา", qty: "50 ลิตร", unitCost: 250, subtotal: 12500 },
        { name: "ไม้บันได/ซ่อมพื้น", qty: "เหมาจ่าย", unitCost: 0, subtotal: 28000 },
      ],
      equipment: [
        { name: "นั่งร้าน/บันไดแบบ", days: 12, dailyRate: 1000, subtotal: 12000 },
      ],
      labor: [
        { role: "ช่างทาสี", count: 4, days: 10, dailyRate: 700, subtotal: 28000 },
        { role: "ช่างไม้", count: 2, days: 8, dailyRate: 800, subtotal: 12800 },
      ],
      notes: "ซ่อมรอยแตกร้าวและเคลือบผิวกันความชื้น",
      totalEstimated: 233300,
    },
  },
  {
    id: 3,
    name: "ติดตั้งระบบโซล่าเซลล์",
    temple: "วัดโพธิ์",
    location: "กรุงเทพฯ",
    image: "public/images/solarcell.jpg",
    raised: 180000,
    goal: 300000,
    status: "ongoing",
    category: "ค่าน้ำไฟ",
    details: {
      materials: [
        { name: "แผงโซล่าเซลล์ 450W", qty: "20 แผง", unitCost: 5200, subtotal: 104000 },
        { name: "อินเวอร์เตอร์ 5kW", qty: "2 เครื่อง", unitCost: 22000, subtotal: 44000 },
        { name: "โครงยึด/สายไฟ/เบรกเกอร์", qty: "ชุด", unitCost: 0, subtotal: 28000 },
      ],
      equipment: [
        { name: "อุปกรณ์ความปลอดภัยและปีนหลังคา", days: 5, dailyRate: 800, subtotal: 4000 },
      ],
      labor: [
        { role: "ช่างไฟฟ้า", count: 3, days: 6, dailyRate: 900, subtotal: 16200 },
        { role: "ผู้ช่วยติดตั้ง", count: 2, days: 6, dailyRate: 600, subtotal: 7200 },
      ],
      permits: [
        { name: "ขออนุญาตการไฟฟ้า/ตรวจรับ", cost: 8000 },
      ],
      notes: "ระบบออนกริด พร้อมมาตรวัดสองทิศทาง",
      totalEstimated: 211400,
    },
  },
  {
    id: 4,
    name: "จัดตั้งห้องสมุดพุทธธรรม",
    temple: "วัดพระแก้ว",
    location: "กรุงเทพฯ",
    image: "public/images/library.jpg",
    raised: 250000,
    goal: 250000,
    status: "completed",
    category: "การศึกษา",
    details: {
      materials: [
        { name: "ชั้นวางหนังสือ", qty: "20 ตัว", unitCost: 2500, subtotal: 50000 },
        { name: "ชุดโต๊ะอ่านหนังสือ", qty: "10 ชุด", unitCost: 3000, subtotal: 30000 },
        { name: "หนังสือหลักธรรม/สื่อการเรียนรู้", qty: "ชุด", unitCost: 0, subtotal: 60000 },
      ],
      equipment: [
        { name: "คอมพิวเตอร์/สแกนหนังสือ", days: 0, dailyRate: 0, subtotal: 25000 },
      ],
      labor: [
        { role: "ช่างเฟอร์นิเจอร์/ติดตั้ง", count: 3, days: 5, dailyRate: 800, subtotal: 12000 },
        { role: "บรรณารักษ์ชั่วคราว", count: 1, days: 30, dailyRate: 700, subtotal: 21000 },
      ],
      notes: "โครงการเสร็จสมบูรณ์และเปิดให้บริการ",
      totalEstimated: 198000,
    },
  },
];

const ProjectsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.temple.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8 space-y-8">
        <div className="space-y-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">โครงการทั้งหมด</h1>
            <p className="text-muted-foreground mt-2">
              ร่วมสมทบทุนโครงการพัฒนาวัดทั่วประเทศ
            </p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="ค้นหาโครงการ หรือ วัด..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={statusFilter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("all")}
              >
                ทั้งหมด
              </Button>
              <Button
                variant={statusFilter === "ongoing" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("ongoing")}
              >
                กำลังดำเนินการ
              </Button>
              <Button
                variant={statusFilter === "completed" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("completed")}
              >
                สำเร็จแล้ว
              </Button>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => {
            const progress = (project.raised / project.goal) * 100;
            const isCompleted = project.status === "completed";
            
            return (
              <Card key={project.id} className="overflow-hidden hover:shadow-medium transition-smooth group">
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-3 right-3 flex gap-2">
                    <Badge className="bg-primary">
                      {project.category}
                    </Badge>
                    {isCompleted && (
                      <Badge className="bg-green-500 text-white">
                        สำเร็จแล้ว
                      </Badge>
                    )}
                  </div>
                </div>
                
                <CardContent className="p-5 space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground line-clamp-1">
                      {project.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {project.temple}
                    </p>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                      <MapPin className="h-3.5 w-3.5" />
                      <span>{project.location}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">ยอดสมทบทุน</span>
                      <span className="font-semibold text-primary">
                        ฿{project.raised.toLocaleString()} / ฿{project.goal.toLocaleString()}
                      </span>
                    </div>
                    <Progress value={progress} className="h-2" />
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Target className="h-3 w-3" />
                      <span>{progress.toFixed(0)}% ของเป้าหมาย</span>
                    </div>
                  </div>

                  {/* Details breakdown */}
                  <div className="rounded-md border bg-muted/30">
                    <details className="group open:shadow-inner">
                      <summary className="cursor-pointer list-none p-3 flex items-center justify-between">
                        <span className="font-medium">รายละเอียดโครงการ</span>
                        <span className="text-xs text-muted-foreground group-open:hidden">แสดง</span>
                        <span className="text-xs text-muted-foreground hidden group-open:inline">ซ่อน</span>
                      </summary>
                      <div className="p-3 space-y-3 border-t">
                        <div>
                          <h4 className="text-sm font-semibold mb-2">วัสดุ</h4>
                          <ul className="space-y-1 text-sm text-muted-foreground">
                            {project.details.materials.map((m, idx) => (
                              <li key={idx} className="flex justify-between">
                                <span>{m.name} • {m.qty}</span>
                                <span>฿{m.subtotal.toLocaleString()}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold mb-2">อุปกรณ์</h4>
                          <ul className="space-y-1 text-sm text-muted-foreground">
                            {project.details.equipment.map((e, idx) => (
                              <li key={idx} className="flex justify-between">
                                <span>{e.name} • {e.days} วัน x ฿{e.dailyRate.toLocaleString()}</span>
                                <span>฿{e.subtotal.toLocaleString()}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold mb-2">ค่าแรง</h4>
                          <ul className="space-y-1 text-sm text-muted-foreground">
                            {project.details.labor.map((l, idx) => (
                              <li key={idx} className="flex justify-between">
                                <span>{l.role} • {l.count} คน x {l.days} วัน x ฿{l.dailyRate.toLocaleString()}</span>
                                <span>฿{l.subtotal.toLocaleString()}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        {project.details.permits && project.details.permits.length > 0 && (
                          <div>
                            <h4 className="text-sm font-semibold mb-2">ค่าดำเนินการ/ใบอนุญาต</h4>
                            <ul className="space-y-1 text-sm text-muted-foreground">
                              {project.details.permits.map((p, idx) => (
                                <li key={idx} className="flex justify-between">
                                  <span>{p.name}</span>
                                  <span>฿{p.cost.toLocaleString()}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {project.details.notes && (
                          <p className="text-xs text-muted-foreground">หมายเหตุ: {project.details.notes}</p>
                        )}
                        <div className="flex justify-between pt-2 border-t font-semibold">
                          <span>ประมาณการรวม</span>
                          <span>฿{project.details.totalEstimated.toLocaleString()}</span>
                        </div>
                      </div>
                    </details>
                  </div>
                </CardContent>
                
                <CardFooter className="p-5 pt-0">
                  <Button 
                    className="w-full gradient-warm border-0 text-white hover:shadow-glow"
                    disabled={isCompleted}
                  >
                    {isCompleted ? "โครงการสำเร็จแล้ว" : "ร่วมสมทบทุน"}
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <Filter className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
            <p className="text-muted-foreground">ไม่พบโครงการที่ตรงกับการค้นหา</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default ProjectsPage;
