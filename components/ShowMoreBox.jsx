import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import CustomButton from "./CustomButton";
import Icons from "../constants/Icons";

const ShowMoreBox = ({
  children,
  label,
  icon,
  arrowDirection = "bottom",
  styles,
}) => {
  const [rotate, setRotate] = useState("90deg");

  const handleRotation = () => {
    setRotate(rotate === "90deg" ? "270deg" : "90deg");
  };
  return (
    <View
      className={"p-[12px] rounded-[5px] border border-[#D9D9D9] my-[20px]"}
    >
      <View className="flex-row justify-between">
        <View className={"flex-row justify-between items-center"}>
          {icon ? (
            <Image source={icon} className={"w-[40px] h-[40px] mr-[18px]"} />
          ) : (
            ""
          )}

          <Text className={"font-medium text-[16px] text-[#0A0A0A]"}>
            {label}
          </Text>
        </View>

        {arrowDirection === "right" ? (
          <CustomButton
            icon={Icons.arrow}
            iconStyle="w-[30px] h-[30px]"
            styles=""
          />
        ) : arrowDirection === "bottom" ? (
          <CustomButton
            icon={Icons.arrow}
            iconStyle="w-[30px] h-[30px]"
            extraIconStyle={{ transform: [{ rotate: rotate }] }}
            styles=""
            onPress={handleRotation}
          />
        ) : (
          ""
        )}
      </View>

      <View className={`${rotate === "90deg" ? "hidden" : ""} ${styles}`}>
        {children}
      </View>
    </View>
  );
};

export default ShowMoreBox;
