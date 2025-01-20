import React from "react";
import { Stack, Tabs } from "expo-router";
import { View, Image, Text } from "react-native";
import Icons from "../../constants/Icons";

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="items-center justify-center">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className={`w-6 h-6 relative ${focused ? "top-[-5px] w-7 h-7" : ""}`}
      />
      <Text
        className={`${
          focused ? "font-bold text-[12px]" : "font-normal text-[10px]"
        }`}
        style={{ color: "green" }}
      >
        {name}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#1F41BB",
        tabBarInactiveTintColor: "#ECECEC",
        tabBarStyle: {
          backgroundColor: "#161622",
          borderTopWidth: 3,
          borderTopColor: "#000",
          height: 80,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={Icons.homes}
              color={color}
              name="Home"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="personalInfo"
        options={{
          headerShown: false,
          title: "Personal Info",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={Icons.book}
              color={color}
              name="About"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          headerShown: false,
          title: "Settings",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={Icons.setting}
              color={color}
              name="Settings"
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
