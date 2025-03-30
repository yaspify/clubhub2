export interface Club {
    slug: string;
    clubName: string; // Changed from circleName
    verified?: boolean;
    profileImage?: string;
    affiliation?: string;
    memberComposition?: {
        totalMembers?: string;
        gradeLevels?: {
            [key: string]: string;
        };
        gender?: {
            Male?: string;
            Female?: string;
        };
        belonging?: {
            [key: string]: string;
        };
        foundingYear?: string;
    };
    externalLinks?: {
        Instagram?: string;
        LINE?: string;
        X?: string;
        Website?: string;
        Facebook?: string;
        YouTube?: string;
        weighted?: string;
    };
    tags?: string[];
    activityDetails?: {
        summary?: string;
        location?: string;
        frequency?: string;
        fee?: string; // Renamed for compatibility
        record?: string;
        meal?: string; // From the second interface
        membershipFee?: string; // From the second interface
        initialCost?: string; // From the second interface
        feelingPositive?: string; // From the second interface
        feelingNegative?: string; // From the second interface
    };
    recruitmentInfo?: string | {
        welcomeSchedule?: string; // From the second interface
    };
    lastUpdate?: string;
    secretDescription?: string; // From the first interface
}

// テスト用のダミークラブデータ - 本番環境では実際のデータソースに置き換えてください
const clubs: Club[] = [
    {
        slug: "tennis-club",
        clubName: "テニスクラブ",
        verified: true,
        affiliation: "スポーツ",
        tags: ["スポーツ", "屋外活動", "大会参加"],
        activityDetails: {
            summary: "年間を通じて大会に参加する競技志向のテニスクラブです。",
            location: "大学テニスコート",
            frequency: "週3回"
        },
        externalLinks: {
            Instagram: "https://instagram.com/tennisclub"
        }
    },
    {
        slug: "photography-society",
        clubName: "写真サークル",
        verified: true,
        profileImage: "/images/dummy/photography.jpg",
        tags: ["芸術", "創作活動"],
        activityDetails: {
            summary: "撮影テクニックを共有し、一緒に撮影ウォークに行く写真愛好家のコミュニティです。",
            location: "芸術棟、201号室",
            frequency: "毎週ミーティング"
        }
    },
    {
        slug: "debate-team",
        clubName: "ディベートチーム",
        verified: true,
        tags: ["学術", "大会参加"],
        activityDetails: {
            summary: "全国的なディベート大会に参加し、説得力のあるスピーチの技術を練習します。",
            location: "メインホール",
            frequency: "週2回"
        },
        externalLinks: {
            Instagram: "https://instagram.com/debateteam",
            Website: "https://university-debate.org"
        }
    },
    {
        slug: "cooking-club",
        clubName: "料理サークル",
        verified: false,
        tags: ["ライフスタイル", "社交"],
        activityDetails: {
            summary: "フレンドリーで社交的な環境で、世界各国の料理を学びます。",
            location: "学生会館キッチン",
            frequency: "毎週金曜日"
        }
    },
    {
        slug: "robotics-society",
        clubName: "ロボティクス研究会",
        verified: true,
        tags: ["テクノロジー", "エンジニアリング", "大会参加"],
        activityDetails: {
            summary: "様々な大会や展示会のためのロボットを設計、製作、プログラミングします。",
            location: "工学部棟、ラボ3",
            frequency: "毎週ワークショップとオープンラボ時間"
        },
        externalLinks: {
            Instagram: "https://instagram.com/roboticssociety",
            Website: "https://robotics-society.edu"
        }
    },
    {
        slug: "kindaihang",
        clubName: "とびまっし",
        verified: true,
        profileImage: "https://res.cloudinary.com/hjii6gswv/image/upload/v1741421694/profileImage/tnnrdoycsahp0tftyms2.jpg",
        affiliation: "非公認",
        memberComposition: {
            totalMembers: "12名",
            gradeLevels: {
                "1st": "",
                "2nd": "5名",
                "3rd": "3名",
                "4th": "0名",
                "5th": "3名",
                "6th": "1名"
            },
            gender: {
                Male: "10名",
                Female: "2名"
            },
            belonging: {
                "人間社会学域": "20%",
                "理工学域": "75%",
                "医薬保健学域": "5%"
            },
            foundingYear: ""
        },
        externalLinks: {
            Instagram: "https://www.instagram.com/kindaihang",
            X: "https://x.com/kindaihang",
            weighted: "https://www.instagram.com/kindaihang"
        },
        tags: ["体育会系", "兼サー可", "初心者歓迎"],
        activityDetails: {
            summary: "「みなさん一緒に空を飛びませんか？」どうも金沢大学ハンググライダーサークルのとびまっしです。空を飛びたい方は大歓迎。全員はじめは初心者なので大丈夫です。お金がかかりそうに見えますが実は思ったよりかかりません。2週間に1回なのでそんなに重たくありません。体験会もやってるので興味のある方はぜひインスタ,Xに連絡ください。",
            location: "獅子吼高原、海岸",
            frequency: "隔週土日(山飛びまでは隔週土曜のみ)",
            meal: "",
            record: "新人戦出場\nNASAs 出場",
            membershipFee: "約10000円／年",
            initialCost: "山飛びまでは特にかかりません",
            feelingPositive: "２週間に1回の活動なので気軽に始められる。空を飛ぶというここでしかない経験が得られる",
            feelingNegative: ""
        },
        recruitmentInfo: {
            welcomeSchedule: "4月から5月の隔週土日"
        },
        lastUpdate: "2025年3月8日"
    },
    {
        slug: "hibana_univ.kanazawa",
        clubName: "ファイヤーダンスサークル　火華-HIBANA-",
        verified: true,
        profileImage: "https://res.cloudinary.com/hjii6gswv/image/upload/v1741401130/483329587_633570312809898_7241643180933539367_n_oms3ls.jpg",
        affiliation: "非公認",
        memberComposition: {
            foundingYear: "2024"
        },
        externalLinks: {
            Instagram: "https://www.instagram.com/hibana_univ.kanazawa",
            X: "https://x.com/kuhinomai",
            weighted: "https://www.instagram.com/hibana_univ.kanazawa"
        },
        tags: ["文化系", "兼サー可", "初心者歓迎"],
        activityDetails: {
            summary: "ファイヤーパフォーマンスを行うサークルです🔥",
            location: "マメサロン総合教育棟前",
            frequency: "毎週木曜日",
            record: "金大祭\nツエーゲン金沢試合前ステージ",
        },
        recruitmentInfo: {
            welcomeSchedule: "4/3  4/10  17:00〜\n新歓ステージ「火舞会」\n場所　総合教育棟前　"
        },
        lastUpdate: "2025年3月8日"
    }
];

