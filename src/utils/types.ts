export interface MenuItem {
  name: string;
  href: string;
  submenu?: MenuItem[];
}

export interface SocialLink {
  url: string;
  label: string;
  icon: React.ReactNode;
}

export interface ImageAsset {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}