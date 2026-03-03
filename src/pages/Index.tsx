import { useAuth } from "@/contexts/AuthContext";
import { Navigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GraduationCap, BookOpen, Code, Wrench, ArrowRight } from "lucide-react";

export default function Index() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (user) return <Navigate to="/dashboard" replace />;

  return (
    <div className="min-h-screen bg-background">
      <nav className="flex items-center justify-between px-6 py-4 border-b bg-card">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-lg text-foreground">LearnHub</span>
        </div>
        <Link to="/auth">
          <Button>Get Started</Button>
        </Link>
      </nav>

      <main className="container max-w-5xl mx-auto px-6 py-20">
        <div className="text-center space-y-6 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground leading-tight">
            Your Complete
            <br />
            <span className="gradient-primary bg-clip-text text-transparent">Learning Portal</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A modern platform connecting students and teachers. Access study materials,
            practice coding, and explore AI-powered learning tools — all in one place.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/auth">
              <Button size="lg" className="gap-2">
                Get Started <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
          {[
            { icon: BookOpen, title: "Study Materials", desc: "Access teacher-uploaded resources anytime" },
            { icon: Code, title: "Practice Platforms", desc: "Direct links to top coding platforms" },
            { icon: Wrench, title: "Learning Tools", desc: "AI-powered tools for every subject" },
          ].map((f) => (
            <div key={f.title} className="p-6 rounded-xl border bg-card shadow-card text-center space-y-3">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto">
                <f.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-foreground">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
