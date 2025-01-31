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
      inputMode,
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
      <View className={`items-start ${containerStyles}`}>
        <View className={"flex-row justify-between w-full"}>
          <Text
            className={`font-bold text-base text-[#0A0A0A] ${formHeaderStyle}`}
          >
            {formHeader}
          </Text>
          {(value || error) && (
            <Image
              source={error ? Icons.x : Icons.check}
              className={"h-4 w-4 self-center"}
            />
          )}
        </View>

        <View
          className={`border border-[#D9D9D9] w-full h-12 rounded-md ${
            error
              ? "border-[#f8877f] bg-[#fdc4c438]"
              : value
              ? "border-[#3bf5c6] bg-[#d3f7ee3a]"
              : "border-[#D9D9D9]"
          } 
          ${type === "password" ? "flex-row" : ""} ${styles}`}
        >
          <TextInput
            className="text-[#0A0A0A] py-3 pl-3 text-lg flex-1 font-normal"
            value={value}
            placeholder={placeholder}
            placeholderTextColor={"#6C6C6C"}
            onChangeText={handleChangeText}
            autoCapitalize={letterCase}
            keyboardType={keyboardType}
            autoCorrect={false}
            secureTextEntry={
              (type === "password" && !showPassword) ||
              (type === "password" && !showConfirmPassword)
            }
            onBlur={onBlur}
            onFocus={onFocus}
            ref={ref}
            inputMode={inputMode}
          />

          {type === "password" ? (
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

        {error && (
          <Text className={"text-red-500 mt-1 -mb-2 font-normal text-sm"}>
            {error}
          </Text>
        )}
      </View>
    );
  }
);

export default FormField;
