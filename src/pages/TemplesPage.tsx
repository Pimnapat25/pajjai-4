import { useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MapPin, Store, Package, Search } from "lucide-react";
import { Link } from "react-router-dom";

const TemplesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const temples = [
    {
      id: "1",
      name: "วัดพระธาตุดอยสุเทพราชวรวิหาร",
      location: "เชียงใหม่",
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80",
      raised: 245000,
      goal: 500000,
      neededItems: [
        { id: 1, name: "หลอดไฟ LED", quantity: 10, remaining: 7, stores: ["ห้างไทวัสดุ", "โฮมโปร"] },
        { id: 2, name: "พัดลมติดเพดาน", quantity: 5, remaining: 3, stores: ["โฮมโปร", "PowerBuy"] },
      ],
    },
    {
      id: "2",
      name: "วัดโพธิ์",
      location: "กรุงเทพมหานคร",
      image: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=800&q=80",
      raised: 180000,
      goal: 300000,
      neededItems: [
        { id: 3, name: "ข้าวสาร", quantity: 20, remaining: 15, stores: ["แม็คโคร", "โลตัส"] },
        { id: 4, name: "น้ำมันพืช", quantity: 10, remaining: 8, stores: ["แม็คโคร", "โลตัส"] },
      ],
    },
    {
      id: "3",
      name: "วัดอรุณราชวราราม",
      location: "กรุงเทพมหานคร",
      image: "https://images.unsplash.com/photo-1563492065599-3520f775eeed?w=800&q=80",
      raised: 120000,
      goal: 400000,
      neededItems: [
        { id: 5, name: "ซีเมนต์", quantity: 30, remaining: 20, stores: ["ห้างไทวัสดุ", "โฮมโปร"] },
        { id: 6, name: "สีทาอาคาร", quantity: 15, remaining: 12, stores: ["ห้างไทวัสดุ", "TOA Paint"] },
      ],
    },
  ];

  const filteredTemples = temples.filter((temple) =>
    temple.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    temple.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8 space-y-8">
        <div className="space-y-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">วัดทั้งหมด</h1>
            <p className="text-muted-foreground mt-1">
              เลือกบริจาคเป็นเงินหรือสิ่งของที่วัดต้องการ
            </p>
          </div>
          
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="ค้นหาวัด..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="space-y-6">
          {filteredTemples.map((temple) => (
            <Card key={temple.id} className="overflow-hidden shadow-medium">
              <div className="grid md:grid-cols-[300px_1fr] gap-6">
                <div className="relative h-64 md:h-auto">
                  <img
                    src={temple.image}
                    alt={temple.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                
                <div className="p-6 space-y-4">
                  <div>
                    <Link to={`/temple/${temple.id}`}>
                      <h2 className="text-2xl font-bold text-foreground hover:text-primary transition-colors">
                        {temple.name}
                      </h2>
                    </Link>
                    <div className="flex items-center gap-1 text-muted-foreground mt-1">
                      <MapPin className="h-4 w-4" />
                      <span>{temple.location}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">ยอดบริจาค</span>
                      <span className="font-semibold text-primary">
                        ฿{temple.raised.toLocaleString()} / ฿{temple.goal.toLocaleString()}
                      </span>
                    </div>
                    <Progress value={(temple.raised / temple.goal) * 100} className="h-2" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Package className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold">สิ่งของที่ต้องการ</h3>
                    </div>
                    
                    <div className="space-y-3">
                      {temple.neededItems.map((item) => (
                        <Card key={item.id} className="p-4 bg-muted/30">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 space-y-2">
                              <div className="flex items-center gap-2">
                                <h4 className="font-medium">{item.name}</h4>
                                <Badge variant="secondary">
                                  เหลือ {item.remaining}/{item.quantity}
                                </Badge>
                              </div>
                              
                              <div className="flex flex-wrap gap-2">
                                <span className="text-sm text-muted-foreground flex items-center gap-1">
                                  <Store className="h-3 w-3" />
                                  ซื้อจาก:
                                </span>
                                {item.stores.map((store) => (
                                  <Badge key={store} variant="outline" className="text-xs">
                                    {store}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            
                            <Button size="sm" className="whitespace-nowrap">
                              บริจาคสิ่งนี้
                            </Button>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <Link to={`/temple/${temple.id}`} className="flex-1">
                      <Button variant="outline" className="w-full">
                        ดูรายละเอียด
                      </Button>
                    </Link>
                    <Button className="flex-1 gradient-warm border-0 text-white">
                      บริจาคเงิน
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default TemplesPage;
