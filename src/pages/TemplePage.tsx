import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { MapPin, Share2, CheckCircle2, TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const expenseData = [
  { name: "ค่าน้ำไฟ", amount: 3200 },
  { name: "อาหารพระ", amount: 2100 },
  { name: "บูรณะ", amount: 5000 },
  { name: "ธรรมกิจ", amount: 1500 },
];

const wishlist = [
  { id: 1, item: "ไฟ LED", total: 10, remaining: 7, price: 120 },
  { id: 2, item: "ซีเมนต์", total: 20, remaining: 12, price: 180 },
  { id: 3, item: "พัดลม", total: 5, remaining: 3, price: 890 },
  { id: 4, item: "เสื่อปูกัน", total: 15, remaining: 8, price: 350 },
];

const TemplePage = () => {
  const { id } = useParams();
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8 space-y-8">
        {/* Temple Header */}
        <div className="relative h-96 rounded-2xl overflow-hidden shadow-medium">
          <img
            src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200&q=80"
            alt="วัดพระธาตุดอยสุเทพ"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold">วัดพระธาตุดอยสุเทพราชวรวิหาร</h1>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>เชียงใหม่</span>
                </div>
                <Badge className="bg-accent text-accent-foreground">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  ได้รับการรองรับจากกรมการศาสนา
                </Badge>
              </div>
              <Button variant="secondary" size="sm" className="gap-2">
                <Share2 className="h-4 w-4" />
                แชร์
              </Button>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Expense Overview */}
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  ค่าใช้จ่ายประจำเดือน
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={expenseData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis 
                        dataKey="name" 
                        stroke="hsl(var(--muted-foreground))"
                        style={{ fontSize: '12px' }}
                      />
                      <YAxis 
                        stroke="hsl(var(--muted-foreground))"
                        style={{ fontSize: '12px' }}
                      />
                      <Tooltip
                        formatter={(value: number) => `฿${value.toLocaleString()}`}
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                        }}
                      />
                      <Bar dataKey="amount" fill="#F7931E" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
                  {expenseData.map((item) => (
                    <div key={item.name} className="flex justify-between">
                      <span className="text-sm text-muted-foreground">{item.name}:</span>
                      <span className="text-sm font-semibold">฿{item.amount.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Wishlist */}
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle>รายการที่ต้องการ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {wishlist.map((item) => (
                  <div key={item.id} className="space-y-3 p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold">{item.item}</h4>
                        <p className="text-sm text-muted-foreground">
                          ราคา ฿{item.price} / ชิ้น
                        </p>
                      </div>
                      <Badge variant="secondary">
                        เหลือ {item.remaining}/{item.total}
                      </Badge>
                    </div>
                    <Progress 
                      value={((item.total - item.remaining) / item.total) * 100} 
                      className="h-2"
                    />
                    <Button size="sm" variant="outline" className="w-full">
                      บริจาค {item.item}
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Donation Card */}
          <div className="lg:col-span-1">
            <Card className="shadow-medium sticky top-24">
              <CardHeader>
                <CardTitle>ร่วมสมทบทุน</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">ยอดบริจาค</span>
                    <span className="font-semibold text-primary">
                      ฿245,000 / ฿500,000
                    </span>
                  </div>
                  <Progress value={49} className="h-3" />
                  <p className="text-xs text-muted-foreground">
                    49% ของเป้าหมาย • อีก 18 วัน
                  </p>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium">จำนวนเงิน</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[100, 300, 500].map((amount) => (
                      <Button key={amount} variant="outline" size="sm">
                        ฿{amount}
                      </Button>
                    ))}
                  </div>
                  <input
                    type="number"
                    placeholder="จำนวนอื่นๆ"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input type="checkbox" id="anonymous" className="rounded" />
                  <label htmlFor="anonymous" className="text-sm">
                    ลงชื่อไม่เปิดเผย
                  </label>
                </div>

                <Button className="w-full gradient-warm border-0 text-white hover:shadow-glow h-12">
                  บริจาคตอนนี้
                </Button>

                <div className="pt-4 border-t space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">ผู้บริจาค</span>
                    <span className="font-semibold">234 คน</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">บริจาคล่าสุด</span>
                    <span className="font-semibold">5 นาทีที่แล้ว</span>
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

export default TemplePage;
