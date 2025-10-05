# Plant Maintenance App

A React Native application built with Expo for plant maintenance and equipment management.

## Features

- Equipment maintenance tracking
- QR code scanning for equipment identification
- Multi-language support
- Task management and completion tracking
- Pre-start checklist functionality

## Tech Stack

- **React Native** - Mobile app framework
- **Expo** - Development platform and tools
- **TypeScript** - Type-safe JavaScript
- **React Native Paper** - Material Design components
- **React Native Vector Icons** - Icon library
- **Expo Camera** - Camera functionality for QR scanning

## Getting Started

### Prerequisites

- Node.js (>= 18)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd plant_maintenance_app_react_native
```

2. Navigate to the app directory:
```bash
cd PlantMaintenanceApp
```

3. Install dependencies:
```bash
npm install
```

### Running the App

#### iOS Simulator
```bash
npm run ios
# or
expo run:ios
```

#### Android Emulator
```bash
npm run android
# or
expo run:android
```

#### Web (for development)
```bash
npm run web
# or
expo start --web
```

### Development

The app uses Expo for development and building. Key commands:

- `expo start` - Start the development server
- `expo run:ios` - Run on iOS simulator
- `expo run:android` - Run on Android emulator
- `expo build:ios` - Build for iOS
- `expo build:android` - Build for Android

## Project Structure

```
PlantMaintenanceApp/
├── src/
│   ├── components/          # Reusable UI components
│   ├── screens/            # App screens
│   ├── constants/          # App constants and themes
│   └── contexts/           # React contexts
├── assets/                 # Images and static assets
├── ios/                    # iOS-specific files
└── android/                # Android-specific files
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is private and proprietary.
