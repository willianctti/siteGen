export interface StyleOptions {
  backgroundColor?: string;
  gradientStart?: string;
  gradientEnd?: string;
  textColor?: string;
  textGradientStart?: string;
  height?: string;
  textGradientEnd?: string;
  logoSize?: string;
  blurOpacity?: number;
  position?: 'fixed' | 'relative' | 'absolute' | 'sticky';
  gridColumns?: number;
  socialIconSize?: string;
  socialIconColor?: string;
  socialIconHoverColor?: string;
  titleFontSize?: string;
  subtitleFontSize?: string;
  borderRadius?: number;
  padding?: string;
  animation?: {
    type: 'fade' | 'slide' | 'scale';
    duration: number;
    delay: number;
  };
}


export interface ComponentOptions {
  header: {
    enabled: boolean;
    logo: string;
    alignment?: 'left' | 'center' | 'right';
    navigation: {
      enabled: boolean;
      items: Array<{ label: string; link: string }>;
    };
    backgroundImage?: {
      enabled: boolean;
      url: string;
      blur: boolean;
      opacity: number;
    };
    styles: StyleOptions;
  };
  landing: {
    enabled: boolean;
    title: string;
    subtitle: string;
    backgroundImage: string;
    styles: StyleOptions;
  };
  services: {
    enabled: boolean;
    title: string;
    items: Array<{
      icon: string;
      title: string;
      description: string;
    }>;
    styles: StyleOptions;
  };
  testimonials: {
    enabled: boolean;
    title: string;
    items: Array<{
      name: string;
      role: string;
      text: string;
      image: string;
    }>;
    styles: StyleOptions;
  };
  footer: {
    enabled: boolean;
    logo: string;
    sections: Array<{ title: string; content: string[] }>;
    contact: {
      title?: string;
      email: string;
      phone: string;
      address?: string;
      socialMedia: Array<{
        icon: string;
        url: string;
      }>;
    };
    newsletter: {
      enabled: boolean;
      title: string;
      subtitle: string;
    };
    quickLinks: {
      enabled: boolean;
      title: string;
      items: Array<{ label: string; link: string }>;
    };
    styles: StyleOptions;
  };
}
