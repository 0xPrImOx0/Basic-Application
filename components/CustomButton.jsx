import { Text, Image, TouchableOpacity, Keyboard } from "react-native";
import React from "react";

const CustomButton = ({
  label,
  icon,
  styles,
  iconTint,
  onPress,
  disabled,
  textStyle,
  iconStyle,
  onPressOut,
}) => {
  return (
    <TouchableOpacity
      className={`items-center justify-center flex-row relative rounded-md ${styles}`}
      activeOpacity={0.7}
      onPress={onPress}
      disabled={disabled}
      onPressOut={() => Keyboard.dismiss()}
    >
      {icon ? (
        <Image
          source={icon}
          className={`h-7 w-7 ${iconStyle}`}
          resizeMode="contain"
          tintColor={iconTint}
        />
      ) : (
        ""
      )}

      {label ? (
        <Text className={`text-base font-bold text-center ${textStyle}`}>
          {label}
        </Text>
      ) : (
        ""
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
