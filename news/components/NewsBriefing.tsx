import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Newspaper,
  AlertCircle,
  Clock,
  Shield,
  Filter,
  Search,
  Mail,
} from "lucide-react";
import { MOCK_NEWS, NEWS_CATEGORIES, type NewsItem } from "@/types";

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

interface NewsBriefingProps {
  onPreviewEmail: (news: NewsItem[]) => void;
}

export function NewsBriefing({ onPreviewEmail }: NewsBriefingProps) {
  const [filter, setFilter] = useState<string>("전체");
  const [search, setSearch] = useState("");

  const filteredNews = useMemo(() => {
    let result = MOCK_NEWS;
    if (filter !== "전체") {
      result = result.filter((n) => n.category === filter);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (n) =>
          n.title.toLowerCase().includes(q) ||
          n.summary.toLowerCase().includes(q)
      );
    }
    return result;
  }, [filter, search]);

  const today = new Date().toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/15 border border-amber-500/30">
            <Newspaper className="h-5 w-5 text-amber-400" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-100 tracking-tight">
              오늘의 국방 브리핑
            </h2>
            <p className="text-sm text-slate-400">{today}</p>
          </div>
        </div>
        <Button
          onClick={() => onPreviewEmail(filteredNews)}
          className="bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold shadow-lg shadow-amber-500/20"
        >
          <Mail className="h-4 w-4 mr-2" />
          메일 미리보기
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
        <Input
          placeholder="뉴스 검색..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 bg-slate-900/60 border-slate-700 text-slate-100 placeholder:text-slate-600 focus:border-amber-500/50"
        />
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <div className="flex items-center gap-1.5 text-slate-500 mr-1">
          <Filter className="h-3.5 w-3.5" />
          <span className="text-xs font-medium">필터</span>
        </div>
        {["전체", ...NEWS_CATEGORIES].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              filter === cat
                ? "bg-amber-500 text-slate-900"
                : "bg-slate-800/60 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-700/50"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid gap-3">
        {filteredNews.length === 0 ? (
          <Card className="border-slate-800 bg-slate-800/50">
            <CardContent className="py-12 text-center">
              <Search className="h-8 w-8 text-slate-600 mx-auto mb-2" />
              <p className="text-sm text-slate-500">검색 결과가 없습니다.</p>
            </CardContent>
          </Card>
        ) : (
          filteredNews.map((news) => {
            const config = priorityConfig[news.priority];
            const Icon = config.icon;
            return (
              <Card
                key={news.id}
                className="border-slate-800 bg-slate-800/50 hover:bg-slate-800 hover:border-slate-700 transition-all shadow-lg shadow-black/20"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2 flex-wrap">
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
          })
        )}
      </div>
    </div>
  );
}