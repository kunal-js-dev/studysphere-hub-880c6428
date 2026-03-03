import { useState, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Upload, FileUp, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

const ALLOWED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/zip",
  "application/x-zip-compressed",
  "video/mp4",
];
const MAX_SIZE = 500 * 1024 * 1024; // 500MB

export default function UploadMaterial() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [success, setSuccess] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (f.size > MAX_SIZE) {
      toast.error("File size must be under 500MB");
      return;
    }
    setFile(f);
    setSuccess(false);
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !user) return;

    setUploading(true);
    setProgress(10);

    try {
      const ext = file.name.split(".").pop();
      const filePath = `${user.id}/${Date.now()}.${ext}`;

      setProgress(30);

      const { error: uploadError } = await supabase.storage
        .from("study-materials")
        .upload(filePath, file);

      if (uploadError) throw uploadError;
      setProgress(70);

      const { error: dbError } = await supabase.from("files").insert({
        title,
        description: description || null,
        file_url: filePath,
        file_name: file.name,
        file_size: file.size,
        uploaded_by: user.id,
      });

      if (dbError) throw dbError;
      setProgress(100);
      setSuccess(true);

      toast.success("File uploaded successfully!");
      queryClient.invalidateQueries({ queryKey: ["study-materials"] });
      queryClient.invalidateQueries({ queryKey: ["teacher-files"] });
      queryClient.invalidateQueries({ queryKey: ["file-count"] });

      setTitle("");
      setDescription("");
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err: any) {
      toast.error(err.message || "Upload failed");
    } finally {
      setUploading(false);
      setTimeout(() => { setProgress(0); setSuccess(false); }, 2000);
    }
  };

  return (
    <div className="max-w-2xl space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">Upload Study Material</h1>
        <p className="text-muted-foreground">Share resources with your students</p>
      </div>

      <Card className="shadow-card">
        <CardContent className="p-6">
          <form onSubmit={handleUpload} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input id="title" required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g., Week 3 - Data Structures Notes" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="desc">Description</Label>
              <Textarea id="desc" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Brief description of the material..." rows={3} />
            </div>

            <div className="space-y-2">
              <Label>File (max 500MB) *</Label>
              <div
                className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                {file ? (
                  <div className="flex flex-col items-center gap-2">
                    <FileUp className="w-8 h-8 text-primary" />
                    <p className="text-sm font-medium text-foreground">{file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(file.size / 1048576).toFixed(1)} MB
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <Upload className="w-8 h-8 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Click to select a file</p>
                    <p className="text-xs text-muted-foreground">PDF, DOCX, PPT, ZIP, MP4</p>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.ppt,.pptx,.zip,.mp4"
                />
              </div>
            </div>

            {progress > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    {success ? "Upload complete!" : "Uploading..."}
                  </span>
                  <span className="font-medium text-foreground">{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            )}

            <Button type="submit" disabled={uploading || !file || !title} className="w-full">
              {success ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Uploaded!
                </>
              ) : uploading ? (
                "Uploading..."
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Material
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
