import { View, Text } from "react-native";
import React from "react";
import Svg, {
  Text as SvgText,
  Defs,
  LinearGradient,
  Stop,
  G,
} from "react-native-svg";

const LogoName = ({ style }) => {
  return (
    <View className={`${style}`}>
      <Svg width="300" height="70">
        <Defs>
          <LinearGradient id="gradient" x1="30%" y1="0%" x2="70%" y2="100%">
            <Stop offset="34%" stopColor="#0A0A0A" />
            <Stop offset="61%" stopColor="#707070" />
          </LinearGradient>
        </Defs>
        <G>
          <SvgText
            fill="url(#gradient)"
            fontSize="50"
            fontWeight="bold"
            x="50%"
            y="50%"
            textAnchor="middle"
            alignmentBaseline="middle"
          >
            ClassMate
          </SvgText>
        </G>
      </Svg>
    </View>
  );
};

export default LogoName;
