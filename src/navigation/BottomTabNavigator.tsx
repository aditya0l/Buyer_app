import React from 'react';
import { createBottomTabNavigator, BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Text, StyleSheet, View, TouchableOpacity, Dimensions } from 'react-native';
import { BottomTabParamList, MainStackParamList } from './types';
import { HomeScreen } from '../screens/home/HomeScreen';
import { BrowseScreen } from '../screens/browse/BrowseScreen';
import { BidRoomListScreen } from '../screens/bidroom/BidRoomListScreen';
import { ProfileScreen } from '../screens/profile/ProfileScreen';
import Svg, { Path } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const Tab = createBottomTabNavigator<BottomTabParamList>();
const { width: screenWidth } = Dimensions.get('window');

type NavigationProp = NativeStackNavigationProp<MainStackParamList>;

// Direct High-Fidelity SVG Icons from Figma Group 92.svg
const HomeIcon: React.FC<{ color: string }> = ({ color }) => (
  <Svg width={24} height={24} viewBox="42 48 24 24" fill="none">
    <Path
      d="M65.3529 58.4388L65.3513 58.4372L55.5612 48.6475C55.1439 48.2299 54.589 48 53.9989 48C53.4088 48 52.854 48.2298 52.4365 48.6473L42.6515 58.432C42.6482 58.4353 42.6449 58.4388 42.6416 58.4421C41.7847 59.304 41.7862 60.7023 42.6459 61.562C43.0386 61.955 43.5573 62.1825 44.112 62.2064C44.1345 62.2086 44.1572 62.2096 44.1801 62.2096H44.5703V69.4143C44.5703 70.84 45.7302 72 47.1563 72H50.9864C51.3746 72 51.6895 71.6852 51.6895 71.2969V65.6484C51.6895 64.9979 52.2188 64.4687 52.8693 64.4687H55.1285C55.7791 64.4687 56.3082 64.9979 56.3082 65.6484V71.2969C56.3082 71.6852 56.623 72 57.0114 72H60.8416C62.2676 72 63.4276 70.84 63.4276 69.4144V62.2097H63.7894C64.3794 62.2097 64.9342 61.9799 65.3518 61.5624C66.2124 60.7013 66.2128 59.3005 65.3529 58.4388Z"
      fill={color}
    />
  </Svg>
);

const BrowseIcon: React.FC<{ color: string }> = ({ color }) => (
  <Svg width={24} height={24} viewBox="119.5 48 24 24" fill="none">
    <Path
      d="M139.52 66.3774L142.919 69.7764C143.034 69.8831 143.125 70.0118 143.189 70.1548C143.253 70.2978 143.287 70.4522 143.29 70.6087C143.293 70.7652 143.264 70.9206 143.205 71.0658C143.147 71.2109 143.059 71.3428 142.949 71.4535C142.838 71.5642 142.706 71.6514 142.561 71.71C142.416 71.7687 142.26 71.7975 142.104 71.7947C141.947 71.7919 141.793 71.7577 141.65 71.694C141.507 71.6303 141.378 71.5384 141.272 71.4239L137.871 68.0249C137.659 67.8049 137.544 67.5104 137.544 67.2048C137.547 66.8991 137.67 66.6068 137.886 66.3908C138.102 66.1748 138.395 66.0524 138.7 66.0498C139.006 66.0473 139.3 66.165 139.52 66.3774Z"
      fill={color}
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M129.708 66.0793C131.769 66.0793 133.746 65.2606 135.203 63.8032C136.661 62.3459 137.479 60.3693 137.479 58.3083C137.479 56.2473 136.661 54.2708 135.203 52.8134C133.746 51.3561 131.769 50.5373 129.708 50.5373C127.647 50.5373 125.671 51.3561 124.213 52.8134C122.756 54.2708 121.937 56.2473 121.937 58.3083C121.937 60.3693 122.756 62.3459 124.213 63.8032C125.671 65.2606 127.647 66.0793 129.708 66.0793ZM129.708 68.4106C132.388 68.4106 134.957 67.3463 136.852 65.4517C138.746 63.5572 139.811 60.9876 139.811 58.3083C139.811 55.629 138.746 53.0595 136.852 51.1649C134.957 49.2704 132.388 48.2061 129.708 48.2061C127.029 48.2061 124.46 49.2704 122.565 51.1649C120.67 53.0595 119.606 55.629 119.606 58.3083C119.606 60.9876 120.67 63.5572 122.565 65.4517C124.46 67.3463 127.029 68.4106 129.708 68.4106Z"
      fill={color}
    />
  </Svg>
);

