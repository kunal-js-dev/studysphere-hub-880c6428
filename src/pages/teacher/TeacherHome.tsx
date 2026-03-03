import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Users, FileText, Upload, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function TeacherHome() {
  const { profile } = useAuth();

  const { data: studentCount } = useQuery({
    queryKey: ["student-count"],
    queryFn: async () => {
      const { count, error } = await supabase
        .from("user_roles")
        .select("*", { count: "exact", head: true })
        .eq("role", "student");
      if (error) throw error;
      return count ?? 0;
    },
  });

  const { data: fileCount } = useQuery({
    queryKey: ["file-count"],
    queryFn: async () => {
      const { count, error } = await supabase
        .from("files")
        .select("*", { count: "exact", head: true });
      if (error) throw error;
      return count ?? 0;
    },
  });

  const stats = [
    { title: "Total Students", value: studentCount ?? 0, icon: Users, color: "bg-primary/10 text-primary" },
    { title: "Files Uploaded", value: fileCount ?? 0, icon: FileText, color: "bg-success/10 text-success" },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-display font-bold text-foreground">
          Welcome, {profile?.full_name?.split(" ")[0] || "Teacher"} 👋
        </h1>
        <p className="text-muted-foreground mt-1">Manage your materials and track student engagement.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.title} className="shadow-card">
            <CardContent className="p-6 flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${s.color}`}>
                <s.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-display font-bold text-foreground">{s.value}</p>
                <p className="text-sm text-muted-foreground">{s.title}</p>
              </div>
            </CardContent>
          </Card>
        ))}

        <Link to="/teacher/upload">
          <Card className="shadow-card hover:shadow-card-hover transition-all hover:-translate-y-1 cursor-pointer h-full">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <Upload className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Upload Material</p>
                <p className="text-sm text-muted-foreground">Share new resources</p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link to="/teacher/analytics">
          <Card className="shadow-card hover:shadow-card-hover transition-all hover:-translate-y-1 cursor-pointer h-full">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-warning" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Analytics</p>
                <p className="text-sm text-muted-foreground">View student data</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
