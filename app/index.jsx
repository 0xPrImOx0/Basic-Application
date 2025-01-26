import { View, Image, Text } from "react-native";
import Container from "@/components/Container";
import { useState, useEffect } from "react";
import Icons from "../constants/Icons";
import Swiper from "react-native-swiper";
import LogoName from "../components/LogoName";
import Images from "../constants/Images";
import CustomButton from "../components/CustomButton";
import { router } from "expo-router";

export default function Index() {
  const SplashScreen = () => {
    return (
      <View
        className={`flex-1 items-center justify-center w-full h-full bg-[#fff] ${
          isVisible ? "" : "hidden"
        }`}
      >
        <Image
          source={Icons.logo}
          className={"w-[60%] h-[28%]"}
          tintColor={"#0A0A0A"}
        />
      </View>
    );
  };

  const [showSplashScreen, setShowSplashScreen] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        setShowSplashScreen(false);
      }, 300);
    }, 1500);
  }, []);

  return (
    <>
      {showSplashScreen ? (
        <SplashScreen />
      ) : (
        <Container
          scroll={false}
          savStyles={"p-[20px] justify-center items-center"}
          viewStyle={"p-[20px]"}
        >
          <Swiper
            loop={false} // Disable looping (once you reach the last page, it won't go back to the first one)
            showsPagination={true} // Show the pagination dots at the bottom
            dotColor="#d9d9d9" // Dots color when not active
            activeDotColor="#000" // Color of the active dot
            paginationStyle={{ bottom: -20 }} // Style for pagination dots
            autoplay={true}
            autoplayTimeout={3}
          >
            <View className={"items-center justify-center h-full"}>
              <View className={"mb-[15px]"}>
                <Image
                  source={Icons.logo}
                  tintColor={"#0A0A0A"}
                  className="w-[130px] h-[130px]"
                />
              </View>
              <View>
                <LogoName />
                <View className={"mt-[10px]"}>
                  <Text
                    className={
                      "font-light italic text-[14px] text-[#6C6C6C] text-center mt-[-25px]"
                    }
                  >
                    {`"Your Virtual Assistant for Academics\nand Personal Life"`}
                  </Text>
                </View>
              </View>
            </View>

            <View className={"items-center justify-center h-full flex-1"}>
              <View className={"items-center justify-center"}>
                <Image
                  source={Images.onBoard}
                  className={"w-[250px] h-[250px] mb-[15px]"}
                  tintColor={"#4B4B4B"}
                />
                <Text className={"text-[18px] text-[#0A0A0A] text-center"}>
                  Take charge of your academic journey with ClassMate! Stay
                  organized, and unlock your full potential with ease.
                </Text>
              </View>
              <View className="absolute bottom-10 left-0 right-0 flex items-center h-[43px]">
                <CustomButton
                  label="Get Started"
                  styles="w-full bg-[#161515] h-[43px] text-[14px] mb-[20px]"
                  textStyle="font-medium text-[#fff] w-full"
                  onPress={() => router.push("signIn")}
                />
              </View>
            </View>
          </Swiper>
        </Container>
      )}
    </>
  );
}
