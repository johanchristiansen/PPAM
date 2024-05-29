import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { supabase } from '../supabaseClient';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import { useRouter } from 'expo-router';

const LoginScreen = ({ navigation }) => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      Alert.alert('Error', error.message);
    } else {
      const userId = data.user.id;
      const username = email.split('@')[0];

      // Check if user exists in the user_profiles table
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (userError) {
        // User does not exist, insert new user
        const { error: insertError } = await supabase
          .from('users')
          .insert([{ id: userId, email, username }]);

        if (insertError) {
          Alert.alert('Error', insertError.message);
          return;
        }
      }

      router.push('HomeScreen');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const redirectUri = AuthSession.makeRedirectUri();
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: redirectUri },
      });

      if (error) {
        Alert.alert('Error', error.message);
        return;
      }

      const authUrl = data.url || "";
      const result = await WebBrowser.openAuthSessionAsync(authUrl, redirectUri);

      if (result.type === "success" && result.url) {
        const parsedUrl = new URL(result.url);
        const accessToken = parsedUrl.hash.split("&").reduce((acc, part) => {
          const item = part.split("=");
          if (item[0] === "#access_token") acc = decodeURIComponent(item[1]);
          return acc;
        }, "");
        const refreshToken = parsedUrl.hash.split("&").reduce((acc, part) => {
          const item = part.split("=");
          if (item[0] === "refresh_token") acc = decodeURIComponent(item[1]);
          return acc;
        }, "");

        if (accessToken) {
          const { data: sessionData, error: sessionError } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });

          if (sessionError) {
            Alert.alert("Error", "Failed to set session.");
            return;
          }

          const user = sessionData.user;
          const userId = user.id;
          const email = user.email;
          const username = email.split('@')[0];

          // Check if user exists in the user_profiles table
          const { data: userData, error: userError } = await supabase
            .from('users')
            .select('*')
            .eq('id', userId)
            .single();

          if (userError) {
            // User does not exist, insert new user
            const { error: insertError } = await supabase
              .from('users')
              .insert([{ id: userId, email, username }]);

            if (insertError) {
              Alert.alert('Error', insertError.message);
              return;
            }
          }

          Alert.alert("Login success");
          router.push('HomeScreen');
        } else {
          Alert.alert('Error', 'Failed to retrieve access token.');
        }
      } else {
        Alert.alert('Error', 'Google sign-in was cancelled or failed.');
      }
    } catch (error) {
      console.error("Failed to open web browser or handle Google sign-in:", error);
      Alert.alert('Error', 'An error occurred during Google sign-in. Please try again.');
    }
  };

  const handleNavigateToRegister = () => {
    router.push('Register');
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/iconpawpal.png')} style={styles.logo} />
      <Text style={styles.title}>Login to your Account</Text>
      <TextInput 
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput 
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        autoCapitalize="none"
        value={password}
        onChangeText={setPassword}
      />
      <Text style={styles.signUpText}>Don’t have an account? <Text style={styles.signUpLink} onPress={handleNavigateToRegister}>Sign Up</Text></Text>
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Log In</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.googleButton} onPress={handleGoogleSignIn}>
        <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png' }} style={styles.googleIcon} />
        <Text style={styles.googleButtonText}>Log In with Google</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 32,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  signUpText: {
    fontSize: 14,
    color: '#777',
    marginBottom: 32,
  },
  signUpLink: {
    color: '#0000ff',
    textDecorationLine: 'underline',
  },
  loginButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#3b5998',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 16,
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 18,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 50,
    backgroundColor: '#ffffff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  googleButtonText: {
    fontSize: 18,
    color: '#000',
  },
});

export default LoginScreen;
