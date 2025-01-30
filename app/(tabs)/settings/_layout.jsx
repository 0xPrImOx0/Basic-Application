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
                "bg-[#FFFFFF] py-3 flex-row border-b-2 border-[#d9d9d9] justify-center items-center relative pb-3"
              }
            >
              <View className={"absolute left-4"}>
                <CustomButton
                  label="Back"
                  icon={Icons.arrow}
                  iconTint={"#0A0A0A"}
                  onPress={() => router.back()}
                  textStyle={"text-start"}
                  iconStyle={"w-6 h-6 rotate-180 mr-1"}
                />
              </View>

              <View className={"items-center"}>
                <Text className={"font-extrabold text-xl text-[#0A0A0A]"}>
                  Settings
                </Text>
                <Text className={"font-light italic text-sm text-[#6c6c6c]"}>
                  Manage account info and security
                </Text>
              </View>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="editProfile"
        options={{
          title: "Edit Profile",
          header: () => (
            <View
              className={
                "bg-[#FFFFFF] py-3 flex-row border-b-2 border-[#d9d9d9] justify-center items-center relative pb-3"
              }
            >
              <View className={"absolute left-4"}>
                <CustomButton
                  label="Back"
                  icon={Icons.arrow}
                  iconTint={"#0A0A0A"}
                  onPress={() => router.back()}
                  textStyle={"text-start"}
                  iconStyle={"w-6 h-6 rotate-180 mr-1"}
                />
              </View>

              <View className={"items-center"}>
                <Text className={"font-extrabold text-xl text-[#0A0A0A]"}>
                  Settings
                </Text>
                <Text className={"font-light italic text-sm text-[#6c6c6c]"}>
                  Edit Profile
                </Text>
              </View>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="changePassword"
        options={{
          title: "Change Password",
          header: () => (
            <View
              className={
                "bg-[#FFFFFF] py-3 flex-row border-b-2 border-[#d9d9d9] justify-center items-center relative pb-3"
              }
            >
              <View className={"absolute left-4"}>
                <CustomButton
                  label="Back"
                  icon={Icons.arrow}
                  iconTint={"#0A0A0A"}
                  onPress={() => router.back()}
                  textStyle={"text-start"}
                  iconStyle={"w-6 h-6 rotate-180 mr-1"}
                />
              </View>

              <View className={"items-center"}>
                <Text className={"font-extrabold text-xl text-[#0A0A0A]"}>
                  Settings
                </Text>
                <Text
                  className={"font-light italic text-sm text-[#6c6c6c] px-2"}
                >
                  Change Password
                </Text>
              </View>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="addSubject"
        options={{
          title: "Add Account",
          header: () => (
            <View
              className={
                "bg-[#FFFFFF] py-3 flex-row border-b-2 border-[#d9d9d9] justify-center items-center relative pb-3"
              }
            >
              <View className={"absolute left-4"}>
                <CustomButton
                  label="Back"
                  icon={Icons.arrow}
                  iconTint={"#0A0A0A"}
                  onPress={() => router.back()}
                  textStyle={"text-start"}
                  iconStyle={"w-6 h-6 rotate-180 mr-1"}
                />
              </View>

              <View className={"items-center"}>
                <Text className={"font-extrabold text-xl text-[#0A0A0A]"}>
                  Settings
                </Text>
                <Text className={"font-light italic text-sm text-[#6c6c6c]"}>
                  Add Subject
                </Text>
              </View>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="delSubject"
        options={{
          title: "Delete Account",
          presentation: "transparentModal",
          header: () => (
            <View
              className={
                "bg-[#FFFFFF] py-3 flex-row border-b-2 border-[#d9d9d9] justify-center items-center relative pb-3"
              }
            >
              <View className={"absolute left-4"}>
                <CustomButton
                  label="Back"
                  icon={Icons.arrow}
                  iconTint={"#0A0A0A"}
                  onPress={() => router.back()}
                  textStyle={"text-start"}
                  iconStyle={"w-6 h-6 rotate-180 mr-1"}
                />
              </View>

              <View className={"items-center"}>
                <Text className={"font-extrabold text-xl text-[#0A0A0A]"}>
                  Settings
                </Text>
                <Text className={"font-light italic text-sm text-[#6c6c6c]"}>
                  Delete Subject
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
