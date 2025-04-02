export interface Game {
  appid: number;
  name: string;
  img_icon_url?: string;
  img_logo_url?: string;
  has_community_visible_stats?: boolean;
}

export interface GameDetails {
  name: string;
  steam_appid: number;
  detailed_description: string;
  about_the_game: string;
  short_description: string;
  header_image: string;
  capsule_image: string;
  background: string;
  background_raw: string;
  publishers: string[];
  developers: string[];
  price_overview?: {
    currency: string;
    initial: number;
    final: number;
    discount_percent: number;
  };
  is_free: boolean;
  genres: Array<{id: string, description: string}>;
  screenshots: Array<{id: number, path_thumbnail: string, path_full: string}>;
  movies?: Array<{
    id: number;
    name: string;
    thumbnail: string;
    webm: {[key: string]: string};
    mp4: {[key: string]: string};
  }>;
  release_date: {
    coming_soon: boolean;
    date: string;
  };
  support_info: {
    url: string;
    email: string;
  };
  supported_languages: string;
}

// Helper functions for image URLs with multiple fallback options
export const getGameHeaderImage = (appId: number): string => {
  // Try different possible image URLs
  return `https://cdn.akamai.steamstatic.com/steam/apps/${appId}/header.jpg`;
};

// Alternative image sources if the primary one fails
export const getAlternativeGameImage = (appId: number): string => {
  return `https://steamcdn-a.akamaihd.net/steam/apps/${appId}/capsule_616x353.jpg`;
};

export const getGameCapsuleImage = (appId: number): string => {
  return `https://cdn.akamai.steamstatic.com/steam/apps/${appId}/capsule_231x87.jpg`;
};

export const getGameLibraryImage = (appId: number): string => {
  return `https://cdn.akamai.steamstatic.com/steam/apps/${appId}/library_600x900.jpg`;
};

export const getGameIconUrl = (appId: number, imgIconUrl?: string): string => {
  if (!imgIconUrl) return `https://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/${appId}/icon.jpg`;
  return `https://media.steampowered.com/steamcommunity/public/images/apps/${appId}/${imgIconUrl}.jpg`;
};

