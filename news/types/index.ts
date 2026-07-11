export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  category: string;
  source: string;
  time: string;
  priority: "high" | "medium" | "low";
  url?: string;
}

export interface Subscriber {
  id: string;
  email: string;
  deliveryTime: string;
  categories: string[];
  active: boolean;
  createdAt: string;
}

export interface DeliveryLog {
  id: string;
  email: string;
  sentAt: string;
  status: "sent" | "failed";
  newsCount: number;
}

export const NEWS_CATEGORIES = [
  "국방정책",
  "무기체계",
  "북한·안보",
  "국방산업",
  "국제안보",
  "군인권·복지",
] as const;

export const MOCK_NEWS: NewsItem[] = [
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
      "합참에 따르면 북한이 오늘 새벽 동해상으로 단거리 탄도미사일 2발을 발사했다. 미사일은 약 400km 비행 후 떨어졌다.",
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
    category: "군인권·복지",
    source: "국방일보",
    time: "08:20",
    priority: "low",
  },
  {
    id: "7",
    title: "해군, 신형 잠수함 '장보고-III' 1번함 진수",
    summary:
      "해군이 국내 최초로 3,000톤급 배수량을 갖춘 장보고-III급 잠수함 1번함을 진수했다. SLBM 탑재 능력을 보유하고 있다.",
    category: "무기체계",
    source: "방산뉴스",
    time: "06:50",
    priority: "high",
  },
  {
    id: "8",
    title: "NATO, 한국과 사이버안보 협력 강화 합의",
    summary:
      "NATO와 한국이 사이버 위협 대응을 위한 공동 훈련 및 정보공유 체계 구축에 합의했다.",
    category: "국제안보",
    source: "연합뉴스",
    time: "07:30",
    priority: "medium",
  },
];