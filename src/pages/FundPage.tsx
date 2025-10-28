import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Lightbulb, Droplets, UtensilsCrossed, BookOpen, PiggyBank } from "lucide-react";
import { insertDonation } from "@/lib/donations";
import { toast } from "sonner";

const FundPage = () => {
  const [customAmount, setCustomAmount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isDonating, setIsDonating] = useState(false);

  const [categories, setCategories] = useState([
    {
      id: "electricity",
      name: "ค่าไฟ",
      icon: Lightbulb,
      raised: 145000,
      goal: 300000,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
    },
    {
      id: "water",
      name: "ค่าน้ำ",
      icon: Droplets,
      raised: 85000,
      goal: 150000,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      id: "food",
      name: "ค่าอาหาร",
      icon: UtensilsCrossed,
      raised: 210000,
      goal: 400000,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      id: "education",
      name: "ค่าการศึกษา",
      icon: BookOpen,
      raised: 120000,
      goal: 250000,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
  ]);

  const totalRaised = categories.reduce((sum, cat) => sum + cat.raised, 0);
  const totalGoal = categories.reduce((sum, cat) => sum + cat.goal, 0);

  // Load persisted extras per category (so numbers don't reset on refresh)
  useEffect(() => {
    setCategories((prev) =>
      prev.map((c) => {
        const key = `donation_total_fund_cat_${c.id}`;
        const extra = Number(localStorage.getItem(key) || "0");
        return { ...c, raised: c.raised + extra };
      })
    );
  }, []);

  const handleDonate = async (amount: number) => {
    if (!amount || amount <= 0) return;
    const category = selectedCategory ?? "general";
    try {
      setIsDonating(true);
      await insertDonation({ category, amount });

      // Optimistic UI update
      if (selectedCategory) {
        setCategories((prev) =>
          prev.map((c) => (c.id === selectedCategory ? { ...c, raised: c.raised + amount } : c))
        );
        try {
          const key = `donation_total_fund_cat_${selectedCategory}`;
          const cur = Number(localStorage.getItem(key) || "0");
          localStorage.setItem(key, String(cur + amount));
          window.dispatchEvent(new Event("donation-updated"));
        } catch {}
      } else {
        // no specific category selected: distribute to first category for demo
        setCategories((prev) => prev.map((c, i) => (i === 0 ? { ...c, raised: c.raised + amount } : c)));
        try {
          const key = `donation_total_fund_cat_${categories[0]?.id ?? "general"}`;
          const cur = Number(localStorage.getItem(key) || "0");
          localStorage.setItem(key, String(cur + amount));
          window.dispatchEvent(new Event("donation-updated"));
        } catch {}
      }

      toast.success("บริจาคสำเร็จ ขอบคุณครับ/ค่ะ");
      setCustomAmount("");
    } catch (e: any) {
      toast.error(e?.message || "ไม่สามารถบันทึกการบริจาคได้");
    } finally {
      setIsDonating(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-6 sm:py-8 space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground break-words">กองทุนรวมเพื่อวัดที่ขาดแคลน</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            ช่วยเหลือวัดที่มีความต้องการเร่งด่วน โดยระบบจะจัดสรรเงินให้วัดที่ต้องการมากที่สุด
          </p>
        </div>

        <Card className="shadow-medium gradient-warm text-white">
          <CardContent className="p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold">ยอดบริจาครวม</h2>
                <p className="text-white/90 mt-1">
                  จากผู้มีจิตศรัทธาทั่วประเทศ
                </p>
              </div>
              <PiggyBank className="h-14 w-14 sm:h-16 sm:w-16 text-white/30" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-lg font-semibold">
                <span>฿{totalRaised.toLocaleString()}</span>
                <span>฿{totalGoal.toLocaleString()}</span>
              </div>
              <Progress value={(totalRaised / totalGoal) * 100} className="h-4 bg-white/30" />
              <p className="text-sm text-white/90 text-right">
                {((totalRaised / totalGoal) * 100).toFixed(1)}% ของเป้าหมาย
              </p>
            </div>
          </CardContent>
        </Card>

        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">เลือกหมวดที่ต้องการบริจาค</h2>
          <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => {
              const Icon = category.icon;
              const progress = (category.raised / category.goal) * 100;
              const isSelected = selectedCategory === category.id;
              
              return (
                <Card
                  key={category.id}
                  className={`overflow-hidden transition-all cursor-pointer hover:shadow-medium ${
                    isSelected ? "ring-2 ring-primary shadow-medium" : ""
                  }`}
                  onClick={() => setSelectedCategory(isSelected ? null : category.id)}
                >
                  <CardHeader className={`${category.bgColor} pb-4`}>
                    <div className="flex items-start sm:items-center justify-between gap-2">
                      <CardTitle className="text-base sm:text-lg">{category.name}</CardTitle>
                      <Icon className={`h-6 w-6 sm:h-8 sm:w-8 ${category.color}`} />
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-4 space-y-3">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">ยอดปัจจุบัน</span>
                        <span className="font-semibold text-primary">
                          ฿{category.raised.toLocaleString()}
                        </span>
                      </div>
                      <Progress value={progress} className="h-2" />
                      <div className="text-xs text-muted-foreground text-right">
                        เป้าหมาย ฿{category.goal.toLocaleString()}
                      </div>
                    </div>
                    
                    {isSelected && (
                      <div className="pt-2">
                        <div className="w-full h-8 bg-primary/10 rounded-md flex items-center justify-center">
                          <span className="text-sm font-medium text-primary">เลือกแล้ว ✓</span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

    <Card className="shadow-medium">
          <CardHeader>
            <CardTitle>เลือกจำนวนเงินที่บริจาค</CardTitle>
            {selectedCategory && (
              <p className="text-sm text-muted-foreground">
                บริจาคให้หมวด: {categories.find(c => c.id === selectedCategory)?.name}
              </p>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[100, 300, 500, 1000].map((amount) => (
                <Button
                  key={amount}
                  variant="outline"
                  size="lg"
                  onClick={() => handleDonate(amount)}
                  disabled={isDonating}
                  className="h-16 text-lg font-semibold hover:bg-primary hover:text-primary-foreground"
                >
                  ฿{amount}
                </Button>
              ))}
            </div>
            
      <div className="flex flex-col sm:flex-row gap-3">
              <Input
                type="number"
                placeholder="จำนวนเงินอื่นๆ"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
        className="flex-1 h-12 text-lg w-full"
              />
              <Button
                size="lg"
                onClick={() => handleDonate(Number(customAmount))}
                disabled={!customAmount || Number(customAmount) <= 0 || isDonating}
        className="gradient-warm border-0 text-white px-8 w-full sm:w-auto"
              >
                บริจาค
              </Button>
            </div>
            
            <p className="text-sm text-muted-foreground text-center">
              {selectedCategory 
                ? "เงินจะถูกจัดสรรให้วัดที่ขาดแคลนในหมวดที่เลือก"
                : "เงินจะถูกจัดสรรให้วัดที่ขาดแคลนในทุกหมวด"}
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default FundPage;
