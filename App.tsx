import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Switch,
  ScrollView,
  Alert,
  SafeAreaView,
  StatusBar,
  Clipboard,
} from 'react-native';
import * as yup from 'yup';

const passwordSchema = yup.object().shape({
  passwordLength: yup
    .number()
    .min(6, 'Password must have at least 6 characters')
    .max(12, 'Password can have maximum 12 characters')
    .required('Password length is required'),
});

export default function App() {
  const [password, setPassword] = useState('');
  const [isPasswordGenerated, setIsPasswordGenerated] = useState(false);
  const [lowercase, setLowercase] = useState(true);
  const [uppercase, setUppercase] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [passwordLength, setPasswordLength] = useState('10');

  const generatePasswordString = (passwordLength: number) => {
    let characterSet = '';
    if (lowercase) characterSet += 'abcdefghijklmnopqrstuvwxyz';
    if (uppercase) characterSet += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (symbols) characterSet += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    if (numbers) characterSet += '0123456789';

    if (characterSet.length === 0) {
      Alert.alert('Error', 'Please select at least one character type');
      return;
    }

    const newPassword = createPassword(characterSet, passwordLength);
    setPassword(newPassword);
    setIsPasswordGenerated(true);
  };

  const createPassword = (characters: string, passwordLength: number) => {
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < passwordLength; i++) {
      const charactersIndex = Math.floor(Math.random() * charactersLength);
      result += characters.charAt(charactersIndex);
    }
    return result;
  };

  const resetPassword = () => {
    setPassword('');
    setIsPasswordGenerated(false);
    setLowercase(true);
    setUppercase(true);
    setSymbols(true);
    setNumbers(true);
    setPasswordLength('10');
  };

  const copyToClipboard = () => {
    if (password) {
      Clipboard.setString(password);
      Alert.alert('Success', 'Password copied to clipboard!');
    }
  };

  const handleGenerate = () => {
    try {
      const length = parseInt(passwordLength);
      passwordSchema.validateSync({ passwordLength: length });
      generatePasswordString(length);
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        Alert.alert('Validation Error', error.message);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>🔐 Password Generator</Text>
          <Text style={styles.subtitle}>
            Create strong, secure passwords instantly
          </Text>
        </View>

        <View style={styles.card}>
          <View style={styles.passwordContainer}>
            <Text style={styles.passwordLabel}>Generated Password</Text>
            <View style={styles.passwordBox}>
              <Text style={styles.passwordText}>
                {password || 'Click Generate to create a password'}
              </Text>
              {isPasswordGenerated && (
                <TouchableOpacity
                  onPress={copyToClipboard}
                  style={styles.copyButton}
                >
                  <Text style={styles.copyButtonText}>📋 Copy</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Password Length</Text>
            <TextInput
              style={styles.input}
              value={passwordLength}
              onChangeText={setPasswordLength}
              keyboardType="numeric"
              placeholder="Enter length (6-12)"
              placeholderTextColor="#6c6c7a"
              maxLength={2}
            />
          </View>

          <View style={styles.optionsContainer}>
            <Text style={styles.optionsTitle}>Character Options</Text>

            <View style={styles.optionItem}>
              <Text style={styles.optionLabel}>Lowercase (a-z)</Text>
              <Switch
                value={lowercase}
                onValueChange={setLowercase}
                trackColor={{ false: '#767577', true: '#4CAF50' }}
                thumbColor={lowercase ? '#fff' : '#f4f3f4'}
              />
            </View>

            <View style={styles.optionItem}>
              <Text style={styles.optionLabel}>Uppercase (A-Z)</Text>
              <Switch
                value={uppercase}
                onValueChange={setUppercase}
                trackColor={{ false: '#767577', true: '#4CAF50' }}
                thumbColor={uppercase ? '#fff' : '#f4f3f4'}
              />
            </View>

            <View style={styles.optionItem}>
              <Text style={styles.optionLabel}>Symbols (!@#$%)</Text>
              <Switch
                value={symbols}
                onValueChange={setSymbols}
                trackColor={{ false: '#767577', true: '#4CAF50' }}
                thumbColor={symbols ? '#fff' : '#f4f3f4'}
              />
            </View>

            <View style={styles.optionItem}>
              <Text style={styles.optionLabel}>Numbers (0-9)</Text>
              <Switch
                value={numbers}
                onValueChange={setNumbers}
                trackColor={{ false: '#767577', true: '#4CAF50' }}
                thumbColor={numbers ? '#fff' : '#f4f3f4'}
              />
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.generateButton}
              onPress={handleGenerate}
            >
              <Text style={styles.buttonText}>Generate Password</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.resetButton}
              onPress={resetPassword}
            >
              <Text style={styles.buttonText}>Reset</Text>
            </TouchableOpacity>
          </View>

          {isPasswordGenerated && (
            <View style={styles.strengthContainer}>
              <Text style={styles.strengthText}>
                Password Strength:{' '}
                {password.length >= 10 && password.length <= 12
                  ? '💪 Strong'
                  : password.length >= 8
                  ? '👍 Good'
                  : '⚠️ Weak'}
              </Text>
            </View>
          )}
        </View>

        <Text style={styles.footer}>
          Secure your accounts with strong passwords
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  header: {
    marginTop: 30,
    marginBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#a8a8b3',
    fontWeight: '400',
  },
  card: {
    backgroundColor: '#16213e',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  passwordContainer: {
    marginBottom: 24,
  },
  passwordLabel: {
    color: '#a8a8b3',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  passwordBox: {
    flexDirection: 'row',
    backgroundColor: '#0f3460',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 56,
    borderWidth: 1,
    borderColor: '#1a4a8a',
  },
  passwordText: {
    color: '#ffffff',
    fontSize: 16,
    flex: 1,
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  copyButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    marginLeft: 12,
  },
  copyButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputLabel: {
    color: '#a8a8b3',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#0f3460',
    borderRadius: 12,
    padding: 16,
    color: '#ffffff',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#1a4a8a',
  },
  optionsContainer: {
    marginBottom: 24,
  },
  optionsTitle: {
    color: '#a8a8b3',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  optionLabel: {
    color: '#ffffff',
    fontSize: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  generateButton: {
    flex: 2,
    backgroundColor: '#4CAF50',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginRight: 6,
  },
  resetButton: {
    flex: 1,
    backgroundColor: '#e74c3c',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginLeft: 6,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  strengthContainer: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#0f3460',
    borderRadius: 10,
    alignItems: 'center',
  },
  strengthText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '500',
  },
  footer: {
    marginTop: 30,
    textAlign: 'center',
    color: '#6c6c7a',
    fontSize: 13,
  },
});
