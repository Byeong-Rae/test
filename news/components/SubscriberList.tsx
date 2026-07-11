import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Trash2, Mail, Clock } from "lucide-react";
import type { Subscriber } from "@/types";

interface SubscriberListProps {
  subscribers: Subscriber[];
  onRemove: (id: string) => void;
  onToggle: (id: string) => void;
}

export function SubscriberList({
  subscribers,
  onRemove,
  onToggle,
}: SubscriberListProps) {
  return (
    <Card className="border-slate-800 bg-slate-800/50 shadow-lg shadow-black/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/15 border border-sky-500/30">
              <Users className="h-5 w-5 text-sky-400" />
            </div>
            <div>
              <CardTitle className="text-base font-bold text-slate-100">
                구독자 관리
              </CardTitle>
              <p className="text-sm text-slate-400 mt-0.5">
                총 {subscribers.length}명 구독 중
              </p>
            </div>
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
              오른쪽에서 구독을 시작해보세요.
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
                        {sub.categories.length}개 카테고리
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
  );
}