import { View, Text } from "react-native";
import React, { useState } from "react";
import Container from "../../components/Container";
import CustomButton from "../../components/CustomButton";
import FormField from "../../components/FormField";
import { router } from "expo-router";

const signIn = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    fullNameError: "",
    emailError: "",
    passwordError: "",
    confirmPasswordError: "",
  });

  return (
    <Container centerContent={true} centerHorizontal={true}>
      <View className="border-[#D9D9D9] border rounded-[10px] w-[365px] h-[645px] p-[20px]">
        <View>
          <Text className={"font-extrabold text-[20px]"}>Hello, There!</Text>
          <Text className={"font-light text-[16px]"}>
            Login or create an account to continue
          </Text>
        </View>

        <View
          className={
            "flex-row justify-between bg-[#d9d9d9] rounded-[5px] w-[320px] mt-[20px]"
          }
        >
          <CustomButton
            label="Login"
            styles="flex-1 mr-[5px]"
            textStyle="font-normal text-[14px] text-[#6C6C6C]"
            onPress={() => router.replace("/signIn")}
          />
          <CustomButton
            label="Create Account"
            styles="flex-1 bg-white min-h-[32px] py-[5px] my-[5px] mx-[5px] rounded-[3px]"
            textStyle="font-bold text-[14px] text-[#0A0A0A]"
          />
        </View>

        <View className={"my-[30px]"}>
          <FormField
            formHeader={"Full Name"}
            placeholder={"Enter your Full Name"}
            value={form.fullName}
            handleChangeText={(e) => setForm({ ...form, fullName: e })}
            styles="mt-[6px] mb-[22px]"
            error={form.fullNameError}
            // onBlur={() => setIsEmailClicked(true)}
          />

          <FormField
            formHeader={"Email"}
            placeholder={"Enter your Email"}
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            styles="mt-[6px] mb-[22px]"
            keyboardType="email-address"
            error={form.emailError}
            // onBlur={() => setIsEmailClicked(true)}
          />

          <FormField
            formHeader={"Password"}
            placeholder={"Enter your Password"}
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            styles="mt-[6px] mb-[22px]"
            error={form.passwordError}
            // onBlur={() => setIsPasswordClicked(true)}
          />

          <FormField
            formHeader={"Confirm Password"}
            placeholder={"Confirm your Password"}
            value={form.confirmPassword}
            handleChangeText={(e) => setForm({ ...form, confirmPassword: e })}
            styles="mt-[6px]"
            error={form.confirmPasswordError}
            // onBlur={() => setIsPasswordClicked(true)}
          />
        </View>

        <CustomButton
          label="Create Account"
          styles="w-full bg-[#161515] h-[43px] text-[14px] mb-[20px]"
          textStyle="font-medium text-[#fff]"
          onPress={() => router.replace("/home")}
        />

        <Text className={"font-light text-[14px] text-[#6C6C6C] text-justify"}>
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </Text>
      </View>
    </Container>
  );
};

export default signIn;
