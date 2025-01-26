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
    <View className={`p-3 rounded-md border border-[#D9D9D9] ${borderStyle}`}>
      <CustomButton
        onPress={onClick || handleRotation}
        styles={"flex-col justify-between w-full item-center justify-center"}
      >
        <View className="flex-row justify-between w-full">
          <View className={"flex-row justify-between items-center"}>
            {icon ? (
              <Image source={icon} className={`w-12 h-12 mr-3 ${imageStyle}`} />
            ) : (
              ""
            )}

            {subLabel ? (
              <View>
                <Text
                  className={`font-medium text-lg text-[#0A0A0A] ${fontStyle}`}
                >
                  {label}
                </Text>
                <Text className={"font-light italic text-sm text-[#6C6C6C]"}>
                  {subLabel}
                </Text>
              </View>
            ) : (
              <Text className={"font-medium text-lg text-[#0A0A0A]"}>
                {label}
              </Text>
            )}
          </View>

          {arrowDirection === "right" ? (
            <CustomButton
              icon={Icons.arrow}
              iconStyle="w-7 h-7"
              styles=""
              onPress={onClick}
              disabled={disabled}
            />
          ) : arrowDirection === "bottom" ? (
            <CustomButton
              icon={Icons.arrow}
              iconStyle="w-7 h-7"
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
