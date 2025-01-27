import { View, Text, Image } from "react-native";
import React from "react";
import Container from "../../../components/Container";
import Images from "../../../constants/Images";
import PersonalDetails from "../../../components/PersonalDetails";
import Icons from "../../../constants/Icons";
import CustomButton from "../../../components/CustomButton";
import { router } from "expo-router";

const manageAccount = () => {
  return (
    <Container
      centerContent={true}
      centerHorizontal={true}
      ph={"20"}
      pt={"20"}
      pb={"20"}
    >
      <View className={"border border-[#d9d9d9] rounded-lg w-full p-6"}>
        <View className={"items-center mb-11"}>
          <Image
            source={Images.daugCrop}
            className={"w-24 h-24 rounded-full mb-3"}
          />
          <Text className="font-extrabold text-3xl text-[#0A0A0A]">
            Rey Daug
          </Text>
        </View>

        <View className={"mb-7"}>
          <Text className={"font-medium text-2xl text-[#0A0A0A] mb-6"}>
            Personal Information
          </Text>

          <View className="flex-1 gap-3">
            <PersonalDetails icon={Icons.email} label="reydaug34@gmail.com" />
            <PersonalDetails icon={Icons.telephone} label="09123456789" />
            <PersonalDetails
              icon={Icons.location}
              label="Cagayan de Oro City"
            />
            <PersonalDetails
              icon={Icons.gradCap}
              label="University of Science and Technology of Southern Philippines"
            />
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
          />

          <CustomButton
            label={"Change Password"}
            icon={Icons.key}
            styles={"bg-[#fff] border border-[#d9d9d9] p-3 mb-4"}
            iconTint={"#161515"}
            textStyle={"font-medium text-base text-[#161515]"}
            iconStyle={"w-6 h-6 mr-3"}
          />

          <CustomButton
            label={"Logout"}
            icon={Icons.logout}
            styles={"bg-[#EE4545] p-3"}
            iconTint={"#FFFFFF"}
            textStyle={"font-medium text-base text-[#FFFFFF]"}
            iconStyle={"w-6 h-6 mr-3"}
            onPress={() => router.replace("/signIn")}
          />
        </View>
      </View>
    </Container>
  );
};

export default manageAccount;
