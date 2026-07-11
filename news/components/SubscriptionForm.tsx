import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Mail, CheckCircle2, Send } from "lucide-react";
import { NEWS_CATEGORIES } from "@/types";
import { toast } from "sonner";

interface SubscriptionFormProps {
  onSubscribe: (email: string, time: string, categories: string[]) => void;
}

export function SubscriptionForm({ onSubscribe }: SubscriptionFormProps) {
  const [email, setEmail] = useState("");
  const [time, setTime] = useState("07:00");
  const [categories, setCategories] = useState<string[]>(["국방정책", "북한·안보"]);

  const toggleCategory = (cat: string) => {
    setCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("올바른 이메일 주소를 입력해주세요");
      return;
    }
    if (categories.length === 0) {
      toast.error("최소 한 개의 카테고리를 선택해주세요");
      return;
    }
    onSubscribe(email, time, categories);
    toast.success("구독이 완료되었습니다", {
      description: `매일 ${time}에 ${email}로 브리핑이 발송됩니다.`,
    });
    setEmail("");
  };

  return (
    <Card className="border-slate-800 bg-slate-800/50 shadow-lg shadow-black/20">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/15 border border-amber-500/30">
            <Mail className="h-5 w-5 text-amber-400" />
          </div>
          <div>
            <CardTitle className="text-base font-bold text-slate-100">
              이메일 구독 설정
            </CardTitle>
            <p className="text-sm text-slate-400 mt-0.5">
              매일 아침, 국방 뉴스를 메일로 받아보세요
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-300 text-sm font-medium">
              이메일 주소
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-slate-900/60 border-slate-700 text-slate-100 placeholder:text-slate-600 focus:border-amber-500/50"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-slate-300 text-sm font-medium">발송 시간</Label>
            <Select value={time} onValueChange={setTime}>
              <SelectTrigger className="bg-slate-900/60 border-slate-700 text-slate-100 focus:border-amber-500/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="06:00">오전 6:00</SelectItem>
                <SelectItem value="06:30">오전 6:30</SelectItem>
                <SelectItem value="07:00">오전 7:00</SelectItem>
                <SelectItem value="07:30">오전 7:30</SelectItem>
                <SelectItem value="08:00">오전 8:00</SelectItem>
                <SelectItem value="08:30">오전 8:30</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label className="text-slate-300 text-sm font-medium">
              관심 카테고리
            </Label>
            <div className="grid grid-cols-2 gap-2">
              {NEWS_CATEGORIES.map((cat) => (
                <label
                  key={cat}
                  className="flex items-center gap-2.5 rounded-lg border border-slate-700 bg-slate-900/40 px-3 py-2.5 cursor-pointer hover:border-amber-500/40 hover:bg-slate-900/60 transition-colors"
                >
                  <Checkbox
                    checked={categories.includes(cat)}
                    onCheckedChange={() => toggleCategory(cat)}
                    className="border-slate-600 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500"
                  />
                  <span className="text-sm text-slate-300">{cat}</span>
                </label>
              ))}
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold shadow-lg shadow-amber-500/20"
          >
            <Send className="h-4 w-4 mr-2" />
            구독 시작하기
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}