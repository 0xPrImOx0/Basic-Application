import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Platform,
  Dimensions,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Container from "../../../components/Container";
import CustomButton from "../../../components/CustomButton";
import FormField from "../../../components/FormField";

const { width } = Dimensions.get("window");
const COVER_HEIGHT = width * 0.5625; // 16:9 aspect ratio

const changePassword = () => {
  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const profilePic = "https://via.placeholder.com/150";
  const coverPhoto = "https://via.placeholder.com/800x300";

  const handleSave = () => {
    // Handle save logic here
    console.log("Save button clicked");
    console.log("Profile data saved:", password);
  };

  return (
    <Container bg={"#F9FAFB"}>
      {/* Cover Photo Section */}
      <View className="relative">
        <Image
          source={{ uri: coverPhoto }}
          style={{ width: width, height: COVER_HEIGHT }}
          className="bg-gray-300"
          resizeMode="cover"
        />
      </View>
      <View style={{ paddingHorizontal: width * 0.04 }} className="-mt-24">
        {/* Profile Picture Section */}
        <View className="relative items-center mb-10">
          <Image
            source={{ uri: profilePic }}
            style={{ width: width * 0.35, height: width * 0.35 }}
            className="rounded-full bg-gray-200 border-4 border-white"
          />
        </View>

        {/* Form Container */}
        <View className="bg-white rounded-3xl p-6 shadow-sm mb-12">
          {/* Header */}
          <View className="mb-7">
            <Text className="text-2xl font-extrabold text-[#0A0A0A]">
              Change Password
            </Text>
            <Text className="text-base text-[#6C6C6C] mt-1">
              Please enter your current password and choose a new one
            </Text>
          </View>

          {/* Form Fields */}
          <View className="mt-4 mb-2">
            {/* Email Field */}
            <View>
              <FormField
                formHeader="Current Password"
                value={password.currentPassword}
                handleChangeText={(text) =>
                  setPassword((prev) => ({ ...prev, currentPassword: text }))
                }
                styles="mt-1 mb-4 w-full"
                placeholder="Enter your current password"
                type={"password"}
              />
            </View>

            {/* Contact Field */}
            <View>
              <FormField
                formHeader="New Password"
                value={password.newPassword}
                handleChangeText={(text) =>
                  setPassword((prev) => ({ ...prev, newPassword: text }))
                }
                styles="mt-1 mb-4 w-full"
                placeholder="Enter your new password"
                type={"password"}
              />
            </View>

            {/* Location Field */}
            <View>
              <FormField
                formHeader="Confirm New Password"
                value={password.confirmNewPassword}
                handleChangeText={(text) =>
                  setPassword((prev) => ({ ...prev, confirmNewPassword: text }))
                }
                styles="mt-1 w-full mb-10"
                placeholder="Confirm your new password"
                type={"password"}
              />
            </View>
          </View>

          {/* Save Button */}
          <CustomButton
            label="Save New Password"
            styles="w-full bg-[#161515] h-12 mb-2"
            textStyle="font-medium text-lg text-[#fff] p-2"
            onPress={handleSave}
          />
        </View>
      </View>
    </Container>
  );
};
export default changePassword;
