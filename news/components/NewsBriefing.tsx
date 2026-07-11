import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Newspaper, AlertCircle, Clock, Shield } from "lucide-react";
import type { NewsItem } from "@/types";

const mockNews: NewsItem[] = [
  {
    id: "1",
    title: "국방부, 2025년 국방예산 57조원 확정… 전력강화 집중 투자",
    summary:
      "국방부가 내년도 국방예산을 전년 대비 3.5% 증가한 57조 원으로 확정했다. AI 기반 무기체계 및 3축 체계 강화에 예산이 집중 배분된다.",
    category: "국방정책",
    source: "국방일보",
    time: "06:30",
    priority: "high",
  },
  {
    id: "2",
    title: "KF-21 차세대 전투기, 2차 양산체계 구축 착수",
    summary:
      "한국항공우주산업(KAI)이 KF-21 보라매의 추가 양산을 위한 생산 인프라 확충에 착수했다. 내년부터 연간 20대씩 납품 예정이다.",
    category: "무기체계",
    source: "방산뉴스",
    time: "07:15",
    priority: "high",
  },
  {
    id: "3",
    title: "북한, 동해상으로 단거리 탄도미사일 2발 발사",
    summary:
      "합참에 따르면 북한이 오늘 새벽 동해상으로 단거리 탄도미사일 2발을 발사했다. 미사일은 약 400km 비행 후落下했다.",
    category: "북한·안보",
    source: "연합뉴스",
    time: "05:45",
    priority: "high",
  },
  {
    id: "4",
    title: "한미 정상, 확장억제 공약 강화 방안 논의",
    summary:
      "한미 정상이 워싱턴에서 회담을 갖고 핵·미사일 위협 대응을 위한 확장억제 체계 강화 방안을 논의했다.",
    category: "국제안보",
    source: "국방일보",
    time: "08:00",
    priority: "medium",
  },
  {
    id: "5",
    title: "LIG넥스원, 차세대 지대공미사일 체계 개발 완료",
    summary:
      "LIG넥스원이 천궁-II 후속 체계인 장거리 지대공미사일(L-SAM) 개발을 완료하고 올 하반기 양산을 시작한다.",
    category: "국방산업",
    source: "방산뉴스",
    time: "07:50",
    priority: "medium",
  },
  {
    id: "6",
    title: "군 인사제도 개편… 병영환경 대폭 개선 추진",
    summary:
      "국방부가 병사 복무 여건 개선을 위한 인사제도 개편안을 발표했다. 휴가 일수 확대 및 외박 제도 유연화가 포함된다.",
    category: "국방정책",
    source: "국방일보",
    time: "08:20",
    priority: "low",
  },
];

const priorityConfig = {
  high: {
    label: "주요",
    className: "bg-amber-500/20 text-amber-300 border-amber-500/40",
    icon: AlertCircle,
  },
  medium: {
    label: "일반",
    className: "bg-sky-500/20 text-sky-300 border-sky-500/40",
    icon: Shield,
  },
  low: {
    label: "참고",
    className: "bg-slate-500/20 text-slate-300 border-slate-500/40",
    icon: Clock,
  },
};

export function NewsBriefing() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/15 border border-amber-500/30">
            <Newspaper className="h-5 w-5 text-amber-400" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-100 tracking-tight">
              오늘의 국방 브리핑
            </h2>
            <p className="text-sm text-slate-400">
              {new Date().toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "long",
                day: "numeric",
                weekday: "long",
              })}
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-slate-100"
        >
          전체 미리보기
        </Button>
      </div>

      <div className="grid gap-3">
        {mockNews.map((news) => {
          const config = priorityConfig[news.priority];
          const Icon = config.icon;
          return (
            <Card
              key={news.id}
              className="border-slate-800 bg-slate-800/50 hover:bg-slate-800 transition-colors shadow-lg shadow-black/20"
            >
              <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className={`${config.className} border gap-1 px-2 py-0.5 text-xs font-medium`}
                        >
                          <Icon className="h-3 w-3" />
                          {config.label}
                        </Badge>
                        <Badge
                          variant="outline"
                          className="border-slate-700 bg-slate-900/50 text-slate-400 text-xs"
                        >
                          {news.category}
                        </Badge>
                      </div>
                      <span className="flex items-center gap-1 text-xs text-slate-500 whitespace-nowrap">
                        <Clock className="h-3 w-3" />
                        {news.time}
                      </span>
                    </div>
                    <CardTitle className="text-base font-bold text-slate-100 leading-snug mt-2">
                      {news.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-slate-400 leading-relaxed">
                      {news.summary}
                    </p>
                    <p className="mt-2 text-xs text-slate-500">출처: {news.source}</p>
                  </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}