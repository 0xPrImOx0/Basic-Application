import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Platform,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";

const WEEKDAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const SubjectViewForm = () => {
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
  };

  const handleSubmit = () => {
    console.log(formData);
  };

  return (
    <View className="flex-1 p-4 bg-gray-100">
      <ScrollView keyboardShouldPersistTaps="handled">
        {/* Icon Upload */}
        <View className="mb-4">
          <Text className="text-lg font-bold text-gray-800 mb-2">
            Subject Icon
          </Text>
          {formData.icon ? (
            <View>
              <Image
                source={{ uri: formData.icon }}
                className="w-full h-64 rounded-md mb-2"
                resizeMode="contain"
              />
              <View className="flex-row justify-between">
                <TouchableOpacity
                  onPress={pickImage}
                  className="bg-blue-500 flex-1 mr-2 p-2 rounded-md"
                >
                  <Text className="text-white text-center">Change Icon</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={deleteIcon}
                  className="bg-red-500 flex-1 p-2 rounded-md"
                >
                  <Text className="text-white text-center">Delete Icon</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <TouchableOpacity
              onPress={pickImage}
              className="bg-blue-500 p-2 rounded-md"
            >
              <Text className="text-white text-center">Upload Icon</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Course Details */}
        <View className="mb-4">
          <Text className="text-sm font-medium text-gray-700 mb-1">
            Course Code
          </Text>
          <TextInput
            className="border border-gray-300 rounded-md p-2 mb-3 bg-white"
            value={formData.courseCode}
            onChangeText={(text) =>
              setFormData((prev) => ({ ...prev, courseCode: text }))
            }
            placeholder="Enter course code"
          />

          <Text className="text-sm font-medium text-gray-700 mb-1">
            Course Na me
          </Text>
          <TextInput
            className="border border-gray-300 rounded-md p-2 mb-3 bg-white"
            value={formData.courseName}
            onChangeText={(text) =>
              setFormData((prev) => ({ ...prev, courseName: text }))
            }
            placeholder="Enter course name"
          />

          {/* Course Type Picker */}
          <Text className="text-sm font-medium text-gray-700 mb-1">
            Course Type
          </Text>
          <View className="border border-gray-300 rounded-md bg-white">
            <Picker
              selectedValue={formData.courseType}
              onValueChange={(itemValue) =>
                setFormData((prev) => ({ ...prev, courseType: itemValue }))
              }
            >
              <Picker.Item label="Major" value="major" />
              <Picker.Item label="Minor" value="minor" />
            </Picker>
          </View>

          <Text className="text-sm font-medium text-gray-700 mb-1">
            Section
          </Text>
          <TextInput
            className="border border-gray-300 rounded-md p-2 mb-3 bg-white"
            value={formData.section}
            onChangeText={(text) =>
              setFormData((prev) => ({ ...prev, section: text }))
            }
            placeholder="Enter section"
          />
        </View>

        {/* F2F Schedule */}
        <View className="bg-white p-4 rounded-md mb-4">
          <Text className="text-lg font-bold text-gray-800 mb-2">
            Face-to-Face Schedule
          </Text>
          <View className="flex-row justify-between mb-3">
            <View className="flex-1 mr-2">
              <Text className="text-sm font-medium text-gray-700 mb-1">
                Day
              </Text>
              <View className="border border-gray-300 rounded-md bg-white">
                <Picker
                  selectedValue={formData.f2fScheduleDay}
                  onValueChange={(itemValue) =>
                    setFormData((prev) => ({
                      ...prev,
                      f2fScheduleDay: itemValue,
                    }))
                  }
                >
                  {WEEKDAYS.map((day) => (
                    <Picker.Item key={day} label={day} value={day} />
                  ))}
                </Picker>
              </View>
            </View>
            <View className="flex-1">
              <Text className="text-sm font-medium text-gray-700 mb-1">
                Time
              </Text>
              <TextInput
                className="border border-gray-300 rounded-md p-2 bg-white flex-1"
                value={formatTime(formData.f2fScheduleTime)} // Format Date object
                onFocus={() =>
                  setShowDatePickers((prev) => ({ ...prev, f2fTime: true }))
                }
                placeholder="HH:MM"
              />
            </View>
          </View>

          <Text className="text-sm font-medium text-gray-700 mb-1">Room</Text>
          <TextInput
            className="border border-gray-300 rounded-md p-2 mb-3 bg-white"
            value={formData.room}
            onChangeText={(text) =>
              setFormData((prev) => ({ ...prev, room: text }))
            }
            placeholder="Enter room number"
          />
        </View>

        {/* Online Schedule */}
        <View className="bg-white p-4 rounded-md mb-4">
          <Text className="text-lg font-bold text-gray-800 mb-2">
            Online Schedule
          </Text>
          <View className="flex-row justify-between mb-3">
            <View className="flex-1 mr-2">
              <Text className="text-sm font-medium text-gray-700 mb-1">
                Day
              </Text>
              <View className="border border-gray-300 rounded-md bg-white">
                <Picker
                  selectedValue={formData.onlineScheduleDay}
                  onValueChange={(itemValue) =>
                    setFormData((prev) => ({
                      ...prev,
                      onlineScheduleDay: itemValue,
                    }))
                  }
                >
                  {WEEKDAYS.map((day) => (
                    <Picker.Item key={day} label={day} value={day} />
                  ))}
                </Picker>
              </View>
            </View>
            <View className="flex-1">
              <Text className="text-sm font-medium text-gray-700 mb-1">
                Time
              </Text>
              <TextInput
                className="border border-gray-300 rounded-md p-2 bg-white"
                value={formatTime(formData.onlineScheduleTime)} // Format Date object
                onFocus={() =>
                  setShowDatePickers((prev) => ({ ...prev, onlineTime: true }))
                }
                placeholder="HH:MM"
              />
            </View>
          </View>
        </View>

        {/* Instructor */}
        <View className="mb-4">
          <Text className="text-sm font-medium text-gray-700 mb-1">
            Instructor
          </Text>
          <TextInput
            className="border border-gray-300 rounded-md p-2 mb-3 bg-white"
            value={formData.instructor}
            onChangeText={(text) =>
              setFormData((prev) => ({ ...prev, instructor: text }))
            }
            placeholder="Enter instructor name"
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          onPress={handleSubmit}
          className="bg-blue-600 rounded-md p-3 items-center"
        >
          <Text className="text-white font-bold">Create Subject</Text>
        </TouchableOpacity>

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
      </ScrollView>
    </View>
  );
};

export default SubjectViewForm;
