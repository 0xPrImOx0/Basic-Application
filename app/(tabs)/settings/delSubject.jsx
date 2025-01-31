import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import CustomButton from "../../../components/CustomButton";
import Toast from "react-native-toast-message";
import Container from "../../../components/Container";
import { router } from "expo-router";
import DropDown from "../../../components/DropDown";
import Modal from "react-native-modal";
import Loader from "../../../components/Loader";

const delSubject = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("IT321");

  const subjects = [
    "IT321",
    "IT322",
    "IT323",
    "IT324",
    "IT325",
    "PICPE",
    "FreeElec",
  ];

  const [isLoading, setIsLoading] = useState(false);

  const handleAsyncOperation = async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 5000)); // Waits for 10 seconds
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container ph={20} pt={20} pb={20}>
      <Loader isLoading={isLoading} size={40} />

      <CustomButton
        label={"Delete Subject"}
        styles={"rounded-md p-3 items-center bg-red-500"}
        onPress={handleAsyncOperation}
        textStyle={"text-white text-center"}
      />

      <Modal
        isVisible={isModalVisible}
        animationIn={"pulse"}
        animationOut={"fadeOutDown"}
        style={{ margin: 0 }}
        hasBackdrop={false}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white w-11/12 rounded-lg p-4">
            <Text className="text-xl font-bold mb-4 text-center">
              Delete Subject
            </Text>

            <View className="border border-gray-300 rounded-md mb-4">
              <DropDown
                selectedValue={selectedSubject}
                onValueChange={(itemValue) => setSelectedSubject(itemValue)}
                dataList={subjects}
              />
            </View>

            <View className="flex-row justify-between">
              <CustomButton
                label={"Cancel"}
                textStyle={"text-black text-center"}
                styles={"bg-gray-300 p-3 rounded-md w-5/12"}
                onPress={() => setModalVisible(false)}
              />

              <CustomButton
                label={"Delete"}
                textStyle={"text-white text-center"}
                onPress={() => {
                  setModalVisible(false);
                  setTimeout(() => {
                    Toast.show({
                      type: "success",
                      text1: "Subject Deleted",
                      text2: `${
                        selectedSubject || "Subject"
                      } has been deleted successfully`,
                    });
                  }, 100);
                }}
                styles={`p-3 rounded-md w-5/12 bg-red-500`}
              />
            </View>
          </View>
        </View>
      </Modal>
    </Container>
  );
};

export default delSubject;
