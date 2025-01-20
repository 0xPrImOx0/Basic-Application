import { View, ScrollView } from "react-native";
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
}) => {
  return (
    <SafeAreaView className={`bg-[${bg}] h-full flex-1 ${styles}`}>
      {scroll ? (
        <ScrollView
          contentContainerStyle={{
            minHeight: "100%",
            paddingHorizontal: ph,
            position: "relative",
            paddingBottom: pb,
            backgroundColor: bg,
            justifyContent: centerContent ? "center" : null,
            alignItems: centerHorizontal ? "center" : null,
            paddingTop: pt,
          }}
        >
          {children}
        </ScrollView>
      ) : (
        <View
          className={`min-h-[100%] px-[14px] relative pb-[${pb}] ${styles}`}
        >
          {children}
        </View>
      )}
    </SafeAreaView>
  );
};

export default Container;
