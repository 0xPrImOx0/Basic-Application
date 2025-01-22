import { View, Text } from "react-native";
import React from "react";
import ShowMoreBox from "../../../components/ShowMoreBox";
import Images from "../../../constants/Images";
import Icons from "../../../constants/Icons";
import Container from "../../../components/Container";
import { router } from "expo-router";

const settings = () => {
  return (
    <Container>
      <View className="px-[24px]">
        <View className=" my-[30px]">
          <ShowMoreBox
            label="Rey Daug"
            fontStyle={"font-extrabold"}
            subLabel={"Manage account info and security"}
            icon={Images.studGrad}
            imageStyle={"w-[50px] h-[50px] rounded-full"}
            arrowDirection="right"
            onClick={() => router.push("/manageAccount")}
          />
        </View>

        <View className="w-full rounded-[5px] border border-[#D9D9D9]">
          <ShowMoreBox
            label="Add Subject"
            fontStyle={"font-extrabold"}
            icon={Icons.plus}
            imageStyle={"w-[50px] h-[50px] rounded-full"}
            arrowDirection="right"
            borderStyle={"border-0 my-0 mb-[10px]"}
          />

          <ShowMoreBox
            label="Delete Subject"
            fontStyle={"font-extrabold"}
            icon={Icons.del}
            imageStyle={"w-[50px] h-[50px] rounded-full"}
            arrowDirection="right"
            borderStyle={"border-0 my-0"}
          />
        </View>
      </View>
    </Container>
  );
};

export default settings;
