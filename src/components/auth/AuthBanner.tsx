import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Ellipse } from 'react-native-svg';
import { TiresIllustration } from './TiresIllustration';
import { CarBountyLogo } from './CarBountyLogo';

export const AuthBanner: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Background Gradient Ellipse (Ellipse 33 in Figma) */}
      <Svg
        width={541.34}
        height={443.77}
        style={styles.gradientEllipse}
      >
        <Defs>
          <LinearGradient id="blueGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor="#2563EB" stopOpacity={0.4} />
            <Stop offset="100%" stopColor="#2563EB" stopOpacity={0.2} />
          </LinearGradient>
        </Defs>
        <Ellipse
          cx={270.67}
          cy={221.88}
          rx={270.67}
          ry={221.88}
          fill="url(#blueGrad)"
        />
      </Svg>

      {/* Tires Illustration */}
      <View style={styles.illustrationContainer}>
        <TiresIllustration style={styles.illustration} />
      </View>

      {/* Foreground Logo */}
      <View style={styles.logoContainer}>
        <CarBountyLogo width={194.95} height={57.58} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 273, // Fits the whole upper deck boundary (top: -170.76 + height: 443.77 = 273.01)
    backgroundColor: '#FFFFFF',
    position: 'relative',
    overflow: 'hidden',
    zIndex: 10,
  },
  gradientEllipse: {
    position: 'absolute',
    top: -170.76,
    left: -92.17,
  },
  illustrationContainer: {
    position: 'absolute',
    top: 79.16,
    left: -70,
  },
  illustration: {
    opacity: 1,
  },
  logoContainer: {
    position: 'absolute',
    top: 112.84,
    left: 19.68,
  },
});
export default AuthBanner;
