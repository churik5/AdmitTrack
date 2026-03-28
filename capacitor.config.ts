import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.admittrack.app',
  appName: 'AdmitTrack',
  webDir: 'out',
  server: {
    url: 'https://admittrack.app',
    cleartext: false,
  },
  plugins: {
    SplashScreen: {
      launchAutoHide: true,
      launchShowDuration: 2000,
      backgroundColor: '#ffffff',
      showSpinner: false,
    },
    StatusBar: {
      style: 'LIGHT',
      backgroundColor: '#ffffff',
    },
    Keyboard: {
      resize: 'native',
      resizeOnFullScreen: true,
    },
  },
  ios: {
    contentInset: 'always',
    preferredContentMode: 'mobile',
    scheme: 'AdmitTrack',
    scrollEnabled: false,
    allowsLinkPreview: false,
  },
};

export default config;
