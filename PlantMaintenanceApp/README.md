# 🌱 Plant Maintenance App

A React Native application for managing plant maintenance tasks, built with Expo and TypeScript.

## 🎨 Design System

This app uses a comprehensive design system based on Figma variables:

### Color Palette

#### Primary Colors
- **Primary**: `#473d78` (prontoUiPrimary) - Main brand color
- **Secondary**: `#b9afea` (prontoUisecondary) - Supporting color
- **Accent**: `#8a3ffc` (prontoBrightPurple) - Highlight color

#### Background Colors
- **Background Primary**: `#f8f7fe` (prontoBg2) - Main screen background
- **Background Secondary**: `#e9e9ff` (prontoBg3) - Card backgrounds
- **Background Tertiary**: `#ddd8f7` (prontoBg1) - Feature item backgrounds
- **Background Quaternary**: `#f2f2f2` (prontoBg4) - Alternative backgrounds

#### Text Colors
- **Text Primary**: `#232323` (prontoText) - Main text color
- **Text Secondary**: `#473d78` (prontoUiPrimary) - Secondary text
- **Text Light**: `#b9afea` (prontoUisecondary) - Light text

### Theme Constants

The app includes a comprehensive theme system with:

- **Spacing**: 8pt grid system (4, 8, 16, 24, 32, 48, 64)
- **Typography**: Font sizes, weights, and line heights
- **Border Radius**: Consistent corner radius values
- **Shadows**: Elevation and shadow styles
- **Layout**: Common layout dimensions and padding
- **Animation**: Duration constants for transitions

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator or Android Emulator (optional)

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```

3. **Run on specific platform:**
   ```bash
   # iOS
   npm run ios
   
   # Android
   npm run android
   
   # Web
   npm run web
   ```

## 📁 Project Structure

```
PlantMaintenanceApp/
├── src/
│   └── constants/
│       ├── colors.ts      # Color definitions
│       ├── theme.ts       # Theme constants
│       └── index.ts       # Exports
├── App.tsx               # Main app component
├── package.json          # Dependencies
└── README.md            # This file
```

## 🎯 Usage Examples

### Using Colors

```typescript
import { Colors } from './src/constants';

// Direct color access
const primaryColor = Colors.primary;
const backgroundColor = Colors.background.primary;

// Using the helper function
import { getColor } from './src/constants';
const color = getColor('background.secondary', '#f0f0f0');
```

### Using Theme Constants

```typescript
import { Theme } from './src/constants';

const styles = StyleSheet.create({
  container: {
    padding: Theme.spacing.md,
    borderRadius: Theme.borderRadius.md,
    ...Theme.shadows.medium,
  },
  title: {
    fontSize: Theme.typography.fontSize.xl,
    fontWeight: Theme.typography.fontWeight.bold,
    lineHeight: Theme.typography.fontSize.xl * Theme.typography.lineHeight.normal,
  },
});
```

### Destructured Imports

```typescript
import { spacing, borderRadius, typography } from './src/constants';

const styles = StyleSheet.create({
  button: {
    padding: spacing.md,
    borderRadius: borderRadius.md,
    fontSize: typography.fontSize.md,
  },
});
```

## 🔧 Development

### Adding New Colors

1. Add the color to `src/constants/colors.ts`
2. Update the type definitions if needed
3. Use the new color in your components

### Adding New Theme Constants

1. Add the constant to `src/constants/theme.ts`
2. Export it from `src/constants/index.ts` if needed
3. Use the new constant in your components

## 📱 Features

- **Responsive Design**: Built with React Native's flexbox system
- **Type Safety**: Full TypeScript support
- **Design System**: Consistent spacing, typography, and colors
- **Cross-Platform**: Works on iOS, Android, and Web
- **Modern UI**: Clean, accessible interface following design best practices

## 🤝 Contributing

1. Follow the existing code style and structure
2. Use the established design system constants
3. Test on multiple platforms when possible
4. Update documentation for new features

## 📄 License

This project is licensed under the MIT License.

---

Built with ❤️ using React Native and Expo
