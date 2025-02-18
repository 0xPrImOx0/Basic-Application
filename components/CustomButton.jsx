import { Text, Image, TouchableOpacity, Keyboard } from "react-native";
import React from "react";
import { AdvancedImage } from "cloudinary-react-native";

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
  advancedIcon,
  onLoad, //used For set Loading in AdvancedImage COmponent
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

      {advancedIcon ? (
        <AdvancedImage
          cldImg={advancedIcon}
          className={`${iconStyle}`}
          style={extraIconStyle}
          onLoad={onLoad}
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
