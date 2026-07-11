import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Send, X, Clock, AlertCircle, Shield, CheckCircle2 } from "lucide-react";
import type { NewsItem } from "@/types";

interface EmailPreviewProps {
  open: boolean;
  onClose: () => void;
  news: NewsItem[];
  email: string;
  deliveryTime: string;
  onSendTest: () => void;
  isSending: boolean;
  sendSuccess: boolean;
}

export function EmailPreview({
  open,
  onClose,
  news,
  email,
  deliveryTime,
  onSendTest,
  isSending,
  sendSuccess,
}: EmailPreviewProps) {
  const today = new Date().toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-hidden flex flex-col bg-slate-900 border-slate-700 p-0 gap-0">
        <div className="bg-gradient-to-r from-slate-950 to-slate-800 px-6 py-5 border-b border-slate-700">
          <DialogHeader className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 shadow-lg shadow-amber-500/20">
                <Shield className="h-5 w-5 text-slate-900" />
              </div>
              <div>
                <DialogTitle className="text-lg font-bold text-slate-50">
                  국방 모닝브리핑
                </DialogTitle>
                <DialogDescription className="text-sm text-slate-400">
                  {today} · {news.length}개 뉴스
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
        </div>

        <div className="px-6 py-3 border-b border-slate-800 bg-slate-900/50 space-y-1.5">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-slate-500 w-16 shrink-0">받는 사람</span>
            <span className="text-slate-200 font-medium">{email}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-slate-500 w-16 shrink-0">발송 시간</span>
            <span className="text-slate-200 flex items-center gap-1">
              <Clock className="h-3 w-3" />
              매일 {deliveryTime}
            </span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
          <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
            <p className="text-sm text-slate-300 leading-relaxed">
              안녕하세요, 오늘의 국방 브리핑을 전해드립니다.
              <br />
              관심 카테고리를 기반으로 엄선한 {news.length}개의 주요 뉴스를 확인해보세요.
            </p>
          </div>

          {news.map((item, idx) => (
            <div
              key={item.id}
              className="border-l-2 border-amber-500/40 pl-4 py-1"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xs font-bold text-amber-400">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <Badge
                  variant="outline"
                  className="border-slate-700 bg-slate-800 text-slate-400 text-xs"
                >
                  {item.category}
                </Badge>
                {item.priority === "high" && (
                  <Badge
                    variant="outline"
                    className="border-amber-500/40 bg-amber-500/10 text-amber-300 text-xs gap-1"
                  >
                    <AlertCircle className="h-3 w-3" />
                    주요
                  </Badge>
                )}
              </div>
              <h3 className="font-bold text-slate-100 text-sm mb-1">
                {item.title}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-1">
                {item.summary}
              </p>
              <p className="text-xs text-slate-600">
                {item.source} · {item.time}
              </p>
            </div>
          ))}

          <div className="border-t border-slate-800 pt-4 mt-6">
            <p className="text-xs text-slate-600 text-center">
              본 브리핑은 국방 모닝브리핑 시스템에서 자동 발송되었습니다.
              <br />
              구독 설정에서 언제든지 수신을 중단할 수 있습니다.
            </p>
          </div>
        </div>

        {sendSuccess && (
          <div className="px-6 py-3 bg-emerald-500/10 border-t border-emerald-500/30 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            <p className="text-sm text-emerald-300">
              테스트 메일이 성공적으로 발송되었습니다!
            </p>
          </div>
        )}

        <DialogFooter className="border-t border-slate-800 px-6 py-4 bg-slate-900/50">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700"
          >
            <X className="h-4 w-4 mr-2" />
            닫기
          </Button>
          <Button
            onClick={onSendTest}
            disabled={isSending}
            className="bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold shadow-lg shadow-amber-500/20"
          >
            {isSending ? (
              <>
                <span className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-slate-900 border-t-transparent" />
                발송 중...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                지금 테스트 발송
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}