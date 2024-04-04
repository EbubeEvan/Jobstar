import {
  View,
  Text,
  ActivityIndicator,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { auth } from "@/firebaseConfig";
import { useState } from "react";
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { Stack, router } from "expo-router";

const SignUp = () => {
  const [details, setDetails] = useState({
    email : '',
    password: ''
  })
  const [loading, setLoading] = useState(false)

  const signUp = async() => {
    setLoading(true)
    try {
      const response = await createUserWithEmailAndPassword(auth, details.email, details.password)
      console.log(response);
      alert('Check your email')
      router.push('/login')
    } catch (error : any) {
      console.log(error);
      alert(`Sign up failed, ${error.message}`)
    } finally {
      setLoading(false)
    }
  }


  return (
    <SafeAreaView className="flex-1 bg-white p-10">
      <Stack.Screen
        options={{
          headerShadowVisible: false,
          headerTitle: "",
        }}
      />
      <View className="mt-20">
        <View>
          <Text className="text-4xl">Sign up</Text>
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
              onChangeText={(text) => setDetails({ ...details, email: text })}
              autoCapitalize="none"
            />
          </View>
          {/* Password */}
          <View>
            <Text className="mb-2 text-lg">Password</Text>
            <TextInput
              className="w-full h-14 border border-gray-600 rounded-md pl-5"
              placeholder="Enter Email..."
              value={details.password}
              onChangeText={(text) => setDetails({ ...details, password: text })}
              secureTextEntry={true}
              autoCapitalize="none"
            />
          </View>
          <TouchableOpacity className="mt-10 py-2 w-full h-14 bg-blue-500 flex flex-row justify-center align-middle rounded-md" onPress={signUp}>
            <Text className="text-lg text-white ">{loading ? <ActivityIndicator/> : 'Sign up'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default SignUp