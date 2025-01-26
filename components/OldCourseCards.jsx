import { View, Text, Image } from "react-native";
import React from "react";
import Icons from "../constants/Icons";
import CustomButton from "./CustomButton";

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
    <View
      className={
        "border border-[#D9D9D9] bg-[#D9D9D9] rounded-lg w-[90%] p-4 absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%]"
      }
    >
      <View className={"mb-0"}>
        <Image
          source={courseIcon}
          className={"w-full h-52 rounded-md border border-slate-500"}
          style={{ resizeMode: "stretch" }}
        />
        <CustomButton
          icon={Icons.close}
          iconTint={"#FF0004"}
          styles={"absolute left-[91%] top-[-85%] w-7 h-7"}
          iconStyle={"w-7 h-7"}
          onPress={onPress}
        />
      </View>

      <View>
        <View className={"mb-1 flex-row"}>
          <Text className={"font-extrabold text-base text-[#0A0A0A] mr-2"}>
            Course Code:
          </Text>
          <Text className={"font-normal text-base text-[#0A0A0A] flex-1 pl-12"}>
            {`${courseCode}`}
          </Text>
        </View>
        <View className={"mb-1 flex-row"}>
          <Text className={"font-extrabold text-base text-[#0A0A0A] mr-2"}>
            Course Name:
          </Text>
          <Text className={"font-normal text-base text-[#0A0A0A] flex-1 pl-11"}>
            {`${courseName}`}
          </Text>
        </View>
        <View className={"mb-1 flex-row"}>
          <Text className={"font-extrabold text-base text-[#0A0A0A] mr-1"}>
            Course Type:
          </Text>
          <Text className={"font-normal text-base text-[#0A0A0A] flex-1 pl-14"}>
            {`${courseType}`}
          </Text>
        </View>
        <View className={"mb-[2px] flex-row"}>
          <Text className={"font-extrabold text-base text-[#0A0A0A]"}>
            Section:
          </Text>
          <Text
            className={"font-normal text-base text-[#0A0A0A] flex-1 pl-[85px]"}
          >
            {`${section}`}
          </Text>
        </View>
        <View className={"mb-[2px] flex-row"}>
          <Text className={"font-extrabold text-base text-[#0A0A0A]"}>
            F2F Schedule:
          </Text>
          <Text
            className={"font-normal text-base text-[#0A0A0A] flex-1 pl-[50px]"}
          >
            {`${f2fSchedule}`}
          </Text>
        </View>
        <View className={"mb-[2px] flex-row"}>
          <Text className={"font-extrabold text-base text-[#0A0A0A]"}>
            Room Designated:
          </Text>
          <Text
            className={"font-normal text-base text-[#0A0A0A] flex-1 pl-[20px]"}
          >
            {roomDesignated}
          </Text>
        </View>
        <View className={"mb-[2px] flex-row"}>
          <Text className={"font-extrabold text-base text-[#0A0A0A]"}>
            Online Schedule:
          </Text>
          <Text
            className={"font-normal text-base text-[#0A0A0A] flex-1 pl-[30px]"}
          >
            {`${onlineSchedule}`}
          </Text>
        </View>
        <View className={"flex-row"}>
          <Text className={"font-extrabold text-base text-[#0A0A0A]"}>
            Instructor:
          </Text>
          <Text
            className={"font-normal text-base text-[#0A0A0A] flex-1 pl-[70px]"}
          >
            {`${instructor}`}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CourseCard;
