import { View, Image, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import {StyleSheet} from 'react-native';
export  const SuccessScreen: React.FC = () => {
    return (
        <View style={styles.container}>
          <Image
            source={require('../assets/rakbank-logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <View style={styles.successContainer}>
          <Text style={styles.successTitle}>Successfully Submitted!</Text>
          <Image
            source={require('../assets/congrats.png')}
            style={styles.successCircle}
            resizeMode="contain"
          />
       
            <Text style={styles.successText}>
              Our representative will get in touch with you shortly
            </Text>
          </View>
        </View>
      );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
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
    successContainer: {
      flex: 1,
      alignItems: 'center',
    },
    successCircle: {
      width: 250,
      height: 250,
      justifyContent: 'center',
      alignItems: 'center',
    },
    successTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#32a852',
      marginBottom: 10,
    },
    successText: {
      fontSize: 16,
      color: '#666',
      textAlign: 'center',
    },
  });