import { useMemo, useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MapPin, Store, Package, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { templesData } from "@/lib/temples";

const TemplesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const temples = templesData;

  const filteredTemples = temples.filter((temple) =>
    temple.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    temple.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // No multi-select/qty on this page; selection happens on the temple page

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
  <main className="container py-6 sm:py-8 space-y-6 sm:space-y-8">
        <div className="space-y-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">วัดทั้งหมด</h1>
            <p className="text-muted-foreground mt-1">
              เลือกบริจาคเป็นเงินหรือสิ่งของที่วัดต้องการ
            </p>
          </div>
          
    <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="ค้นหาวัด..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

  <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredTemples.map((temple) => (
            <Card key={temple.id} className="overflow-hidden hover:shadow-medium transition-smooth group">
        <div className="relative h-44 sm:h-52 md:h-56 overflow-hidden">
                <img
                  src={temple.image}
                  alt={temple.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => {
                    const t = e.currentTarget as HTMLImageElement;
                    if (t.src !== "/placeholder.svg") t.src = "/placeholder.svg";
                  }}
                />
                <div className="absolute top-3 right-3">
                  <Badge className="bg-primary/90">{temple.location}</Badge>
                </div>
              </div>

        <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-5">
                <div>
                  <Link to={`/temple/${temple.id}`}>
                    <h2 className="text-xl font-semibold text-foreground hover:text-primary transition-colors line-clamp-1">
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
                    <h3 className="font-semibold">ร่วมสมทบทุน</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">คลิกปุ่มเพื่อเพิ่มไปยัง "ร่วมสมทบทุน" และระบุจำนวนในหน้าวัด</p>

                  <div className="space-y-3">
                    {temple.neededItems.map((item) => (
                      <div key={item.id} className="p-4 rounded-md border bg-muted/30">
                        <div className="flex items-start justify-between gap-4">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium">{item.name}</h4>
                              <Badge variant="secondary">เหลือ {item.remaining}/{item.quantity}</Badge>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              <span className="text-sm text-muted-foreground flex items-center gap-1">
                                <Store className="h-3 w-3" /> ซื้อจาก:
                              </span>
                              {item.stores.map((store) => (
                                <Badge key={store} variant="outline" className="text-xs">{store}</Badge>
                              ))}
                            </div>
                          </div>
                          <Link to={`/temple/${temple.id}?items=${encodeURIComponent(item.name)}`}>
                            <Button size="sm" className="whitespace-nowrap">เพิ่มไปยังร่วมสมทบทุน</Button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <Button variant="outline" className="flex-1" asChild>
                    <Link to={`/temple/${temple.id}`}>ดูรายละเอียด</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default TemplesPage;
