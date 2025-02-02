import React from "react";
import { Text, Pressable, View } from "react-native";

const CustomRadioButton = ({ letter = "A", selected = false, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      className={`
        h-8 
        w-8 
        rounded-full 
        items-center 
        justify-center 
        border-2 
        ${selected ? "bg-black border-black" : "bg-white border-gray-300"}
        shadow-lg
        active:opacity-80
      `}
    >
      <Text
        className={`
          text-base 
          font-semibold 
          ${selected ? "text-white" : "text-gray-800"}
        `}
      >
        {letter}
      </Text>
    </Pressable>
  );
};

export default CustomRadioButton;
