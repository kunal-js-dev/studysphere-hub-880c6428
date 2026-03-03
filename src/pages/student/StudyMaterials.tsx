import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Calendar, HardDrive } from "lucide-react";
import { format } from "date-fns";

function formatFileSize(bytes: number) {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
  if (bytes < 1073741824) return (bytes / 1048576).toFixed(1) + " MB";
  return (bytes / 1073741824).toFixed(1) + " GB";
}

export default function StudyMaterials() {
  const { data: files, isLoading } = useQuery({
    queryKey: ["study-materials"],
    queryFn: async () => {
      const { data, error } = await supabase.from("files").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const handleDownload = async (fileUrl: string, fileName: string) => {
    const { data } = supabase.storage.from("study-materials").getPublicUrl(fileUrl);
    const a = document.createElement("a");
    a.href = data.publicUrl;
    a.download = fileName;
    a.target = "_blank";
    a.click();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">Study Materials</h1>
        <p className="text-muted-foreground">Resources uploaded by your teachers</p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6 space-y-3">
                <div className="h-5 bg-muted rounded w-3/4" />
                <div className="h-4 bg-muted rounded w-full" />
                <div className="h-4 bg-muted rounded w-1/2" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : files?.length === 0 ? (
        <Card className="shadow-card">
          <CardContent className="p-12 text-center">
            <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <h3 className="font-semibold text-foreground">No materials yet</h3>
            <p className="text-sm text-muted-foreground">Your teachers haven't uploaded any study materials yet.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {files?.map((file) => (
            <Card key={file.id} className="shadow-card hover:shadow-card-hover transition-all">
              <CardContent className="p-5 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-foreground truncate">{file.title}</h3>
                    {file.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{file.description}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {format(new Date(file.created_at), "MMM d, yyyy")}
                  </span>
                  <span className="flex items-center gap-1">
                    <HardDrive className="w-3 h-3" />
                    {formatFileSize(file.file_size)}
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => handleDownload(file.file_url, file.file_name)}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
