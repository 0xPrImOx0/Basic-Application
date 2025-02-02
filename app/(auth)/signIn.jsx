import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import Container from "../../components/Container";
import CustomButton from "../../components/CustomButton";
import FormField from "../../components/FormField";
import { Redirect, router } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { signInSchema } from "../../utils/validate";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../../services/auth-provider";
import { logIn } from "../../services/auth";
import Toast from "react-native-toast-message";

const signIn = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(signInSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Login");

  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      console.log("Point reached");

      const { error } = await logIn(data.email, data.password);

      if (error) {
        return Toast.show({
          type: "error",
          text1: error.message || "An error occurred",
        });
      } else {
        Toast.show({
          type: "success",
          text1: "Logged in Successfully!",
        });

        router.replace("/home");
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: error.message || "An unexpected error occurred",
      });
    } finally {
      console.log(data);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let dotIndex = 1;
    let interval;

    if (isLoading) {
      interval = setInterval(() => {
        setLoadingText(`Logging in${".".repeat(dotIndex)}`);
        dotIndex = dotIndex === 3 ? 1 : dotIndex + 1;
      }, 300); // Change dots every 300ms
    }

    // Cleanup when isLoading becomes false
    return () => clearInterval(interval);
  }, [isLoading]);

  return (
    <Container centerContent={true} centerHorizontal={true}>
      <View className="flex border-[#D9D9D9] border rounded-2xl w-[85%] h-auto p-5">
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
        </View>

        <CustomButton
          label={loadingText}
          styles="w-full bg-[#161515] h-12 text-base mb-6"
          textStyle={`font-medium text-[#fff] ${isSubmitting && "text-xl"}`}
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
        />
        <Text className={"font-light text-base text-[#6C6C6C] text-justify"}>
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </Text>
      </View>
    </Container>
  );
};

export default signIn;
