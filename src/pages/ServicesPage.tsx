import { useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Zap, Wrench, Droplet, PaintBucket, Trees, Hammer, MapPin, Users, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type ServiceRequest = {
  id: string;
  name: string;
  description: string;
  urgency: "high" | "medium" | "low";
  temple: string;
  location: string;
  category: "repair" | "maintenance" | "cleaning" | "construction" | "other";
  estimatedCost: number;
  deadline: string;
  icon: any;
  volunteersNeeded: number;
};

const serviceRequests: ServiceRequest[] = [
  {
    id: "1",
    name: "ซ่อมสายไฟฟ้า",
    description: "สายไฟภายในกุฏิชำรุด มีความเสี่ยงต่อการลัดวงจร ต้องการช่างไฟฟ้ามืออาชีพเพื่อเข้ามาตรวจสอบและซ่อมแซม",
    urgency: "high",
    temple: "วัดพระธาตุดอยสุเทพราชวรวิหาร",
    location: "เชียงใหม่",
    category: "repair",
    estimatedCost: 5000,
    deadline: "ภายใน 7 วัน",
    icon: Zap,
    volunteersNeeded: 2,
  },
  {
    id: "2",
    name: "ซ่อมท่อน้ำรั่ว",
    description: "ท่อน้ำในห้องน้ำอุโบสถรั่ว ทำให้เสียน้ำและพื้นชื้น ต้องการช่างประปาที่มีประสบการณ์",
    urgency: "high",
    temple: "วัดอรุณราชวราราม",
    location: "กรุงเทพมหานคร",
    category: "repair",
    estimatedCost: 3500,
    deadline: "ภายใน 5 วัน",
    icon: Droplet,
    volunteersNeeded: 1,
  },
  {
    id: "3",
    name: "ทาสีอาคารศาลา",
    description: "สีผนังศาลาการเปรียญหลุดลอกและซีด ต้องการทาสีใหม่ พื้นที่ประมาณ 200 ตารางเมตร",
    urgency: "medium",
    temple: "วัดหัวลำโพง",
    location: "กรุงเทพมหานคร",
    category: "maintenance",
    estimatedCost: 12000,
    deadline: "ภายใน 1 เดือน",
    icon: PaintBucket,
    volunteersNeeded: 4,
  },
  {
    id: "4",
    name: "ตัดต้นไม้ใหญ่",
    description: "ต้นไม้ใหญ่ในบริเวณวัดกิ่งก้านยื่นไปทับหลังคา อาจเป็นอันตรายในฤดูฝน ต้องการผู้เชี่ยวชาญด้านการตัดแต่งต้นไม้",
    urgency: "medium",
    temple: "วัดโพธิ์",
    location: "กรุงเทพมหานคร",
    category: "maintenance",
    estimatedCost: 8000,
    deadline: "ภายใน 2 สัปดาห์",
    icon: Trees,
    volunteersNeeded: 3,
  },
  {
    id: "5",
    name: "ซ่อมหลังคารั่ว",
    description: "หลังคากุฏิพระรั่วตอนฝนตก ต้องการช่างมุงหลังคามาซ่อมแซมเปลี่ยนกระเบื้อง พื้นที่ประมาณ 50 ตารางเมตร",
    urgency: "high",
    temple: "วัดมหาธาตุยุวราชรังสฤษฎิ์",
    location: "กรุงเทพมหานคร",
    category: "repair",
    estimatedCost: 15000,
    deadline: "ภายใน 10 วัน",
    icon: Hammer,
    volunteersNeeded: 3,
  },
  {
    id: "6",
    name: "ทำความสะอาดพื้นที่วัด",
    description: "ต้องการอาสาสมัครช่วยทำความสะอาดบริเวณวัด กวาดใบไม้ ถูพื้น และจัดระเบียบสวนหย่อม",
    urgency: "low",
    temple: "วัดพระธาตุดอยสุเทพราชวรวิหาร",
    location: "เชียงใหม่",
    category: "cleaning",
    estimatedCost: 2000,
    deadline: "ภายใน 1 เดือน",
    icon: PaintBucket,
    volunteersNeeded: 10,
  },
  {
    id: "7",
    name: "ซ่อมประตูหน้าต่าง",
    description: "ประตูหน้าต่างอุโบสถชำรุด เปิด-ปิดไม่สะดวก บานพับและลูกบิดต้องเปลี่ยนใหม่",
    urgency: "medium",
    temple: "วัดอรุณราชวราราม",
    location: "กรุงเทพมหานคร",
    category: "repair",
    estimatedCost: 6000,
    deadline: "ภายใน 3 สัปดาห์",
    icon: Wrench,
    volunteersNeeded: 2,
  },
  {
    id: "8",
    name: "ปรับปรุงระบบไฟฟ้า",
    description: "ติดตั้งไฟส่องสว่างเพิ่มเติมในบริเวณทางเดินและลานวัด เพื่อความปลอดภัย",
    urgency: "low",
    temple: "วัดหัวลำโพง",
    location: "กรุงเทพมหานคร",
    category: "construction",
    estimatedCost: 18000,
    deadline: "ภายใน 2 เดือน",
    icon: Zap,
    volunteersNeeded: 2,
  },
];

const categoryNames = {
  repair: "งานซ่อมแซม",
  maintenance: "งานบำรุงรักษา",
  cleaning: "งานทำความสะอาด",
  construction: "งานก่อสร้าง",
  other: "อื่นๆ",
};

const urgencyColors = {
  high: "destructive",
  medium: "default",
  low: "secondary",
} as const;

const urgencyLabels = {
  high: "ด่วนมาก",
  medium: "ปานกลาง",
  low: "ไม่ด่วน",
};

const ServicesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const { toast } = useToast();

  const filteredRequests = selectedCategory === "all" 
    ? serviceRequests 
    : serviceRequests.filter(s => s.category === selectedCategory);

  const handleVolunteer = (requestName: string) => {
    toast({
      title: "ขอบคุณสำหรับความศรัทธา!",
      description: `คุณได้ลงทะเบียนเป็นอาสาสมัครสำหรับ "${requestName}" เรียบร้อยแล้ว ทางวัดจะติดต่อกลับเร็วๆ นี้`,
    });
  };

  const handleHire = (requestName: string) => {
    toast({
      title: "ดำเนินการจ้างช่างมืออาชีพ",
      description: `กำลังค้นหาผู้ให้บริการที่เหมาะสมสำหรับ "${requestName}" เพื่อติดต่อท่าน`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            คำขอความช่วยเหลือจากวัด
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            ร่วมบุญด้วยการช่วยเหลือวัดที่ต้องการบริการต่างๆ 
            คุณสามารถเป็นอาสาสมัครหรือจ้างผู้เชี่ยวชาญมาช่วยได้
          </p>
        </div>

        {/* Category Tabs */}
        <Tabs defaultValue="all" className="mb-8" onValueChange={setSelectedCategory}>
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 gap-2">
            <TabsTrigger value="all">ทั้งหมด</TabsTrigger>
            <TabsTrigger value="repair">งานซ่อมแซม</TabsTrigger>
            <TabsTrigger value="maintenance">งานบำรุงรักษา</TabsTrigger>
            <TabsTrigger value="cleaning">ทำความสะอาด</TabsTrigger>
            <TabsTrigger value="construction">งานก่อสร้าง</TabsTrigger>
            <TabsTrigger value="other">อื่นๆ</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Service Requests Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRequests.map((request) => {
            const Icon = request.icon;
            return (
              <Card key={request.id} className="shadow-soft hover:shadow-medium transition-smooth">
                <CardHeader>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl">{request.name}</CardTitle>
                      </div>
                    </div>
                    <Badge variant={urgencyColors[request.urgency]}>
                      {urgencyLabels[request.urgency]}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">
                      {categoryNames[request.category]}
                    </Badge>
                  </div>
                  <CardDescription className="mt-4">
                    {request.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          วัด:
                        </span>
                        <span className="font-medium text-right">{request.temple}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">พื้นที่:</span>
                        <span className="font-medium">{request.location}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          ระยะเวลา:
                        </span>
                        <span className="font-medium">{request.deadline}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          อาสาสมัคร:
                        </span>
                        <span className="font-medium">{request.volunteersNeeded} คน</span>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <div className="grid grid-cols-2 gap-2">
                        <Button 
                          variant="outline"
                          className="w-full"
                          onClick={() => handleVolunteer(request.name)}
                        >
                          เป็นอาสาสมัคร
                        </Button>
                        <Button 
                          className="w-full"
                          onClick={() => handleHire(request.name)}
                        >
                          จ้างช่างมืออาชีพ
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredRequests.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">ไม่พบคำขอในหมวดหมู่นี้</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-muted mt-16 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2024 ปัจจัย 4.0 - เชื่อมศรัทธาให้โปร่งใส</p>
        </div>
      </footer>
    </div>
  );
};

export default ServicesPage;
