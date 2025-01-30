import React, { useEffect } from "react";
import { View, Text, Animated } from "react-native";

const Toast = ({
  icon = "✓",
  visible = false,
  variant = "primary",
  title = "",
  description = "",
  duration = 3000,
  onClose,
}) => {
  const translateY = new Animated.Value(-100);

  const getVariantStyles = () => {
    const variants = {
      primary: {
        container: "bg-gray-900/95",
        title: "text-white",
        description: "text-gray-300",
      },
      success: {
        container: "bg-green-500/95",
        title: "text-white",
        description: "text-green-100",
      },
      error: {
        container: "bg-red-500/95",
        title: "text-white",
        description: "text-red-100",
      },
      warning: {
        container: "bg-yellow-500/95",
        title: "text-white",
        description: "text-yellow-100",
      },
    };
    return variants[variant];
  };

  useEffect(() => {
    if (visible) {
      showToast();
      const timer = setTimeout(() => {
        hideToast();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  const showToast = () => {
    Animated.spring(translateY, {
      toValue: 0,
      useNativeDriver: true,
      tension: 50,
      friction: 8,
    }).start();
  };

  const hideToast = () => {
    Animated.timing(translateY, {
      toValue: -100,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      if (onClose) {
        onClose();
      }
    });
  };

  if (!visible) return null;

  const variantStyles = getVariantStyles();

  return (
    <Animated.View
      style={[
        {
          transform: [{ translateY }],
        },
      ]}
      className="absolute top-0 left-0 right-0 z-[9999999999] mx-4 mt-4"
    >
      <View className={`px-4 py-3 rounded-md ${variantStyles.container}`}>
        <View className="flex-row items-center space-x-3">
          <Text className="text-xl text-white">{icon}</Text>
          <View className="flex-1">
            <Text className={`font-medium text-base ${variantStyles.title}`}>
              {title}
            </Text>
            {description ? (
              <Text className={`text-sm mt-0.5 ${variantStyles.description}`}>
                {description}
              </Text>
            ) : null}
          </View>
        </View>
      </View>
    </Animated.View>
  );
};

export default Toast;
