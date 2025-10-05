/**
 * Color constants for Plant Maintenance App
 * Based on Figma design system variables
 */

export const Colors = {
  // Primary Colors
  primary: '#473d78', // prontoUiPrimary
  secondary: '#b9afea', // prontoUisecondary
  accent: '#8a3ffc', // prontoBrightPurple
  
  // Background Colors
  background: {
    primary: '#f8f7fe', // prontoBg2
    secondary: '#e9e9ff', // prontoBg3
    tertiary: '#ddd8f7', // prontoBg1
    quaternary: '#f2f2f2', // prontoBg4
  },
  
  // Text Colors
  text: {
    primary: '#232323', // prontoText
    secondary: '#473d78', // prontoUiPrimary
    light: '#b9afea', // prontoUisecondary
  },
  
  // UI Element Colors
  ui: {
    primary: '#473d78', // prontoUiPrimary
    secondary: '#b9afea', // prontoUisecondary
    accent: '#8a3ffc', // prontoBrightPurple
  },
  
  // Gradient Colors (placeholder - values not provided in Figma)
  gradient: {
    light: '', // prontoLightGradient - empty in Figma
    dark: '', // prontoDarkGradient - empty in Figma
  },
  
  // Semantic Colors
  semantic: {
    success: '#4CAF50',
    warning: '#FF9800',
    error: '#F44336',
    info: '#2196F3',
  },
  
  // Common Colors
  common: {
    white: '#FFFFFF',
    black: '#000000',
    transparent: 'transparent',
  },
} as const;

// Type for color keys
export type ColorKey = keyof typeof Colors;

// Helper function to get colors with fallback
export const getColor = (colorKey: string, fallback: string = '#000000'): string => {
  const keys = colorKey.split('.');
  let current: any = Colors;
  
  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = current[key];
    } else {
      return fallback;
    }
  }
  
  return typeof current === 'string' ? current : fallback;
};

export default Colors;
