import React, { useState, useCallback, useRef } from "react";
import {
  View,
  Text,
  Image,
  Platform,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import DropDown from "../../../components/DropDown";
import FormField from "../../../components/FormField";
import Container from "../../../components/Container";
import CustomButton from "../../../components/CustomButton";
import CustomRadioButton from "../../../components/CustomRadioButton";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import validateSubject from "../../../utils/validateSubject";

const days = [
  { id: "Sun", letter: "S", full: "Sunday" },
  { id: "Mon", letter: "M", full: "Monday" },
  { id: "Tue", letter: "T", full: "Tuesday" },
  { id: "Wed", letter: "W", full: "Wednesday" },
  { id: "Thu", letter: "Th", full: "Thursday" },
  { id: "Fri", letter: "F", full: "Friday" },
  { id: "Sat", letter: "S", full: "Saturday" },
];

const formatTime = (date) => {
  if (!(date instanceof Date)) {
    date = new Date();
  }
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

const addSubject = () => {
  const [formData, setFormData] = useState({
    icon: null,
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(validateSubject),
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: {
      icon: null,
      courseCode: "",
      courseName: "",
      courseType: "major",
      section: "",
      f2fScheduleDay: "Mon",
      f2fScheduleTime: formatTime(new Date()), // Will store as string
      room: "",
      onlineScheduleDay: "Mon",
      onlineScheduleTime: formatTime(new Date()), // Will store as string
      instructor: "",
    },
  });

  // Add these console logs to debug form state
  // console.log("Form errors:", errors);
  // console.log("Form is submitting:", isSubmitting);

  const f2fTextInputRef = useRef(null);
  const onlineTextInputRef = useRef(null);

  const [showDatePickers, setShowDatePickers] = useState({
    f2fTime: false,
    onlineTime: false,
  });

  const requestPermission = async () => {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Sorry",
          "We need camera roll permissions to make this work!"
        );
        return false;
      }
      return true;
    }
    return true;
  };

  const pickImage = useCallback(async () => {
    const hasPermission = await requestPermission();
    if (!hasPermission) return;

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setFormData((prev) => ({
          ...prev,
          icon: result.assets[0].uri,
        }));
      }
    } catch (error) {
      console.error("Image picker error:", error);
      Alert.alert("Error", "Unable to pick image");
    }
  }, []);

  const deleteIcon = () => {
    setFormData((prev) => ({
      ...prev,
      icon: null,
    }));
  };

  const handleTimeChange = useCallback(
    (key, event, selectedDate) => {
      if (event.type === "set" && selectedDate) {
        if (key === "f2fScheduleTime") {
          f2fTextInputRef.current?.blur();
        } else if (key === "onlineScheduleTime") {
          onlineTextInputRef.current?.blur();
        }

        // Store only the time string
        const timeString = formatTime(selectedDate);
        setValue(key, timeString);

        setShowDatePickers((prev) => ({
          ...prev,
          [key === "f2fScheduleTime" ? "f2fTime" : "onlineTime"]: false,
        }));
      } else {
        setShowDatePickers((prev) => ({
          ...prev,
          [key === "f2fScheduleTime" ? "f2fTime" : "onlineTime"]: false,
        }));
      }
    },
    [setValue]
  );

  const onSubmit = (data) => {
    try {
      // Add your submission logic here
      console.log("Form submitted:", data);
    } catch (error) {
      console.error("Submit error:", error);
      Alert.alert("Error", "Failed to submit form. Please try again.");
    }
  };

  return (
    <Container savStyles={"px-4 bg-[#d9d9d9]"} bg={"#d9d9d9"} pt={"15"}>
      {/* Icon Upload */}
      <View className="mb-4 py-3 bg-white rounded-md px-3">
        <Text className="text-lg font-medium text-[#0A0A0A] mb-2">
          Subject Icon
        </Text>
        {formData.icon ? (
          <View>
            <Image
              source={{ uri: formData.icon }}
              className="w-full h-64 rounded-md mt-2 mb-5"
              resizeMode="contain"
            />
            <View className="flex-row justify-between">
              <CustomButton
                label={"Change Icon"}
                styles={"bg-[#5CB88F] flex-1 mr-2 p-2"}
                onPress={pickImage}
              />

              <CustomButton
                label={"Delete Icon"}
                styles={"bg-[#FF0004] flex-1 p-2"}
                onPress={deleteIcon}
              />
            </View>
          </View>
        ) : (
          <CustomButton
            label={"Upload Icon"}
            styles={"bg-[#5CB88F] flex-1 p-2"}
            onPress={pickImage}
          />
        )}
      </View>

      {/* Course Details */}
      <View className="mb-4 rounded-md bg-white p-3">
        <Controller
          name="courseCode"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <FormField
              formHeader="Course Code"
              formHeaderStyle={"text-lg font-medium text-[#0A0A0A]"}
              containerStyles={"mb-6"}
              styles="mt-1 w-full bg-white"
              error={errors.courseCode?.message}
              value={value}
              placeholder="Enter course code"
              handleChangeText={onChange}
              letterCase={"characters"}
              verify={false}
              editable={!isSubmitting}
            />
          )}
        />

        <Controller
          name="courseName"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <FormField
              formHeader="Course Name"
              formHeaderStyle={"text-lg font-medium text-[#0A0A0A]"}
              containerStyles={"mb-6"}
              styles="mt-1 w-full bg-white"
              error={errors.courseName?.message}
              value={value}
              placeholder="Enter course name"
              handleChangeText={onChange}
              verify={false}
              editable={!isSubmitting}
            />
          )}
        />

        {/* Course Type Picker */}
        <Text className="text-lg font-medium text-[#0A0A0A] mb-1">
          Course Type
        </Text>
        <View className="border border-gray-300 rounded-md bg-white mb-4">
          <Controller
            name="courseType"
            control={control}
            render={({ field: { onChange, value } }) => (
              <DropDown
                selectedValue={value}
                onValueChange={onChange}
                noOfData={2}
                label={["Major", "Minor"]}
                value={["major", "minor"]}
              />
            )}
          />
        </View>

        <Controller
          name="section"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <FormField
              formHeader="Section"
              formHeaderStyle={"text-lg font-medium text-[#0A0A0A]"}
              containerStyles={"mb-1"}
              styles="mt-1 w-full bg-white"
              error={errors.section?.message}
              value={value}
              placeholder="Enter section"
              handleChangeText={onChange}
              verify={false}
              editable={!isSubmitting}
            />
          )}
        />
      </View>

      {/* F2F Schedule */}
      <View className="bg-white pb-4 rounded-md mb-4 p-3">
        <Text className="text-xl font-extrabold text-[#0A0A0A] mb-3">
          Face-to-Face Schedule
        </Text>
        <View className="flex-row justify-between mb-3">
          <View className="flex-1 mr-2">
            <Text className="text-lg font-medium text-[#0A0A0A] mb-1">Day</Text>
            <View className={"flex-row flex-1 justify-between items-center"}>
              <Controller
                name="f2fScheduleDay"
                control={control}
                render={({ field: { onChange, onBlur, value } }) =>
                  days.map((day) => (
                    <CustomRadioButton
                      key={day.full}
                      letter={day.letter}
                      selected={value === day.id}
                      onPress={() => onChange(day.id)} // Ensure the value updates
                    />
                  ))
                }
              />
            </View>
          </View>
          <View className="w-[35%]">
            <Controller
              name="f2fScheduleTime"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <FormField
                  formHeader="Time"
                  formHeaderStyle={"text-lg font-medium text-[#0A0A0A]"}
                  styles="mt-1 w-full bg-white"
                  error={errors.f2fScheduleTime?.message}
                  value={value}
                  placeholder="HH:MM"
                  handleChangeText={onChange}
                  onFocus={(e) => {
                    e.target.blur();
                    setShowDatePickers((prev) => ({ ...prev, f2fTime: true }));
                  }}
                  ref={f2fTextInputRef} // Reference for the TextInput
                  verify={false}
                  editable={!isSubmitting}
                />
              )}
            />
          </View>
        </View>

        <Controller
          name="room"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <FormField
              formHeader="Room"
              formHeaderStyle={"text-lg font-medium text-[#0A0A0A]"}
              styles="mt-1 w-full bg-white"
              error={errors.room?.message}
              value={value}
              placeholder="Enter room number"
              handleChangeText={onChange}
              verify={false}
              editable={!isSubmitting}
            />
          )}
        />
      </View>

      {/* Online Schedule */}
      <View className="bg-white p-4 rounded-md mb-4">
        <Text className="text-xl font-extrabold text-[#0A0A0A] mb-2">
          Online Schedule
        </Text>
        <View className="flex-row justify-between mb-3">
          <View className="flex-1 mr-2">
            <Text className="text-lg font-medium text-[#0A0A0A] mb-1">Day</Text>
            <View className={"flex-row flex-1 justify-between items-center"}>
              <Controller
                name="onlineScheduleDay"
                control={control}
                render={({ field: { onChange, onBlur, value } }) =>
                  days.map((day) => (
                    <CustomRadioButton
                      key={day.full}
                      letter={day.letter}
                      selected={value === day.id}
                      onPress={() => onChange(day.id)} // Ensure the value updates
                    />
                  ))
                }
              />
            </View>
          </View>
          <View className="w-[35%]">
            <Controller
              name="onlineScheduleTime"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <FormField
                  formHeader="Time"
                  formHeaderStyle={"text-lg font-medium text-[#0A0A0A]"}
                  styles="mt-1 w-full bg-white"
                  error={errors.onlineScheduleTime?.message}
                  value={value}
                  placeholder="HH:MM"
                  handleChangeText={onChange}
                  onFocus={(e) => {
                    e.target.blur();
                    setShowDatePickers((prev) => ({
                      ...prev,
                      onlineTime: true,
                    }));
                  }}
                  ref={onlineTextInputRef} // Reference for the TextInput
                  verify={false}
                  editable={!isSubmitting}
                />
              )}
            />
          </View>
        </View>
      </View>

      {/* Instructor */}
      <View className="mb-4 p-4 rounded-md bg-white">
        <Controller
          name="instructor"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <FormField
              formHeader="Instructor"
              formHeaderStyle={"text-lg font-medium text-[#0A0A0A]"}
              containerStyles={"mb-2"}
              styles="mt-1 w-full bg-white"
              error={errors.instructor?.message}
              value={value}
              placeholder="Enter instructor name"
              handleChangeText={onChange}
              verify={false}
              editable={!isSubmitting}
            />
          )}
        />
      </View>

      {/* Submit Button */}
      <CustomButton
        label={"Create Subject"}
        styles={"rounded-md p-3 items-center bg-[#5CB88F] mb-8 mt-4"}
        onPress={handleSubmit(onSubmit)}
        textStyle={"font-extrabold text-lg"}
      />

      {showDatePickers.f2fTime && (
        <DateTimePicker
          value={new Date()} // Use current date as base
          mode="time"
          display="default"
          onChange={(event, selectedDate) =>
            handleTimeChange("f2fScheduleTime", event, selectedDate)
          }
        />
      )}

      {showDatePickers.onlineTime && (
        <DateTimePicker
          value={new Date()} // Use current date as base
          mode="time"
          display="default"
          onChange={(event, selectedDate) =>
            handleTimeChange("onlineScheduleTime", event, selectedDate)
          }
        />
      )}
    </Container>
  );
};

export default addSubject;
