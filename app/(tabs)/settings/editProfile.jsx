import React, { useState, useEffect, useRef, useCallback } from "react";
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
import DateTimePicker from "@react-native-community/datetimepicker";
import { useAuth } from "../../../services/auth-provider";
import useUpdateProfile from "../../../services/useUpdateProfile";
import useFetchData from "../../../services/useFetchData";
import Toast from "react-native-toast-message";
import CustomLoader from "../../../components/CustomLoader";
import { ref } from "yup";

const { width } = Dimensions.get("window");
const COVER_HEIGHT = width * 0.5625; // 16:9 aspect ratio
const months = [
  { words: "January", number: "1" },
  { words: "February", number: "2" },
  { words: "March", number: "3" },
  { words: "April", number: "4" },
  { words: "May", number: "5" },
  { words: "June", number: "6" },
  { words: "July", number: "7" },
  { words: "August", number: "8" },
  { words: "September", number: "9" },
  { words: "October", number: "10" },
  { words: "November", number: "11" },
  { words: "December", number: "12" },
];

const formatDate = (date) => {
  if (!(date instanceof Date)) {
    date = new Date();
  }

  const month = months[date.getMonth()].words;
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month} ${day}, ${year}`;
};

const formatToNumericalDate = (date) => {
  const formatDate = date.split(/[\s,]+/); // ["January", "1", "2022"]

  const month = months.find((m) => m.words === formatDate[0]).number;
  const day = formatDate[1];
  const year = formatDate[2];

  return `${year}-${month}-${day}`; // Returns YYYY-MM-DD
};

const formatToWordDate = (dateStr) => {
  if (!dateStr) return "";

  try {
    // Convert the date string to a Date object
    const date = new Date(dateStr);

    // Get the components
    const year = date.getFullYear();
    const month = months[date.getMonth()].words;
    const day = date.getDate();

    return `${month} ${day}, ${year}`;
  } catch (error) {
    console.error("Error formatting date:", error, "for date:", dateStr);
    return dateStr; // Return original if formatting fails
  }
};

const editProfile = () => {
  const { session } = useAuth();

  const [isDobDirty, setIsDobDirty] = useState(true);
  const [profileData, setProfileData] = useState({
    profilePic: "https://via.placeholder.com/150",
    coverPhoto: "https://via.placeholder.com/800x300",
  });

  const { changeProfileInfo, isLoading } = useUpdateProfile();
  const [errorComponent, setErrorComponent] = useState("");

  const { useFetchProfileInfo, isLoading: loading } = useFetchData();

  const [loadingText, setLoadingText] = useState("Save Changes");
  const dobTextInputRef = useRef(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [isProfileDirty, setIsProfileDirty] = useState(false);
  const [isCoverDirty, setIsCoverDirty] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty, dirtyFields },
    setValue,
    trigger,
    watch,
    reset,
  } = useForm({
    resolver: yupResolver(validateCredentials),
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: {
      school: "",
      location: "",
      dob: isDobDirty || formatDate(new Date()),
      email: "",
      contact: "",
    },
  });

  const handleDateChange = useCallback(
    (key, event, selectedDate) => {
      if (event.type === "set" && selectedDate) {
        dobTextInputRef.current?.blur();

        // Store only the time string
        const dateString = formatDate(selectedDate);
        setValue(key, dateString, {
          shouldDirty: true,
        });

        setShowDatePicker(false);
      } else {
        setShowDatePicker(false);
      }
    },
    [setValue]
  );

  // Handle permissions
  useEffect(() => {
    const requestPermissions = async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    };

    requestPermissions();
  }, []);

  // Handle profile fetching
  useEffect(() => {
    const fetchProfile = async () => {
      const { data } = await useFetchProfileInfo({ session });
      console.log("DATA RECEIVED HERE IN ASYNC:", data);

      setValue("school", data.university);
      setValue("location", data.city);
      setValue("dob", formatToWordDate(data.dob));
      setValue("email", data.email);
      setValue("contact", data.phone_number);
    };

    fetchProfile();
  }, [session, refresh]); // Add session as a dependency

  const pickImage = async (type) => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: type === "profile" ? [1, 1] : [16, 9],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        // const img = result.assets[0];

        // // Get base64 string
        // const base64 = await FileSystem.readAsStringAsync(img.uri, {
        //   encoding: "base64",
        // });

        // // Get file extension and MIME type
        // const fileExtension = img.uri.split(".").pop();
        // const contentType = `image/${fileExtension}`;
        // const filePath = `${session?.user.id}/${Date.now()}.${fileExtension}`;

        // const { data, error } = await supabase.storage
        //   .from("users")
        //   .upload(result.assets[0].uri, {
        //     cacheControl: "3600",
        //     upsert: false,
        //   });

        setProfileData((prev) => ({
          ...prev,
          [type === "profile" ? "profilePic" : "coverPhoto"]:
            result.assets[0].uri,
        }));

        {
          type === "profile" ? setIsProfileDirty(true) : setIsCoverDirty(true);
        }
      }
    } catch (error) {
      console.error("Error picking image:", error);
      alert("Error picking image. Please try again.");
    }
  };

  const onSubmit = async (data) => {
    // Handle save logic here
    const formatDate = formatToNumericalDate(data.dob);

    console.log("Save button clicked");
    console.log("date of birth formatted", formatDate);
    console.log("Profile data saved:", data, profileData);
    console.log("Session provided:", session);

    try {
      const result = await changeProfileInfo({
        session,
        formData: data,
        dob: formatDate,
      });

      {
        result.errorComponent && setErrorComponent("Password Incorrect!");
      }

      if (result.success) {
        Toast.show({
          type: "success",
          text1: "Profile Information Updated!",
        });
        reset();
      } else {
        return Toast.show({
          type: "error",
          text1: result.error || "Failed to Update Profile Information!",
        });
      }
    } catch (err) {
      Toast.show({
        type: "error",
        text1: err.message || "An error occurred", // Use err.message instead of err directly
      });
    } finally {
      console.log("DONE PROCESSING");
      setRefresh(!refresh);
    }
  };

  useEffect(() => {
    let dotIndex = 1;
    let interval;

    if (isLoading) {
      interval = setInterval(() => {
        setLoadingText(`Saving Changes${".".repeat(dotIndex)}`);
        dotIndex = dotIndex === 3 ? 1 : dotIndex + 1;
      }, 300); // Change dots every 300ms
    }

    // Cleanup when isLoading becomes false
    setLoadingText("Save Changes");
    return () => clearInterval(interval);
  }, [isLoading]);

  console.log(isDirty);
  console.log(dirtyFields);

  return (
    <Container bg={"#F9FAFB"}>
      <CustomLoader visible={loading} message="Fetching Data" />

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
                    letterCase="words"
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
                    letterCase="words"
                    value={value}
                    onBlur={onBlur}
                    handleChangeText={onChange}
                    editable={!isSubmitting}
                    verify={false}
                  />
                )}
              />
            </View>

            {/* Date of Birth Field */}
            <View>
              <Controller
                name="dob"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <FormField
                    formHeader="Date of Birth"
                    placeholder={"MM:DD:YYYY"}
                    containerStyles={"mb-4"}
                    styles="mt-1"
                    error={errors.dob?.message}
                    value={value}
                    handleChangeText={onChange}
                    onFocus={(e) => {
                      e.target.blur();
                      setIsDobDirty(false);
                      setShowDatePicker(true);
                    }}
                    ref={dobTextInputRef} // Reference for the TextInput
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
                    type="password"
                    containerStyles={"mb-4"}
                    styles="mt-1"
                    keyboardType="email-address"
                    error={errorComponent || errors.email?.message}
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
            label={loadingText}
            styles={`w-full bg-[#161515] h-12 mb-2 ${isLoading && "text-xl"}`}
            textStyle="font-medium text-lg text-[#fff] p-2"
            onPress={() => {
              console.log("Dirty Fields:", dirtyFields);

              Object.keys(dirtyFields).length > 0
                ? handleSubmit(onSubmit)() // Note the extra () to execute handleSubmit
                : Toast.show({
                    type: "error",
                    text1: "No Data Changed!",
                    text2:
                      "Please change data in input fields before submitting",
                  });
            }}
            disabled={isLoading}
          />
        </View>
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={new Date()} // Use current date as base
          mode="date"
          display="default"
          onChange={(event, selectedDate) =>
            handleDateChange("dob", event, selectedDate)
          }
          maximumDate={new Date()}
          minimumDate={new Date(1950, 0, 1)}
        />
      )}
    </Container>
  );
};

export default editProfile;
