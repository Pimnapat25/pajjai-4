import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  trend?: string;
  iconColor?: string;
}

const StatCard = ({ icon: Icon, label, value, trend, iconColor = "text-primary" }: StatCardProps) => {
  return (
    <Card className="shadow-soft hover:shadow-medium transition-smooth">
      <CardContent className="flex items-center gap-4 p-6">
        <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 ${iconColor}`}>
          <Icon className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <p className="text-2xl font-bold text-foreground">{value}</p>
          {trend && <p className="text-xs text-muted-foreground mt-1">{trend}</p>}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
