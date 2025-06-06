import "dotenv/config";

export default {
  expo: {
    name: "Jobstar",
    slug: "Jobstar",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    scheme: "jobstar",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      package: "com.ebubeevan.Jobstar",
      intentFilters: [
        {
          action: "VIEW",
          data: [
            {
              scheme: "jobstar",
              host: "jobstar"
            }
          ],
          category: ["BROWSABLE", "DEFAULT"]
        }
      ]
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png"
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/logo.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff"
        }
      ]
    ],
    experiments: {
      typedRoutes: true
    },
    extra: {
      router: {
        origin: false
      },
      eas: {
        projectId: "83519d7d-9c9f-45e2-bdb8-26f304630f1b"
      },
      EXPO_PUBLIC_API_KEY: process.env.EXPO_PUBLIC_API_KEY,
      EXPO_PUBLIC_APP_ID: process.env.EXPO_PUBLIC_APP_ID,
      EXPO_PUBLIC_AUTH_DOMAIN: process.env.EXPO_PUBLIC_AUTH_DOMAIN,
      EXPO_PUBLIC_PROJECT_ID: process.env.EXPO_PUBLIC_PROJECT_ID,
      EXPO_PUBLIC_STOARGE_BUCKET: process.env.EXPO_PUBLIC_STOARGE_BUCKET,
      EXPO_PUBLIC_MESSAGING_SENDER_ID: process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID,
      EXPO_PUBLIC_JOBS_API: process.env.EXPO_PUBLIC_JOBS_API,
      EXPO_PUBLIC_JOB_TOKEN: process.env.EXPO_PUBLIC_JOB_TOKEN,
    },
    owner: "ebubeevan"
  }
};
