import { View, Image } from "react-native";
import Icons from "../constants/Icons";

const SplashScreen = (isVisible) => {
  return (
    <View
      className={`flex-1 items-center justify-center w-full h-full bg-[#fff] ${
        isVisible ? "" : "hidden"
      }`}
    >
      <Image
        source={Icons.logo}
        className={"w-[50%] h-[24%]"}
        tintColor={"#0A0A0A"}
      />
    </View>
  );
};

export default SplashScreen;
