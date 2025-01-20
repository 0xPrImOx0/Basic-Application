import { View, Text, Image } from "react-native";
import { router } from "expo-router";
import Images from "../constants/Images";
import Container from "@/components/Container";
import CustomButton from "@/components/CustomButton";

export default function Index() {
  return (
    <Container scroll={true} pb={50}>
      <CustomButton
        styles={"border border-red-400 h-full"}
        label="Sign In"
        onPress={() => router.push("/signIn")}
      />
    </Container>
  );
}
