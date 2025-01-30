import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import CustomButton from "../../../components/CustomButton";
import Toast from "react-native-toast-message";
import Container from "../../../components/Container";
import { router } from "expo-router";

const delSubject = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [toastVisible, setToastVisible] = useState(false);

  const subjects = [
    "IT321",
    "IT322",
    "IT323",
    "IT324",
    "IT325",
    "PICPE",
    "FreeElec",
  ];

  const handleDelete = () => {
    // Confirmation Alert
    Alert.alert(
      "Confirm Deletion",
      `Are you sure you want to delete ${selectedSubject}? This action cannot be undone.`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            // Actual delete logic here
            console.log(`Deleting subject: ${selectedSubject}`);
            setModalVisible(false);
          },
        },
      ]
    );
  };

  return (
    <Container ph={20} pt={20} pb={20}>
      <CustomButton
        label={"Delete Subject"}
        styles={"rounded-md p-3 items-center bg-red-500"}
        onPress={() => setModalVisible(true)}
        textStyle={"text-white text-center"}
      />

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white w-11/12 rounded-lg p-4">
            <Text className="text-xl font-bold mb-4 text-center">
              Delete Subject
            </Text>

            <View className="border border-gray-300 rounded-md mb-4">
              <Picker
                selectedValue={selectedSubject}
                onValueChange={(itemValue) => setSelectedSubject(itemValue)}
              >
                <Picker.Item label="Select Subject" value="" />
                {subjects.map((subject) => (
                  <Picker.Item key={subject} label={subject} value={subject} />
                ))}
              </Picker>
            </View>

            <View className="flex-row justify-between">
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                className="bg-gray-300 p-3 rounded-md w-5/12"
              >
                <Text className="text-black text-center">Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleDelete}
                disabled={!selectedSubject}
                className={`p-3 rounded-md w-5/12 ${
                  selectedSubject ? "bg-red-500" : "bg-red-300"
                }`}
              >
                <Text className="text-white text-center">Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </Container>
  );
};

export default delSubject;
