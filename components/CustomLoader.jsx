import { Modal, View, Text, Image, ActivityIndicator } from "react-native";
import Icons from "../constants/Icons";
import { useEffect, useState } from "react";

const CustomLoader = ({ visible = false, message = "Loading..." }) => {
  const [loadingText, setLoadingText] = useState(message);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let dotIndex = 1;
    let interval;

    if (visible) {
      interval = setInterval(() => {
        setLoadingText(`${message}${".".repeat(dotIndex)}`);
        dotIndex = dotIndex === 3 ? 1 : dotIndex + 1;
      }, 500);
    } else {
      setLoadingText(message); // Reset text when modal is hidden
    }

    return () => clearInterval(interval);
  }, [visible, message]);

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View className="flex-1 bg-black/50 justify-center items-center">
        <View className="bg-transparent p-6 rounded-2xl w-4/5 max-w-[300px] items-center space-y-4">
          <ActivityIndicator size="large" color="black" />

          {/* Loading Text */}
          <Text className="text-black text-2xl font-medium mt-10">
            {loadingText}
          </Text>
        </View>
      </View>
    </Modal>
  );
};

export default CustomLoader;
