import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  title, 
  onPress, 
  style, 
  textStyle, 
  disabled = false 
}) => {
  return (
    <TouchableOpacity 
      style={[styles.button, style, disabled && styles.disabledButton]} 
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text style={[styles.buttonText, textStyle, disabled && styles.disabledText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#e9e9ff', // prontBg3
    borderWidth: 1,
    borderColor: '#DDD8F7',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 0, // No border radius
    minHeight: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: 'Roboto',
    fontSize: 14,
    fontWeight: '500',
    color: '#232323', // prontoText
    textAlign: 'center',
  },
  disabledButton: {
    backgroundColor: '#f2f2f2',
    borderColor: '#e0e0e0',
  },
  disabledText: {
    color: '#999999',
  },
});

export default Button;
