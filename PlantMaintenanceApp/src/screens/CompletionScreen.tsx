import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  SafeAreaView,
  PanResponder,
  Animated,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { MaterialIcons } from '@expo/vector-icons';

interface CompletionScreenProps {
  equipmentName?: string;
  equipmentId?: string;
  onComplete?: () => void;
  onBack?: () => void;
}

const CompletionScreen: React.FC<CompletionScreenProps> = ({
  equipmentName = 'Titan-950 Ultra Hauler',
  equipmentId = '0401',
  onComplete,
  onBack,
}) => {
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [notes, setNotes] = useState('');
  const [signature, setSignature] = useState('');
  const [isDrawing, setIsDrawing] = useState(false);
  const [signaturePaths, setSignaturePaths] = useState([]);
  const [currentPath, setCurrentPath] = useState('');
  const [allPaths, setAllPaths] = useState([]);
  const [signatureMode, setSignatureMode] = useState('draw'); // 'text' or 'draw'
  const signatureRef = useRef(null);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: (event) => {
      console.log('PanResponder start', event.nativeEvent);
      setIsDrawing(true);
      const { locationX, locationY } = event.nativeEvent;
      const newPath = `M${locationX},${locationY}`;
      setCurrentPath(newPath);
      setSignaturePaths([{ x: locationX, y: locationY }]);
    },
    onPanResponderMove: (event) => {
      if (!isDrawing) return;
      
      const { locationX, locationY } = event.nativeEvent;
      setSignaturePaths(prev => [...prev, { x: locationX, y: locationY }]);
      setCurrentPath(prev => `${prev} L${locationX},${locationY}`);
    },
    onPanResponderRelease: () => {
      console.log('PanResponder end');
      setIsDrawing(false);
      if (currentPath) {
        setAllPaths(prev => [...prev, currentPath]);
      }
      setCurrentPath('');
    },
  });

  const handleSignatureStart = (event) => {
    console.log('Signature start', event.nativeEvent);
    event.preventDefault();
    setIsDrawing(true);
    const { locationX, locationY } = event.nativeEvent;
    const newPath = `M${locationX},${locationY}`;
    setCurrentPath(newPath);
    setSignaturePaths([{ x: locationX, y: locationY }]);
  };

  const handleSignatureMove = (event) => {
    if (!isDrawing) return;
    
    event.preventDefault();
    const { locationX, locationY } = event.nativeEvent;
    setSignaturePaths(prev => [...prev, { x: locationX, y: locationY }]);
    setCurrentPath(prev => `${prev} L${locationX},${locationY}`);
  };

  const handleSignatureEnd = (event) => {
    console.log('Signature end');
    event.preventDefault();
    setIsDrawing(false);
    if (currentPath) {
      setAllPaths(prev => [...prev, currentPath]);
    }
    setCurrentPath('');
  };

  const clearSignature = () => {
    setSignaturePaths([]);
    setCurrentPath('');
    setAllPaths([]);
    setSignature('');
  };

  const switchToTextMode = () => {
    setSignatureMode('text');
    setSignature(''); // Empty signature
  };

  const switchToDrawMode = () => {
    setSignatureMode('draw');
    setSignature('');
    setSignaturePaths([]);
    setCurrentPath('');
    setAllPaths([]);
  };

  const loadExistingSignature = () => {
    Alert.alert(
      'Load Existing Signature',
      'Choose a signature to load:',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'John Smith', onPress: () => setSignature('John Smith') },
        { text: 'Jane Doe', onPress: () => setSignature('Jane Doe') },
        { text: 'Mike Johnson', onPress: () => setSignature('Mike Johnson') },
        { text: 'Sarah Wilson', onPress: () => setSignature('Sarah Wilson') },
      ]
    );
  };

  const handleComplete = () => {
    Alert.alert(
      'Pre-start Complete',
      'The pre-start checklist has been completed successfully.',
      [
        {
          text: 'OK',
          onPress: () => {
            // Navigate back to home screen
            onComplete?.();
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Purple background above header */}
      <View style={styles.statusBarBackground} />
      
      {/* App Bar */}
      <View style={styles.appBar}>
        <TouchableOpacity style={styles.backButton} onPress={() => onBack?.()}>
          <MaterialIcons name="arrow-back" size={24} color="#232323" />
        </TouchableOpacity>
        <View style={styles.appBarContent}>
          <Text style={styles.appBarTitle}>Complete Pre-start</Text>
          <Text style={styles.appBarSubtitle}>{equipmentName} | {equipmentId}</Text>
        </View>
        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>Online</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Success Message */}
        <View style={styles.successContainer}>
          <MaterialIcons name="check" size={24} color="#14662C" />
          <Text style={styles.successText}>
            Pre-start pass. Item is ready to use.
          </Text>
        </View>

        {/* Time Spent Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Time Spent (Optional)</Text>
          <View style={styles.timeInputContainer}>
            <View style={styles.timeInput}>
              <TextInput
                style={styles.timeInputText}
                value={hours}
                onChangeText={setHours}
                placeholder="Hrs"
                keyboardType="numeric"
              />
            </View>
            <View style={styles.timeInput}>
              <TextInput
                style={styles.timeInputText}
                value={minutes}
                onChangeText={setMinutes}
                placeholder="Mins"
                keyboardType="numeric"
              />
            </View>
          </View>
        </View>

        {/* Notes Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notes (Optional)</Text>
          <View style={styles.notesContainer}>
            <TextInput
              style={styles.notesInput}
              value={notes}
              onChangeText={setNotes}
              placeholder="Add any additional notes..."
              multiline
              numberOfLines={5}
              textAlignVertical="top"
            />
          </View>
        </View>

        {/* Signature Section */}
        <View style={styles.section}>
          <View style={styles.signatureHeader}>
            <Text style={styles.sectionTitle}>Signature</Text>
            <View style={styles.signatureControls}>
              <TouchableOpacity 
                onPress={switchToDrawMode} 
                style={[styles.modeButton, signatureMode === 'draw' && styles.modeButtonActive]}
              >
                <Text style={[styles.modeButtonText, signatureMode === 'draw' && styles.modeButtonTextActive]}>
                  Draw
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={switchToTextMode} 
                style={[styles.modeButton, signatureMode === 'text' && styles.modeButtonActive]}
              >
                <Text style={[styles.modeButtonText, signatureMode === 'text' && styles.modeButtonTextActive]}>
                  Load
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={clearSignature} style={styles.clearButton}>
                <Text style={styles.clearButtonText}>Clear</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          {signatureMode === 'text' ? (
            <View style={styles.textSignatureContainer}>
              <View style={styles.signatureDisplay}>
                {signature ? (
                  <Text style={styles.signatureText}>{signature}</Text>
                ) : (
                  <Text style={styles.emptySignatureText}>Tap "Load" to select a signature</Text>
                )}
              </View>
            </View>
          ) : (
            <View 
              style={styles.signatureContainer}
              {...panResponder.panHandlers}
            >
              {allPaths.length === 0 && currentPath === '' ? (
                <Text style={styles.drawPromptText}>Draw your signature here</Text>
              ) : (
                <View style={styles.signatureCanvas}>
                  <Svg height="120" width="100%" style={styles.svgContainer}>
                    {allPaths.map((path, index) => (
                      <Path
                        key={index}
                        d={path}
                        stroke="#1d1b20"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    ))}
                    {currentPath && (
                      <Path
                        d={currentPath}
                        stroke="#1d1b20"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    )}
                  </Svg>
                </View>
              )}
            </View>
          )}
        </View>
      </ScrollView>

      {/* Complete Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.completeButton} onPress={handleComplete}>
          <Text style={styles.completeButtonText}>Complete</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  statusBarBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 50,
    backgroundColor: '#ddd8f7',
    zIndex: 1001,
  },
  appBar: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    backgroundColor: '#ddd8f7',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    height: 56,
    zIndex: 1000,
  },
  backButton: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appBarContent: {
    flex: 1,
    alignItems: 'flex-start',
    paddingHorizontal: 10,
  },
  appBarTitle: {
    fontFamily: 'Roboto',
    fontSize: 16,
    fontWeight: '600',
    color: '#232323',
    lineHeight: 22,
  },
  appBarSubtitle: {
    fontFamily: 'Roboto',
    fontSize: 12,
    fontWeight: '400',
    color: '#49454f',
    lineHeight: 16,
    letterSpacing: 0.32,
  },
  statusContainer: {
    alignItems: 'center',
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
  content: {
    flex: 1,
    padding: 16,
    paddingTop: 80, // Account for header height
  },
  successContainer: {
    backgroundColor: '#e9e9ff',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    gap: 8,
    marginBottom: 24,
  },
  successText: {
    fontSize: 14,
    color: '#1d1b20',
    lineHeight: 20,
    letterSpacing: 0.25,
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1d1b20',
    lineHeight: 20,
    letterSpacing: 0.1,
    marginBottom: 12,
  },
  timeInputContainer: {
    flexDirection: 'row',
    gap: 3,
  },
  timeInput: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#e6e0e9',
    height: 40,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeInputText: {
    fontSize: 14,
    color: '#1d1b20',
    textAlign: 'center',
    width: '100%',
  },
  notesContainer: {
    borderWidth: 1,
    borderColor: '#dbdbdb',
    borderRadius: 6,
    height: 120,
  },
  notesInput: {
    flex: 1,
    padding: 16,
    fontSize: 14,
    color: '#1d1b20',
    textAlignVertical: 'top',
  },
  signatureHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  signatureControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  modeButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#f5f5f5',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  modeButtonActive: {
    backgroundColor: '#8a3ffc',
    borderColor: '#8a3ffc',
  },
  modeButtonText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  modeButtonTextActive: {
    color: '#ffffff',
  },
  textSignatureContainer: {
    gap: 12,
  },
  signatureDisplay: {
    borderWidth: 1,
    borderColor: '#e6e0e9',
    height: 156,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  drawPromptText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  emptySignatureText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  clearButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#f5f5f5',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  clearButtonText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  signatureContainer: {
    borderWidth: 1,
    borderColor: '#e6e0e9',
    height: 156,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  signatureCanvas: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  svgContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  signatureText: {
    fontSize: 47,
    fontFamily: 'Freestyle Script',
    color: '#1d1b20',
    textAlign: 'center',
    letterSpacing: 0.16,
  },
  signatureDrawnText: {
    fontSize: 16,
    color: '#14662C',
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: 4,
  },
  signaturePathText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  footer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 4,
  },
  completeButton: {
    backgroundColor: '#8a3ffc',
    borderRadius: 4,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  completeButtonText: {
    fontSize: 14,
    color: '#f2f2f2',
    fontWeight: '400',
    lineHeight: 18,
    letterSpacing: 0.16,
  },
});

export default CompletionScreen;