/**
 * すべてのクラブを取得
 * @returns すべてのClubオブジェクトの配列
 */
export function getAllClubs(): Club[] {
    return clubs;
}

/**
 * スラッグに基づいてクラブを取得
 * @param slug クラブの一意識別子
 * @returns Clubオブジェクトまたはundefined
 */
export function getClubBySlug(slug: string): Club | undefined {
    return clubs.find(club => club.slug === slug);
}

/**
 * 関連するクラブを取得
 * @param club 基準となるクラブ
 * @param limit 取得する関連クラブの最大数
 * @returns 関連するClubオブジェクトの配列
 */
export function getRelatedClubs(club: Club, limit: number = 3): Club[] {
    // タグベースの関連性を使用
    if (club.tags && club.tags.length > 0) {
        const relatedByTags = clubs.filter(c => 
            c.slug !== club.slug && // 同じクラブは除外
            c.tags && 
            c.tags.some(tag => club.tags?.includes(tag)) // タグが一致するクラブを選択
        );
        
        return relatedByTags.slice(0, limit);
    }
    
    // タグがない場合はランダムに選択
    return clubs
        .filter(c => c.slug !== club.slug) // 同じクラブは除外
        .sort(() => 0.5 - Math.random()) // ランダムに並べ替え
        .slice(0, limit);
}

/**
 * クエリ文字列に基づいてクラブを検索
 * @param query 検索クエリ
 * @returns クエリに一致するClubオブジェクトの配列
 */
export function searchClubs(query: string): Club[] {
    const searchTerms = query.toLowerCase().trim().split(/\s+/);
    
    return clubs.filter(club => {
        // 様々なフィールドから検索
        const searchableContent = [
            club.clubName,
            club.affiliation,
            club.tags?.join(' '),
            club.activityDetails?.summary,
            club.activityDetails?.location,
            club.secretDescription
        ].filter(Boolean).join(' ').toLowerCase();
        
        // すべての検索語がいずれかのフィールドに含まれていればtrue
        return searchTerms.every(term => searchableContent.includes(term));
    });
}