import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

const platforms = [
  { name: "HackerRank", url: "https://www.hackerrank.com", color: "from-[hsl(145,60%,40%)] to-[hsl(145,60%,30%)]", description: "Practice coding, prepare for interviews" },
  { name: "LeetCode", url: "https://leetcode.com", color: "from-[hsl(30,90%,55%)] to-[hsl(20,80%,45%)]", description: "Algorithm challenges, contest prep" },
  { name: "CodeChef", url: "https://www.codechef.com", color: "from-[hsl(25,60%,45%)] to-[hsl(15,50%,35%)]", description: "Competitive programming contests" },
  { name: "HackerEarth", url: "https://www.hackerearth.com", color: "from-[hsl(220,72%,50%)] to-[hsl(240,60%,40%)]", description: "Hackathons and hiring challenges" },
  { name: "Coderbyte", url: "https://coderbyte.com", color: "from-[hsl(200,80%,50%)] to-[hsl(210,70%,40%)]", description: "Code screening and challenges" },
];

export default function PracticePlatforms() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">Practice Platforms</h1>
        <p className="text-muted-foreground">Sharpen your coding skills on these platforms</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {platforms.map((platform) => (
          <a key={platform.name} href={platform.url} target="_blank" rel="noopener noreferrer" className="group">
            <Card className="overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full">
              <div className={`h-2 bg-gradient-to-r ${platform.color}`} />
              <CardContent className="p-6 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-display font-bold text-foreground">{platform.name}</h3>
                  <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <p className="text-sm text-muted-foreground">{platform.description}</p>
              </CardContent>
            </Card>
          </a>
        ))}
      </div>
    </div>
  );
}
