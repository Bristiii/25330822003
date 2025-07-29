// Mock API service for development and testing
// This simulates a backend API with localStorage as the database

const STORAGE_KEYS = {
  URLS: 'url_shortener_urls',
  CLICKS: 'url_shortener_clicks',
  COUNTER: 'url_shortener_counter'
};

// Helper function to generate random shortcode
const generateShortCode = () => {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// Helper function to get current timestamp
const getCurrentTimestamp = () => new Date().toISOString();

// Helper function to get mock location data
const getMockLocation = () => {
  const locations = [
    { city: 'New York', country: 'United States' },
    { city: 'London', country: 'United Kingdom' },
    { city: 'Mumbai', country: 'India' },
    { city: 'Tokyo', country: 'Japan' },
    { city: 'Sydney', country: 'Australia' },
    { city: 'Berlin', country: 'Germany' },
    { city: 'Toronto', country: 'Canada' },
    { city: 'São Paulo', country: 'Brazil' }
  ];
  return locations[Math.floor(Math.random() * locations.length)];
};

// Helper function to get mock referrer
const getMockReferrer = () => {
  const referrers = [
    'google.com',
    'facebook.com',
    'twitter.com',
    'linkedin.com',
    'reddit.com',
    'direct',
    'direct',
    'direct' // Make direct more common
  ];
  return referrers[Math.floor(Math.random() * referrers.length)];
};

// Get data from localStorage
const getStoredData = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return [];
  }
};

// Save data to localStorage
const saveData = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

// Get counter value
const getCounter = () => {
  try {
    return parseInt(localStorage.getItem(STORAGE_KEYS.COUNTER) || '0');
  } catch {
    return 0;
  }
};

// Increment counter
const incrementCounter = () => {
  const current = getCounter();
  localStorage.setItem(STORAGE_KEYS.COUNTER, (current + 1).toString());
  return current + 1;
};

// Simulate network delay
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

