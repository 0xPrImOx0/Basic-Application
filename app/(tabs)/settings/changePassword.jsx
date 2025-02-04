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
import { useForm, Controller } from "react-hook-form";
import { validatePassword } from "../../../utils/validateProfile";
import { yupResolver } from "@hookform/resolvers/yup";

const { width } = Dimensions.get("window");
const COVER_HEIGHT = width * 0.5625; // 16:9 aspect ratio

const changePassword = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
    trigger,
    watch,
  } = useForm({
    resolver: yupResolver(validatePassword),
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const confirmNewPassword = watch("confirmNewPassword");

  const profilePic = "https://via.placeholder.com/150";
  const coverPhoto = "https://via.placeholder.com/800x300";

  const onSubmit = (data) => {
    // Handle save logic here
    console.log("Save button clicked");
    console.log("Password Changes Saved:", data);
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
            {/* Current Password Field */}
            <View>
              <Controller
                name="currentPassword"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <FormField
                    formHeader="Current Password"
                    placeholder="Enter your current password"
                    type="password"
                    containerStyles={"mb-4"}
                    styles="mt-1"
                    error={errors.currentPassword?.message}
                    value={value}
                    onBlur={onBlur}
                    handleChangeText={onChange}
                    editable={!isSubmitting}
                    verify={false}
                  />
                )}
              />
            </View>

            {/* New Password Field */}
            <View>
              <Controller
                name="newPassword"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <FormField
                    formHeader="New Password"
                    placeholder="Enter your new password"
                    type="password"
                    containerStyles={"mb-4"}
                    styles="mt-1"
                    error={errors.newPassword?.message}
                    value={value}
                    onBlur={onBlur}
                    handleChangeText={(text) => {
                      onChange(text);
                      {
                        confirmNewPassword && trigger("confirmNewPassword");
                      }
                    }}
                    editable={!isSubmitting}
                    verify={false}
                  />
                )}
              />
            </View>

            {/* Confirm New Password Field */}
            <View className={"mb-8"}>
              <Controller
                name="confirmNewPassword"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <FormField
                    formHeader="Confirm New Password"
                    placeholder="Confirm your new password"
                    type="password"
                    containerStyles={"mb-4"}
                    styles="mt-1"
                    error={errors.confirmNewPassword?.message}
                    value={value}
                    onBlur={onBlur}
                    handleChangeText={onChange}
                    editable={!isSubmitting}
                    verify={false}
                  />
                )}
              />
            </View>
          </View>

          {/* Save Button */}
          <CustomButton
            label="Save New Password"
            styles="w-full bg-[#161515] h-12 mb-2"
            textStyle="font-medium text-lg text-[#fff] p-2"
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </View>
    </Container>
  );
};
export default changePassword;
