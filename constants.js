import {Dimensions} from "react-native";

const win = Dimensions.get('window');
export const h = Math.round(win.height);
export const w = Math.round(win.width);