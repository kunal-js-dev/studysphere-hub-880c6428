import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, Presentation, PenTool, ImageIcon, Sparkles, FileSpreadsheet, Video, Bot } from "lucide-react";

const categories = [
  {
    title: "AI Coding Assistance",
    icon: Code,
    color: "text-primary",
    tools: [
      { name: "GitHub Copilot", url: "https://github.com/features/copilot" },
      { name: "Cursor", url: "https://cursor.sh" },
      { name: "Replit", url: "https://replit.com" },
      { name: "Tabnine", url: "https://www.tabnine.com" },
      { name: "Coder", url: "https://coder.com" },
    ],
  },
  {
    title: "AI Presentation Tools",
    icon: Presentation,
    color: "text-accent",
    tools: [
      { name: "Beautiful.AI", url: "https://www.beautiful.ai" },
      { name: "Gamma", url: "https://gamma.app" },
      { name: "Pitch", url: "https://pitch.com" },
      { name: "Slidesgo", url: "https://slidesgo.com" },
      { name: "Tome", url: "https://tome.app" },
    ],
  },
  {
    title: "AI Writing Tools",
    icon: PenTool,
    color: "text-success",
    tools: [
      { name: "Grammarly", url: "https://www.grammarly.com" },
      { name: "Jasper", url: "https://www.jasper.ai" },
      { name: "Copy.AI", url: "https://www.copy.ai" },
      { name: "Quillbot", url: "https://quillbot.com" },
      { name: "Rytr", url: "https://rytr.me" },
    ],
  },
  {
    title: "AI Image Generation",
    icon: ImageIcon,
    color: "text-warning",
    tools: [
      { name: "Midjourney", url: "https://www.midjourney.com" },
      { name: "DALL·E", url: "https://openai.com/dall-e-3" },
      { name: "Adobe Firefly", url: "https://firefly.adobe.com" },
      { name: "Ideogram", url: "https://ideogram.ai" },
      { name: "Stable Diffusion", url: "https://stability.ai" },
    ],
  },
  {
    title: "AI Chatbots",
    icon: Bot,
    color: "text-primary",
    tools: [
      { name: "ChatGPT", url: "https://chat.openai.com" },
      { name: "Claude", url: "https://claude.ai" },
      { name: "Gemini", url: "https://gemini.google.com" },
      { name: "Perplexity", url: "https://www.perplexity.ai" },
      { name: "DeepSeek", url: "https://chat.deepseek.com" },
    ],
  },
  {
    title: "AI Spreadsheet",
    icon: FileSpreadsheet,
    color: "text-accent",
    tools: [
      { name: "Rows AI", url: "https://rows.com" },
      { name: "SheetAI", url: "https://www.sheetai.app" },
      { name: "Gigasheet", url: "https://gigasheet.com" },
      { name: "Formula Bot", url: "https://formulabot.com" },
    ],
  },
  {
    title: "AI Video Generation",
    icon: Video,
    color: "text-success",
    tools: [
      { name: "Runway", url: "https://runwayml.com" },
      { name: "Descript", url: "https://www.descript.com" },
      { name: "Invideo.AI", url: "https://invideo.io" },
      { name: "HeyGen", url: "https://www.heygen.com" },
    ],
  },
  {
    title: "AI Workflow Automation",
    icon: Sparkles,
    color: "text-warning",
    tools: [
      { name: "Zapier", url: "https://zapier.com" },
      { name: "Make", url: "https://www.make.com" },
      { name: "N8n", url: "https://n8n.io" },
      { name: "Monday.com", url: "https://monday.com" },
    ],
  },
];

export default function LearningTools() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">Learning Tools</h1>
        <p className="text-muted-foreground">AI-powered tools to boost your productivity</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
        {categories.map((cat) => (
          <Card key={cat.title} className="shadow-card hover:shadow-card-hover transition-all">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <cat.icon className={`w-5 h-5 ${cat.color}`} />
                {cat.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="space-y-2">
                {cat.tools.map((tool) => (
                  <li key={tool.name}>
                    <a
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-foreground hover:text-primary transition-colors flex items-center gap-2 py-1 px-2 rounded-md hover:bg-muted"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                      {tool.name}
                    </a>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
