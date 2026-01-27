# 🏥 HealthBridge Mobile

A modern, feature-rich mobile application built with React Native and Expo, designed to help users manage their health records, appointments, and wellness journey.

[![React Native](https://img.shields.io/badge/React%20Native-0.73-blue.svg)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-50-black.svg)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

## 📱 Features

- 🔐 **Authentication & Onboarding**: Secure sign-in/sign-up with smooth onboarding experience
- 📅 **Appointment Management**: Schedule and manage medical appointments
- 📋 **Health Records**: Store and access your health documents securely
- 👤 **User Profile**: Manage personal information and preferences
- 🎨 **Modern UI**: Clean, intuitive interface with smooth animations
- 🌙 **Dark Mode Support**: Automatic theme switching (coming soon)

## 🏗️ Project Structure

This project follows a **feature-based folder structure** for better scalability and maintainability:

```
healthbridge-mobile/
├── app/                          # Expo Router (file-based routing)
│   ├── (auth)/                   # Authentication routes
│   │   ├── _layout.tsx
│   │   ├── onboarding.tsx
│   │   ├── sign-in.tsx
│   │   └── sign-up.tsx
│   ├── (tabs)/                   # Main app routes
│   │   ├── _layout.tsx
│   │   ├── index.tsx
│   │   ├── appointments/
│   │   ├── records/
│   │   └── profile/
│   ├── _layout.tsx               # Root layout
│   └── index.tsx                 # Entry point
│
├── src/                          # Source code
│   ├── features/                 # Feature modules
│   │   ├── auth/
│   │   │   ├── assets/          # Feature-specific images
│   │   │   ├── screens/         # Screen components
│   │   │   ├── components/      # Feature components
│   │   │   ├── hooks/           # Custom hooks
│   │   │   ├── services/        # API services
│   │   │   ├── types/           # TypeScript types
│   │   │   └── utils/           # Helper functions
│   │   ├── appointments/
│   │   ├── health-records/
│   │   └── profile/
│   │
│   ├── components/              # Shared components
│   │   ├── ui/                  # Basic UI components
│   │   ├── layout/              # Layout components
│   │   └── feedback/            # Feedback components
│   │
│   ├── contexts/                # Global state management
│   ├── hooks/                   # Shared custom hooks
│   ├── services/                # API & external services
│   ├── utils/                   # Utility functions
│   ├── config/                  # App configuration
│   ├── types/                   # Shared TypeScript types
│   └── constants/               # App-wide constants
│
├── assets/                      # Static assets
│   ├── images/
│   ├── fonts/
│   └── videos/
│
└── __tests__/                   # Test files
```

### 🎯 Why Feature-Based Structure?

- **🚀 Faster Development**: Easy to find and add features
- **👥 Better Collaboration**: New developers onboard quickly
- **🧪 Easier Testing**: Logical separation simplifies testing
- **🔧 Scalability**: App grows without chaos
- **📦 Encapsulation**: Related code stays together

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (macOS) or Android Emulator

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/healthBridge01/healthBridge-mobile.git
   cd healthBridge-mobile
   ```

2. **Switch to development branch**
   ```bash
   git checkout dev
   ```

3. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

4. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your configuration:
   ```
   EXPO_PUBLIC_API_URL=https://api.healthbridge.com
   EXPO_PUBLIC_ENV=development
   ```

5. **Start the development server**
   ```bash
   npx expo start
   ```

6. **Run on your device**
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app on your phone

## 📋 Available Scripts

```bash
# Start development server
npm start

# Start with cache cleared
npm start -- --clear

# Run on iOS
npm run ios

# Run on Android
npm run android

# Run on web
npm run web

# Run tests
npm test

# Lint code
npm run lint

# Type check
npm run type-check

# Build for production
npm run build
```

## 🌿 Branching Strategy

This project uses **Git Flow** with the following branch structure:

### Main Branches

- **`main`** - Production-ready code (protected)
- **`dev`** - Default branch for development (protected)

### Supporting Branches

- **`feature/*`** - New features
- **`bugfix/*`** - Bug fixes
- **`hotfix/*`** - Urgent production fixes
- **`release/*`** - Release preparation

### 📝 Branch Naming Conventions

Follow these naming patterns for consistency:

#### Feature Branches
```
feature/short-description
feature/issue-number-description

Examples:
feature/user-authentication
feature/123-appointment-booking
feature/health-records-upload
```

#### Bug Fix Branches
```
bugfix/short-description
bugfix/issue-number-description

Examples:
bugfix/login-error
bugfix/456-profile-crash
bugfix/appointment-date-format
```

#### Hotfix Branches
```
hotfix/short-description
hotfix/version-number

Examples:
hotfix/security-patch
hotfix/1.2.3
hotfix/critical-api-error
```

#### Release Branches
```
release/version-number

Examples:
release/1.0.0
release/2.1.0
```

### 🔄 Workflow

1. **Create a new branch from `dev`**
   ```bash
   git checkout dev
   git pull origin dev
   git checkout -b feature/my-new-feature
   ```

2. **Make your changes and commit**
   ```bash
   git add .
   git commit -m "feat: add user authentication"
   ```

3. **Push to remote**
   ```bash
   git push origin feature/my-new-feature
   ```

4. **Create a Pull Request to `dev`**
   - Use the PR template
   - Request code review
   - Ensure CI/CD checks pass

5. **After approval, merge to `dev`**

6. **Delete feature branch after merge**
   ```bash
   git branch -d feature/my-new-feature
   git push origin --delete feature/my-new-feature
   ```

## 💬 Commit Message Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

Types:
- feat: New feature
- fix: Bug fix
- docs: Documentation changes
- style: Code style changes (formatting, etc.)
- refactor: Code refactoring
- test: Adding or updating tests
- chore: Maintenance tasks

Examples:
feat(auth): add social login functionality
fix(appointments): resolve date picker crash
docs(readme): update installation instructions
style(button): improve button component styling
refactor(api): restructure service layer
test(auth): add login flow tests
chore(deps): update dependencies
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test -- LoginForm.test.tsx
```

## 📦 Building for Production

### Android
```bash
# Create production build
eas build --platform android --profile production

# Create APK for testing
eas build --platform android --profile preview
```

### iOS
```bash
# Create production build
eas build --platform ios --profile production

# Create build for TestFlight
eas build --platform ios --profile preview
```

## 🔧 Configuration

### Environment Variables

Create `.env` file in the project root:

```env
# API Configuration
EXPO_PUBLIC_API_URL=https://api.healthbridge.com
EXPO_PUBLIC_API_TIMEOUT=10000

# Environment
EXPO_PUBLIC_ENV=development

# Feature Flags
EXPO_PUBLIC_ENABLE_ANALYTICS=false
EXPO_PUBLIC_ENABLE_NOTIFICATIONS=true
```

### TypeScript Path Aliases

The project uses path aliases for cleaner imports:

```typescript
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { images } from '@/constants/images';
```

## 🎨 Code Style

This project uses:
- **ESLint** for code linting
- **Prettier** for code formatting
- **TypeScript** for type safety

### Naming Conventions

#### Files and Folders
- **Components**: PascalCase - `Button.tsx`, `LoginForm.tsx`
- **Hooks**: camelCase with "use" prefix - `useAuth.ts`, `useAppointments.ts`
- **Utils**: camelCase - `formatDate.ts`, `validation.ts`
- **Types**: camelCase with ".types" suffix - `auth.types.ts`
- **Constants**: camelCase - `colors.ts`, `images.ts`
- **Folders**: kebab-case - `health-records/`, `user-profile/`

#### Code
- **Components**: PascalCase - `LoginForm`, `AppointmentCard`
- **Functions**: camelCase - `getUserData()`, `formatDate()`
- **Variables**: camelCase - `userName`, `isLoading`
- **Constants**: UPPER_SNAKE_CASE - `API_URL`, `MAX_RETRIES`
- **Types/Interfaces**: PascalCase - `User`, `Appointment`, `AuthState`

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch from `dev`
3. Make your changes
4. Write/update tests
5. Ensure all tests pass
6. Submit a pull request to `dev`

### Pull Request Guidelines

- Use the PR template
- Link related issues
- Add screenshots for UI changes
- Ensure CI/CD checks pass
- Request review from at least one team member
- Keep PRs focused and atomic

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Lead Developer**: [Your Name](https://github.com/yourusername)
- **Contributors**: See [CONTRIBUTORS.md](CONTRIBUTORS.md)

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/healthBridge01/healthBridge-mobile/issues)
- **Discussions**: [GitHub Discussions](https://github.com/healthBridge01/healthBridge-mobile/discussions)
- **Email**: support@healthbridge.com

## 🗺️ Roadmap

- [ ] Implement dark mode
- [ ] Add push notifications
- [ ] Integrate payment gateway
- [ ] Add multi-language support
- [ ] Implement offline mode
- [ ] Add health data analytics
- [ ] Integrate wearable devices

## 📚 Additional Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Project Wiki](https://github.com/healthBridge01/healthBridge-mobile/wiki)

---

**Made with ❤️ by the HealthBridge Team**
