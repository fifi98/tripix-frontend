import { Alert } from "react-native";

const validate = {
  name(name) {
    if (!/\s/.test(name)) {
      Alert.alert("Please enter a valid full name!");
      return false;
    }
    return true;
  },

  email(email) {
    if (!/\S+@\S+\.\S+/.test(email)) {
      Alert.alert("Please enter a valid email address!");
      return false;
    }
    return true;
  },

  password(password, confirmPassword = password) {
    if (password.length < 6) {
      Alert.alert("Password must be at least 6 characters long!");
      return false;
    }
    if (password !== confirmPassword) {
      Alert.alert("New password and confirm new password do not match!");
      return false;
    }
    return true;
  },
};

export default validate;
