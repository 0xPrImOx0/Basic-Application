import React from "react";
import { View, Text, TouchableOpacity, Image, Dimensions } from "react-native";
import CustomButton from "./CustomButton";
import Icons from "../constants/Icons";

// Get screen dimensions for responsive design
const { width: SCREEN_WIDTH } = Dimensions.get("window");

const CourseCard = ({
  courseIcon,
  courseCode,
  courseName,
  courseType,
  section,
  f2fSchedule,
  roomDesignated,
  onlineSchedule,
  instructor,
  onPress,
}) => {
  return (
    <View className="absolute top-0 left-0 right-0 bottom-0 justify-center items-center bg-black/10">
      <View
        className="w-[90%] bg-white rounded-2xl shadow-lg shadow-black/20 overflow-hidden"
        style={{ width: SCREEN_WIDTH * 0.9 }}
      >
        {/* Large Centered Icon */}
        <View
          className="self-center justify-center items-center bg-gray-100 rounded-b-2xl relative"
          style={{
            width: SCREEN_WIDTH * 0.5,
            height: SCREEN_WIDTH * 0.5,
          }}
        >
          {courseIcon ? (
            <Image
              source={courseIcon}
              className="w-[80%] h-[80%] rounded-2xl"
              resizeMode="cover"
            />
          ) : (
            <View className="w-[80%] h-[80%] bg-gray-200 rounded-2xl justify-center items-center">
              <Text className="text-4xl font-bold text-gray-600">
                {courseCode.substring(0, 2)}
              </Text>
            </View>
          )}

          {/* Close Button */}
          <CustomButton
            icon={Icons.close}
            iconTint={"#FF0004"}
            styles={"absolute left-[75%] -top-[75%] w-7 h-7"}
            iconStyle={"w-7 h-7"}
            onPress={onPress}
          />
        </View>

        {/* Course Details Container */}
        <View className="p-5">
          <View className="items-center mb-5 pb-4 border-b border-gray-200">
            <Text className="text-2xl font-bold text-gray-800 mb-2">
              {courseCode}
            </Text>
            <Text
              className="text-xl text-gray-600 text-center"
              numberOfLines={2}
            >
              {courseName}
            </Text>
          </View>

          {/* Detailed Information Grid */}
          <View>
            {[
              {
                label: "Course Type",
                value: courseType.charAt(0).toUpperCase() + courseType.slice(1),
              },
              { label: "Section", value: section },
              { label: "F2F Schedule", value: f2fSchedule },
              { label: "Room", value: roomDesignated },
              { label: "Online Schedule", value: onlineSchedule },
              { label: "Instructor", value: instructor },
            ].map((item, index) => (
              <View
                key={item.label}
                className={`flex-row justify-between py-3 ${
                  index < 20 ? "border-b border-gray-100" : ""
                }`}
              >
                <Text className="text-base text-gray-500">{item.label}</Text>
                <Text className="text-lg text-gray-800 font-semibold text-right flex-1">
                  {item.value}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

export default CourseCard;
