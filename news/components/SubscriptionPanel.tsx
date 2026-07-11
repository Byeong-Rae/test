import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Mail,
  Send,
  Users,
  Trash2,
  Clock,
  CheckCircle2,
  XCircle,
  Plus,
} from "lucide-react";
import { NEWS_CATEGORIES, type Subscriber, type DeliveryLog } from "@/types";
import { toast } from "sonner";

interface SubscriptionPanelProps {
  subscribers: Subscriber[];
  deliveryLogs: DeliveryLog[];
  onSubscribe: (email: string, time: string, categories: string[]) => void;
  onRemove: (id: string) => void;
  onToggle: (id: string) => void;
}

export function SubscriptionPanel({
  subscribers,
  deliveryLogs,
  onSubscribe,
  onRemove,
  onToggle,
}: SubscriptionPanelProps) {
  const [email, setEmail] = useState("");
  const [time, setTime] = useState("07:00");
  const [categories, setCategories] = useState<string[]>([
    "국방정책",
    "북한·안보",
  ]);

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
    <div className="space-y-6">
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
                    className={`flex items-center gap-2.5 rounded-lg border px-3 py-2.5 cursor-pointer transition-colors ${
                      categories.includes(cat)
                        ? "border-amber-500/40 bg-amber-500/10"
                        : "border-slate-700 bg-slate-900/40 hover:border-slate-600 hover:bg-slate-900/60"
                    }`}
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
              <Plus className="h-4 w-4 mr-2" />
              구독 시작하기
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="border-slate-800 bg-slate-800/50 shadow-lg shadow-black/20">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/15 border border-sky-500/30">
              <Users className="h-5 w-5 text-sky-400" />
            </div>
            <div>
              <CardTitle className="text-base font-bold text-slate-100">
                구독자 관리
              </CardTitle>
              <p className="text-sm text-slate-400 mt-0.5">
                총 {subscribers.length}명 · {subscribers.filter((s) => s.active).length}명 활성
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {subscribers.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-900/60 border border-slate-700 mb-3">
                <Mail className="h-6 w-6 text-slate-600" />
              </div>
              <p className="text-sm text-slate-500">
                아직 구독자가 없습니다.
                <br />
                위에서 구독을 시작해보세요.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {subscribers.map((sub) => (
                <div
                  key={sub.id}
                  className="flex items-center justify-between rounded-lg border border-slate-700/60 bg-slate-900/40 p-3 hover:border-slate-600 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800 border border-slate-700 shrink-0">
                      <Mail className="h-4 w-4 text-slate-400" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-slate-200 truncate">
                        {sub.email}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="flex items-center gap-1 text-xs text-slate-500">
                          <Clock className="h-3 w-3" />
                          {sub.deliveryTime}
                        </span>
                        <span className="text-slate-700">·</span>
                        <span className="text-xs text-slate-500">
                          {sub.categories.length}개
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Badge
                      variant="outline"
                      className={
                        sub.active
                          ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400 text-xs"
                          : "border-slate-600 bg-slate-800 text-slate-500 text-xs"
                      }
                    >
                      {sub.active ? "활성" : "일시정지"}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onToggle(sub.id)}
                      className="h-8 px-2 text-xs text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                    >
                      {sub.active ? "정지" : "재개"}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onRemove(sub.id)}
                      className="h-8 w-8 p-0 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {deliveryLogs.length > 0 && (
        <Card className="border-slate-800 bg-slate-800/50 shadow-lg shadow-black/20">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15 border border-emerald-500/30">
                <Send className="h-5 w-5 text-emerald-400" />
              </div>
              <div>
                <CardTitle className="text-base font-bold text-slate-100">
                  발송 이력
                </CardTitle>
                <p className="text-sm text-slate-400 mt-0.5">
                  최근 {deliveryLogs.length}건의 발송 기록
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {deliveryLogs.map((log) => (
                <div
                  key={log.id}
                  className="flex items-center justify-between rounded-lg border border-slate-700/60 bg-slate-900/40 p-3"
                >
                  <div className="flex items-center gap-3">
                    {log.status === "sent" ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    ) : (
                      <XCircle className="h-4 w-4 text-rose-400" />
                    )}
                    <div>
                      <p className="text-sm text-slate-200">{log.email}</p>
                      <p className="text-xs text-slate-500">
                        {log.sentAt} · {log.newsCount}개 뉴스
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className={
                      log.status === "sent"
                        ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400 text-xs"
                        : "border-rose-500/40 bg-rose-500/10 text-rose-400 text-xs"
                    }
                  >
                    {log.status === "sent" ? "완료" : "실패"}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}