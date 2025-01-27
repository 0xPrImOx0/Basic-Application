import { View, Text } from "react-native";
import React, { useState } from "react";
import Container from "../../components/Container";
import CustomButton from "../../components/CustomButton";
import FormField from "../../components/FormField";
import { router } from "expo-router";

const signIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    emailError: "",
    passwordError: "",
  });

  return (
    <Container centerContent={true} centerHorizontal={true}>
      <View className="flex border-[#D9D9D9] border rounded-2xl w-[85%] h-[50.5%] p-5">
        <View>
          <Text className={"font-extrabold text-2xl"}>Welcome Back</Text>
          <Text className={"font-light text-lg"}>
            Login or create an account to continue
          </Text>
        </View>
        <View
          className={
            "flex-row justify-between bg-[#d9d9d9] rounded-md w-[100%] mt-6"
          }
        >
          <CustomButton
            label="Login"
            styles="bg-white py-1.5 px-[18.5%] my-1.5 mx-1.5 rounded-sm"
            textStyle="font-bold text-base text-[#0A0A0A]"
          />
          <CustomButton
            label="Create Account"
            styles="w-[48%] mr-1.5"
            textStyle="font-normal text-base text-[#6C6C6C]"
            onPress={() => router.replace("/signUp")}
          />
        </View>

        <View className={"my-8"}>
          <FormField
            formHeader={"Email"}
            placeholder={"Enter your Email"}
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            styles="mt-1 mb-6 w-full"
            keyboardType="email-address"
            error={form.emailError}
            // onBlur={() => setIsEmailClicked(true)}
          />

          <FormField
            formHeader={"Password"}
            placeholder={"Enter your Password"}
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            styles="mt-1 w-full"
            error={form.passwordError}
            // onBlur={() => setIsPasswordClicked(true)}
          />
        </View>

        <CustomButton
          label="Login"
          styles="w-full bg-[#161515] h-12 text-base mb-6"
          textStyle="font-medium text-[#fff]"
        />
        <Text className={"font-light text-base text-[#6C6C6C] text-justify"}>
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </Text>
      </View>
    </Container>
  );
};

export default signIn;
