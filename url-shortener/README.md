# URL Shortener React Application

A modern, responsive URL shortener web application built with React. This application allows users to create short URLs from long ones, track click statistics, and manage their links through an intuitive dashboard.

## 🚀 Features

### Core Functionality
- **URL Shortening**: Convert long URLs into short, shareable links
- **Custom Shortcodes**: Option to create custom shortcodes instead of random ones
- **Expiry Management**: Set custom expiry times for links (default: 30 days)
- **Click Tracking**: Detailed analytics for each shortened URL
- **Real-time Statistics**: View click counts, timestamps, referrers, and locations

### User Interface
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Clean UI**: Modern, intuitive interface with smooth animations
- **Real-time Validation**: Client-side form validation with helpful error messages
- **Loading States**: Visual feedback during API operations
- **Copy to Clipboard**: Easy sharing with one-click copy functionality

### Technical Features
- **React Router**: Seamless navigation and URL redirection
- **Mock API**: Built-in mock backend for development and testing
- **Local Storage**: Persistent data storage for development
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Development Tools**: Built-in tools for seeding and clearing test data

## 🛠️ Technology Stack

- **Frontend**: React 18
- **Routing**: React Router DOM
- **Styling**: Native CSS with modern features
- **HTTP Client**: Axios (with mock service for development)
- **Storage**: LocalStorage (for development/demo)
- **Build Tool**: Create React App

## 🚦 Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation & Running

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the development server**
   ```bash
   npm start
   ```

3. **Open your browser**
   Navigate to `http://localhost:3000`

## 🎯 Usage

### Creating Short URLs

1. **Navigate to the Home Page**
   - Enter a long URL in the "Long URL" field
   - Optionally, provide a custom shortcode
   - Optionally, set an expiry time in minutes
   - Click "Shorten URL"

2. **View Results**
   - The shortened URL will be displayed
   - Copy the URL using the copy button
   - Note the expiry date

### Viewing Statistics

1. **Navigate to the Stats Page**
   - View all your created URLs
   - See click counts for each URL
   - Expand individual URLs to see detailed click data
   - View timestamps, referrers, and locations for each click

### Using Short URLs

1. **Share the Short URL**
   - Anyone can click on the short URL
   - They will be automatically redirected to the original URL
   - Each click is tracked and recorded

## 🔧 Development Features

### Mock API Service
The application includes a comprehensive mock API service that simulates a real backend:

- **Data Persistence**: Uses localStorage to maintain data between sessions
- **Realistic Delays**: Simulates network latency
- **Error Simulation**: Handles various error scenarios
- **Sample Data**: Includes functionality to seed sample data

### Development Tools
In development mode, you'll see a development tools panel that allows you to:

- **Seed Sample Data**: Add sample URLs and clicks for testing
- **Clear All Data**: Reset the application state

### Client-Side Validation
Comprehensive form validation includes:

- **URL Format**: Ensures URLs start with http:// or https://
- **Shortcode Format**: Validates alphanumeric characters only
- **Expiry Validation**: Ensures positive numbers for expiry times
- **Real-time Feedback**: Shows errors as users type

## 📁 Project Structure

```
src/
├── components/
│   ├── HomePage.js          # URL shortener form
│   ├── StatsPage.js         # Statistics dashboard
│   ├── RedirectHandler.js   # Handles URL redirection
│   ├── Navigation.js        # Navigation component
│   └── DevTools.js          # Development utilities
├── services/
│   ├── api.js              # Real API service (for production)
│   └── mockApi.js          # Mock API service (for development)
├── App.js                  # Main application component
└── index.js               # Application entry point
```

## 🎨 Styling Approach

The application uses native CSS with modern features:

- **CSS Grid & Flexbox**: For responsive layouts
- **CSS Variables**: For consistent theming
- **Animations**: Smooth transitions and loading states
- **Mobile-First**: Responsive design principles
- **Custom Components**: No external UI libraries

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

This creates a `build` folder with optimized production files.

## 📱 Responsive Design

The application is fully responsive and works on:

- **Desktop**: Full-featured experience
- **Tablet**: Optimized layout for medium screens
- **Mobile**: Touch-friendly interface with stacked layouts

---

**Built with ❤️ using React**
