import { View, Text, Image } from "react-native";
import React from "react";
import CustomButton from "./CustomButton";

const SubjectCards = ({
  courseIcon,
  courseType,
  courseCode,
  courseName,
  courseSched1,
  courseSched2,
  onPress,
  disabled,
}) => {
  return (
    <CustomButton
      styles="border border-[#D9D9D9] w-full rounded-xl p-5 flex-col mb-8"
      onPress={onPress}
      disabled={disabled}
    >
      <View className="mb-4 items-center justify-center">
        <Image
          source={courseIcon}
          className="w-36 h-28 rounded-lg shadow-lg shadow-slate-500 border border-slate-500"
        />
      </View>

      <View className="items-center">
        <View className={"mb-5"}>
          <Text
            className={`font-bold text-xl text-center mb-1 ${
              courseType === "major"
                ? "text-[#FF0004]"
                : courseType === "minor"
                ? "text-[#00FF4C]"
                : ""
            }`}
          >
            {courseCode}
          </Text>
          <Text className={"font-normal text-base text-[#0A0A0A] text-center"}>
            {courseName}
          </Text>
        </View>

        <View className={"justify-center"}>
          {courseSched1 !== "N/A N/A" ? (
            <Text
              className={`font-light italic text-sm text-[#6C6C6C] text-center ${
                courseSched2 ? "mb-1" : ""
              }`}
            >
              {courseSched1}
            </Text>
          ) : (
            ""
          )}
          {courseSched2 ? (
            <Text
              className={"font-light italic text-sm text-[#6C6C6C] text-center"}
            >
              {courseSched2}
            </Text>
          ) : (
            ""
          )}
        </View>
      </View>
    </CustomButton>
  );
};

export default SubjectCards;
