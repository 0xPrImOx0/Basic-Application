import { View, TextInput, Text, Image } from "react-native";
import React, { useState, forwardRef } from "react";
import Icons from "../constants/Icons";
import CustomButton from "./CustomButton";

const FormField = forwardRef(
  (
    {
      containerStyles, //style of the Main container
      formHeaderStyle, //style of the Form header/title Container
      formHeader, //style of the Form header/title
      value,
      placeholder,
      handleChangeText, //onChangeText
      styles, //styles of the Input Container
      error, //check if there's an error
      letterCase = "none", //word setup
      onBlur,
      onFocus,
      keyboardType, //change keyboard format
      type, //adds the password features if === password
      editable, //sets if editable
      verify = true,
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
          {(value || error) && verify && (
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
            editable={editable}
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
