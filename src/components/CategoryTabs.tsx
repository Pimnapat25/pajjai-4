import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, Lightbulb, UtensilsCrossed, BookOpen, Heart } from "lucide-react";

interface CategoryTabsProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  { id: "all", label: "ทั้งหมด", icon: Heart },
  { id: "construction", label: "ก่อสร้าง", icon: Building2 },
  { id: "utilities", label: "ค่าน้ำไฟ", icon: Lightbulb },
  { id: "food", label: "ถวายอาหาร", icon: UtensilsCrossed },
  { id: "education", label: "การศึกษา", icon: BookOpen },
];

const CategoryTabs = ({ activeCategory, onCategoryChange }: CategoryTabsProps) => {
  return (
    <Tabs value={activeCategory} onValueChange={onCategoryChange} className="w-full">
      <TabsList className="grid w-full grid-cols-5 h-auto p-1 bg-muted/50">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <TabsTrigger 
              key={category.id} 
              value={category.id}
              className="flex flex-col gap-1 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs font-medium">{category.label}</span>
            </TabsTrigger>
          );
        })}
      </TabsList>
    </Tabs>
  );
};

export default CategoryTabs;
