import { View, TextInput, Text, Image } from "react-native";
import React, { useState, forwardRef } from "react";
import Icons from "../constants/Icons";
import CustomButton from "./CustomButton";

const FormField = forwardRef(
  (
    {
      containerStyles,
      formHeaderStyle,
      formHeader,
      value,
      placeholder,
      handleChangeText,
      styles,
      error,
      letterCase = "none",
      onBlur,
      onFocus,
      keyboardType,
      type,
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
      <View className={`items-start ${containerStyles}`}>
        <View>
          <Text
            className={`font-bold text-base text-[#0A0A0A] ${formHeaderStyle}`}
          >
            {formHeader}
          </Text>
        </View>

        <View
          className={`border border-[#D9D9D9] w-full h-12 rounded-md ${
            error ? "border-2 border-[#F34336]" : "focus:border-[#3bf5c6]"
          } 
          ${
            placeholder === "Enter your Password" ||
            placeholder === "Confirm your Password" ||
            type === "password"
              ? "flex-row"
              : ""
          } ${styles}`}
        >
          <TextInput
            className="text-[#0A0A0A] py-3 pl-3 text-lg flex-1 font-normal"
            value={value}
            placeholder={placeholder}
            placeholderTextColor={"#6C6C6C"}
            onChangeText={handleChangeText}
            autoCapitalize={letterCase}
            keyboardType={keyboardType}
            secureTextEntry={
              ((placeholder === "Enter your Password" || type === "password") &&
                !showPassword) ||
              ((placeholder === "Confirm your Password" ||
                type === "password") &&
                !showConfirmPassword)
            }
            onBlur={onBlur}
            onFocus={onFocus}
            ref={ref}
          />

          {placeholder === "Enter your Password" ||
          placeholder === "Confirm your Password" ||
          type === "password" ? (
            <CustomButton
              icon={
                showPassword || showConfirmPassword ? Icons.eye : Icons.eyeHide
              }
              onPress={() =>
                setShowPassword((prev) => !prev) ||
                setShowConfirmPassword((prev) => !prev)
              }
              styles={"mr-4 ml-1.5"}
              iconTint={"#0A0A0A"}
              iconStyle={"w-7 h-7"}
            />
          ) : (
            ""
          )}
        </View>
      </View>
    );
  }
);

export default FormField;
