export const site = {
  name: "Jiya Indian and Chinese Restaurant",
  shortName: "Jiya",
  url: "https://jiya-indian-a-chinese-restaurant.pages.dev",
  title: "Jiya | ひたちなか市相金町のインド・中華料理",
  description:
    "茨城県ひたちなか市相金町、那珂湊のインド・中華料理店Jiya。カレー、ナン、タンドール、ビリヤニ、チョウミン。平日11:00–15:00／17:00–22:00。定休日なし。15席・駐車場あり。高田の鉄橋駅から徒歩8分。",
  /** 国土地理院の住所検索による相金町1番の座標 */
  geo: { latitude: 36.349556, longitude: 140.583344 },
  tabelogUrl: "https://tabelog.com/ibaraki/A0801/A080102/8031237/",
  phone: "029-229-1755",
  phoneHref: "tel:0292291755",
  postal: "〒311-1246",
  address: "茨城県ひたちなか市相金町1-5",
  access: "高田の鉄橋駅から徒歩8分",
  hoursLabel: "平日",
  lunch: "11:00–15:00",
  dinner: "17:00–22:00",
  closed: "なし",
  seats: "15",
  parking: "あり",
  reserveUrl: "https://share.google/cj9hN6U1LncWy4iKH",
  mapUrl: "https://maps.app.goo.gl/djcPv8ZeLeh2tmRd6",
  mapEmbed:
    "https://maps.google.com/maps?q=" +
    encodeURIComponent("Jiya Indian and Chinese Restaurant 茨城県ひたちなか市相金町1-5") +
    "&hl=ja&z=16&output=embed",
} as const;

export type MenuItem = {
  name: string;
  price: string;
  desc?: string;
};

export type MenuCategory = {
  id: string;
  en: string;
  ja: string;
  note?: string;
  foot?: string;
  items: MenuItem[];
};

