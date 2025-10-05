import { Colors } from './colors';

/**
 * Theme constants for Plant Maintenance App
 * Comprehensive design system including colors, spacing, typography, and shadows
 */

export const Theme = {
  colors: Colors,
  
  // Spacing Scale (8pt grid system)
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
    xxxl: 64,
  },
  
  // Border Radius
  borderRadius: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    round: 50, // For circular elements
  },
  
  // Typography Scale
  typography: {
    // Font Sizes
    fontSize: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 20,
      xxl: 24,
      xxxl: 32,
      display: 48,
    },
    
    // Font Weights
    fontWeight: {
      light: '300',
      regular: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      heavy: '800',
    },
    
    // Line Heights
    lineHeight: {
      tight: 1.2,
      normal: 1.4,
      relaxed: 1.6,
      loose: 1.8,
    },
  },
  
  // Shadows
  shadows: {
    small: {
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      elevation: 2,
    },
    medium: {
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.15,
      shadowRadius: 6.27,
      elevation: 4,
    },
    large: {
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 8,
      },
      shadowOpacity: 0.2,
      shadowRadius: 10.32,
      elevation: 8,
    },
  },
  
  // Layout Constants
  layout: {
    // Screen padding
    screenPadding: 16,
    
    // Header height
    headerHeight: 56,
    
    // Bottom tab height
    bottomTabHeight: 80,
    
    // Card padding
    cardPadding: 16,
    
    // Button heights
    buttonHeight: {
      small: 36,
      medium: 48,
      large: 56,
    },
    
    // Input heights
    inputHeight: {
      small: 40,
      medium: 48,
      large: 56,
    },
  },
  
  // Animation Durations
  animation: {
    fast: 150,
    normal: 300,
    slow: 500,
  },
  
  // Z-Index Scale
  zIndex: {
    base: 0,
    card: 1,
    modal: 10,
    overlay: 20,
    tooltip: 30,
    toast: 40,
  },
} as const;

export default Theme;
