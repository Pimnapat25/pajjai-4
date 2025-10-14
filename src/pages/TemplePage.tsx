import { useEffect, useMemo, useRef, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { MapPin, Share2, CheckCircle2, TrendingUp, Store, ArrowLeft } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { templesData } from "@/lib/temples";

const expenseData = [
  { name: "ค่าน้ำไฟ", amount: 3200 },
  { name: "อาหารพระ", amount: 2100 },
  { name: "บูรณะ", amount: 5000 },
  { name: "ธรรมกิจ", amount: 1500 },
];

// derive meta from shared data
const getTempleMeta = (id: string | undefined) => {
  const t = templesData.find((x) => x.id === (id ?? "1")) ?? templesData[0];
  return {
    name: t.name,
    location: t.location,
    image: t.image.replace(/^public\//, "/"),
    raised: t.raised,
    goal: t.goal,
  };
};

// Mock wishlists per temple for alignment with TemplesPage
const buildWishlist = (id: string | undefined) => {
  const t = templesData.find((x) => x.id === (id ?? "1")) ?? templesData[0];
  return t.neededItems.map((ni) => ({
    id: ni.id,
    item: ni.name,
    total: ni.quantity,
    remaining: ni.remaining,
    price: undefined as number | undefined,
    stores: ni.stores,
  }));
};

const TemplePage = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const query = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const selectedItem = query.get("item");
  const selectedItemsParam = query.get("items"); // e.g., item1:2,item2:1
  const selectedItemNames = useMemo(() => {
    if (selectedItemsParam) {
      return selectedItemsParam.split(',').map(p => decodeURIComponent(p).split(':')[0]);
    }
    return selectedItem ? [selectedItem] : [];
  }, [selectedItemsParam, selectedItem]);

  const itemsRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const wishlist = buildWishlist(id);
  const [selectedStore, setSelectedStore] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<string>(selectedItem ?? "");
  const [cart, setCart] = useState<Record<string, number>>({});

  const storeOptions = useMemo(() => {
    // Prefer stores from the chosen product; otherwise aggregate unique stores across wishlist
    const matched = selectedProduct ? wishlist.find(w => w.item === selectedProduct) : undefined;
    const fromSelected = matched?.stores ?? [];
    const aggregated = Array.from(new Set(wishlist.flatMap(w => w.stores ?? [])));
    const fallbacks = ["ตลาดชุมชน", "ร้านของชำใกล้วัด", "แม็คโคร", "โลตัส"];
    const options = (fromSelected.length > 0 ? fromSelected : (aggregated.length > 0 ? aggregated : fallbacks));
    return options;
  }, [selectedProduct, wishlist]);

  // Initialize cart and selected product from query params
  useEffect(() => {
    if (selectedItemsParam) {
      const next: Record<string, number> = {};
      selectedItemsParam.split(',').forEach((pair) => {
        const [rawName, rawQty] = decodeURIComponent(pair).split(':');
        if (!rawName) return;
        const qty = Math.max(1, Number(rawQty) || 1);
        next[rawName] = qty;
      });
      setCart(next);
      const firstName = Object.keys(next)[0];
      if (firstName) setSelectedProduct(firstName);
    } else if (selectedItem) {
      setSelectedProduct(selectedItem);
      setCart({ [selectedItem]: 1 });
    }
  }, [selectedItem, selectedItemsParam]);

  // Set default store when product changes
  useEffect(() => {
    if (!selectedProduct) return;
    const first = storeOptions[0];
    if (first) setSelectedStore(first);
  }, [selectedProduct, storeOptions]);

  // Helpers for cart operations
  const getRemaining = (name: string) => wishlist.find(w => w.item === name)?.remaining ?? 9999;
  const addToCart = (name: string) => {
    const max = getRemaining(name);
    setCart((prev) => ({ ...prev, [name]: Math.min(max, (prev[name] || 0) + 1) }));
    setSelectedProduct(name);
  };
  const updateCartQty = (name: string, qty: number) => {
    const max = getRemaining(name);
    const n = Math.max(0, Math.min(max, Math.floor(qty || 0)));
    setCart((prev) => {
      const next = { ...prev };
      if (n === 0) delete next[name]; else next[name] = n;
      return next;
    });
  };
  const removeFromCart = (name: string) => setCart((prev) => { const n = { ...prev }; delete n[name]; return n; });

  // Sync cart to URL (?items=name:qty,...), remove single ?item to avoid conflict
  useEffect(() => {
    const base = new URLSearchParams(location.search);
    base.delete('item');
    const entries = Object.entries(cart);
    if (entries.length === 0) {
      base.delete('items');
    } else {
      const pairs = entries.map(([k, v]) => encodeURIComponent(`${k}:${v}`)).join(',');
      base.set('items', pairs);
    }
    navigate({ pathname: location.pathname, search: base.toString() ? `?${base.toString()}` : '' }, { replace: true });
  }, [cart]);

  useEffect(() => {
    if (selectedItemNames.length === 0) return;
    const match = wishlist.find((w) => selectedItemNames.includes(w.item));
    if (match) {
      const el = itemsRefs.current[match.id];
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [selectedItemNames, wishlist]);
  
  const meta = getTempleMeta(id); 
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8 space-y-8">
        <div>
          <Button variant="ghost" size="sm" className="gap-2" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4" /> ย้อนกลับ
          </Button>
        </div>
        {/* Temple Header */}
  <div className="relative h-56 sm:h-72 md:h-80 lg:h-96 rounded-2xl overflow-hidden shadow-medium">
          <img
            src={meta.image}
            alt={meta.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              const t = e.currentTarget as HTMLImageElement;
              if (t.src !== "/placeholder.svg") t.src = "/placeholder.svg";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8 text-white">
            <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
              <div className="space-y-2">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">{meta.name}</h1>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{meta.location}</span>
                </div>
                <Badge className="bg-accent text-accent-foreground">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  ได้รับการรองรับจากกรมการศาสนา
                </Badge>
              </div>
              <Button variant="secondary" size="sm" className="gap-2 self-start sm:self-auto">
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
            <Card className="shadow-medium" id="wishlist">
              <CardHeader>
                <CardTitle>รายการที่ต้องการ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
        {wishlist.map((item) => (
                  <div
                    key={item.id}
                    ref={(el) => (itemsRefs.current[item.id] = el)}
                    className={`space-y-3 p-4 rounded-lg border transition-colors ${
          (selectedItemNames.includes(item.item)) ? "bg-amber-50 border-amber-300" : "bg-muted/30"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold">{item.item}</h4>
                        <p className="text-sm text-muted-foreground">
                          ราคา ฿{item.price} / ชิ้น
                        </p>
                        {item.stores && item.stores.length > 0 && (
                          <p className="text-xs text-muted-foreground mt-1">
                            ซื้อได้ที่: {item.stores.join(", ")}
                          </p>
                        )}
                      </div>
                      <Badge variant="secondary">
                        เหลือ {item.remaining}/{item.total}
                      </Badge>
                    </div>
                    <Progress 
                      value={((item.total - item.remaining) / item.total) * 100} 
                      className="h-2"
                    />
                    <Button size="sm" variant="outline" className="w-full" onClick={() => addToCart(item.item)}>
                      เพิ่มในร่วมสมทบทุน
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Donation Card */}
          <div className="lg:col-span-1">
            <Card className="shadow-medium lg:sticky lg:top-24">
              <CardHeader>
                <CardTitle>ร่วมสมทบทุน</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Donation cart */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">ตะกร้าสิ่งของ</label>
                  {Object.keys(cart).length === 0 ? (
                    <p className="text-sm text-muted-foreground">ยังไม่มีรายการ โปรดเลือกจาก "รายการที่ต้องการ"</p>
                  ) : (
                    <div className="space-y-2">
                      {Object.entries(cart).map(([name, qty]) => (
                        <div key={name} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <span className="text-sm break-words max-w-full sm:max-w-[50%]">{name}</span>
                          <div className="flex items-center gap-2 sm:self-auto">
                            <input
                              type="number"
                              className="w-24 px-3 py-1 border rounded"
                              min={0}
                              max={getRemaining(name)}
                              value={qty}
                              onChange={(e) => updateCartQty(name, Number(e.target.value))}
                            />
                            <Button variant="ghost" size="sm" onClick={() => removeFromCart(name)}>ลบ</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {/* Product selection */}
                <div className="space-y-2">
                    {/* Product selection removed */}
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">ยอดบริจาค</span>
                    <span className="font-semibold text-primary">
                      ฿{(meta.raised ?? 0).toLocaleString()} / ฿{(meta.goal ?? 0).toLocaleString()}
                    </span>
                  </div>
                  <Progress value={meta.goal ? Math.min(100, ((meta.raised ?? 0) / (meta.goal ?? 1)) * 100) : 0} className="h-3" />
                  <p className="text-xs text-muted-foreground">
                    {meta.goal ? `${Math.round(((meta.raised ?? 0) / (meta.goal ?? 1)) * 100)}% ของเป้าหมาย` : ""} • อีก 18 วัน
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

                {/* Store selection */}
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Store className="h-4 w-4 text-primary" /> เลือกร้านค้าท้องถิ่นที่จะซื้อสินค้า
                  </label>
                  <Select value={selectedStore} onValueChange={setSelectedStore}>
                    <SelectTrigger>
                      <SelectValue placeholder="เลือกร้านค้า (แนะนำจากรายการที่ต้องการ)" />
                    </SelectTrigger>
                    <SelectContent>
                      {storeOptions.map((s) => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
