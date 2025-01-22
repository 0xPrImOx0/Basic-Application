import { View, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Container = ({
  children,
  scroll = true,
  styles,
  bg = "#fff",
  pb,
  ph,
  pt,
  centerContent,
  centerHorizontal,
  viewStyle,
  display,
  direction,
  wraps,
  justify,
}) => {
  return (
    <SafeAreaView className={`bg-[${bg}] h-full flex-1 ${styles}`}>
      {scroll ? (
        <KeyboardAvoidingView
          className={"flex-1 justify-center"}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{
              minHeight: "100%",
              paddingHorizontal: ph,
              position: "relative",
              paddingBottom: pb,
              backgroundColor: bg,
              justifyContent: centerContent ? "center" : justify,
              alignItems: centerHorizontal ? "center" : null,
              paddingTop: pt,
              display: display,
              flexDirection: direction,
              flexWrap: wraps,
            }}
          >
            {children}
          </ScrollView>
        </KeyboardAvoidingView>
      ) : (
        <View
          className={`min-h-[100%] px-[14px] relative pb-[${pb}] ${styles} ${viewStyle}`}
        >
          {children}
        </View>
      )}
    </SafeAreaView>
  );
};

export default Container;
