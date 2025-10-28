import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { th } from "date-fns/locale";

interface DonationTracking {
  id: string;
  itemName: string;
  amount: number;
  templeName: string;
  donationDate: Date;
  status: "preparing" | "shipping" | "completed" | "in_progress" | "project_completed";
  completedDate?: Date;
  imageUrl?: string;
  description?: string;
}

const TrackingPage = () => {
  const [donations, setDonations] = useState<DonationTracking[]>([]);

  // TODO: Fetch real data from backend
  useEffect(() => {
    // Mock data
    setDonations([
      {
        id: "1",
        itemName: "ผ้าไตร",
        amount: 1999,
        templeName: "วัดพระธาตุดอยสุเทพ",
        donationDate: new Date("2025-10-20"),
        status: "completed",
        completedDate: new Date("2025-10-22"),
        imageUrl: "/images/tracking1.jpg",
        description: "จัดส่งเรียบร้อยแล้ว"
      },
      {
        id: "2",
        itemName: "เครื่องกรองน้ำ",
        amount: 15000,
        templeName: "วัดมหาธาตุยุวราชรังสฤษฎิ์",
        donationDate: new Date("2025-10-23"),
        status: "shipping",
        description: "อยู่ระหว่างการจัดส่ง"
      },
      {
        id: "3",
        itemName: "โครงการสร้างศาลาการเปรียญ",
        amount: 5000,
        templeName: "วัดพระธาตุดอยสุเทพ",
        donationDate: new Date("2025-10-23"),
        status: "project_completed",
        completedDate: new Date("2025-10-23"),
        imageUrl: "/images/images.jpg",
        description: "โครงการก่อสร้างเสร็จสิ้นแล้ว"
      },
      {
        id: "4",
        itemName: "บูรณะพระอุโบสถ",
        amount: 3500,
        templeName: "วัดมหาธาตุยุวราชรังสฤษฎิ์",
        donationDate: new Date("2025-10-23"),
        status: "in_progress",
        description: "อยู่ในขั้นตอนทาสี",
        imageUrl: "/images/download.jpg",
        completedDate: new Date("2025-10-23")
      }
    ]);
  }, []);

  const getStatusText = (status: string) => {
    switch (status) {
      case "preparing":
        return "กำลังจัดเตรียม";
      case "shipping":
        return "กำลังส่งสู่วัด";
      case "completed":
        return "จัดส่งเรียบร้อยแล้ว";
      case "in_progress":
        return "กำลังดำเนินโครงการ";
      case "project_completed":
        return "โครงการเสร็จสิ้น";
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "preparing":
        return "bg-yellow-500";
      case "shipping":
        return "bg-blue-500";
      case "completed":
        return "bg-green-500";
      case "in_progress":
        return "bg-orange-500";
      case "project_completed":
        return "bg-emerald-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-6 sm:py-8 space-y-10">
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-foreground">
              ติดตามผลการบริจาค
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              ตรวจสอบสถานะการจัดส่งและรายละเอียดการบริจาคของท่าน
            </p>
          </div>

          <Card className="p-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>รายการบริจาค</TableHead>
                  <TableHead>มูลค่า (บาท)</TableHead>
                  <TableHead>วัด</TableHead>
                  <TableHead>วันที่บริจาค</TableHead>
                  <TableHead>สถานะ</TableHead>
                  <TableHead>รายละเอียด</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {donations.map((donation) => (
                  <TableRow key={donation.id}>
                    <TableCell>{donation.itemName}</TableCell>
                    <TableCell>{donation.amount.toLocaleString()}</TableCell>
                    <TableCell>{donation.templeName}</TableCell>
                    <TableCell>
                      {format(donation.donationDate, "d MMMM yyyy", { locale: th })}
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(donation.status)}>
                        {getStatusText(donation.status)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {donation.description}
                      {(donation.status === "completed" || donation.status === "project_completed" || donation.status === "in_progress") && donation.completedDate && (
                        <div>
                          <p>{donation.status === "in_progress" ? "ความคืบหน้าล่าสุด" : "จัดส่งเสร็จสิ้นเมื่อ"}: {format(donation.completedDate, "d MMMM yyyy", { locale: th })}</p>
                          {donation.imageUrl && (
                            <img 
                              src={donation.imageUrl} 
                              alt={donation.status === "in_progress" ? "ภาพความคืบหน้า" : "หลักฐานการจัดส่ง"}
                              className="w-40 h-40 object-cover rounded-lg mt-2"
                            />
                          )}
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>
      </main>

      <footer className="border-t bg-card py-8 mt-16">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© 2025 ปัจจัย 4.0 - เชื่อมศรัทธาให้โปร่งใส</p>
          <div className="flex gap-6 justify-center mt-4">
            <a href="#" className="hover:text-primary transition-colors">เกี่ยวกับเรา</a>
            <a href="#" className="hover:text-primary transition-colors">ติดต่อวัด</a>
            <a href="#" className="hover:text-primary transition-colors">ร่วมเป็น Partner</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TrackingPage;