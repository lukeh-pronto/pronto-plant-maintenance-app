import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Button } from '../components';

interface QRScannerScreenProps {
  onScan: (data: string) => void;
  onClose: () => void;
}

const QRScannerScreenMock: React.FC<QRScannerScreenProps> = ({ onScan, onClose }) => {
  const [scanned, setScanned] = useState(false);

  const handleMockScan = () => {
    if (scanned) return;
    
    setScanned(true);
    
    // Mock scan with a sample equipment ID
    const mockData = '0401'; // Titan-950 Ultra Hauler
    
    Alert.alert(
      'QR Code Scanned (Mock)',
      `Mock scan result: ${mockData}`,
      [
        {
          text: 'Scan Again',
          onPress: () => setScanned(false),
        },
        {
          text: 'Use This Code',
          onPress: () => {
            onScan(mockData);
            onClose();
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <MaterialIcons name="close" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Scan QR Code (Mock)</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Mock Camera View */}
      <View style={styles.cameraContainer}>
        <View style={styles.mockCamera}>
          <MaterialIcons name="camera-alt" size={80} color="#8a3ffc" />
          <Text style={styles.mockText}>Mock Camera View</Text>
          <Text style={styles.mockSubtext}>Camera functionality temporarily disabled</Text>
        </View>
        
        {/* Overlay */}
        <View style={styles.overlay}>
          {/* Top overlay */}
          <View style={styles.overlayTop} />
          
          {/* Middle section with scanning area */}
          <View style={styles.overlayMiddle}>
            <View style={styles.overlaySide} />
            <View style={styles.scanArea}>
              <View style={[styles.scanCorner, styles.topLeft]} />
              <View style={[styles.scanCorner, styles.topRight]} />
              <View style={[styles.scanCorner, styles.bottomLeft]} />
              <View style={[styles.scanCorner, styles.bottomRight]} />
            </View>
            <View style={styles.overlaySide} />
          </View>
          
          {/* Bottom overlay */}
          <View style={styles.overlayBottom}>
            <Button 
              title="Mock Scan QR Code"
              onPress={handleMockScan}
              style={styles.mockScanButton}
              textStyle={styles.mockScanButtonText}
            />
            <Text style={styles.instructionText}>
              Tap the button above to simulate scanning a QR code
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    fontFamily: 'Roboto',
  },
  closeButton: {
    padding: 8,
  },
  placeholder: {
    width: 40,
  },
  cameraContainer: {
    flex: 1,
    position: 'relative',
  },
  mockCamera: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
  },
  mockText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    marginTop: 16,
    fontFamily: 'Roboto',
  },
  mockSubtext: {
    color: '#ccc',
    fontSize: 14,
    marginTop: 8,
    fontFamily: 'Roboto',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  overlayTop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  overlayMiddle: {
    flexDirection: 'row',
    height: 250,
  },
  overlaySide: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  scanArea: {
    width: 250,
    height: 250,
    position: 'relative',
  },
  scanCorner: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderColor: '#8a3ffc',
    borderWidth: 3,
  },
  topLeft: {
    top: 0,
    left: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  topRight: {
    top: 0,
    right: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  overlayBottom: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  mockScanButton: {
    backgroundColor: '#8a3ffc',
    borderColor: '#8a3ffc',
    marginBottom: 16,
  },
  mockScanButtonText: {
    color: '#fff',
  },
  instructionText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Roboto',
    lineHeight: 24,
  },
});

export default QRScannerScreenMock;
