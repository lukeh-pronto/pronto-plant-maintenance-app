import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  FlatList,
  SafeAreaView,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useLanguage } from '../contexts/LanguageContext';
import { Language } from '../constants/languages';

interface LanguageSelectorProps {
  visible: boolean;
  onClose: () => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ visible, onClose }) => {
  const { currentLanguage, setLanguage, availableLanguages, t } = useLanguage();
  const [selectedLanguage, setSelectedLanguage] = useState(currentLanguage);

  const handleLanguageSelect = (languageCode: string) => {
    setSelectedLanguage(languageCode);
    setLanguage(languageCode);
    onClose();
  };

  const renderLanguageItem = ({ item }: { item: Language }) => (
    <TouchableOpacity
      style={[
        styles.languageItem,
        selectedLanguage === item.code && styles.selectedLanguageItem,
      ]}
      onPress={() => handleLanguageSelect(item.code)}
    >
      <View style={styles.languageInfo}>
        <Text style={[
          styles.languageName,
          selectedLanguage === item.code && styles.selectedLanguageText,
        ]}>
          {item.nativeName}
        </Text>
        <Text style={[
          styles.languageEnglishName,
          selectedLanguage === item.code && styles.selectedLanguageSubText,
        ]}>
          {item.name}
        </Text>
      </View>
      {selectedLanguage === item.code && (
        <MaterialIcons name="check" size={24} color="#8a3ffc" />
      )}
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        {/* Header with close button */}
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={onClose} 
            style={styles.closeButton}
            activeOpacity={0.7}
          >
            <MaterialIcons name="close" size={24} color="#242424" />
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Select Language</Text>
          <FlatList
            data={availableLanguages}
            renderItem={renderLanguageItem}
            keyExtractor={(item) => item.code}
            style={styles.languageList}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
    paddingTop: 50,
  },
  closeButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '500',
    color: '#242424',
    marginBottom: 20,
    fontFamily: 'Roboto',
  },
  languageList: {
    flex: 1,
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 48,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 4,
  },
  selectedLanguageItem: {
    backgroundColor: '#f8f7fe',
  },
  languageInfo: {
    flex: 1,
  },
  languageName: {
    fontSize: 14,
    fontWeight: '400',
    color: '#232323',
    marginBottom: 2,
    fontFamily: 'Roboto',
    letterSpacing: 0.16,
  },
  selectedLanguageText: {
    color: '#8a3ffc',
    fontWeight: '500',
  },
  languageEnglishName: {
    fontSize: 12,
    color: '#747474',
    fontFamily: 'Roboto',
    letterSpacing: 0.4,
  },
  selectedLanguageSubText: {
    color: '#8a3ffc',
  },
});

export default LanguageSelector;
