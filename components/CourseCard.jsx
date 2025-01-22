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
        "border border-[#D9D9D9] bg-[#D9D9D9] rounded-[5px] w-[400px] p-[10px] absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%]"
      }
    >
      <View className={"mb-[13px]"}>
        <Image
          source={courseIcon}
          className={"w-full h-[110px] rounded-[2px] border border-slate-500"}
          style={{ resizeMode: "stretch" }}
        />
        <CustomButton
          icon={Icons.close}
          iconTint={"#FF0004"}
          styles={"w-[15px] h-[15px] absolute left-[355px] top-[-100px]"}
          iconStyle={"w-[20px] h-[20px]"}
          onPress={onPress}
        />
      </View>

      <View>
        <View className={"mb-[2px] flex-row"}>
          <Text className={"font-extrabold text-[14px] text-[#0A0A0A]"}>
            Course Code:
          </Text>
          <Text
            className={
              "font-normal text-[14px] text-[#0A0A0A] flex-1 pl-[50px]"
            }
          >
            {`${courseCode}`}
          </Text>
        </View>
        <View className={"mb-[2px] flex-row"}>
          <Text className={"font-extrabold text-[14px] text-[#0A0A0A]"}>
            Course Name:
          </Text>
          <Text
            className={
              "font-normal text-[14px] text-[#0A0A0A] flex-1 pl-[45px]"
            }
          >
            {`${courseName}`}
          </Text>
        </View>
        <View className={"mb-[2px] flex-row"}>
          <Text className={"font-extrabold text-[14px] text-[#0A0A0A]"}>
            Course Type:
          </Text>
          <Text
            className={
              "font-normal text-[14px] text-[#0A0A0A] flex-1 pl-[55px]"
            }
          >
            {`${courseType}`}
          </Text>
        </View>
        <View className={"mb-[2px] flex-row"}>
          <Text className={"font-extrabold text-[14px] text-[#0A0A0A]"}>
            Section:
          </Text>
          <Text
            className={
              "font-normal text-[14px] text-[#0A0A0A] flex-1 pl-[85px]"
            }
          >
            {`${section}`}
          </Text>
        </View>
        <View className={"mb-[2px] flex-row"}>
          <Text className={"font-extrabold text-[14px] text-[#0A0A0A]"}>
            F2F Schedule:
          </Text>
          <Text
            className={
              "font-normal text-[14px] text-[#0A0A0A] flex-1 pl-[50px]"
            }
          >
            {`${f2fSchedule}`}
          </Text>
        </View>
        <View className={"mb-[2px] flex-row"}>
          <Text className={"font-extrabold text-[14px] text-[#0A0A0A]"}>
            Room Designated:
          </Text>
          <Text
            className={
              "font-normal text-[14px] text-[#0A0A0A] flex-1 pl-[20px]"
            }
          >
            {roomDesignated}
          </Text>
        </View>
        <View className={"mb-[2px] flex-row"}>
          <Text className={"font-extrabold text-[14px] text-[#0A0A0A]"}>
            Online Schedule:
          </Text>
          <Text
            className={
              "font-normal text-[14px] text-[#0A0A0A] flex-1 pl-[30px]"
            }
          >
            {`${onlineSchedule}`}
          </Text>
        </View>
        <View className={"flex-row"}>
          <Text className={"font-extrabold text-[14px] text-[#0A0A0A]"}>
            Instructor:
          </Text>
          <Text
            className={
              "font-normal text-[14px] text-[#0A0A0A] flex-1 pl-[70px]"
            }
          >
            {`${instructor}`}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CourseCard;
