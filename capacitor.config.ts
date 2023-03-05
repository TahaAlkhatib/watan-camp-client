import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'watan.camp.app',
  appName: 'watan-camp-app',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      launchAutoHide: true,
      backgroundColor: "#ffffffff",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      showSpinner: true,
      androidSpinnerStyle: "large",
      iosSpinnerStyle: "small",
      spinnerColor: "#999999",
      splashFullScreen: true,
      splashImmersive: true,
    },
    PushNotifications:{
      presentationOptions:["badge","sound","alert"]
    }
  },
};

export default config;
