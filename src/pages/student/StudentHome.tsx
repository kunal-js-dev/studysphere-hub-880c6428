import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Code, Wrench, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const quickLinks = [
  { title: "Study Materials", description: "Access uploaded resources", icon: FileText, to: "/student/materials", color: "bg-primary/10 text-primary" },
  { title: "Practice Platforms", description: "Sharpen your coding skills", icon: Code, to: "/student/platforms", color: "bg-accent/10 text-accent" },
  { title: "Learning Tools", description: "AI-powered productivity tools", icon: Wrench, to: "/student/tools", color: "bg-success/10 text-success" },
  { title: "Progress", description: "Track your learning journey", icon: TrendingUp, to: "/student/profile", color: "bg-warning/10 text-warning" },
];

export default function StudentHome() {
  const { profile } = useAuth();

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-display font-bold text-foreground">
          Welcome back, {profile?.full_name?.split(" ")[0] || "Student"} 👋
        </h1>
        <p className="text-muted-foreground mt-1">Here's your learning hub. Pick up where you left off.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickLinks.map((link) => (
          <Link key={link.title} to={link.to}>
            <Card className="shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full">
              <CardContent className="p-6 flex flex-col gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${link.color}`}>
                  <link.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{link.title}</h3>
                  <p className="text-sm text-muted-foreground">{link.description}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
