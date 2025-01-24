import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import CustomButton from "./CustomButton";
import Icons from "../constants/Icons";

const ShowMoreBox = ({
  children,
  label,
  fontStyle,
  subLabel,
  icon,
  imageStyle,
  arrowDirection = "bottom",
  styles,
  borderStyle,
  onClick,
  disabled,
  col,
}) => {
  const [rotate, setRotate] = useState("90deg");

  const handleRotation = () => {
    setRotate(rotate === "90deg" ? "270deg" : "90deg");
  };
  return (
    <View
      className={`p-[12px] rounded-[5px] border border-[#D9D9D9] my-[20px] ${borderStyle}`}
    >
      <CustomButton
        onPress={onClick || handleRotation}
        styles={"flex-col justify-between w-full item-center justify-center"}
      >
        <View className="flex-row justify-between w-full">
          <View className={"flex-row justify-between items-center"}>
            {icon ? (
              <Image
                source={icon}
                className={`w-[40px] h-[40px] mr-[18px] ${imageStyle}`}
              />
            ) : (
              ""
            )}

            {subLabel ? (
              <View>
                <Text
                  className={`font-medium text-[16px] text-[#0A0A0A] ${fontStyle}`}
                >
                  {label}
                </Text>
                <Text
                  className={"font-light italic text-[12px] text-[#6C6C6C]"}
                >
                  {subLabel}
                </Text>
              </View>
            ) : (
              <Text className={"font-medium text-[16px] text-[#0A0A0A]"}>
                {label}
              </Text>
            )}
          </View>

          {arrowDirection === "right" ? (
            <CustomButton
              icon={Icons.arrow}
              iconStyle="w-[30px] h-[30px]"
              styles=""
              onPress={onClick}
              disabled={disabled}
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
      </CustomButton>
    </View>
  );
};

export default ShowMoreBox;
