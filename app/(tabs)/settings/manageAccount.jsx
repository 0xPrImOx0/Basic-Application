import { View, Text, Image, Dimensions } from "react-native";
import React from "react";
import Container from "../../../components/Container";
import Images from "../../../constants/Images";
import PersonalDetails from "../../../components/PersonalDetails";
import Icons from "../../../constants/Icons";
import CustomButton from "../../../components/CustomButton";
import { router } from "expo-router";
import { logOut } from "../../../services/auth";
import Toast from "react-native-toast-message";

const manageAccount = () => {
  const { width } = Dimensions.get("window");
  const COVER_HEIGHT = width * 0.5625; // 16:9 aspect ratio

  const profilePic = "https://via.placeholder.com/150";
  const coverPhoto = "https://via.placeholder.com/800x300";

  const handleLogOut = async () => {
    try {
      console.log("Point reached");

      const { error } = await logOut();

      if (error) {
        return Toast.show({
          type: "error",
          text1: error.message || "An error occurred",
        });
      }

      Toast.show({
        type: "success",
        text1: "Signed Out Successfully!",
      });

      router.replace("/signIn");
    } catch (error) {
      Toast.show({
        type: "error",
        text1: error.message || "An unexpected error occurred",
      });
    }
  };

  return (
    <Container
      centerContent={true}
      centerHorizontal={true}
      ph={"20"}
      pt={"30"}
      pb={"30"}
    >
      <View
        className={
          "border-2 border-[#d9d9d9] rounded-2xl w-[100%] relative overflow-hidden"
        }
      >
        <View className={"mb-6"}>
          {/* Cover Photo Section */}
          <View className="relative">
            <Image
              source={Images.cover}
              // style={{ width: width, height: COVER_HEIGHT }}
              // style={{ height: COVER_HEIGHT }}
              className="bg-gray-300 w-full h-52 rounded-t-xl"
              resizeMode="cover"
            />
          </View>
          <View style={{ paddingHorizontal: width * 0.04 }} className="-mt-24">
            {/* Profile Picture Section */}
            <View className="relative items-center mb-3">
              <Image
                source={Images.studGrad}
                style={{ width: width * 0.35, height: width * 0.35 }}
                className="rounded-full bg-gray-200 border-4 border-white"
              />
            </View>
          </View>

          <View className={"items-center"}>
            <Text className="font-extrabold text-3xl text-[#0A0A0A]">
              Rey Daug
            </Text>
          </View>
        </View>

        <View className={"p-6"}>
          <View className={"mb-10"}>
            <Text className={"font-medium text-2xl text-[#0A0A0A] mb-6"}>
              Personal Information
            </Text>

            <View className="flex-1 gap-3">
              <PersonalDetails
                icon={Icons.gradCap}
                label="University of Science and Technology of Southern Philippines"
              />
              <PersonalDetails
                icon={Icons.location}
                label="Cagayan de Oro City"
              />
              <PersonalDetails icon={Icons.dob} label="October 3, 2004" />
              <PersonalDetails icon={Icons.email} label="reydaug34@gmail.com" />
              <PersonalDetails icon={Icons.telephone} label="09123456789" />
            </View>
          </View>

          <View>
            <CustomButton
              label={"Edit Profile"}
              icon={Icons.edit}
              styles={"bg-[#161515] p-3 mb-4"}
              iconTint={"#FFFFFF"}
              textStyle={"font-medium text-base text-[#FFFFFF]"}
              iconStyle={"w-6 h-6 mr-3"}
              onPress={() => router.push("/settings/editProfile")}
            />

            <CustomButton
              label={"Change Password"}
              icon={Icons.key}
              styles={"bg-[#fff] border border-[#d9d9d9] p-3 mb-4"}
              iconTint={"#161515"}
              textStyle={"font-medium text-base text-[#161515]"}
              iconStyle={"w-6 h-6 mr-3"}
              onPress={() => router.push("/settings/changePassword")}
            />

            <CustomButton
              label={"Logout"}
              icon={Icons.logout}
              styles={"bg-[#EE4545] p-3"}
              iconTint={"#FFFFFF"}
              textStyle={"font-medium text-base text-[#FFFFFF]"}
              iconStyle={"w-6 h-6 mr-3"}
              onPress={handleLogOut}
            />
          </View>
        </View>
      </View>
    </Container>
  );
};

export default manageAccount;
