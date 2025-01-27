import { View, Text, Image } from "react-native";
import React from "react";

const PersonalDetails = ({ icon, label }) => {
  return (
    <View className={"flex-row justify-start"}>
      <Image source={icon} className={"w-7 h-7 mr-2.5"} />
      <Text className={"font-normal text-lg text-[#0A0A0A] text-wrap flex-1"}>
        {label}
      </Text>
    </View>
  );
};

export default PersonalDetails;
