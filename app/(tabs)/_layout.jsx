import React from "react";
import { Stack, Tabs } from "expo-router";
import { View, Image, Text, TouchableOpacity } from "react-native";
import Icons from "../../constants/Icons";

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="items-center justify-center w-[90px] ">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className={`w-7 h-7 relative ${focused ? "w-8 h-8" : ""}`}
      />
      <Text
        className={`text-[14px]  ${
          focused ? "font-bold text-[#5CB88F]" : "font-normal text-[#6C6C6C]"
        }`}
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
        tabBarActiveTintColor: "#5CB88F",
        tabBarInactiveTintColor: "#090909",
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopWidth: 1,
          borderTopColor: "#090909",
          height: 100,
          paddingInline: 50,
          paddingTop: 20,
        },
        tabBarButton: (props) => (
          <TouchableOpacity {...props} activeOpacity={0.5}>
            <View>{props.children}</View>
          </TouchableOpacity>
        ),
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
              name="Personal Info"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          headerShown: true,
          title: "Settings",
          headerTintColor: "#0A0A0A",
          headerTitleAlign: "center",
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
