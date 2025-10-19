---
description: Repository Information Overview
alwaysApply: true
---

# Angular Material Demo Information

## Summary
This project is an Angular application that demonstrates the use of Angular Material components. It includes examples of lazy loading components and features a simple employee management system with login, dashboard, and employee views.

## Structure
- **src/**: Contains the application source code
  - **app/**: Main application code with components, services, and configuration
  - **Screenshot/**: Contains screenshots showing lazy loading examples
- **public/**: Public assets including favicon
- **dist/**: Build output directory

## Language & Runtime
**Language**: TypeScript
**Version**: TypeScript 5.9.2
**Framework**: Angular 20.3.0
**Build System**: Angular CLI 20.3.2
**Package Manager**: npm

## Dependencies
**Main Dependencies**:
- Angular Core (^20.3.0)
- Angular Material (^20.2.9)
- Angular CDK (^20.2.9)
- RxJS (~7.8.0)
- Zone.js (~0.15.0)

**Development Dependencies**:
- Angular CLI (^20.3.2)
- Jasmine (~5.1.0)
- Karma (~6.4.0)
- TypeScript (~5.9.2)

## Build & Installation
```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Start JSON server for mock API
npm run json
```

## Application Structure
**Main Components**:
- **Login**: Entry point component
- **Dashboard**: Main application dashboard
- **Employee**: Employee management interface
- **Nav**: Navigation component
- **Spinner**: Loading indicator component

**Services**:
- **API Service**: Handles data operations
- **Auth Service**: Manages authentication
- **Notification Service**: Handles user notifications

## Data Management
The application uses a JSON server to simulate a backend API. The mock database is located at `src/app/database/db.json` and contains employee records.

## Testing
**Framework**: Jasmine/Karma
**Test Location**: Component-level spec files (*.spec.ts)
**Configuration**: karma.conf.js (configured via angular.json)
**Run Command**:
```bash
npm test
```

## Styling
The application uses SCSS for styling with Angular Material theming. The main styles are defined in `src/styles.scss` with a theme colors file at `src/_theme-colors.scss`.