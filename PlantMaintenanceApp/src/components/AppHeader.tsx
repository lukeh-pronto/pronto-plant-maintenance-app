import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface AppHeaderProps {
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
  showStatusButton?: boolean;
  isOfflineMode?: boolean;
  onBack?: () => void;
  onStatusPress?: () => void;
  backgroundColor?: string;
  statusBarColor?: string;
}

const AppHeader: React.FC<AppHeaderProps> = ({
  title,
  subtitle,
  showBackButton = false,
  showStatusButton = false,
  isOfflineMode = false,
  onBack,
  onStatusPress,
  backgroundColor = '#ddd8f7',
  statusBarColor = '#473d78',
}) => {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={statusBarColor} />
      <View style={[styles.headerContainer, { backgroundColor: statusBarColor }]}>
        <SafeAreaView style={[styles.header, { backgroundColor }]}>
          {showBackButton && (
            <TouchableOpacity style={styles.backButton} onPress={onBack}>
              <MaterialIcons name="arrow-back" size={24} color="#242424" />
            </TouchableOpacity>
          )}
          
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>{title}</Text>
            {subtitle && <Text style={styles.headerSubtitle}>{subtitle}</Text>}
          </View>
          
          {showStatusButton && (
            <TouchableOpacity 
              style={styles.statusButton}
              onPress={onStatusPress}
              activeOpacity={0.7}
            >
              <Text style={[styles.statusText, isOfflineMode && styles.offlineStatus]}>
                {isOfflineMode ? 'Offline' : 'Online'}
              </Text>
            </TouchableOpacity>
          )}
        </SafeAreaView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    minHeight: 56, // Standard header height
  },
  backButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  headerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  headerTitle: {
    fontFamily: 'Roboto',
    fontSize: 16,
    fontWeight: '600',
    color: '#242424',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontFamily: 'Roboto',
    fontSize: 12,
    fontWeight: '400',
    color: '#666',
    textAlign: 'center',
    marginTop: 2,
  },
  statusButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  statusText: {
    fontFamily: 'Roboto',
    fontSize: 11,
    fontWeight: '400',
    color: '#14662c',
    letterSpacing: 0.25,
  },
  offlineStatus: {
    color: '#d32f2f',
  },
});

export default AppHeader;