const RoomIcon: React.FC<{ color: string }> = ({ color }) => (
  <Svg width={24} height={24} viewBox="300.5 47 24 24" fill="none">
    <Path
      d="M318.738 56.3591H312.911C312.456 56.3591 312.078 55.9817 312.078 55.5266C312.078 55.0715 312.456 54.6941 312.911 54.6941H318.738C318.959 54.6941 319.171 54.7818 319.327 54.9379C319.483 55.0941 319.571 55.3058 319.571 55.5266C319.571 55.7474 319.483 55.9591 319.327 56.1153C319.171 56.2714 318.959 56.3591 318.738 56.3591ZM307.083 57.2027C306.872 57.2027 306.661 57.125 306.495 56.9585L305.662 56.126C305.34 55.8041 305.34 55.2713 305.662 54.9494C305.984 54.6275 306.517 54.6275 306.839 54.9494L307.083 55.1936L308.992 53.2844C309.314 52.9625 309.847 52.9625 310.169 53.2844C310.491 53.6063 310.491 54.1391 310.169 54.461L307.671 56.9585C307.515 57.1147 307.304 57.2025 307.083 57.2027ZM318.738 64.1291H312.911C312.456 64.1291 312.078 63.7517 312.078 63.2966C312.078 62.8415 312.456 62.4641 312.911 62.4641H318.738C318.959 62.4641 319.171 62.5518 319.327 62.7079C319.483 62.8641 319.571 63.0758 319.571 63.2966C319.571 63.5174 319.483 63.7291 319.327 63.8853C319.171 64.0414 318.959 64.1291 318.738 64.1291ZM307.083 64.9727C306.872 64.9727 306.661 64.895 306.495 64.7285L305.662 63.896C305.34 63.5741 305.34 63.0413 305.662 62.7194C305.984 62.3975 306.517 62.3975 306.839 62.7194L307.083 62.9636L308.992 61.0544C309.314 60.7325 309.847 60.7325 310.169 61.0544C310.491 61.3763 310.491 61.9091 310.169 62.231L307.671 64.7285C307.515 64.8847 307.304 64.9725 307.083 64.9727Z"
      fill={color}
    />
    <Path
      d="M315.83 70.9334H309.17C303.143 70.9334 300.567 68.3582 300.567 62.3309V55.6709C300.567 49.6436 303.143 47.0684 309.17 47.0684H315.83C321.857 47.0684 324.432 49.6436 324.432 55.6709V62.3309C324.432 68.3582 321.857 70.9334 315.83 70.9334ZM309.17 48.7334C304.053 48.7334 302.232 50.5538 302.232 55.6709V62.3309C302.232 67.448 304.053 69.2684 309.17 69.2684H315.83C320.947 69.2684 322.767 67.448 322.767 62.3309V55.6709C322.767 50.5538 320.947 48.7334 315.83 48.7334H309.17Z"
      fill={color}
    />
  </Svg>
);

const ProfileIcon: React.FC<{ color: string }> = ({ color }) => (
  <Svg width={24} height={24} viewBox="374.5 47 24 24" fill="none">
    <Path
      d="M396.463 65.4548C396.431 64.9872 396.365 64.477 396.269 63.9383C396.171 63.3956 396.046 62.8825 395.896 62.4136C395.74 61.9289 395.53 61.4503 395.269 60.9916C394.998 60.5155 394.68 60.101 394.324 59.7599C393.951 59.403 393.494 59.1161 392.966 58.9067C392.44 58.6986 391.857 58.5931 391.233 58.5931C390.988 58.5931 390.751 58.6936 390.293 58.9916C389.968 59.2034 389.642 59.4137 389.315 59.6225C389 59.8229 388.574 60.0106 388.048 60.1805C387.535 60.3466 387.014 60.4308 386.499 60.4308C385.985 60.4308 385.464 60.3466 384.95 60.1805C384.425 60.0107 383.999 59.8231 383.685 59.6227C383.321 59.39 382.991 59.1776 382.705 58.9914C382.248 58.6935 382.011 58.5929 381.766 58.5929C381.142 58.5929 380.559 58.6936 380.033 58.907C379.505 59.1159 379.049 59.4028 378.675 59.7601C378.319 60.1013 378.001 60.5157 377.73 60.9916C377.47 61.4503 377.259 61.9287 377.104 62.4138C376.954 62.8827 376.828 63.3956 376.731 63.9383C376.634 64.4763 376.569 64.9866 376.536 65.4554C376.504 65.9137 376.488 66.8726 376.488 66.8726C376.488 68.1254 376.887 69.1396 377.672 69.8876C378.448 70.6257 379.474 71 380.722 71H392.278C393.526 71 394.552 70.6257 395.328 69.8876C396.113 69.1401 396.512 68.1256 396.512 66.8724C396.511 66.3888 396.495 65.9118 396.463 65.4548ZM394.358 68.8686C393.846 69.3564 393.165 69.5935 392.278 69.5935H380.722C379.835 69.5935 379.154 69.3564 378.642 68.8688C378.139 68.3903 377.895 67.7372 377.895 66.8726C377.895 66.4229 377.91 65.9789 377.939 65.5526C377.968 65.1344 378.027 64.6749 378.115 64.1868C378.202 63.7047 378.312 62.8426 378.443 62.8426C378.569 62.4498 378.74 62.061 378.953 61.6863C379.156 61.3292 379.39 61.0229 379.648 60.7761C379.889 60.5452 380.193 60.3563 380.551 60.2146C380.882 60.0834 381.255 60.0116 381.659 60.0008C381.708 60.0271 381.796 60.077 381.938 60.1696C382.227 60.3581 382.56 60.5731 382.928 60.8083C383.344 61.0731 383.879 61.5186 384.518 61.5186C385.171 61.7299 385.838 61.8372 386.5 61.8372C387.161 61.8372 387.828 61.7299 388.481 61.5188C389.121 61.312 389.656 61.0731 390.071 60.8079C390.448 60.567 390.772 60.3583 391.061 60.1696C391.204 60.0772 391.291 60.027 391.34 60.0008C391.745 60.0116 392.117 60.0834 392.448 60.2145C392.806 60.3563 393.11 60.5454 393.352 60.7761C393.609 61.0227 393.843 61.3291 394.046 61.6865C394.259 62.061 394.431 62.4501 394.556 62.8425C394.688 63.2526 394.798 63.7047 394.884 64.1866C394.972 64.6757 395.031 65.1353 395.06 65.5528V65.5531C395.09 65.9777 395.105 66.4216 395.105 66.8726C395.105 67.7374 394.861 68.3904 394.358 68.8686H394.358Z"
      fill={color}
    />
  </Svg>
);

