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
      styles="border border-[#D9D9D9] w-[170px] rounded-[5px] p-[15px] flex-col mb-[25px]"
      onPress={onPress}
      disabled={disabled}
    >
      <View className="mb-[15px] rounded-[2px] items-center justify-center">
        <Image
          source={courseIcon}
          className="w-[140px] h-[100px] rounded-[2px] border border-slate-300"
        />
      </View>

      <View className="items-center">
        <View className={"mb-[5px]"}>
          <Text
            className={`font-bold text-[16px] text-center mb-[2px] ${
              courseType === "major"
                ? "text-[#FF0004]"
                : courseType === "minor"
                ? "text-[#00FF4C]"
                : ""
            }`}
          >
            {courseCode}
          </Text>
          <Text
            className={"font-normal text-[14px] text-[#0A0A0A] text-center"}
          >
            {courseName}
          </Text>
        </View>

        <View className={"justify-center"}>
          {courseSched1 !== "N/A N/A" ? (
            <Text
              className={`font-light italic text-[12px] text-[#6C6C6C] text-center ${
                courseSched2 ? "mb-[2px]" : ""
              }`}
            >
              {courseSched1}
            </Text>
          ) : (
            ""
          )}
          {courseSched2 ? (
            <Text
              className={
                "font-light italic text-[12px] text-[#6C6C6C] text-center"
              }
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
