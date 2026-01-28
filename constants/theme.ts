import { Platform } from 'react-native';

export enum Theme {
  Light = 'light',
  Dark = 'dark',
}

export type ColorsType = {
  text: {
    primary: string;
    secondary: string;
    inverted: string;
  };
  background: string;
  tint: string;
  icon: string;
  tabIconDefault: string;
  tabIconSelected: string;
  button: {
    primary: {
      background: string;
      border?: string;
      text: string;
    };
    secondary: {
      background: string;
      border?: string;
      text: string;
    };
    tertiary: {
      background: string;
      border?: string;
      text: string;
    };
  };
  pill: {
    primary: {
      background: string;
      border?: string;
      text: string;
    };
    secondary: {
      background: string;
      border?: string;
      text: string;
    };
  };
};

export const Colors: { [key in Theme]: ColorsType } = {
  [Theme.Light]: {
    text: {
      primary: '#11181C',
      secondary: '#687076',
      inverted: '#000',
    },
    background: '#fff',
    tint: '#0a7ea4',
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: '#0a7ea4',
    button: {
      primary: {
        background: '#0a7ea4',
        text: '#fff',
      },
      secondary: {
        background: 'transparent',
        border: '#11181C',
        text: '#11181C',
      },
      tertiary: {
        background: '#f0f0f0',
        text: '#11181C',
      },
    },
    pill: {
      primary: {
        background: '#0a7ea4',
        text: '#fff',
      },
      secondary: {
        background: '#f0f0f0',
        border: '#e0e0e0',
        text: '#11181C',
      },
    },
  },
  [Theme.Dark]: {
    text: {
      primary: '#ECEDEE',
      secondary: '#9BA1A6',
      inverted: '#000',
    },
    background: '#151718',
    tint: '#fff',
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: '#fff',
    button: {
      primary: {
        background: '#0a7ea4',
        text: '#fff',
      },
      secondary: {
        background: 'transparent',
        border: '#ECEDEE',
        text: '#ECEDEE',
      },
      tertiary: {
        background: '#2a2a2a',
        text: '#ECEDEE',
      },
    },
    pill: {
      primary: {
        background: '#0a7ea4',
        text: '#fff',
      },
      secondary: {
        background: '#2a2a2a',
        border: '#3a3a3a',
        text: '#ECEDEE',
      },
    },
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
});
