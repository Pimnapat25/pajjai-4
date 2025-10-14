export type NeededItem = {
  id: number;
  name: string;
  quantity: number;
  remaining: number;
  stores: string[];
};

export type Temple = {
  id: string;
  name: string;
  location: string;
  image: string;
  raised: number;
  goal: number;
  neededItems: NeededItem[];
};

export const templesData: Temple[] = [
  {
    id: "1",
    name: "วัดพระธาตุดอยสุเทพราชวรวิหาร",
    location: "เชียงใหม่",
    image: "public/images/Wat_Phra_That_Doi_Suthep_(I).jpg",
    raised: 245000,
    goal: 500000,
    neededItems: [
      { id: 1, name: "สบู่เหลวอาบน้ำ 500ml", quantity: 40, remaining: 28, stores: ["ตลาดวโรรส", "ร้านของชำชุมชน", "แม็คโคร เชียงใหม่"] },
      { id: 2, name: "แชมพู 500ml", quantity: 40, remaining: 30, stores: ["ตลาดวโรรส", "บิ๊กซี เชียงใหม่"] },
      { id: 7, name: "ยาสีฟัน 150g", quantity: 60, remaining: 45, stores: ["ร้านขายยาท้องถิ่น", "โลตัส เชียงใหม่"] },
      { id: 8, name: "ข้าวสาร 5 กก.", quantity: 50, remaining: 37, stores: ["แม็คโคร เชียงใหม่", "ตลาดชุมชน"] },
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
      { id: 3, name: "ข้าวสาร", quantity: 50, remaining: 32, stores: ["แม็คโคร", "โลตัส"] },
      { id: 4, name: "น้ำมันพืช", quantity: 30, remaining: 22, stores: ["แม็คโคร", "โลตัส"] },
      { id: 9, name: "ปลากระป๋อง", quantity: 100, remaining: 76, stores: ["แม็คโคร", "โลตัส"] },
      { id: 10, name: "ยาสามัญประจำวัด", quantity: 25, remaining: 20, stores: ["ร้านขายยา"] },
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
      { id: 5, name: "ซีเมนต์", quantity: 80, remaining: 64, stores: ["ห้างไทวัสดุ", "โฮมโปร"] },
      { id: 6, name: "สีทาอาคาร", quantity: 40, remaining: 28, stores: ["ห้างไทวัสดุ", "TOA Paint"] },
      { id: 11, name: "ทรายหยาบ", quantity: 100, remaining: 90, stores: ["ร้านวัสดุก่อสร้าง"] },
      { id: 12, name: "เหล็กเส้น 12 มม.", quantity: 60, remaining: 50, stores: ["ร้านเหล็ก"] },
    ],
  },
  {
    id: "4",
    name: "วัดหัวลำโพง",
    location: "เชียงใหม่",
    image: "public/images/Wat_Hua_Lamphong_Bangkok.jpg",
    raised: 95000,
    goal: 220000,
    neededItems: [
      { id: 13, name: "สบู่ก้อน", quantity: 120, remaining: 85, stores: ["แม็คโคร", "โลตัส"] },
      { id: 14, name: "ยาสีฟัน", quantity: 100, remaining: 70, stores: ["บิ๊กซี", "โลตัส"] },
      { id: 15, name: "กระดาษชำระ", quantity: 80, remaining: 60, stores: ["แม็คโคร", "โฮมโปร"] },
      { id: 16, name: "น้ำดื่มแพ็ค", quantity: 60, remaining: 44, stores: ["แม็คโคร"] },
    ],
  },
  {
    id: "5",
    name: "วัดมหาธาตุยุวราชรังสฤษฎิ์",
    location: "กรุงเทพมหานคร",
    image: "public/images/พระอุโบสถ_พระวิหาร_พระมณฑป_วัดมหาธาตุยุวราชรังสฤษฎิ์.jpg",
    raised: 140000,
    goal: 350000,
    neededItems: [
      { id: 17, name: "ผงซักฟอก", quantity: 50, remaining: 38, stores: ["แม็คโคร", "โลตัส"] },
      { id: 18, name: "น้ำยาถูพื้น", quantity: 40, remaining: 29, stores: ["บิ๊กซี", "โฮมโปร"] },
      { id: 19, name: "ผ้าเช็ดตัว", quantity: 60, remaining: 45, stores: ["โลตัส", "ห้างท้องถิ่น"] },
      { id: 20, name: "ชุดปฐมพยาบาล", quantity: 20, remaining: 16, stores: ["ร้านขายยา"] },
    ],
  },
];
