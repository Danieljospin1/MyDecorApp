import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    if (!email.includes('@')) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }
    try {
      await AsyncStorage.setItem('userEmail', email);
      router.replace('/');
    } catch (error) {
      console.error('Failed to save email', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome 👋</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.info}>
        We only use your email to securely sync your data with your Google Drive. We will never spam you.
      </Text>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff', justifyContent: 'center' },
  title: { fontSize: 32, fontWeight: '700', marginBottom: 24, color: '#333', alignSelf: 'center' },
  input: { height: 50, borderColor: '#ccc', borderWidth: 1, borderRadius: 12, paddingHorizontal: 16, marginBottom: 12, fontSize: 16, backgroundColor: '#f9f9f9' },
  info: { fontSize: 14, color: '#666', marginBottom: 24, textAlign: 'center' },
  button: { backgroundColor: '#4F46E5', paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
});
