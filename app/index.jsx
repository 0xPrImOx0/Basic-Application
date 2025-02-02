import { View, Image, Text } from "react-native";
import Container from "@/components/Container";
import { useState, useEffect } from "react";
import Icons from "../constants/Icons";
import Swiper from "react-native-swiper";
import LogoName from "../components/LogoName";
import Images from "../constants/Images";
import CustomButton from "../components/CustomButton";
import { router } from "expo-router";
import SignIn from "./(auth)/signIn";
import SplashScreen from "../components/SplashScreen";
import { useAuth } from "../services/auth-provider";

export default function Index() {
  const { session } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  // Redirect after session check inside useEffect
  useEffect(() => {
    if (session) {
      router.replace("/home");
    }
  }, [session]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  return (
    <>
      {isLoading ? (
        <SplashScreen />
      ) : (
        <Container
          scroll={false}
          savStyles={"p-6 justify-center items-center"}
          viewStyle={"p-6"}
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
              <View className={"mb-4"}>
                <Image
                  source={Icons.logo}
                  tintColor={"#0A0A0A"}
                  className="w-36 h-36"
                />
              </View>
              <View>
                <LogoName />
                <View className={"mt-3"}>
                  <Text
                    className={
                      "font-light italic text-base text-[#6C6C6C] text-center -mt-7"
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
                  className={"w-64 h-64 mb-1"}
                  tintColor={"#4B4B4B"}
                />
                <Text className={"text-xl text-[#0A0A0A] text-center"}>
                  Take charge of your academic journey with ClassMate! Stay
                  organized, and unlock your full potential with ease.
                </Text>
              </View>
              <View className="absolute bottom-10 left-0 right-0 flex items-center h-12 w-">
                <CustomButton
                  label="Get Started"
                  styles="w-full bg-[#161515] h-12 mb-6"
                  textStyle="font-medium text-base text-[#fff] w-full"
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
