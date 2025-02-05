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
import useChangePassword from "../../../services/useChangePassword";
import { useAuth } from "../../../services/auth-provider";
import Toast from "react-native-toast-message";

const { width } = Dimensions.get("window");
const COVER_HEIGHT = width * 0.5625; // 16:9 aspect ratio

const changePassword = () => {
  const { session } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    trigger,
    watch,
    reset,
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
  const { changePasswordData, isLoading } = useChangePassword();
  const [errorComponent, setErrorComponent] = useState("");

  const [loadingText, setLoadingText] = useState("Save New Password");

  const confirmNewPassword = watch("confirmNewPassword");

  const profilePic = "https://via.placeholder.com/150";
  const coverPhoto = "https://via.placeholder.com/800x300";

  const onSubmit = async (data) => {
    try {
      // console.log("Full session object:", JSON.stringify(session, null, 2));
      // console.log("Session type:", typeof session);
      // console.log("Session keys:", Object.keys(session || {}));
      // console.log("Session user:", session?.user);
      // console.log("User Data:", data);

      if (!session) {
        Toast.show({
          type: "error",
          text1: "No active session found",
        });
        return;
      }

      const result = await changePasswordData({
        session,
        currentPassword: data.currentPassword,
        newPassword: data.confirmNewPassword,
      });

      {
        result.errorComponent && setErrorComponent("Password Incorrect!");
      }

      if (result.success) {
        Toast.show({
          type: "success",
          text1: "Password Changed Successfully!",
        });
        reset();
      } else {
        return Toast.show({
          type: "error",
          text1: result.error || "Failed to change password",
        });
      }
    } catch (err) {
      Toast.show({
        type: "error",
        text1: err.message || "An error occurred", // Use err.message instead of err directly
      });
    }
  };

  useEffect(() => {
    let dotIndex = 1;
    let interval;

    if (isLoading) {
      interval = setInterval(() => {
        setLoadingText(`Saving New Password${".".repeat(dotIndex)}`);
        dotIndex = dotIndex === 3 ? 1 : dotIndex + 1;
      }, 300); // Change dots every 300ms
    }

    // Cleanup when isLoading becomes false
    setLoadingText("Save New Password");
    return () => clearInterval(interval);
  }, [isLoading]);

  return (
    <Container bg={"#F9FAFB"} keyboardShouldPersistTaps="always">
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
                    error={errorComponent || errors.currentPassword?.message}
                    onFocus={() => setErrorComponent("")}
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
            label={loadingText}
            styles={`w-full bg-[#161515] h-12 mb-2 ${isLoading && "text-xl"}`}
            textStyle="font-medium text-lg text-[#fff] p-2"
            onPress={handleSubmit(onSubmit)}
            disabled={isLoading}
          />
        </View>
      </View>
    </Container>
  );
};
export default changePassword;
