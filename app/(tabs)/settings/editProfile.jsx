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
import { yupResolver } from "@hookform/resolvers/yup";
import { validateCredentials } from "../../../utils/validateProfile";

const { width } = Dimensions.get("window");
const COVER_HEIGHT = width * 0.5625; // 16:9 aspect ratio

const editProfile = () => {
  const [profileData, setProfileData] = useState({
    profilePic: "https://via.placeholder.com/150",
    coverPhoto: "https://via.placeholder.com/800x300",
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
    trigger,
    watch,
  } = useForm({
    resolver: yupResolver(validateCredentials),
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: {
      school: "",
      location: "",
      dob: "",
      email: "",
      contact: "",
    },
  });

  useEffect(() => {
    async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    };
  }, []);

  const pickImage = async (type) => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: type === "profile" ? [1, 1] : [16, 9],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        setProfileData((prev) => ({
          ...prev,
          [type === "profile" ? "profilePic" : "coverPhoto"]:
            result.assets[0].uri,
        }));
      }
    } catch (error) {
      console.error("Error picking image:", error);
      alert("Error picking image. Please try again.");
    }
  };

  const onSubmit = (data) => {
    // Handle save logic here
    console.log("Save button clicked");
    console.log("Profile data saved:", data, profileData);
  };

  return (
    <Container bg={"#F9FAFB"}>
      {/* Cover Photo Section */}
      <View className="relative">
        <Image
          source={{ uri: profileData.coverPhoto }}
          style={{ width: width, height: COVER_HEIGHT }}
          className="bg-gray-300"
          resizeMode="cover"
        />

        <CustomButton
          label={"Change Cover"}
          styles={`relative bottom-[15%] left-[72%] bg-black/50 px-2 py-2 rounded-lg w-28`}
          textStyle={"text-white text-sm font-medium w-full"}
          onPress={() => pickImage("cover")}
        />
      </View>

      <View style={{ paddingHorizontal: width * 0.04 }} className="-mt-32">
        {/* Profile Picture Section */}
        <View className="items-center mb-8">
          <CustomButton
            onPress={() => pickImage("profile")}
            styles={"relative"}
            icon={{ uri: profileData.profilePic }}
            extraIconStyle={{ width: width * 0.35, height: width * 0.35 }}
            iconStyle={"rounded-full bg-gray-200 border-4 border-white"}
            label="Edit"
            textStyle={
              "text-white text-sm font-medium absolute bottom-3 right-3 bg-gray-900 p-3 rounded-full shadow-xl"
            }
          />
        </View>

        {/* Form Container */}
        <View className="bg-white rounded-3xl p-6 shadow-sm mb-12">
          {/* Header */}
          <View className="mb-8">
            <Text className="text-2xl font-extrabold text-[#0A0A0A]">
              Edit Profile
            </Text>
            <Text className="text-base text-[#6C6C6C] mt-1">
              Update your profile information
            </Text>
          </View>

          {/* Form Fields */}
          <View>
            {/* School Field */}
            <View>
              <Controller
                name="school"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <FormField
                    formHeader={"School/University"}
                    placeholder="Enter your school/university"
                    containerStyles={"mb-4"}
                    styles="mt-1"
                    error={errors.school?.message}
                    value={value}
                    onBlur={onBlur}
                    handleChangeText={onChange}
                    editable={!isSubmitting}
                    verify={false}
                  />
                )}
              />
            </View>

            {/* Location Field */}
            <View>
              <Controller
                name="location"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <FormField
                    formHeader="Location"
                    placeholder="Enter your location"
                    containerStyles={"mb-4"}
                    styles="mt-1"
                    error={errors.location?.message}
                    value={value}
                    onBlur={onBlur}
                    handleChangeText={onChange}
                    editable={!isSubmitting}
                    verify={false}
                  />
                )}
              />
            </View>

            {/* Email Field */}
            <View>
              <Controller
                name="email"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <FormField
                    formHeader={"Email Address"}
                    placeholder={"Enter your Email"}
                    containerStyles={"mb-4"}
                    styles="mt-1"
                    keyboardType="email-address"
                    error={errors.email?.message}
                    value={value}
                    onBlur={onBlur}
                    handleChangeText={onChange}
                    editable={!isSubmitting}
                    verify={false}
                  />
                )}
              />
            </View>

            {/* Contact Field */}
            <View className="mb-8">
              <Controller
                name="contact"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <FormField
                    formHeader="Contact Number"
                    placeholder="Enter your contact number"
                    containerStyles={"mb-4"}
                    styles="mt-1"
                    keyboardType="phone-pad"
                    error={errors.contact?.message}
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
            label="Save Changes"
            styles="w-full bg-[#161515] h-12 mb-2"
            textStyle="font-medium text-lg text-[#fff] p-2"
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </View>
    </Container>
  );
};

export default editProfile;
