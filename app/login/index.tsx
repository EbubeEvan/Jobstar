import { View, Text } from 'react-native'
import { FIRERBASE_AUTH } from '@/firebaseConfig'
import { useState } from 'react'

const Login = () => { 
  const [details, setDetails] = useState({
    email : '',
    password: ''
  })
  const [loading, setLoading] = useState(false)

  const auth = FIRERBASE_AUTH

  return (
    <View></View>
  )
}

export default Login