export const menu: MenuCategory[] = [
  {
    id: "lunch",
    en: "Lunch",
    ja: "ランチ",
    note: "11:00–15:00",
    foot: "ランチドリンクはチャイ、コーヒー、紅茶、ウーロン茶、ジンジャーエール、ラッシー、マンゴーラッシー、コーラ、オレンジジュース。ナン・ライス・カレーのお代わりは1回目無料、2回目から ¥200。",
    items: [
      {
        name: "Aセット",
        price: "¥878",
        desc: "選べるカレー1種、ナンまたはライス、ミニサラダ、ソフトドリンク",
      },
      {
        name: "Bセット",
        price: "¥1,208",
        desc: "ビリヤニ（マトン・チキン・ベジタブル）、ミニサラダ、ソフトドリンク",
      },
      {
        name: "Cセット",
        price: "¥1,373",
        desc: "ミニカレー2種、ナン、タンドリーチキン、ミニプラウドライス、ミニサラダ、ソフトドリンク",
      },
      {
        name: "ダブルカレー",
        price: "¥1,099",
        desc: "オニオンベースのカレーから2種類",
      },
      {
        name: "お子様ランチ",
        price: "¥603",
        desc: "ミニカレー、ナン、ミニサラダ、ゼリー、オレンジジュース",
      },
      {
        name: "学生セット",
        price: "¥823",
        desc: "選べるカレー1種、ナンまたはライス",
      },
    ],
  },
  {
    id: "dinner",
    en: "Dinner",
    ja: "ディナー",
    note: "17:00–22:00",
    items: [
      {
        name: "タージマハルセット",
        price: "¥1,153",
        desc: "チキンカレー、ダルカレー、サラダ、ナン",
      },
      {
        name: "チーズナンセット",
        price: "¥1,098",
      },
      {
        name: "元気セット",
        price: "¥1,318",
        desc: "ナスベジタブル、バターチキン、サラダ、ナン、ライス、ソフトドリンク",
      },
      {
        name: "ジャヤスペシャルセット",
        price: "¥1,699",
        desc: "選べるカレー2種、ナン、ミニライス、タンドリーチキン、サラダ、ソフトドリンク",
      },
      {
        name: "ビールセット",
        price: "¥1,849",
        desc: "選べるカレー1種、ビール、サラダ、ライス、ナン、タンドリーチキン",
      },
      {
        name: "ガパオライス",
        price: "¥988",
        desc: "ホーリーバジルと肉を、ナンプラーとオイスターソースで炒めたライス",
      },
      {
        name: "お子様セット",
        price: "¥599",
        desc: "バターチキン、ミニナンまたはミニライス、サラダ、ソフトドリンク、デザート",
      },
      {
        name: "バニラアイス",
        price: "¥249",
      },
    ],
  },
  {
    id: "biryani",
    en: "Biryani",
    ja: "ビリヤニ",
    note: "それぞれの素材で炊き込む、インドのごはん",
    items: [
      { name: "チキンビリヤニ", price: "¥1,299" },
      { name: "マトンビリヤニ", price: "¥1,499" },
      { name: "ベジタブルビリヤニ", price: "¥1,199" },
    ],
  },
  {
    id: "nan",
    en: "Nan",
    ja: "ナン",
    items: [
      { name: "プレーンナン", price: "¥383", desc: "ふわふわ、もちもちのパン" },
      { name: "チーズナン", price: "¥603" },
      { name: "ガーリックナン", price: "¥558" },
      { name: "ハニーチーズナン", price: "¥603" },
      { name: "チョコレートナン", price: "¥658" },
      { name: "キーマナン", price: "¥658" },
      { name: "チーズガーリックナン", price: "¥658" },
      { name: "ポテトナン", price: "¥548" },
    ],
  },
  {
    id: "grill",
    en: "Grill",
    ja: "グリル・スナック",
    items: [
      { name: "タンドリーグリル", price: "¥1,899", desc: "タンドリーの盛り合わせ" },
      { name: "チキンティッカ", price: "2P ¥399 · 4P ¥799 · 6P ¥899" },
      { name: "チキンティッカチーズ", price: "2P ¥449 · 4P ¥849 · 6P ¥899" },
      { name: "サモサ", price: "2P ¥499" },
      { name: "ベイガンパコラ", price: "¥499" },
      { name: "ポテトパコラ", price: "¥499" },
      { name: "チーズパコラ", price: "¥899" },
      { name: "フィッシュパコラ", price: "¥899" },
      { name: "チキンパコラ", price: "¥799" },
      { name: "チキンマサラソーセージ", price: "¥699" },
      { name: "グリーンサラダ", price: "¥599" },
      { name: "チキンサラダ", price: "¥899", desc: "チキンティッカをのせたサラダ" },
    ],
  },
  {
    id: "china",
    en: "Chinese",
    ja: "中華・新メニュー",
    note: "税抜価格。ソフトドリンクは +¥100。",
    items: [
      { name: "チキンチョウミン", price: "¥749" },
      { name: "ベジタブルチョウミン", price: "¥699" },
      { name: "マンチュリアライス", price: "¥1,149" },
      { name: "グリルフィッシュ", price: "¥1,799" },
      { name: "丸ごとタンドリーチキン", price: "¥1,549" },
      { name: "マライティッカ", price: "¥849" },
      { name: "チキン65", price: "¥799" },
      { name: "フィッシュティッカ", price: "¥799" },
      { name: "ブラウンティッカ", price: "¥1,149" },
      { name: "チキンクリスピー", price: "¥699" },
      { name: "レシミカバブ", price: "¥949" },
      { name: "チキンガーリックティッカ", price: "2P ¥449 · 4P ¥849 · 6P ¥949" },
    ],
  },
];

export const marquee = [
  "Butter Chicken",
  "Nan",
  "Tandoori",
  "Biryani",
  "Chow Mein",
  "Tikka",
  "Curry",
  "Pakora",
];
