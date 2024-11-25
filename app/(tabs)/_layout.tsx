import { Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

const Layout = () => {
  return (
    <Tabs initialRouteName="index">
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: () => (
            <FontAwesome
              name="home"
              color="#7597eb"
              size={20}
              className="w-6 h-6 mt-4"
            />
          ),
          tabBarActiveBackgroundColor: "#342a52",
          tabBarActiveTintColor: "white",
          tabBarInactiveTintColor: "7597eb",
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: "Saved",
          tabBarIcon: () => (
            <FontAwesome
              name="heart"
              color="#7597eb"
              size={20}
              className="w-6 h-6 mt-3"
            />
          ),
          tabBarActiveBackgroundColor: "#342a52",
          tabBarActiveTintColor: "white",
          tabBarInactiveTintColor: "7597eb",
        }}
      />
    </Tabs>
  );
};

export default Layout;
