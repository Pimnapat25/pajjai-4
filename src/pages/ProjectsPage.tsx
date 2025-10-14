import { useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { MapPin, Target, Search, Filter } from "lucide-react";

const projects = [
  {
    id: 1,
    name: "สร้างศาลาการเปรียญ",
    temple: "วัดพระธาตุดอยสุเทพ",
    location: "เชียงใหม่",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&q=80",
    raised: 845000,
    goal: 1200000,
    status: "ongoing",
    category: "ก่อสร้าง",
  },
  {
    id: 2,
    name: "บูรณะพระอุโบสถ",
    temple: "วัดอรุณราชวราราม",
    location: "กรุงเทพฯ",
    image: "https://images.unsplash.com/photo-1563492065599-3520f775eeed?w=600&q=80",
    raised: 320000,
    goal: 500000,
    status: "ongoing",
    category: "บูรณะ",
  },
  {
    id: 3,
    name: "ติดตั้งระบบโซล่าเซลล์",
    temple: "วัดโพธิ์",
    location: "กรุงเทพฯ",
    image: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=600&q=80",
    raised: 180000,
    goal: 300000,
    status: "ongoing",
    category: "ค่าน้ำไฟ",
  },
  {
    id: 4,
    name: "จัดตั้งห้องสมุดพุทธธรรม",
    temple: "วัดพระแก้ว",
    location: "กรุงเทพฯ",
    image: "https://images.unsplash.com/photo-1583204233708-cb5ab08ee3d3?w=600&q=80",
    raised: 250000,
    goal: 250000,
    status: "completed",
    category: "การศึกษา",
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
