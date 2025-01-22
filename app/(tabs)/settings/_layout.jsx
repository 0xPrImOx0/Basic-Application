import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Stack, router } from "expo-router";
import CustomButton from "../../../components/CustomButton";
import Icons from "../../../constants/Icons";

const SettingsLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitleAlign: "center", // Center the title
        headerTitleStyle: {
          color: "#0A0A0A", // Change title color
          fontWeight: "bold", // Make title bold
          fontSize: 18, // Adjust title font size if needed
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{ title: "Settings" }} // For settings index screen
      />
      <Stack.Screen
        name="manageAccount"
        options={{
          title: "Manage Account",
          header: () => (
            <View
              className={
                "bg-[#FFFFFF] py-[10px] flex-row border-b-2 border-[#d9d9d9] justify-center items-center relative pb-[10px]"
              }
            >
              <View className={"absolute left-[10px]"}>
                <CustomButton
                  label="Back"
                  icon={Icons.arrow}
                  iconTint={"#0A0A0A"}
                  onPress={() => router.back()}
                  textStyle={"text-start"}
                  iconStyle={"w-[20px] h-[20px] rotate-180 mr-[5px]"}
                />
              </View>

              <View className={"items-center"}>
                <Text className={"font-extrabold text-[17px] text-[#0A0A0A]"}>
                  Settings
                </Text>
                <Text
                  className={"font-light italic text-[12px] text-[#6c6c6c]"}
                >
                  Manage account info and security
                </Text>
              </View>
            </View>
          ),
        }}
      />
    </Stack>
  );
};

export default SettingsLayout;
