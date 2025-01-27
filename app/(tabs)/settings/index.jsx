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
      <View className="px-7">
        <View className=" my-9">
          <ShowMoreBox
            label="Rey Daug"
            fontStyle={"font-extrabold"}
            subLabel={"Manage account info and security"}
            icon={Images.daugCrop}
            imageStyle={"w-14 h-14 rounded-full"}
            arrowDirection="right"
            onClick={() => router.push("/settings/manageAccount")}
          />
        </View>

        <View className="w-full rounded-md border border-[#D9D9D9]">
          <ShowMoreBox
            label="Add Subject"
            fontStyle={"font-extrabold"}
            icon={Icons.plus}
            imageStyle={"w-14 h-14 rounded-full"}
            arrowDirection="right"
            borderStyle={"border-0 my-0 mb-3"}
            onClick={() => router.push("/settings/addSubject")}
          />

          <ShowMoreBox
            label="Delete Subject"
            fontStyle={"font-extrabold"}
            icon={Icons.del}
            imageStyle={"w-14 h-14 rounded-full"}
            arrowDirection="right"
            borderStyle={"border-0 my-0"}
            onClick={() => router.push("/settings/delSubject")}
          />
        </View>
      </View>
    </Container>
  );
};

export default settings;