// High-Fidelity Custom Curved Tab Bar Component matching Figma Group 92.svg
export const CustomTabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.tabBarContainer}>
      {/* Curved SVG Background direct from Figma! */}
      <View style={styles.svgBackgroundWrapper}>
        <Svg width={screenWidth} height={90} viewBox="0 28 440 106" preserveAspectRatio="none">
          <Path
            d="M440 132.597C440 143.642 431.046 152.597 420 152.597H20C8.95431 152.597 0 143.642 0 132.597V48C0 36.9543 8.95431 28 20 28H174.14C178.456 28 181.639 32.0217 181.639 36.3379C181.639 57.6904 198.948 75.0008 220.301 75.001C241.653 75.001 258.964 57.6905 258.964 36.3379C258.964 32.0217 262.147 28 266.463 28H420C431.046 28 440 36.9543 440 48V132.597Z"
            fill="#2563EB"
          />
        </Svg>
      </View>

      {/* Tab Buttons Row Overlay */}
      <View style={styles.buttonsContainer}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            typeof options.tabBarLabel === 'string'
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          // Render elevated center circular button nested inside the curve
          if (route.name === 'ActionTab') {
            return (
              <TouchableOpacity
                key={route.key}
                activeOpacity={0.9}
                style={styles.centerTabButton}
                onPress={() =>
                  navigation.navigate('SelectYourCars')
                }
              >
                <View style={styles.centerCircle}>
                  <Text style={styles.centerPlusText}>+</Text>
                </View>
              </TouchableOpacity>
            );
          }

          let IconComponent = HomeIcon;
          if (route.name === 'HomeTab') IconComponent = HomeIcon;
          else if (route.name === 'BrowseTab') IconComponent = BrowseIcon;
          else if (route.name === 'RoomTab') IconComponent = RoomIcon;
          else if (route.name === 'ProfileTab') IconComponent = ProfileIcon;

          const activeColor = '#FFFFFF';
          const inactiveColor = 'rgba(255, 255, 255, 0.6)';
          const color = isFocused ? activeColor : inactiveColor;

          return (
            <TouchableOpacity
              key={route.key}
              activeOpacity={0.8}
              onPress={onPress}
              style={styles.tabButton}
            >
              <IconComponent color={color} />
              <Text style={[styles.tabLabelText, { color }]}>{label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export const BottomTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{ tabBarLabel: 'Home' }}
      />
      <Tab.Screen
        name="BrowseTab"
        component={BrowseScreen}
        options={{ tabBarLabel: 'Browse' }}
      />
      <Tab.Screen
        name="ActionTab"
        component={HomeScreen}
        options={{ tabBarLabel: '' }}
      />
      <Tab.Screen
        name="RoomTab"
        component={BidRoomListScreen}
        options={{ tabBarLabel: 'Room' }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{ tabBarLabel: 'Profile' }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 90,
    backgroundColor: 'transparent',
    elevation: 8,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  svgBackgroundWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 90,
    zIndex: 1,
  },
  buttonsContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 90,
    flexDirection: 'row',
    zIndex: 2,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 24, // Sits beautifully below the curve boundary
    paddingBottom: 16,
  },
  centerTabButton: {
    flex: 1.1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  centerCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#2563EB', // Figma bright blue circle
    justifyContent: 'center',
    alignItems: 'center',
    top: -22, // Moved up by another 10% (9 pixels) to sit perfectly in the curve
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  centerPlusText: {
    color: '#E5E7EB',
    fontSize: 32,
    fontWeight: '300',
    bottom: 2.5,
  },
  tabLabelText: {
    fontSize: 10,
    marginTop: 4,
    fontFamily: 'Outfit-Bold',
  },
});
