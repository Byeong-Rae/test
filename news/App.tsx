import { useState } from "react";
import { Shield, Mail, Clock, Users, TrendingUp } from "lucide-react";
import { NewsBriefing } from "@/components/NewsBriefing";
import { SubscriptionForm } from "@/components/SubscriptionForm";
import { SubscriberList } from "@/components/SubscriberList";
import type { Subscriber } from "@/types";
import { toast } from "sonner";

export default function App() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([
    {
      id: "demo-1",
      email: "commander@military.go.kr",
      deliveryTime: "07:00",
      categories: ["국방정책", "북한·안보", "국제안보"],
      active: true,
      createdAt: new Date().toISOString(),
    },
  ]);

  const handleSubscribe = (email: string, time: string, categories: string[]) => {
    const newSub: Subscriber = {
      id: crypto.randomUUID(),
      email,
      deliveryTime: time,
      categories,
      active: true,
      createdAt: new Date().toISOString(),
    };
    setSubscribers((prev) => [...prev, newSub]);
  };

  const handleRemove = (id: string) => {
    setSubscribers((prev) => prev.filter((s) => s.id !== id));
    toast.success("구독이 취소되었습니다");
  };

  const handleToggle = (id: string) => {
    setSubscribers((prev) =>
      prev.map((s) => (s.id === id ? { ...s, active: !s.active } : s))
    );
  };

  const activeCount = subscribers.filter((s) => s.active).length;
  const totalCategories = new Set(
    subscribers.flatMap((s) => s.categories)
  ).size;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 shadow-lg shadow-amber-500/20">
                <Shield className="h-6 w-6 text-slate-900" />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight text-slate-50">
                  국방 모닝브리핑
                </h1>
                <p className="text-sm text-slate-400">
                  매일 아침, 국방 뉴스를 메일로 받아보세요
                </p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <div className="text-right">
                <p className="text-2xl font-bold text-amber-400">{activeCount}</p>
                <p className="text-xs text-slate-500">활성 구독자</p>
              </div>
              <div className="h-10 w-px bg-slate-800" />
              <div className="text-right">
                <p className="text-2xl font-bold text-sky-400">{totalCategories}</p>
                <p className="text-xs text-slate-500">구독 카테고리</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-6 py-8">
        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          <div className="rounded-xl border border-slate-800 bg-slate-800/40 p-4">
            <div className="flex items-center gap-2 mb-1">
              <Mail className="h-4 w-4 text-amber-400" />
              <span className="text-xs text-slate-500 font-medium">총 구독자</span>
            </div>
            <p className="text-2xl font-bold text-slate-100">{subscribers.length}</p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-800/40 p-4">
            <div className="flex items-center gap-2 mb-1">
              <Users className="h-4 w-4 text-emerald-400" />
              <span className="text-xs text-slate-500 font-medium">활성 구독</span>
            </div>
            <p className="text-2xl font-bold text-slate-100">{activeCount}</p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-800/40 p-4">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="h-4 w-4 text-sky-400" />
              <span className="text-xs text-slate-500 font-medium">오늘 뉴스</span>
            </div>
            <p className="text-2xl font-bold text-slate-100">6</p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-800/40 p-4">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="h-4 w-4 text-violet-400" />
              <span className="text-xs text-slate-500 font-medium">발송 예정</span>
            </div>
            <p className="text-2xl font-bold text-slate-100">07:00</p>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: News Briefing - 2 columns */}
          <div className="lg:col-span-2">
            <NewsBriefing />
          </div>

          {/* Right: Subscription + Subscriber List */}
          <div className="space-y-6">
            <SubscriptionForm onSubscribe={handleSubscribe} />
            <SubscriberList
              subscribers={subscribers}
              onRemove={handleRemove}
              onToggle={handleToggle}
            />
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 border-t border-slate-800 pt-6">
          <p className="text-center text-sm text-slate-600">
            국방 모닝브리핑 · 매일 아침 6:00~8:30 사이 발송 · 
            <span className="text-amber-500/80"> 시연용 데모</span>
          </p>
        </footer>
      </main>
    </div>
  );
}