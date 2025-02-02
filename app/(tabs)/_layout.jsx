import React, { useEffect } from "react";
import { Redirect, router, Stack, Tabs } from "expo-router";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Icons from "../../constants/Icons";
import { useAuth } from "../../services/auth-provider";

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="items-center justify-center w-28">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className={`w-7 h-7 relative ${focused ? "w-8 h-8" : ""}`}
      />
      <Text
        className={`text-base  ${
          focused ? "font-bold text-[#5CB88F]" : "font-normal text-[#6C6C6C]"
        }`}
      >
        {name}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  const { session } = useAuth();

  useEffect(() => {
    if (session) {
      router.replace("/home");
    }
  }, [session]);

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
          height: 80,
          paddingInline: 20,
          paddingTop: 20,
        },
        tabBarHideOnKeyboard: true,
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
          headerShown: false,
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
