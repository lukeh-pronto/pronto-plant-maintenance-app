import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import HomeScreen from './src/screens/HomeScreen';
import { LanguageProvider } from './src/contexts/LanguageContext';
import { LoadingScreen } from './src/components';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Show loading screen for 3 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <LanguageProvider>
        <PaperProvider>
          <View style={styles.container}>
            <LoadingScreen onAnimationComplete={handleLoadingComplete} />
            <StatusBar style="light" />
          </View>
        </PaperProvider>
      </LanguageProvider>
    );
  }

  return (
    <LanguageProvider>
      <PaperProvider>
        <View style={styles.container}>
          <HomeScreen />
          <StatusBar style="auto" />
        </View>
      </PaperProvider>
    </LanguageProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