export const mockApiService = {
  // Shorten a URL
  shortenUrl: async (data) => {
    await delay();
    
    const { longUrl, customShortcode, expiryMinutes } = data;
    const urls = getStoredData(STORAGE_KEYS.URLS);
    
    // Check if custom shortcode already exists
    if (customShortcode) {
      const existing = urls.find(url => url.shortCode === customShortcode);
      if (existing) {
        throw {
          response: {
            status: 409,
            data: { message: 'Custom shortcode already exists. Please choose a different one.' }
          }
        };
      }
    }
    
    // Generate shortcode
    let shortCode = customShortcode;
    if (!shortCode) {
      do {
        shortCode = generateShortCode();
      } while (urls.find(url => url.shortCode === shortCode));
    }
    
    // Calculate expiry date
    let expiryDate = null;
    if (expiryMinutes) {
      expiryDate = new Date(Date.now() + expiryMinutes * 60 * 1000).toISOString();
    } else {
      // Default expiry: 30 days
      expiryDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
    }
    
    // Create new URL entry
    const newUrl = {
      id: incrementCounter(),
      shortCode,
      longUrl,
      shortUrl: `${window.location.origin}/${shortCode}`,
      createdAt: getCurrentTimestamp(),
      expiryDate,
      clickCount: 0
    };
    
    // Save to storage
    urls.push(newUrl);
    saveData(STORAGE_KEYS.URLS, urls);
    
    return {
      shortUrl: newUrl.shortUrl,
      expiryDate: newUrl.expiryDate,
      shortCode: newUrl.shortCode
    };
  },

  // Get all URL statistics
  getStats: async () => {
    await delay();
    
    const urls = getStoredData(STORAGE_KEYS.URLS);
    const clicks = getStoredData(STORAGE_KEYS.CLICKS);
    
    // Combine URLs with their clicks
    const urlsWithClicks = urls.map(url => {
      const urlClicks = clicks.filter(click => click.shortCode === url.shortCode);
      return {
        ...url,
        clicks: urlClicks,
        clickCount: urlClicks.length
      };
    });
    
    // Sort by creation date (newest first)
    return urlsWithClicks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },

  // Handle redirect and log click
  handleRedirect: async (shortCode) => {
    await delay(200); // Shorter delay for redirects
    
    const urls = getStoredData(STORAGE_KEYS.URLS);
    const url = urls.find(u => u.shortCode === shortCode);
    
    if (!url) {
      throw {
        response: {
          status: 404,
          data: { message: 'Short URL not found.' }
        }
      };
    }
    
    // Check if URL has expired
    if (url.expiryDate && new Date(url.expiryDate) < new Date()) {
      throw {
        response: {
          status: 410,
          data: { message: 'This short URL has expired.' }
        }
      };
    }
    
    // Log the click
    const clicks = getStoredData(STORAGE_KEYS.CLICKS);
    const newClick = {
      id: incrementCounter(),
      shortCode,
      timestamp: getCurrentTimestamp(),
      referrer: getMockReferrer(),
      location: getMockLocation(),
      userAgent: navigator.userAgent
    };
    
    clicks.push(newClick);
    saveData(STORAGE_KEYS.CLICKS, clicks);
    
    return {
      longUrl: url.longUrl
    };
  },

  // Get specific URL stats
  getUrlStats: async (shortCode) => {
    await delay();
    
    const urls = getStoredData(STORAGE_KEYS.URLS);
    const clicks = getStoredData(STORAGE_KEYS.CLICKS);
    
    const url = urls.find(u => u.shortCode === shortCode);
    if (!url) {
      throw {
        response: {
          status: 404,
          data: { message: 'Short URL not found.' }
        }
      };
    }
    
    const urlClicks = clicks.filter(click => click.shortCode === shortCode);
    
    return {
      ...url,
      clicks: urlClicks,
      clickCount: urlClicks.length
    };
  },

  // Delete a URL
  deleteUrl: async (shortCode) => {
    await delay();
    
    const urls = getStoredData(STORAGE_KEYS.URLS);
    const clicks = getStoredData(STORAGE_KEYS.CLICKS);
    
    // Remove URL
    const filteredUrls = urls.filter(url => url.shortCode !== shortCode);
    if (filteredUrls.length === urls.length) {
      throw {
        response: {
          status: 404,
          data: { message: 'Short URL not found.' }
        }
      };
    }
    
    // Remove associated clicks
    const filteredClicks = clicks.filter(click => click.shortCode !== shortCode);
    
    // Save updated data
    saveData(STORAGE_KEYS.URLS, filteredUrls);
    saveData(STORAGE_KEYS.CLICKS, filteredClicks);
    
    return { message: 'URL deleted successfully.' };
  },

  // Clear all data (for testing)
  clearAllData: () => {
    localStorage.removeItem(STORAGE_KEYS.URLS);
    localStorage.removeItem(STORAGE_KEYS.CLICKS);
    localStorage.removeItem(STORAGE_KEYS.COUNTER);
  },

  // Seed with sample data (for testing)
  seedSampleData: async () => {
    const sampleUrls = [
      {
        longUrl: 'https://www.google.com/search?q=react+tutorial',
        customShortcode: 'react-tut'
      },
      {
        longUrl: 'https://github.com/facebook/react',
        customShortcode: 'react-gh'
      },
      {
        longUrl: 'https://stackoverflow.com/questions/tagged/javascript'
      }
    ];

    for (const urlData of sampleUrls) {
      try {
        await mockApiService.shortenUrl(urlData);
        // Simulate some clicks
        const shortCode = urlData.customShortcode || 'generated';
        for (let i = 0; i < Math.floor(Math.random() * 10) + 1; i++) {
          await mockApiService.handleRedirect(shortCode);
        }
      } catch (error) {
        console.log('Sample data already exists or error occurred:', error);
      }
    }
  }
};

export default mockApiService;