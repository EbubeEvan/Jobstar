import {
  View,
  Text,
  ActivityIndicator,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { auth } from "@/firebaseConfig";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Stack, Link, router } from "expo-router";

const Login = () => {
  const [details, setDetails] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const login = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(
        auth,
        details.email,
        details.password
      );
      console.log(response);
      router.replace("/(tabs)");
    } catch (error: any) {
      console.log(error);
      alert(`Sign in failed, ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Stack.Screen
        options={{
          headerShadowVisible: false,
          headerTitle: "",
        }}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 30 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="mt-20">
            <View>
              <Text className="text-4xl">Login</Text>
            </View>
            {/* Form */}
            <View className="mt-10 mb-5">
              {/* Email */}
              <View className="mb-5">
                <Text className="mb-2 text-lg">Email</Text>
                <TextInput
                  className="w-full h-14 border border-gray-600 rounded-md pl-5"
                  placeholder="Enter Email..."
                  value={details.email}
                  onChangeText={(text) =>
                    setDetails({ ...details, email: text })
                  }
                  autoCapitalize="none"
                />
              </View>
              {/* Password */}
              <View>
                <Text className="mb-2 text-lg">Password</Text>
                <TextInput
                  className="w-full h-14 border border-gray-600 rounded-md pl-5"
                  placeholder="Enter Password..."
                  value={details.password}
                  onChangeText={(text) =>
                    setDetails({ ...details, password: text })
                  }
                  secureTextEntry={true}
                  autoCapitalize="none"
                />
              </View>
              <TouchableOpacity
                className="mt-10 py-2 w-full h-14 bg-blue-500 flex flex-row justify-center align-middle rounded-md"
                onPress={login}
              >
                <Text className="text-lg text-white ">
                  {loading ? (
                    <ActivityIndicator className="text-white" />
                  ) : (
                    "Login"
                  )}
                </Text>
              </TouchableOpacity>
            </View>
            <Text className="text-lg ml-5">
              Don't have an account?{" "}
              <Link href="/signup" className="text-red-500">
                Sign up
              </Link>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;
