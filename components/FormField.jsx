import { View, TextInput, Text, Image } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import Icons from "../constants/Icons";
import CustomButton from "./CustomButton";

const FormField = ({
  value,
  formHeader,
  placeholder,
  handleChangeText,
  styles,
  error,
  letterCase = "none",
  onBlur,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <View className={`items-start`}>
      <View>
        <Text className={`font-bold text-[14px] text-[#0A0A0A]`}>
          {formHeader}
        </Text>
      </View>

      <View
        className={`border border-[#D9D9D9] w-[320px] h-[42px] rounded-[5px] ${
          error ? "border-[1px] border-[#F34336]" : "focus:border-[#3bf5c6]"
        } 
      ${
        placeholder === "Enter your Password" ||
        placeholder === "Confirm your Password"
          ? "flex-row"
          : ""
      } ${styles}`}
      >
        <TextInput
          className="text-[#0A0A0A] py-[10px] pl-[10px] text-[16px] flex-1 font-normal"
          value={value}
          placeholder={placeholder}
          placeholderTextColor={"#6C6C6C"}
          onChangeText={handleChangeText}
          autoCapitalize={letterCase}
          secureTextEntry={
            (placeholder === "Enter your Password" && !showPassword) ||
            (placeholder === "Confirm your Password" && !showConfirmPassword)
          }
          onBlur={onBlur}
        />

        {placeholder === "Enter your Password" ||
        placeholder === "Confirm your Password" ? (
          <CustomButton
            icon={
              showPassword || showConfirmPassword ? Icons.eye : Icons.eyeHide
            }
            onPress={() =>
              setShowPassword((prev) => !prev) ||
              setShowConfirmPassword((prev) => !prev)
            }
            styles={"mr-[15px] ml-[5px]"}
            iconTint={"#0A0A0A"}
          />
        ) : (
          ""
        )}
      </View>
    </View>
  );
};

export default FormField;
