import { View, Text, Image } from "react-native";
import React from "react";

const PersonalDetails = ({ icon, label }) => {
  return (
    <View className={"flex-row justify-start"}>
      <Image source={icon} className={"w-[21px] h-[21px] mr-[8px]"} />
      <Text
        className={"font-normal text-[16px] text-[#0A0A0A] text-wrap flex-1"}
      >
        {label}
      </Text>
    </View>
  );
};

export default PersonalDetails;
