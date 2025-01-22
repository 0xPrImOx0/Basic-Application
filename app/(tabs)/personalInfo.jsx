import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import Container from "../../components/Container";
import Images from "../../constants/Images";
import ShowMoreBox from "../../components/ShowMoreBox";
import Icons from "../../constants/Icons";
import shsImages from "../../lib/shsImages.json";
import CustomButton from "../../components/CustomButton";

const AbsoluteGallery = ({ close, hide }) => {
  return (
    <View
      className={`absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] w-[370px] p-[20px] border border-[#D9D9D9] rounded-[10px] bg-[#D9D9D9] h-[550px] ${hide}`}
    >
      <View className="flex-row justify-between mb-[20px] items-center">
        <Text className={"font-bold text-[16px] text-[#0A0A0A]"}>
          Senior High Journey
        </Text>
        {close}
      </View>

      <View className="flex-1">
        <Container
          bg="#D9D9D9"
          display={"flex"}
          direction={"row"}
          wraps={"wrap"}
          justify={"space-between"}
        >
          {Object.entries(shsImages).map(([key, shs], index) => {
            const isLast = index === Object.entries(shsImages).length - 1;
            const isSecondLast = index === Object.entries(shsImages).length - 2;
            const isLastEven = Object.entries(shsImages).length % 2 === 0;

            // Determine margin-bottom class
            const mbClass =
              (isLastEven && (isLast || isSecondLast)) ||
              (!isLastEven && isLast)
                ? "rounded-b-[5px]"
                : "mb-[20px]";

            return (
              <Image
                key={key}
                source={Images[shs.image]}
                className={`w-[150px] h-[150px] ${mbClass}`}
              />
            );
          })}
        </Container>
      </View>
    </View>
  );
};

const personalInfo = () => {
  const [isGalleryVisible, setIsGalleryVisible] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // New state to disable button

  const toggleGallery = () => {
    setIsButtonDisabled(true); // Disable the button when the gallery is shown
    setIsGalleryVisible(true); // Show the gallery
  };

  const closeGallery = () => {
    setIsButtonDisabled(false); // Enable the button when the gallery is closed
    setIsGalleryVisible(false); // Hide the gallery
  };

  return (
    <View className={"w-full h-full"}>
      <Container styles={"relative"}>
        <View className={"items-center mt-[25px] px-[25px]"}>
          <Text className={"font-extrabold text-[#0A0A0A] text-[18px]"}>
            Autobiography
          </Text>

          <View className={"pt-[20px]"}>
            <Image
              source={Images.studGrad}
              className={"w-[150px] h-[150px] rounded-full"}
            />
            <View className={"pt-[10px]"}>
              <Text
                className={"font-medium text-[16px] text-[#0A0A0A] text-center"}
              >
                Rey Lagumbay Daug Jr.
              </Text>
              <Text
                className={
                  "font-light italic text-[14px] text-[#6C6C6C] text-center"
                }
              >
                Born on October 3, 2004
              </Text>
            </View>
          </View>

          <View
            className={"mt-[35px] flex-row flex-wrap mb-[40px] text-justify"}
          >
            <Text
              className={"font-normal text-[14px] text-[#0A0A0A] text-justify"}
            >
              {"\t\t\t"}From a young age, I have always been curious and eager
              to explore the world around me. As a child, I constantly sought
              out things that piqued my interest. If something truly hooked me,
              I would do everything I could to dive deeper, learning all I could
              about that topic. This habit of exploration and discovery shaped
              my love for learning and helped me build a strong foundation of
              knowledge.{"\n"}
              {"\t\t\t"}During my elementary years at Macabalan Elementary
              School, where I graduated in 2016, I found joy in learning across
              a wide range of subjects. The broad curriculum added to my stock
              of knowledge and nurtured my curiosity. By the time I entered
              Junior High School at Misamis Oriental General Comprehensive High
              School, which I completed in 2020, I was exposed to exciting new
              opportunities, such as dancing, delivering speeches, and
              participating in various academic activities. These experiences
              made learning even more enjoyable and enriching.{"\n"}
              {"\t\t\t"}In Senior High School, I faced one of my biggest
              challenges. I enrolled in the STEM strand (Science, Technology,
              Engineering, and Mathematics) at the University of Science and
              Technology of Southern Philippines and graduated in 2022. The
              COVID-19 pandemic brought struggles and uncertainties, but I
              adapted and persevered, ultimately achieving my goal of graduating
              despite the difficulties.
              {"\n"}
              {"\t\t\t"}Today, I am pursuing a Bachelor of Science in
              Information Technology at the University of Science and Technology
              of Southern Philippines. This course has proven to be challenging,
              but I am determined to keep learning effectively and efficiently.
              I continue to approach every challenge as an opportunity for
              growth, always striving to build a brighter future for myself.
            </Text>
          </View>

          <View className="w-full">
            <ShowMoreBox
              label="Senior High Journey"
              fontStyle={"font-extrabold"}
              subLabel={"USTP-CDO SHS"}
              icon={Images.toga}
              imageStyle={
                "w-[50px] h-[50px rounded-[5px] border border-slate-100"
              }
              arrowDirection="right"
              borderStyle={"my-[0px] mb-[60px]"}
              onClick={toggleGallery}
              disabled={isButtonDisabled}
            />
          </View>
        </View>
      </Container>
      {isGalleryVisible && (
        <AbsoluteGallery
          close={
            <CustomButton
              icon={Icons.close}
              iconStyle="w-[15px] h-[15px]"
              iconTint={"#f00"}
              onPress={closeGallery}
            />
          }
        />
      )}
    </View>
  );
};

export default personalInfo;
