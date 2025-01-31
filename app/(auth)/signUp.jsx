import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import Container from "../../components/Container";
import CustomButton from "../../components/CustomButton";
import FormField from "../../components/FormField";
import { router } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { signUpSchema } from "../../utils/validate";
import { yupResolver } from "@hookform/resolvers/yup";

const signUp = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(signUpSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 10000)); // Simulate 10s API request
    console.log(data);

    setLoadingText("Create Account");
    router.push("/home");
    setIsLoading(false);
  };

  const [loadingText, setLoadingText] = useState("Creating account");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let dotIndex = 1;
    let interval;

    if (isLoading) {
      interval = setInterval(() => {
        setLoadingText(`Creating account${".".repeat(dotIndex)}`);
        dotIndex = dotIndex === 3 ? 1 : dotIndex + 1;
      }, 300); // Change dots every 3ms

      setTimeout(() => {
        clearInterval(interval); // Stop changing dots after 10 seconds
        setIsLoading(false);
        setLoadingText("Create Account");
      }, 10000); // 10 seconds duration
    }

    // Cleanup interval when not loading
    return () => clearInterval(interval);
  }, [isLoading]);

  return (
    <Container centerContent={true} centerHorizontal={true}>
      <View className="border-[#D9D9D9] border rounded-2xl w-[85%] h-auto p-5">
        <View>
          <Text className={"font-extrabold text-2xl"}>Hello, There!</Text>
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
            styles="flex-1 mr-1.5"
            textStyle="font-normal text-base text-[#6C6C6C]"
            onPress={() => router.replace("/signIn")}
          />
          <CustomButton
            label="Create Account"
            styles="flex-1 bg-white min-h-9 py-1.5 my-1.5 mx-1.5 rounded-sm"
            textStyle="font-bold text-base text-[#0A0A0A]"
          />
        </View>

        <View className={"my-8"}>
          <Controller
            name="fullName"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <FormField
                formHeader={"Full Name"}
                placeholder={"Enter your Full Name"}
                containerStyles={"mb-6"}
                styles="mt-1"
                error={errors.fullName?.message}
                letterCase="words"
                value={value}
                onBlur={onBlur}
                handleChangeText={onChange}
              />
            )}
          />

          <Controller
            name="email"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <FormField
                formHeader={"Email"}
                placeholder={"Enter your Email"}
                containerStyles={"mb-6"}
                styles="mt-1"
                keyboardType="email-address"
                error={errors.email?.message}
                value={value}
                onBlur={onBlur}
                handleChangeText={onChange}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <FormField
                formHeader={"Password"}
                placeholder={"Enter your Password"}
                type="password"
                containerStyles={"mb-6"}
                styles="mt-1"
                error={errors.password?.message}
                value={value}
                onBlur={onBlur}
                handleChangeText={onChange}
              />
            )}
          />

          <Controller
            name="confirmPassword"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <FormField
                formHeader={"Confirm Password"}
                placeholder={"Confirm your Password"}
                type="password"
                styles="mt-1"
                error={errors.confirmPassword?.message}
                value={value}
                onBlur={onBlur}
                handleChangeText={onChange}
              />
            )}
          />
        </View>

        <CustomButton
          label={loadingText}
          styles="w-full bg-[#161515] h-12 text-base mb-6"
          textStyle={`font-medium text-[#fff] ${isLoading && "text-xl"}`}
          onPress={handleSubmit(onSubmit)}
          disabled={isLoading}
        />

        <Text className={"font-light text-base text-[#6C6C6C] text-justify"}>
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </Text>
      </View>
    </Container>
  );
};

export default signUp;
