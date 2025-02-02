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

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const addSubject = () => {
  const [formData, setFormData] = useState({
    icon: null,
    courseCode: "",
    courseName: "",
    courseType: "major",
    section: "",
    f2fScheduleDay: "Monday",
    f2fScheduleTime: new Date(),
    room: "",
    onlineScheduleDay: "Monday",
    onlineScheduleTime: new Date(),
    instructor: "",
  });

  const f2fTextInputRef = useRef(null);
  const onlineTextInputRef = useRef(null);

  const formatTime = (date) =>
    date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

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

  const handleTimeChange = (key, event, selectedDate) => {
    if (event.type === "set") {
      // Blur the appropriate TextInput based on the key
      if (key === "f2fScheduleTime") {
        f2fTextInputRef.current?.blur();
      } else if (key === "onlineScheduleTime") {
        onlineTextInputRef.current?.blur();
      }
      if (selectedDate) {
        setFormData((prev) => ({
          ...prev,
          [key]: selectedDate,
        }));
        setShowDatePickers((prev) => ({
          ...prev,
          [key === "f2fScheduleTime" ? "f2fTime" : "onlineTime"]: false,
        }));
      }
    }
  };

  const handleSubmit = () => {
    console.log(formData);
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
        <FormField
          formHeader="Course Code"
          formHeaderStyle={"text-lg font-medium text-[#0A0A0A]"}
          value={formData.courseCode}
          placeholder="Enter course code"
          handleChangeText={(text) =>
            setFormData((prev) => ({ ...prev, courseCode: text }))
          }
          letterCase={"characters"}
          styles="mt-1 w-full bg-white mb-4"
          verify={false}
        />

        <FormField
          formHeader="Course Name"
          formHeaderStyle={"text-lg font-medium text-[#0A0A0A]"}
          value={formData.courseName}
          placeholder="Enter course name"
          handleChangeText={(text) =>
            setFormData((prev) => ({ ...prev, courseName: text }))
          }
          styles="mt-1 w-full bg-white mb-4"
          verify={false}
        />

        {/* Course Type Picker */}
        <Text className="text-lg font-medium text-[#0A0A0A] mb-1">
          Course Type
        </Text>
        <View className="border border-gray-300 rounded-md bg-white mb-4">
          <DropDown
            selectedValue={formData.courseType}
            onValueChange={(itemValue) =>
              setFormData((prev) => ({ ...prev, courseType: itemValue }))
            }
            noOfData={2}
            label={["Major", "Minor"]}
            value={["major", "minor"]}
          />
        </View>

        <FormField
          formHeader="Section"
          formHeaderStyle={"text-lg font-medium text-[#0A0A0A]"}
          value={formData.section}
          placeholder="Enter section"
          handleChangeText={(text) =>
            setFormData((prev) => ({ ...prev, section: text }))
          }
          styles="mt-1 w-full bg-white"
          verify={false}
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
            <View className="border border-gray-300 rounded-md bg-white">
              <DropDown
                selectedValue={formData.f2fScheduleDay}
                onValueChange={(itemValue) =>
                  setFormData((prev) => ({
                    ...prev,
                    f2fScheduleDay: itemValue,
                  }))
                }
                dataList={days}
              />
            </View>
          </View>
          <View className="flex-1">
            <FormField
              formHeader="Time"
              formHeaderStyle={"text-lg font-medium text-[#0A0A0A]"}
              value={formatTime(formData.f2fScheduleTime)} // Format Date object
              onFocus={() =>
                setShowDatePickers((prev) => ({ ...prev, f2fTime: true }))
              }
              placeholder="HH:MM"
              styles="mt-1 w-full bg-white"
              ref={f2fTextInputRef} // Reference for the TextInput
              verify={false}
            />
          </View>
        </View>

        <FormField
          formHeader="Room"
          formHeaderStyle={"text-lg font-medium text-[#0A0A0A]"}
          value={formData.room}
          handleChangeText={(text) =>
            setFormData((prev) => ({ ...prev, room: text }))
          }
          placeholder="Enter room number"
          styles="mt-1 w-full bg-white"
          verify={false}
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
            <View className="border border-gray-300 rounded-md bg-white">
              <DropDown
                selectedValue={formData.onlineScheduleDay}
                onValueChange={(itemValue) =>
                  setFormData((prev) => ({
                    ...prev,
                    onlineScheduleDay: itemValue,
                  }))
                }
                dataList={days}
              />
            </View>
          </View>
          <View className="flex-1">
            <FormField
              formHeader="Time"
              formHeaderStyle={"text-lg font-medium text-[#0A0A0A]"}
              value={formatTime(formData.onlineScheduleTime)} // Format Date object
              onFocus={() =>
                setShowDatePickers((prev) => ({ ...prev, onlineTime: true }))
              }
              placeholder="HH:MM"
              styles="mt-1 w-full bg-white"
              ref={onlineTextInputRef} // Reference for the TextInput
              verify={false}
            />
          </View>
        </View>
      </View>

      {/* Instructor */}
      <View className="mb-4 p-4 rounded-md bg-white">
        <FormField
          formHeader="Instructor"
          formHeaderStyle={"text-lg font-medium text-[#0A0A0A]"}
          value={formData.instructor}
          handleChangeText={(text) =>
            setFormData((prev) => ({ ...prev, instructor: text }))
          }
          placeholder="Enter instructor name"
          styles="mt-1 w-full bg-white"
          verify={false}
        />
      </View>

      {/* Submit Button */}
      <CustomButton
        label={"Create Subject"}
        styles={"rounded-md p-3 items-center bg-[#5CB88F] mb-5"}
        onPress={handleSubmit}
        textStyle={"font-extrabold text-lg"}
      />

      {showDatePickers.f2fTime && (
        <DateTimePicker
          value={formData.f2fScheduleTime}
          mode="time"
          display="default"
          onChange={(event, selectedDate) =>
            handleTimeChange("f2fScheduleTime", event, selectedDate)
          }
        />
      )}
      {showDatePickers.onlineTime && (
        <DateTimePicker
          value={formData.onlineScheduleTime}
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
