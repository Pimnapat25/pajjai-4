import { useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, Truck, Heart, GraduationCap, Utensils, Lightbulb, Calendar } from "lucide-react";

type Service = {
  id: string;
  name: string;
  description: string;
  price: number;
  temple: string;
  category: "cleaning" | "transport" | "medical" | "education" | "food" | "other";
  frequency: string;
  icon: any;
};

const services: Service[] = [
  {
    id: "1",
    name: "บริการทำความสะอาดวัด",
    description: "ทำความสะอาดพื้นที่วัด อุโบสถ และศาลา รวมถึงดูแลสวนหย่อม",
    price: 2500,
    temple: "วัดพระธาตุดอยสุเทพราชวรวิหาร",
    category: "cleaning",
    frequency: "ต่อเดือน",
    icon: Sparkles,
  },
  {
    id: "2",
    name: "บริการรถรับ-ส่งพระสงฆ์",
    description: "บริการรถตู้รับ-ส่งพระสงฆ์ไปทำกิจกรรมนอกวัด และตรวจสุขภาพ",
    price: 3500,
    temple: "วัดโพธิ์",
    category: "transport",
    frequency: "ต่อเดือน",
    icon: Truck,
  },
  {
    id: "3",
    name: "การตรวจสุขภาพพระสงฆ์",
    description: "ค่าตรวจสุขภาพประจำปีและยาประจำตัวสำหรับพระสงฆ์ผู้สูงอายุ",
    price: 5000,
    temple: "วัดอรุณราชวราราม",
    category: "medical",
    frequency: "ต่อไตรมาส",
    icon: Heart,
  },
  {
    id: "4",
    name: "สนับสนุนการศึกษาสามเณร",
    description: "อุปกรณ์การเรียน หนังสือธรรมะ และค่าใช้จ่ายในการศึกษา",
    price: 4000,
    temple: "วัดหัวลำโพง",
    category: "education",
    frequency: "ต่อภาคการศึกษา",
    icon: GraduationCap,
  },
  {
    id: "5",
    name: "บริการจัดส่งอาหารพระ",
    description: "จัดส่งอาหารคาวหวานถวายพระสงฆ์ทุกวัน คุณภาพดี สะอาด ถูกสุขลักษณะ",
    price: 8000,
    temple: "วัดมหาธาตุยุวราชรังสฤษฎิ์",
    category: "food",
    frequency: "ต่อเดือน",
    icon: Utensils,
  },
  {
    id: "6",
    name: "ค่าไฟฟ้าประจำเดือน",
    description: "สนับสนุนค่าไฟฟ้าสำหรับกุฏิพระและอาคารต่างๆ ในวัด",
    price: 3000,
    temple: "วัดพระธาตุดอยสุเทพราชวรวิหาร",
    category: "other",
    frequency: "ต่อเดือน",
    icon: Lightbulb,
  },
];

const categoryNames = {
  cleaning: "ทำความสะอาด",
  transport: "การเดินทาง",
  medical: "การแพทย์",
  education: "การศึกษา",
  food: "อาหาร",
  other: "อื่นๆ",
};

const ServicesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredServices = selectedCategory === "all" 
    ? services 
    : services.filter(s => s.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            บริการเพื่อพระสงฆ์
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            สนับสนุนพระสงฆ์ด้วยการจัดหาบริการที่จำเป็น 
            เพื่อให้พระสงฆ์มีความสะดวกสบายในการประกอบศาสนกิจ
          </p>
        </div>

        {/* Category Tabs */}
        <Tabs defaultValue="all" className="mb-8" onValueChange={setSelectedCategory}>
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-7 gap-2">
            <TabsTrigger value="all">ทั้งหมด</TabsTrigger>
            <TabsTrigger value="cleaning">ทำความสะอาด</TabsTrigger>
            <TabsTrigger value="transport">การเดินทาง</TabsTrigger>
            <TabsTrigger value="medical">การแพทย์</TabsTrigger>
            <TabsTrigger value="education">การศึกษา</TabsTrigger>
            <TabsTrigger value="food">อาหาร</TabsTrigger>
            <TabsTrigger value="other">อื่นๆ</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => {
            const Icon = service.icon;
            return (
              <Card key={service.id} className="shadow-soft hover:shadow-medium transition-smooth">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{service.name}</CardTitle>
                        <Badge variant="secondary" className="mt-2">
                          {categoryNames[service.category]}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <CardDescription className="mt-4">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">วัด:</span>
                      <span className="font-medium">{service.temple}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">ความถี่:</span>
                      <span className="font-medium flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {service.frequency}
                      </span>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div>
                        <p className="text-sm text-muted-foreground">ค่าบริการ</p>
                        <p className="text-2xl font-bold text-primary">
                          ฿{service.price.toLocaleString()}
                        </p>
                      </div>
                      <Button className="bg-primary hover:bg-primary/90">
                        สนับสนุนบริการนี้
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">ไม่พบบริการในหมวดหมู่นี้</p>
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
