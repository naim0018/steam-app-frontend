export interface SteamGame {
  appid: number;
  name: string;
  img_icon_url: string;
  img_logo_url: string;
  playtime_forever: number;
}

export interface GameDetails {
  name: string;
  steam_appid: number;
  detailed_description: string;
  header_image: string;
  publishers: string[];
  price_overview?: {
    currency: string;
    initial: number;
    final: number;
    discount_percent: number;
  };
}