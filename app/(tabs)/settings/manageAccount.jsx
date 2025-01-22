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
    <Container centerContent={true} centerHorizontal={true} ph={"20"}>
      <View className={"border border-[#d9d9d9] rounded-[5px] w-full p-[20px]"}>
        <View className={"items-center mb-[37px]"}>
          <Image
            source={Images.daugCrop}
            className={"w-[85px] h-[85px] rounded-full mb-[12px]"}
          />
          <Text className="font-extrabold text-[24px] text-[#0A0A0A]">
            Rey Daug
          </Text>
        </View>

        <View className={"mb-[23px]"}>
          <Text className={"font-medium text-[20px] text-[#0A0A0A] mb-[20px]"}>
            Personal Information
          </Text>

          <View className="flex-1 gap-[10px]">
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
            styles={"bg-[#161515] p-[10px] mb-[13px]"}
            iconTint={"#FFFFFF"}
            textStyle={"font-medium text-[14px] text-[#FFFFFF]"}
            iconStyle={"w-[21px] h-[21px] mr-[10px]"}
          />

          <CustomButton
            label={"Change Password"}
            icon={Icons.key}
            styles={"bg-[#fff] border border-[#d9d9d9] p-[10px] mb-[13px]"}
            iconTint={"#161515"}
            textStyle={"font-medium text-[14px] text-[#161515]"}
            iconStyle={"w-[21px] h-[21px] mr-[10px]"}
          />

          <CustomButton
            label={"Logout"}
            icon={Icons.logout}
            styles={"bg-[#EE4545] p-[10px]"}
            iconTint={"#FFFFFF"}
            textStyle={"font-medium text-[14px] text-[#FFFFFF]"}
            iconStyle={"w-[21px] h-[21px] mr-[10px]"}
            onPress={() => router.replace("/signIn")}
          />
        </View>
      </View>
    </Container>
  );
};

export default manageAccount;
