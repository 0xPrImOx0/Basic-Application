import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import Container from "../../components/Container";
import Images from "../../constants/Images";
import ShowMoreBox from "../../components/ShowMoreBox";
import shsImages from "../../lib/shsImages.json";
import Gallery from "../../components/Gallery";

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
        <View className={"items-center mt-7 px-6"}>
          <Text className={"font-extrabold text-[#0A0A0A] text-xl"}>
            Autobiography
          </Text>

          <View className={"pt-6"}>
            <Image
              source={Images.studGrad}
              className={"w-44 h-44 rounded-full"}
            />
            <View className={"pt-3"}>
              <Text
                className={"font-medium text-lg text-[#0A0A0A] text-center"}
              >
                Rey Lagumbay Daug Jr.
              </Text>
              <Text
                className={
                  "font-light italic text-base text-[#6C6C6C] text-center"
                }
              >
                Born on October 3, 2004
              </Text>
            </View>
          </View>

          <View className={"mt-10 flex-row flex-wrap mb-14 text-justify"}>
            <Text
              className={"font-normal text-base text-[#0A0A0A] text-justify"}
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
              imageStyle={"w-14 h-14 rounded-md border border-slate-100"}
              arrowDirection="right"
              borderStyle={"my-0 mb-14"}
              onClick={toggleGallery}
              disabled={isButtonDisabled}
            />
          </View>
        </View>
      </Container>
      {isGalleryVisible && (
        <Gallery
          isVisible={isGalleryVisible}
          onClose={closeGallery}
          shsImages={shsImages}
        />
      )}
    </View>
  );
};

export default personalInfo;
