import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { MapPin, Target } from "lucide-react";
import { Link } from "react-router-dom";

interface TempleCardProps {
  id: string;
  name: string;
  location: string;
  image: string;
  raised: number;
  goal: number;
  category: string;
}

const TempleCard = ({ id, name, location, image, raised, goal, category }: TempleCardProps) => {
  const progress = (raised / goal) * 100;
  
  return (
    <Card className="overflow-hidden hover:shadow-medium transition-smooth group">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3">
          <span className="inline-flex items-center rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground shadow-lg">
            {category}
          </span>
        </div>
      </div>
      
      <CardContent className="p-5">
        <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-1">
          {name}
        </h3>
        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-4">
          <MapPin className="h-3.5 w-3.5" />
          <span className="line-clamp-1">{location}</span>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">ยอดบริจาค</span>
            <span className="font-semibold text-primary">
              ฿{raised.toLocaleString()} / ฿{goal.toLocaleString()}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Target className="h-3 w-3" />
            <span>{progress.toFixed(0)}% ของเป้าหมาย</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-5 pt-0">
        <Link to={`/temple/${id}`} className="w-full">
          <Button className="w-full gradient-warm border-0 text-white hover:shadow-glow">
            ช่วยเกื้อหนุนวัดนี้
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default TempleCard;
