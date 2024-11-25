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
import { auth, db } from "@/firebaseConfig";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Stack, router } from "expo-router";
import { doc, setDoc } from "firebase/firestore";

const SignUp = () => {
  const [details, setDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const signUp = async () => {
    setLoading(true);
    try {
      // Create user with email and password
      const response = await createUserWithEmailAndPassword(
        auth,
        details.email,
        details.password
      );

      // Save user details to Firestore
      const user = response.user;
      await setDoc(doc(db, "users", user.uid), {
        firstName: details.firstName,
        lastName: details.lastName,
        email: details.email,
        createdAt: new Date(),
      });

      console.log("User created:", user);
      alert("Account created successfully! Check your email.");
      router.push("/login");
    } catch (error: any) {
      console.error(error);
      alert(`Sign up failed: ${error.message}`);
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
        >
          <View>
            <Text className="text-4xl">Sign up</Text>
          </View>
          {/* Form */}
          <View className="mt-10 mb-5">
            {/* First Name */}
            <View className="mb-5">
              <Text className="mb-2 text-lg">First Name</Text>
              <TextInput
                className="w-full h-14 border border-gray-600 rounded-md pl-5"
                placeholder="Enter First Name..."
                value={details.firstName}
                onChangeText={(text) =>
                  setDetails({ ...details, firstName: text })
                }
              />
            </View>
            {/* Last Name */}
            <View className="mb-5">
              <Text className="mb-2 text-lg">Last Name</Text>
              <TextInput
                className="w-full h-14 border border-gray-600 rounded-md pl-5"
                placeholder="Enter Last Name..."
                value={details.lastName}
                onChangeText={(text) =>
                  setDetails({ ...details, lastName: text })
                }
              />
            </View>
            {/* Email */}
            <View className="mb-5">
              <Text className="mb-2 text-lg">Email</Text>
              <TextInput
                className="w-full h-14 border border-gray-600 rounded-md pl-5"
                placeholder="Enter Email..."
                value={details.email}
                onChangeText={(text) => setDetails({ ...details, email: text })}
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
              onPress={signUp}
            >
              <Text className="text-lg text-white ">
                {loading ? <ActivityIndicator className="text-white" /> : "Sign up"}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUp;
