import { Text, Image, TouchableOpacity, Keyboard } from "react-native";
import React from "react";

const CustomButton = ({
  children,
  label,
  icon,
  styles,
  iconTint,
  onPress,
  disabled,
  textStyle,
  iconStyle,
  extraIconStyle,
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
          className={`${iconStyle}`}
          resizeMode="contain"
          tintColor={iconTint}
          style={extraIconStyle}
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

      {children}
    </TouchableOpacity>
  );
};

export default CustomButton;
