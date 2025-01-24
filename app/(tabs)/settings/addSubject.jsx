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

const addSubject = () => {
  const [formData, setFormData] = useState({
    icon: null,
    courseCode: "",
    courseName: "",
    courseType: "major",
    section: "",
    f2fScheduleDate: new Date(),
    f2fScheduleTime: new Date(),
    room: "",
    onlineScheduleDate: new Date(),
    onlineScheduleTime: new Date(),
    instructor: "",
  });

  const [showDatePickers, setShowDatePickers] = useState({
    f2fDate: false,
    f2fTime: false,
    onlineDate: false,
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

  const handleDateChange = (type, event, selectedDate) => {
    if (event.type === "set") {
      const currentDate = selectedDate || formData[type];
      setShowDatePickers({
        f2fDate: false,
        f2fTime: false,
        onlineDate: false,
        onlineTime: false,
      });
      setFormData((prev) => ({ ...prev, [type]: currentDate }));
    } else {
      setShowDatePickers({
        f2fDate: false,
        f2fTime: false,
        onlineDate: false,
        onlineTime: false,
      });
    }
  };

  const handleSubmit = () => {
    console.log(formData);
    // Add submission logic
  };

  return (
    <View className="flex-1 p-4 bg-gray-100">
      <ScrollView keyboardShouldPersistTaps="handled">
        {/* Icon Upload */}
        <View className="mb-4">
          <Text className="text-lg font-bold text-gray-800 mb-2">
            Subject Icon
          </Text>
          {formData.icon && (
            <Image
              source={{ uri: formData.icon }}
              className="w-full h-64"
              resizeMode="contain"
            />
          )}
          <TouchableOpacity
            onPress={pickImage}
            className="bg-blue-500 p-2 rounded-md mt-2"
          >
            <Text className="text-white text-center">Upload Icon</Text>
          </TouchableOpacity>
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
            Course Name
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
                Date
              </Text>
              <TouchableOpacity
                onPress={() =>
                  setShowDatePickers((prev) => ({ ...prev, f2fDate: true }))
                }
                className="border border-gray-300 p-2 rounded-md"
              >
                <Text>{formData.f2fScheduleDate.toLocaleDateString()}</Text>
              </TouchableOpacity>
            </View>
            <View className="flex-1">
              <Text className="text-sm font-medium text-gray-700 mb-1">
                Time
              </Text>
              <TouchableOpacity
                onPress={() =>
                  setShowDatePickers((prev) => ({ ...prev, f2fTime: true }))
                }
                className="border border-gray-300 p-2 rounded-md"
              >
                <Text>{formData.f2fScheduleTime.toLocaleTimeString()}</Text>
              </TouchableOpacity>
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
                Date
              </Text>
              <TouchableOpacity
                onPress={() =>
                  setShowDatePickers((prev) => ({ ...prev, onlineDate: true }))
                }
                className="border border-gray-300 p-2 rounded-md"
              >
                <Text>{formData.onlineScheduleDate.toLocaleDateString()}</Text>
              </TouchableOpacity>
            </View>
            <View className="flex-1">
              <Text className="text-sm font-medium text-gray-700 mb-1">
                Time
              </Text>
              <TouchableOpacity
                onPress={() =>
                  setShowDatePickers((prev) => ({ ...prev, onlineTime: true }))
                }
                className="border border-gray-300 p-2 rounded-md"
              >
                <Text>{formData.onlineScheduleTime.toLocaleTimeString()}</Text>
              </TouchableOpacity>
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

        {/* Date Pickers */}
        {showDatePickers.f2fDate && (
          <DateTimePicker
            value={formData.f2fScheduleDate}
            mode="date"
            display="default"
            onChange={(event, selectedDate) =>
              handleDateChange("f2fScheduleDate", event, selectedDate)
            }
          />
        )}
        {showDatePickers.f2fTime && (
          <DateTimePicker
            value={formData.f2fScheduleTime}
            mode="time"
            display="default"
            onChange={(event, selectedDate) =>
              handleDateChange("f2fScheduleTime", event, selectedDate)
            }
          />
        )}
        {showDatePickers.onlineDate && (
          <DateTimePicker
            value={formData.onlineScheduleDate}
            mode="date"
            display="default"
            onChange={(event, selectedDate) =>
              handleDateChange("onlineScheduleDate", event, selectedDate)
            }
          />
        )}
        {showDatePickers.onlineTime && (
          <DateTimePicker
            value={formData.onlineScheduleTime}
            mode="time"
            display="default"
            onChange={(event, selectedDate) =>
              handleDateChange("onlineScheduleTime", event, selectedDate)
            }
          />
        )}
      </ScrollView>
    </View>
  );
};

export default addSubject;
