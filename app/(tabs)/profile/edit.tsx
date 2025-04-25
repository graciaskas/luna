import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { useState } from 'react';
import { router } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';

export default function EditProfileScreen() {
  const { user, updateProfile } = useAuth();
  const { isDark } = useTheme();
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function handleSave() {
    try {
      setError('');
      setIsLoading(true);
      await updateProfile({ name, phone });
      router.back();
    } catch (err) {
      setError('Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <ScrollView style={[styles.container, isDark && styles.containerDark]}>
      <TouchableOpacity 
        style={[styles.backButton, isDark && styles.backButtonDark]} 
        onPress={() => router.back()}
      >
        <ArrowLeft size={24} color={isDark ? '#fff' : '#1A1A1A'} />
      </TouchableOpacity>

      <View style={[styles.header, isDark && styles.headerDark]}>
        <Text style={[styles.title, isDark && styles.titleDark]}>Edit Profile</Text>
      </View>

      <View style={styles.form}>
        {error ? <Text style={styles.error}>{error}</Text> : null}

        <View style={styles.inputContainer}>
          <Text style={[styles.label, isDark && styles.labelDark]}>Name</Text>
          <TextInput
            style={[styles.input, isDark && styles.inputDark]}
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
            placeholderTextColor={isDark ? '#666' : '#999'}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={[styles.label, isDark && styles.labelDark]}>Phone Number</Text>
          <TextInput
            style={[styles.input, isDark && styles.inputDark]}
            value={phone}
            onChangeText={setPhone}
            placeholder="Enter your phone number"
            placeholderTextColor={isDark ? '#666' : '#999'}
            keyboardType="phone-pad"
          />
        </View>

        <TouchableOpacity
          style={[styles.button, isLoading && styles.buttonDisabled]}
          onPress={handleSave}
          disabled={isLoading}>
          <Text style={styles.buttonText}>
            {isLoading ? 'Saving...' : 'Save Changes'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  containerDark: {
    backgroundColor: '#1A1A1A',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff',
  },
  headerDark: {
    backgroundColor: '#2D2D2D',
  },
  title: {
    fontSize: 28,
    fontFamily: 'Poppins_600SemiBold',
    color: '#1A1A1A',
  },
  titleDark: {
    color: '#fff',
  },
  form: {
    padding: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Poppins_600SemiBold',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  labelDark: {
    color: '#fff',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: '#1A1A1A',
  },
  inputDark: {
    backgroundColor: '#2D2D2D',
    color: '#fff',
  },
  button: {
    backgroundColor: '#FF6B81',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
  },
  error: {
    color: '#FF3B30',
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    marginBottom: 20,
    textAlign: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  backButtonDark: {
    backgroundColor: '#404040',
  },
});