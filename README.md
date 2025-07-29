# URL Shortener

A modern, responsive URL shortener built with React that allows users to create short URLs, track analytics, and manage link expiration.

## 🚀 Features

- **URL Shortening**: Convert long URLs into short, shareable links
- **Custom Short Codes**: Create personalized short codes
- **Expiry Management**: Set custom expiration dates for URLs
- **Analytics Dashboard**: Track clicks, referrers, and geographic data
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Real-time Updates**: Instant feedback and live click tracking

## 🛠️ Technology Stack

- **Frontend**: React 18, React Router DOM v6
- **Styling**: Native CSS with responsive design
- **HTTP Client**: Axios for API communication
- **Development**: Create React App
- **Storage**: LocalStorage (development) / REST API ready

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Bristiii/25330822003.git
   cd 25330822003/url-shortener
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🎯 Usage

### Creating Short URLs
1. Enter a long URL in the input field
2. Optionally set a custom short code
3. Choose an expiry date (default: 30 days)
4. Click "Shorten URL"
5. Copy and share your short URL

### Viewing Analytics
1. Click "Statistics" in the navigation
2. View all your shortened URLs
3. See click counts and creation dates
4. Monitor link performance

### Testing Features
- Use "Seed Sample Data" to add test URLs
- Use "Clear All Data" to reset the application
- Test URL redirection by clicking short links

## 🏗️ Architecture

```
src/
├── components/          # React components
│   ├── HomePage.js     # URL creation interface
│   ├── StatsPage.js    # Analytics dashboard
│   ├── RedirectHandler.js # URL redirection logic
│   └── Navigation.js   # App navigation
├── services/           # API services
│   ├── mockApi.js     # Development API
│   └── api.js         # Production API (ready)
└── App.js             # Main application component
```

## 🔧 Development

### Available Scripts
- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

### Key Features
- **Mock API**: Simulates backend with realistic delays
- **Error Handling**: Comprehensive error states
- **Responsive Design**: Mobile-first approach
- **Performance**: Optimized React components

## 🚀 Deployment

The application is ready for deployment to:
- **Netlify**: Drag and drop the `build` folder
- **Vercel**: Connect your GitHub repository
- **GitHub Pages**: Use `npm run build` and deploy

## 🔮 Future Enhancements

- [ ] User authentication and accounts
- [ ] Advanced analytics (geographic, device data)
- [ ] Bulk URL shortening
- [ ] API rate limiting
- [ ] Custom domains
- [ ] QR code generation
- [ ] Link preview functionality

## 📱 Screenshots

### Home Page
Clean, intuitive interface for URL shortening with custom options.

### Statistics Dashboard
Comprehensive analytics showing all shortened URLs and their performance.

### Mobile Responsive
Fully responsive design that works perfectly on all devices.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Bristiii**
- GitHub: [@Bristiii](https://github.com/Bristiii)

## 🙏 Acknowledgments

- React team for the amazing framework
- Create React App for the development setup
- Open source community for inspiration

---

⭐ **Star this repository if you found it helpful!**