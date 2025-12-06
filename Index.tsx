import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <Hero />
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            variant="hero" 
            size="lg" 
            onClick={() => navigate("/auth")}
          >
            Sign In
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            onClick={() => navigate("/auth")}
            className="border-white/20 text-white hover:bg-white/10"
          >
            Register
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
