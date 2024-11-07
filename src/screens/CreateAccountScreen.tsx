import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { validateEmail, validateName } from '../utils/validators';
import { UserContext } from '../context/UserContext';
import { apiService } from '../services/ApiService';
import { useNavigation } from '@react-navigation/native';

interface Errors {
  name?: string;
  email?: string;
  password?: string;
  terms?: string;
}

const CreateAccountScreen: React.FC = () => {
  const { dispatch } = useContext(UserContext);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [acceptTerms, setAcceptTerms] = useState<boolean>(false);
  const [errors, setErrors] = useState<Errors>({});
  const navigation = useNavigation();

  const validateForm = (): boolean => {
    const newErrors: Errors = {};
    if (!validateName(name)) newErrors.name = 'Name must be 1-50 characters';
    if (!validateEmail(email)) newErrors.email = 'Invalid email format';
    if (password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (!acceptTerms) newErrors.terms = 'You must accept the terms and privacy policy';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      const user = await apiService.createUser({ name, email, password });
      console.log('print user',JSON.stringify(user));
      dispatch({ type: 'SET_USER', payload: { name: user.name, email: user.email } });
      if(user!=null){
      navigation.navigate('Success');
      }
  }
  };

  const handleGoogleSignUp = () => {
    console.log('Google Sign Up pressed');
  };
  return (
   <ScrollView>
    <View style={styles.container}>
      <Image
        source={require('../assets/rakbank-logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Create Account</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={name}
          onChangeText={setName}
          placeholderTextColor="#666"
        />
        {errors.name && <Text style={styles.error}>{errors.name}</Text>}

        <TextInput
          style={styles.input}
          placeholder="Email address"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#666"
        />
        {errors.email && <Text style={styles.error}>{errors.email}</Text>}

        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, styles.passwordInput]}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            placeholderTextColor="#666"
          />
          <TouchableOpacity
            style={styles.passwordToggle}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Icon name={showPassword ? 'visibility-off' : 'visibility'} size={24} color="#666" />
          </TouchableOpacity>
        </View>
        {errors.password && <Text style={styles.error}>{errors.password}</Text>}

        <View style={styles.termsContainer}>
          <CheckBox
            value={acceptTerms}
            onValueChange={setAcceptTerms}
            tintColors={{ true: '#E53935', false: '#666' }}
          />
          <Text style={styles.termsText}>
            I agree with{' '}
            <Text style={styles.link}>Terms</Text> and{' '}
            <Text style={styles.link}>Privacy</Text>
          </Text>
        </View>
        {errors.terms && <Text style={styles.error}>{errors.terms}</Text>}

        <TouchableOpacity style={styles.signUpButton} onPress={handleSubmit}>
          <Text style={styles.signUpButtonText}>SIGN UP</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.googleButton} onPress={handleGoogleSignUp}>
          <Text style={styles.googleButtonText}>Sign Up with Google</Text>
        </TouchableOpacity>

        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginLink}>Log in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 40,
    alignSelf: 'center',
    marginTop: 40,
    marginBottom: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#000000',
    alignSelf:'flex-start',
  },
  inputContainer: {
    width: '100%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#333',
  },
  passwordContainer: {
    position: 'relative',
  },
  passwordInput: {
    paddingRight: 50,
  },
  passwordToggle: {
    position: 'absolute',
    right: 15,
    top: 15,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  termsText: {
    marginLeft: 8,
    color: '#000',
    fontSize: 14,
  },
  link: {
    color: '#E53935',
    textDecorationLine: 'underline',
  },
  signUpButton: {
    backgroundColor: '#E53935',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 20,
  },
  signUpButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
  },
  googleButtonText: {
    marginLeft: 10,
    color: '#666',
    fontSize: 16,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    color: '#666',
    fontSize: 14,
  },
  loginLink: {
    color: '#E53935',
    fontSize: 14,
    fontWeight: 'bold',
  },
  error: {
    color: '#E53935',
    fontSize: 12,
    marginTop: -10,
    marginBottom: 10,
  },
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  successText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default CreateAccountScreen;

