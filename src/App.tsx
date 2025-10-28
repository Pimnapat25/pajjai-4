import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import TemplePage from "./pages/TemplePage";
import TemplesPage from "./pages/TemplesPage";
import FundPage from "./pages/FundPage";
import ProjectsPage from "./pages/ProjectsPage";
import ProfilePage from "./pages/ProfilePage";
import TrackingPage from "./pages/TrackingPage";
import ServicesPage from "./pages/ServicesPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/temple/:id" element={<TemplePage />} />
          <Route path="/temples" element={<TemplesPage />} />
          <Route path="/fund" element={<FundPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/tracking" element={<TrackingPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
