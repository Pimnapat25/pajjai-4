import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Calendar, Heart, TrendingUp, Award, MapPin } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const donationData = [
  { name: "ก่อสร้าง", value: 15000, color: "#F7931E" },
  { name: "ค่าน้ำไฟ", value: 8000, color: "#FFD67B" },
  { name: "ถวายอาหาร", value: 12000, color: "#FFB84D" },
  { name: "การศึกษา", value: 5000, color: "#FFA31A" },
];

const history = [
  {
    id: 1,
    date: "15 ม.ค. 2568",
    temple: "วัดพระธาตุดอยสุเทพ",
    category: "ก่อสร้าง",
    amount: 500,
    status: "completed",
  },
  {
    id: 2,
    date: "10 ม.ค. 2568",
    temple: "วัดอรุณราชวราราม",
    category: "บูรณะ",
    amount: 1000,
    status: "completed",
  },
  {
    id: 3,
    date: "5 ม.ค. 2568",
    temple: "วัดโพธิ์",
    category: "ค่าน้ำไฟ",
    amount: 300,
    status: "completed",
  },
];

const topTemples = [
  { name: "วัดพระธาตุดอยสุเทพ", amount: 5000, location: "เชียงใหม่" },
  { name: "วัดอรุณราชวราราม", amount: 3500, location: "กรุงเทพฯ" },
  { name: "วัดโพธิ์", amount: 2500, location: "กรุงเทพฯ" },
];

const ProfilePage = () => {
  const totalDonated = donationData.reduce((sum, item) => sum + item.value, 0);
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8 space-y-8">
        {/* Profile Header */}
        <Card className="shadow-medium">
          <CardContent className="p-6">
            <div className="flex items-start gap-6">
              <Avatar className="h-24 w-24">
                <AvatarFallback className="text-2xl bg-gradient-warm text-white">
                  สจ
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-2xl font-bold">สมชาย ใจบุญ</h1>
                    <p className="text-muted-foreground">somchai@example.com</p>
                    <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>เข้าร่วมเมื่อ 1 ม.ค. 2568</span>
                    </div>
                  </div>
                  <Button variant="outline">แก้ไขโปรไฟล์</Button>
                </div>
                
                <div className="flex gap-3 mt-4">
                  <Badge className="bg-amber-500 text-white">
                    <Award className="h-3 w-3 mr-1" />
                    ผู้ร่วมบุญระดับทอง
                  </Badge>
                  <Badge variant="secondary">
                    สนับสนุน 5 วัด
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Donation Summary */}
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  สรุปการบริจาค
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <div className="text-3xl font-bold text-primary">
                      ฿{totalDonated.toLocaleString()}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      ยอดบริจาคทั้งหมด
                    </p>
                  </div>
                  
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={donationData}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={70}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {donationData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value: number) => `฿${value.toLocaleString()}`}
                          contentStyle={{
                            backgroundColor: 'hsl(var(--card))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px',
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t">
                  {donationData.map((item) => (
                    <div key={item.name} className="flex items-center gap-2">
                      <div 
                        className="h-3 w-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      />
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground">{item.name}</p>
                        <p className="text-sm font-semibold">฿{item.value.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Donation History */}
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle>ประวัติการบริจาค</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {history.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold">{item.temple}</h4>
                        <Badge variant="outline" className="text-xs">
                          {item.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-primary">
                        ฿{item.amount.toLocaleString()}
                      </p>
                      <Badge variant="secondary" className="text-xs">
                        สำเร็จ
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-1 space-y-6">
            {/* Top Temples */}
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Heart className="h-5 w-5 text-primary" />
                  วัดที่บริจาคมากที่สุด
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {topTemples.map((temple, index) => (
                  <div key={temple.name} className="flex items-start gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold text-sm">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm">{temple.name}</h4>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                        <MapPin className="h-3 w-3" />
                        <span>{temple.location}</span>
                      </div>
                      <p className="text-sm font-semibold text-primary mt-1">
                        ฿{temple.amount.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="shadow-medium gradient-warm text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  ความสำเร็จ
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-white/10 rounded-lg">
                  <Award className="h-8 w-8" />
                  <div>
                    <p className="font-semibold">ผู้ร่วมบุญระดับทอง</p>
                    <p className="text-xs text-white/80">บริจาคครบ ฿40,000</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white/10 rounded-lg">
                  <Heart className="h-8 w-8" fill="currentColor" />
                  <div>
                    <p className="font-semibold">ผู้สนับสนุน 5 วัด</p>
                    <p className="text-xs text-white/80">บริจาคให้ 5 วัดขึ้นไป</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
