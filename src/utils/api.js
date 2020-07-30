import axios from "axios";
import { BASE_URL } from "react-native-dotenv";

export default axios.create({
  baseURL: BASE_URL,
});
