import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
// form validation
import * as yup from 'yup';

const passwordSchema = yup.object().shape({
  passwordLength: yup
    .number()
    .min(6, 'Password must have at least 6 characters')
    .min(12, 'Password can have maximum 12 characters')
    .required(),
});

export default function App() {
  const [password, setPassword] = useState('');
  const [isPasswordGenerated, setIsPasswordGenerated] = useState(false);
  const [lowercase, setLowercase] = useState(false);
  const [uppercase, setUppercase] = useState(false);
  const [symbols, useSymbols] = useState(false);
  const [numbers, userNumbers] = useState(false);

  const generatePasswordString = (passwordLength: number) => {};

  const createPassword = (characters: string, passwordLength: number) => {
    let result = '';
    for (let i = 0; i < passwordLength; i++) {
      const charactersIndex = Math.round(Math.random() * characters.length);
      result += characters.charAt(charactersIndex);
    }
  };

  const reseptPassword = () => {};

  return (
    <View>
      <Text>App</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
