import React, { useEffect, useRef } from "react";
import { View, Animated } from "react-native";
import { useMemo } from "react";

const Loader = ({
  isLoading = true,
  size = 40,
  onLoadingComplete = () => {},
}) => {
  const position = useMemo(() => new Animated.Value(0), []);
  const legSwing = useMemo(() => new Animated.Value(0), []);
  const bodyTilt = useMemo(() => new Animated.Value(0), []);
  const armSwing = useMemo(() => new Animated.Value(0), []);
  const animationRef = useRef(null);
  const baseSize = size;
  const containerWidth = baseSize * 5;

  useEffect(() => {
    if (isLoading) {
      // Reset position when starting
      position.setValue(0);

      // Single walk animation
      animationRef.current = Animated.parallel([
        // Moving from left to right
        Animated.timing(position, {
          toValue: containerWidth - baseSize,
          duration: 2000,
          useNativeDriver: true,
        }),
        // Body tilt for 3D effect
        Animated.loop(
          Animated.sequence([
            Animated.timing(bodyTilt, {
              toValue: 1,
              duration: 250,
              useNativeDriver: true,
            }),
            Animated.timing(bodyTilt, {
              toValue: 0,
              duration: 250,
              useNativeDriver: true,
            }),
          ])
        ),
        // Leg and arm movement
        Animated.loop(
          Animated.sequence([
            Animated.timing(legSwing, {
              toValue: 1,
              duration: 500,
              useNativeDriver: true,
            }),
            Animated.timing(legSwing, {
              toValue: 0,
              duration: 500,
              useNativeDriver: true,
            }),
          ])
        ),
      ]);

      animationRef.current.start(({ finished }) => {
        if (finished) {
          onLoadingComplete();
        }
      });

      return () => {
        if (animationRef.current) {
          animationRef.current.stop();
        }
      };
    }
  }, [isLoading, position, legSwing, bodyTilt, containerWidth, baseSize]);

  const leftLegRotation = legSwing.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "40deg"],
  });

  const rightLegRotation = legSwing.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "-40deg"],
  });

  const bodyRotation = bodyTilt.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "5deg"],
  });

  const leftArmRotation = legSwing.interpolate({
    inputRange: [0, 1],
    outputRange: ["-40deg", "40deg"],
  });

  const rightArmRotation = legSwing.interpolate({
    inputRange: [0, 1],
    outputRange: ["40deg", "-40deg"],
  });

  if (!isLoading) return null;

  return (
    <View className="items-center justify-center p-4">
      <View
        style={{ width: containerWidth, height: baseSize * 2 }}
        className="relative overflow-hidden"
      >
        <Animated.View
          style={{
            transform: [{ translateX: position }],
          }}
          className="absolute"
        >
          <Animated.View
            style={{
              transform: [{ rotate: bodyRotation }],
            }}
            className="relative"
          >
            {/* Head with 3D effect */}
            <View className="absolute">
              {/* Base head circle */}
              <View
                style={{
                  width: baseSize * 0.45,
                  height: baseSize * 0.45,
                  borderRadius: baseSize * 0.225,
                }}
                className="bg-gray-900"
              />
              {/* 3D effect highlight */}
              <View
                style={{
                  width: baseSize * 0.15,
                  height: baseSize * 0.15,
                  borderRadius: baseSize * 0.075,
                  top: baseSize * 0.1,
                  left: baseSize * 0.05,
                }}
                className="bg-gray-700 absolute opacity-50"
              />
            </View>

            {/* Body with 3D shading */}
            <View
              style={{
                width: baseSize * 0.3,
                height: baseSize * 0.7,
                top: baseSize * 0.4,
                borderRadius: baseSize * 0.1,
              }}
              className="bg-gray-900 absolute"
            >
              {/* Body highlight */}
              <View
                style={{
                  width: baseSize * 0.15,
                  height: baseSize * 0.7,
                  borderRadius: baseSize * 0.1,
                }}
                className="bg-gray-700 absolute opacity-50"
              />
            </View>

            {/* Arms */}
            <Animated.View
              style={{
                width: baseSize * 0.15,
                height: baseSize * 0.4,
                top: baseSize * 0.45,
                left: -baseSize * 0.2,
                transform: [{ rotate: leftArmRotation }],
              }}
              className="bg-gray-900 absolute origin-top rounded-full"
            />

            <Animated.View
              style={{
                width: baseSize * 0.15,
                height: baseSize * 0.4,
                top: baseSize * 0.45,
                right: -baseSize * 0.2,
                transform: [{ rotate: rightArmRotation }],
              }}
              className="bg-gray-900 absolute origin-top rounded-full"
            />

            {/* Legs with 3D effect */}
            <Animated.View
              style={{
                width: baseSize * 0.2,
                height: baseSize * 0.6,
                top: baseSize * 1,
                left: -baseSize * 0.1,
                transform: [{ rotate: leftLegRotation }],
              }}
              className="bg-gray-900 absolute origin-top rounded-full"
            >
              {/* Leg highlight */}
              <View
                className="bg-gray-700 absolute opacity-50"
                style={{
                  width: baseSize * 0.1,
                  height: baseSize * 0.6,
                  borderRadius: baseSize * 0.05,
                }}
              />
            </Animated.View>

            <Animated.View
              style={{
                width: baseSize * 0.2,
                height: baseSize * 0.6,
                top: baseSize * 1,
                right: -baseSize * 0.1,
                transform: [{ rotate: rightLegRotation }],
              }}
              className="bg-gray-900 absolute origin-top rounded-full"
            >
              {/* Leg highlight */}
              <View
                className="bg-gray-700 absolute opacity-50"
                style={{
                  width: baseSize * 0.1,
                  height: baseSize * 0.6,
                  borderRadius: baseSize * 0.05,
                }}
              />
            </Animated.View>
          </Animated.View>
        </Animated.View>
      </View>
    </View>
  );
};

export default Loader;
