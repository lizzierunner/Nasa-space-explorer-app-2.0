// ==================== Navigation ==================== //
// ====== MOBILE NAVIGATION ======
class MobileNavigation {
  constructor() {
    this.hamburgerMenu = document.getElementById('hamburgerMenu');
    this.mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    this.mobileMenuClose = document.getElementById('mobileMenuClose');
    this.mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    this.init();
  }

  init() {
    // Toggle mobile menu
    this.hamburgerMenu?.addEventListener('click', () => {
      this.toggleMobileMenu();
    });

    // Close mobile menu
    this.mobileMenuClose?.addEventListener('click', () => {
      this.closeMobileMenu();
    });

    // Close menu when clicking overlay
    this.mobileMenuOverlay?.addEventListener('click', (e) => {
      if (e.target === this.mobileMenuOverlay) {
        this.closeMobileMenu();
      }
    });

    // Close menu when clicking nav links
    this.mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        this.closeMobileMenu();
      });
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.mobileMenuOverlay?.classList.contains('active')) {
        this.closeMobileMenu();
      }
    });
  }

  toggleMobileMenu() {
    const isActive = this.mobileMenuOverlay?.classList.contains('active');
    if (isActive) {
      this.closeMobileMenu();
    } else {
      this.openMobileMenu();
    }
  }

  openMobileMenu() {
    this.hamburgerMenu?.classList.add('active');
    this.mobileMenuOverlay?.classList.add('active');
    this.hamburgerMenu?.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }

  closeMobileMenu() {
    this.hamburgerMenu?.classList.remove('active');
    this.mobileMenuOverlay?.classList.remove('active');
    this.hamburgerMenu?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = ''; // Restore scrolling
  }
}

// ====== DID YOU KNOW SECTION ======
class DidYouKnowSection {
  constructor() {
    this.factElement = document.getElementById('random-fact');
    this.refreshButton = document.getElementById('refresh-fact');
    this.facts = [
      "The International Space Station travels around Earth at approximately 17,500 mph, completing an orbit every 90 minutes!",
      "One day on Venus (243 Earth days) is longer than one year on Venus (225 Earth days)!",
      "Jupiter has at least 95 moons, with the four largest - Io, Europa, Ganymede, and Callisto - discovered by Galileo in 1610.",
      "Saturn's density is so low that it would float in water if you could find a bathtub big enough!",
      "A neutron star is so dense that a teaspoon of it would weigh about 6 billion tons on Earth.",
      "The Milky Way galaxy contains over 100 billion stars and is about 100,000 light-years across.",
      "Mars has the largest volcano in the solar system - Olympus Mons is about 16 miles high and 374 miles across!",
      "NASA's Voyager 1 spacecraft, launched in 1977, is now over 14 billion miles from Earth and still sending data.",
      "The Moon is gradually moving away from Earth at a rate of about 1.5 inches per year.",
      "Mercury experiences temperature swings from 800°F (427°C) during the day to -290°F (-179°C) at night.",
      "The Great Red Spot on Jupiter is a storm larger than Earth that has been raging for over 400 years!",
      "Uranus rotates on its side, likely due to a collision with an Earth-sized object billions of years ago.",
      "The Sun converts about 4 million tons of matter into energy every second through nuclear fusion.",
      "Neptune's winds can reach speeds of up to 1,200 mph - the fastest in the solar system!",
      "Earth is the only known planet with plate tectonics, which helps maintain a stable climate.",
      "The Asteroid Belt between Mars and Jupiter contains millions of rocky objects, but most are smaller than a car.",
      "Pluto's largest moon, Charon, is so big that Pluto and Charon orbit around each other like a double planet.",
      "The Hubble Space Telescope has traveled more than 4 billion miles during its mission and taken over 1.5 million observations.",
      "Europa, one of Jupiter's moons, may have twice as much water as Earth's oceans beneath its icy surface.",
      "The cosmic microwave background radiation is the afterglow of the Big Bang, still detectable today.",
      "Astronauts on the ISS experience 16 sunrises and sunsets every day due to their rapid orbit around Earth.",
      "The Andromeda Galaxy is approaching the Milky Way and will collide with it in about 4.5 billion years.",
      "Black holes can have the mass of millions or billions of suns compressed into a space smaller than our solar system.",
      "NASA's Perseverance rover on Mars is actively searching for signs of ancient microbial life.",
      "The James Webb Space Telescope can see infrared light from the first galaxies that formed after the Big Bang."
    ];
    this.currentFactIndex = -1;
    this.init();
  }

  init() {
    // Display a random fact on load
    this.displayRandomFact();
    
    // Add click event to refresh button
    if (this.refreshButton) {
      this.refreshButton.addEventListener('click', () => {
        this.displayRandomFact();
        this.animateRefreshButton();
      });
    }
  }

  displayRandomFact() {
    if (!this.factElement || this.facts.length === 0) return;
    
    // Get a random fact that's different from the current one
    let newFactIndex;
    do {
      newFactIndex = Math.floor(Math.random() * this.facts.length);
    } while (newFactIndex === this.currentFactIndex && this.facts.length > 1);
    
    this.currentFactIndex = newFactIndex;
    const selectedFact = this.facts[newFactIndex];
    
    // Animate the fact change
    this.factElement.style.opacity = '0';
    this.factElement.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      this.factElement.textContent = selectedFact;
      this.factElement.style.opacity = '1';
      this.factElement.style.transform = 'translateY(0)';
      
      // Add a subtle pulse effect
      this.factElement.style.animation = 'none';
      setTimeout(() => {
        this.factElement.style.animation = 'fadeInUp 0.8s ease-out forwards';
      }, 10);
    }, 300);
    
    // Update the fact icon randomly
    this.updateFactIcon();
    
    console.log('🌟 Did You Know fact displayed:', selectedFact.substring(0, 50) + '...');
  }

  updateFactIcon() {
    const icons = ['🚀', '🌟', '🌍', '🪐', '🌙', '⭐', '🛸', '🌌', '☄️', '🛰️'];
    const iconElement = document.querySelector('.fact-icon');
    
    if (iconElement) {
      const randomIcon = icons[Math.floor(Math.random() * icons.length)];
      iconElement.style.transform = 'scale(0)';
      
      setTimeout(() => {
        iconElement.textContent = randomIcon;
        iconElement.style.transform = 'scale(1)';
      }, 150);
    }
  }

  animateRefreshButton() {
    if (!this.refreshButton) return;
    
    // Add loading state
    this.refreshButton.style.transform = 'scale(0.95)';
    this.refreshButton.style.opacity = '0.7';
    
    setTimeout(() => {
      this.refreshButton.style.transform = 'scale(1)';
      this.refreshButton.style.opacity = '1';
    }, 200);
  }
}

// ====== HERO SECTION ======
class HeroSection {
  constructor() {
    this.scrollIndicator = document.querySelector('.scroll-indicator');
    this.heroBtnPrimary = document.querySelector('.hero-btn-primary');
    this.heroBtnOutline = document.querySelector('.hero-btn-outline');
    this.init();
  }

  init() {
    // Smooth scroll for scroll indicator
    this.scrollIndicator?.addEventListener('click', () => {
      this.scrollToContent();
    });

    // Hero button actions
    this.heroBtnPrimary?.addEventListener('click', () => {
      this.startExploring();
    });

    this.heroBtnOutline?.addEventListener('click', () => {
      this.learnMore();
    });

    // Add parallax effect on scroll
    window.addEventListener('scroll', () => {
      this.handleScroll();
    });
  }

  scrollToContent() {
    const header = document.querySelector('header');
    if (header) {
      header.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }

  startExploring() {
    // Scroll to the gallery section
    const gallery = document.querySelector('#gallery');
    if (gallery) {
      gallery.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    } else {
      // Fallback to header if gallery not found
      this.scrollToContent();
    }
  }

  learnMore() {
    // Scroll to a specific section or show more info
    const header = document.querySelector('header');
    if (header) {
      header.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }

  handleScroll() {
    const hero = document.querySelector('.hero');
    const heroBackground = document.querySelector('.hero-background');
    if (!hero || !heroBackground) return;

    const scrollY = window.scrollY;
    const heroHeight = hero.offsetHeight;
    const parallaxSpeed = 0.5;

    // Parallax effect for hero background
    if (scrollY < heroHeight) {
      heroBackground.style.transform = `translateY(${scrollY * parallaxSpeed}px)`;
    }

    // Fade out scroll indicator when scrolling
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
      const opacity = Math.max(0, 1 - (scrollY / 300));
      scrollIndicator.style.opacity = opacity;
    }
  }
}

// ==================== Scroll Animations ==================== //
// ====== SCROLL ANIMATIONS ======
class ScrollAnimations {
  constructor() {
    this.animatedElements = document.querySelectorAll('.animate-on-scroll');
    this.observer = null;
    this.init();
  }

  init() {
    // Create Intersection Observer for better performance
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    // Observe all animated elements
    this.animatedElements.forEach(element => {
      this.observer.observe(element);
    });
  }

  // Method to refresh observer if new elements are added
  refresh() {
    if (this.observer) {
      this.observer.disconnect();
    }
    this.animatedElements = document.querySelectorAll('.animate-on-scroll');
    this.init();
  }
}

// ====== EXPLORE CARDS INTERACTION ======
class ExploreCards {
  constructor() {
    this.cards = document.querySelectorAll('.explore-card');
    this.init();
  }

  init() {
    this.cards.forEach(card => {
      card.addEventListener('click', () => {
        this.handleCardClick(card);
      });

      // Add hover sound effects if audio is available
      card.addEventListener('mouseenter', () => {
        if (window.spaceAudio && window.spaceAudio.enabled) {
          window.spaceAudio.play('hover');
        }
      });
    });
  }

  handleCardClick(card) {
    const mission = card.dataset.mission;
    
    // Play click sound if available
    if (window.spaceAudio && window.spaceAudio.enabled) {
      window.spaceAudio.play('click');
    }

    // Handle different mission types
    switch (mission) {
      case 'deep-space':
        this.showMissionInfo('Deep Space Exploration', 'Exploring the cosmos with advanced telescopes and space probes to unlock the mysteries of the universe.');
        break;
      case 'artemis':
        this.showMissionInfo('Artemis Program', 'NASA\'s ambitious program to return humans to the Moon and establish a sustainable lunar presence.');
        break;
      case 'earth-observation':
        this.showMissionInfo('Earth Observation', 'Monitoring our planet\'s health and climate using sophisticated satellite technology and sensors.');
        break;
      case 'planetary-science':
        this.showMissionInfo('Planetary Science', 'Studying planets, moons, and other celestial bodies to understand our solar system\'s formation and evolution.');
        break;
      default:
        console.log('Mission type not found:', mission);
    }
  }

  showMissionInfo(title, description) {
    // Create a simple notification or expand the card
    this.showNotification(`${title}: ${description}`);
  }

  showNotification(message) {
    // Remove any existing notifications
    const existingNotification = document.querySelector('.mission-notification');
    if (existingNotification) {
      existingNotification.remove();
    }

    // Create new notification
    const notification = document.createElement('div');
    notification.className = 'mission-notification space-notification';
    notification.textContent = message;
    
    document.body.appendChild(notification);

    // Auto remove after 4 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 4000);
  }
}

// ==================== APOD Section ==================== //
// ====== APOD (Astronomy Picture of the Day) ======
class APODSection {
  constructor() {
    this.apodCard = document.querySelector('.apod-card');
    this.apodImg = document.getElementById('apod-img');
    this.apodDate = document.getElementById('apod-date');
    this.apodTitle = document.getElementById('apod-title');
    this.apodExplanation = document.getElementById('apod-explanation');
    this.apodCopyright = document.getElementById('apod-copyright');
    this.apodViewMore = document.getElementById('apod-view-more');
    this.currentApodData = null;
    this.init();
  }

  async init() {
    await this.loadAPODData();
    this.setupEventListeners();
  }

  async loadAPODData() {
    try {
      // Add loading state
      this.apodCard?.classList.add('apod-loading');
      
      console.log('🌌 Loading APOD data from:', APOD_DATA_URL);
      
      const response = await fetch(APOD_DATA_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('📡 APOD data received:', data);
      
      // Get the most recent entry (data is usually an array)
      const apodData = Array.isArray(data) ? data[data.length - 1] : data;
      
      if (apodData) {
        this.currentApodData = apodData;
        this.displayAPODData(apodData);
      } else {
        throw new Error('No APOD data available');
      }
      
    } catch (error) {
      console.error('❌ Error loading APOD data:', error);
      this.displayErrorState();
    } finally {
      // Remove loading state
      this.apodCard?.classList.remove('apod-loading');
    }
  }

  displayAPODData(data) {
    // Update image
    if (this.apodImg && data.url) {
      this.apodImg.src = data.url;
      this.apodImg.alt = data.title || 'Astronomy Picture of the Day';
    }

    // Update date
    if (this.apodDate && data.date) {
      const formattedDate = this.formatDate(data.date);
      this.apodDate.textContent = formattedDate;
    }

    // Update title
    if (this.apodTitle && data.title) {
      this.apodTitle.textContent = data.title;
    }

    // Update explanation
    if (this.apodExplanation && data.explanation) {
      this.apodExplanation.textContent = data.explanation;
    }

    // Update copyright
    if (this.apodCopyright) {
      if (data.copyright) {
        this.apodCopyright.innerHTML = `© ${data.copyright}`;
        this.apodCopyright.style.display = 'block';
      } else {
        this.apodCopyright.style.display = 'none';
      }
    }

    console.log('✨ APOD data displayed successfully');
  }

  displayErrorState() {
    // Fallback to default space image and content
    if (this.apodImg) {
      this.apodImg.src = 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?q=80&w=2070&auto=format&fit=crop';
      this.apodImg.alt = 'Beautiful space nebula';
    }

    if (this.apodDate) {
      this.apodDate.textContent = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }

    if (this.apodTitle) {
      this.apodTitle.textContent = 'Exploring the Cosmos';
    }

    if (this.apodExplanation) {
      this.apodExplanation.textContent = 'While we load today\'s featured astronomy picture, enjoy this beautiful view of the cosmos. NASA\'s Astronomy Picture of the Day showcases the wonders of our universe through stunning imagery and scientific explanations.';
    }

    if (this.apodCopyright) {
      this.apodCopyright.style.display = 'none';
    }
  }

  setupEventListeners() {
    // View more button
    this.apodViewMore?.addEventListener('click', () => {
      this.openFullImage();
    });

    // Click on image to view full size
    this.apodImg?.addEventListener('click', () => {
      this.openFullImage();
    });
  }

  openFullImage() {
    if (this.currentApodData && this.currentApodData.hdurl) {
      window.open(this.currentApodData.hdurl, '_blank');
    } else if (this.currentApodData && this.currentApodData.url) {
      window.open(this.currentApodData.url, '_blank');
    } else if (this.apodImg) {
      window.open(this.apodImg.src, '_blank');
    }

    // Play click sound if available
    if (window.spaceAudio && window.spaceAudio.enabled) {
      window.spaceAudio.play('click');
    }
  }

  formatDate(dateString) {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      return dateString; // Return original if formatting fails
    }
  }

  // Method to refresh APOD data
  async refresh() {
    await this.loadAPODData();
  }
}

// ====== MARS ROVER GALLERY ======
class MarsRoverGallery {
  constructor() {
    this.tabHeaders = document.querySelectorAll('.tab-header');
    this.tabContents = document.querySelectorAll('.tab-content');
    this.marsLoading = document.getElementById('mars-loading');
    this.curiosityGrid = document.getElementById('curiosity-grid');
    this.perseveranceGrid = document.getElementById('perseverance-grid');
    this.activeTab = 'curiosity';
    this.roverData = {
      curiosity: [],
      perseverance: []
    };
    this.init();
  }

  init() {
    this.setupTabSwitching();
    this.loadRoverPhotos();
  }

  setupTabSwitching() {
    this.tabHeaders.forEach(header => {
      header.addEventListener('click', () => {
        const tabName = header.dataset.tab;
        this.switchTab(tabName);
        
        // Play click sound if available
        if (window.spaceAudio && window.spaceAudio.enabled) {
          window.spaceAudio.play('click');
        }
      });
    });
  }

  switchTab(tabName) {
    // Update active tab
    this.activeTab = tabName;

    // Update tab headers
    this.tabHeaders.forEach(header => {
      if (header.dataset.tab === tabName) {
        header.classList.add('active');
      } else {
        header.classList.remove('active');
      }
    });

    // Update tab contents
    this.tabContents.forEach(content => {
      if (content.dataset.tab === tabName) {
        content.classList.add('active');
      } else {
        content.classList.remove('active');
      }
    });

    // Load photos if not already loaded
    if (this.roverData[tabName].length === 0) {
      this.loadRoverPhotos(tabName);
    }
  }

  async loadRoverPhotos(specificRover = null) {
    const roversToLoad = specificRover ? [specificRover] : ['curiosity', 'perseverance'];
    
    for (const rover of roversToLoad) {
      if (this.roverData[rover].length > 0) continue; // Skip if already loaded

      try {
        this.showLoading(true);
        
        // For demo purposes, we'll create mock Mars rover data
        // In a real application, you would fetch from NASA's Mars Photos API
        const mockPhotos = this.generateMockMarsPhotos(rover);
        
        this.roverData[rover] = mockPhotos;
        this.displayRoverPhotos(rover, mockPhotos);
        
        console.log(`📸 ${rover} photos loaded:`, mockPhotos.length);
        
      } catch (error) {
        console.error(`❌ Error loading ${rover} photos:`, error);
        this.displayErrorState(rover);
      }
    }
    
    this.showLoading(false);
  }

  generateMockMarsPhotos(rover) {
    const photos = [];
    const baseCount = rover === 'curiosity' ? 8 : 6;
    
    for (let i = 1; i <= baseCount; i++) {
      const photo = {
        id: `${rover}_${i}`,
        img_src: `https://images.unsplash.com/photo-${this.getMarsPhotoId(rover, i)}?q=80&w=400&auto=format&fit=crop`,
        earth_date: this.getRandomMarsDate(rover),
        camera: this.getRandomCamera(rover),
        sol: Math.floor(Math.random() * 3000) + 100,
        rover: {
          name: rover.charAt(0).toUpperCase() + rover.slice(1),
          status: 'active'
        }
      };
      photos.push(photo);
    }
    
    return photos;
  }

  getMarsPhotoId(rover, index) {
    // Using Mars/space-related Unsplash photo IDs
    const marsPhotoIds = {
      curiosity: [
        '1446776877081-d282a0f896e2', // Mars landscape
        '1614730321146-b6fa6a46bcb4', // Mars surface
        '1614313913007-2b4ae8ce32d6', // Mars terrain
        '1517976487492-5750f3195933', // Mars rocks
        '1446776881946-10f930cbfc00', // Mars sky
        '1614313913007-2b4ae8ce32d6', // Mars surface 2
        '1517976487492-5750f3195933', // Mars landscape 2
        '1446776877081-d282a0f896e2'  // Mars vista
      ],
      perseverance: [
        '1614730321146-b6fa6a46bcb4', // Mars rover view
        '1614313913007-2b4ae8ce32d6', // Mars geology
        '1517976487492-5750f3195933', // Mars exploration
        '1446776881946-10f930cbfc00', // Mars horizon
        '1446776877081-d282a0f896e2', // Mars surface detail
        '1614730321146-b6fa6a46bcb4'  // Mars terrain
      ]
    };
    
    return marsPhotoIds[rover][index - 1] || marsPhotoIds[rover][0];
  }

  getRandomMarsDate(rover) {
    const startDate = rover === 'curiosity' ? new Date('2012-08-06') : new Date('2021-02-18');
    const endDate = new Date();
    const randomTime = startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime());
    return new Date(randomTime).toISOString().split('T')[0];
  }

  getRandomCamera(rover) {
    const cameras = {
      curiosity: ['MAST', 'MAHLI', 'MARDI', 'CHEMCAM', 'HAZCAM'],
      perseverance: ['MASTCAM-Z', 'MEDA', 'MOXIE', 'PIXL', 'SUPERCAM', 'HAZCAM']
    };
    
    const roverCameras = cameras[rover];
    return roverCameras[Math.floor(Math.random() * roverCameras.length)];
  }

  displayRoverPhotos(rover, photos) {
    const grid = rover === 'curiosity' ? this.curiosityGrid : this.perseveranceGrid;
    if (!grid) return;

    grid.innerHTML = '';

    if (photos.length === 0) {
      this.displayEmptyState(grid, rover);
      return;
    }

    photos.forEach(photo => {
      const photoElement = this.createPhotoElement(photo);
      grid.appendChild(photoElement);
    });
  }

  createPhotoElement(photo) {
    const photoDiv = document.createElement('div');
    photoDiv.className = 'mars-photo';
    photoDiv.innerHTML = `
      <img src="${photo.img_src}" alt="${photo.rover.name} photo from Sol ${photo.sol}" loading="lazy" />
      <div class="mars-photo-info">
        <h4 class="mars-photo-title">Sol ${photo.sol} - ${photo.camera}</h4>
        <p class="mars-photo-details">Date: ${photo.earth_date}</p>
      </div>
    `;

    // Add click event to view full image
    photoDiv.addEventListener('click', () => {
      window.open(photo.img_src.replace('w=400', 'w=1200'), '_blank');
      
      // Play click sound if available
      if (window.spaceAudio && window.spaceAudio.enabled) {
        window.spaceAudio.play('click');
      }
    });

    return photoDiv;
  }

  displayEmptyState(grid, rover) {
    grid.innerHTML = `
      <div class="mars-empty">
        <div class="mars-empty-icon">
          <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
            <path d="M8 14S9.5 16 12 16S16 14 16 14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <line x1="9" y1="9" x2="9.01" y2="9" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <line x1="15" y1="9" x2="15.01" y2="9" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </div>
        <h4>No Photos Available</h4>
        <p>No ${rover} rover photos are currently available.</p>
      </div>
    `;
  }

  displayErrorState(rover) {
    const grid = rover === 'curiosity' ? this.curiosityGrid : this.perseveranceGrid;
    if (!grid) return;

    grid.innerHTML = `
      <div class="mars-empty">
        <div class="mars-empty-icon">
          <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
            <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" stroke-width="2"/>
            <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" stroke-width="2"/>
          </svg>
        </div>
        <h4>Unable to Load Photos</h4>
        <p>There was an error loading ${rover} rover photos. Please try again later.</p>
      </div>
    `;
  }

  showLoading(show) {
    if (this.marsLoading) {
      this.marsLoading.classList.toggle('active', show);
    }
  }

  // Method to refresh rover data
  async refresh() {
    this.roverData = { curiosity: [], perseverance: [] };
    await this.loadRoverPhotos();
  }
}

// ==================== ISS Tracker ==================== //
// ====== ISS TRACKING FUNCTIONALITY ======
// ISS Position object - starting position near Kennedy Space Center
const issPosition = {
  latitude: 28.5,
  longitude: -80.6
};

// Function to update ISS position with orbital simulation
function updateISSPosition() {
  // Increment latitude by 0.5 (mod 90)
  issPosition.latitude += 0.5;
  if (issPosition.latitude > 90) {
    issPosition.latitude = issPosition.latitude - 180; // Wrap around at poles
  }
  
  // Increment longitude by 2.5 (mod 180)
  issPosition.longitude += 2.5;
  if (issPosition.longitude > 180) {
    issPosition.longitude = issPosition.longitude - 360; // Wrap around at 180°
  }
  
  // Update DOM elements with IDs 'issLat' and 'issLon'
  const issLatElement = document.getElementById('issLat');
  const issLonElement = document.getElementById('issLon');
  
  // Update main section elements
  const issLatMainElement = document.getElementById('issLatMain');
  const issLonMainElement = document.getElementById('issLonMain');
  
  if (issLatElement) {
    issLatElement.textContent = issPosition.latitude.toFixed(2) + '°';
    issLatElement.classList.add('updating');
    setTimeout(() => issLatElement.classList.remove('updating'), 500);
  }
  
  if (issLonElement) {
    issLonElement.textContent = issPosition.longitude.toFixed(2) + '°';
    issLonElement.classList.add('updating');
    setTimeout(() => issLonElement.classList.remove('updating'), 500);
  }
  
  // Update main section coordinates
  if (issLatMainElement) {
    issLatMainElement.textContent = issPosition.latitude.toFixed(2) + '°';
    issLatMainElement.classList.add('updating');
    setTimeout(() => issLatMainElement.classList.remove('updating'), 500);
  }
  
  if (issLonMainElement) {
    issLonMainElement.textContent = issPosition.longitude.toFixed(2) + '°';
    issLonMainElement.classList.add('updating');
    setTimeout(() => issLonMainElement.classList.remove('updating'), 500);
  }
  
  // Log position for debugging
  console.log(`🛰️ ISS Position: ${issPosition.latitude.toFixed(2)}°, ${issPosition.longitude.toFixed(2)}°`);
}

// Set interval to update ISS position every 5 seconds
let issTrackingInterval;

// Function to start ISS tracking
function startISSTracking() {
  // Initial position update
  updateISSPosition();
  
  // Set up interval for continuous updates
  issTrackingInterval = setInterval(updateISSPosition, 5000);
  console.log('🚀 ISS tracking started - updating every 5 seconds');
}

// Function to stop ISS tracking
function stopISSTracking() {
  if (issTrackingInterval) {
    clearInterval(issTrackingInterval);
    issTrackingInterval = null;
    console.log('🛑 ISS tracking stopped');
  }
}

// ====== CONFIG ======
// Using the class-provided JSON feed as specified in project requirements
// Data source: https://cdn.jsdelivr.net/gh/GCA-Classroom/apod/data.json
const APOD_DATA_URL = "https://cdn.jsdelivr.net/gh/GCA-Classroom/apod/data.json";

// ====== AUDIO SYSTEM ======
class SpaceAudio {
  constructor() {
    this.enabled = false;
    this.audioContext = null;
    this.sounds = {};
    this.initAudio();
  }

  async initAudio() {
    try {
      // Create Web Audio context
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      
      // Generate space-themed sound effects using Web Audio API
      this.sounds = {
        hover: this.createSpaceBeep(220, 0.1),
        click: this.createSpaceBeep(440, 0.2),
        woosh: this.createWooshSound(),
        success: this.createSuccessChime(),
        modal: this.createModalOpen()
      };
    } catch (error) {
      console.log('Audio not available:', error);
    }
  }

  createSpaceBeep(frequency, duration) {
    return () => {
      if (!this.enabled || !this.audioContext) return;
      
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      oscillator.frequency.value = frequency;
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.1, this.audioContext.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration);
      
      oscillator.start(this.audioContext.currentTime);
      oscillator.stop(this.audioContext.currentTime + duration);
    };
  }

  createWooshSound() {
    return () => {
      if (!this.enabled || !this.audioContext) return;
      
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      const filter = this.audioContext.createBiquadFilter();
      
      oscillator.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      oscillator.frequency.setValueAtTime(200, this.audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(50, this.audioContext.currentTime + 0.3);
      oscillator.type = 'sawtooth';
      
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(2000, this.audioContext.currentTime);
      filter.frequency.exponentialRampToValueAtTime(100, this.audioContext.currentTime + 0.3);
      
      gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.05, this.audioContext.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.3);
      
      oscillator.start(this.audioContext.currentTime);
      oscillator.stop(this.audioContext.currentTime + 0.3);
    };
  }

  createSuccessChime() {
    return () => {
      if (!this.enabled || !this.audioContext) return;
      
      [523.25, 659.25, 783.99].forEach((freq, i) => {
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.value = freq;
        oscillator.type = 'sine';
        
        const startTime = this.audioContext.currentTime + (i * 0.1);
        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(0.08, startTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + 0.3);
        
        oscillator.start(startTime);
        oscillator.stop(startTime + 0.3);
      });
    };
  }

  createModalOpen() {
    return () => {
      if (!this.enabled || !this.audioContext) return;
      
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      oscillator.frequency.setValueAtTime(150, this.audioContext.currentTime);
      oscillator.frequency.linearRampToValueAtTime(300, this.audioContext.currentTime + 0.2);
      oscillator.type = 'triangle';
      
      gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.06, this.audioContext.currentTime + 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.4);
      
      oscillator.start(this.audioContext.currentTime);
      oscillator.stop(this.audioContext.currentTime + 0.4);
    };
  }

  play(soundName) {
    if (this.sounds[soundName]) {
      this.sounds[soundName]();
    }
  }

  toggle() {
    this.enabled = !this.enabled;
    return this.enabled;
  }
}

const spaceAudio = new SpaceAudio();

// ====== PARTICLE SYSTEM ======
class ParticleSystem {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.mouse = { x: 0, y: 0 };
    this.setupCanvas();
    this.bindEvents();
    this.animate();
  }

  setupCanvas() {
    this.canvas.id = 'particle-canvas';
    this.canvas.style.position = 'fixed';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.pointerEvents = 'none';
    this.canvas.style.zIndex = '1';
    this.canvas.style.opacity = '0.7';
    document.body.appendChild(this.canvas);
    this.resize();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  bindEvents() {
    window.addEventListener('resize', () => this.resize());
    
    document.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
      
      // Create particles on mouse move
      if (Math.random() < 0.3) {
        this.createParticle(e.clientX, e.clientY);
      }
    });

    // Create burst on click
    document.addEventListener('click', (e) => {
      for (let i = 0; i < 8; i++) {
        this.createParticle(e.clientX, e.clientY, true);
      }
    });
  }

  createParticle(x, y, burst = false) {
    const particle = {
      x: x,
      y: y,
      vx: (Math.random() - 0.5) * (burst ? 8 : 2),
      vy: (Math.random() - 0.5) * (burst ? 8 : 2),
      life: 1,
      decay: Math.random() * 0.02 + 0.01,
      size: Math.random() * 3 + 1,
      color: burst ? 
        `hsl(${Math.random() * 60 + 200}, 70%, 60%)` : // Blue spectrum for burst
        `hsl(${Math.random() * 360}, 50%, 70%)` // Random colors for trail
    };
    
    this.particles.push(particle);
  }

  updateParticles() {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const particle = this.particles[i];
      
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.life -= particle.decay;
      particle.vx *= 0.98;
      particle.vy *= 0.98;
      
      if (particle.life <= 0) {
        this.particles.splice(i, 1);
      }
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.particles.forEach(particle => {
      this.ctx.save();
      this.ctx.globalAlpha = particle.life;
      this.ctx.fillStyle = particle.color;
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    });
  }

  animate() {
    this.updateParticles();
    this.draw();
    requestAnimationFrame(() => this.animate());
  }
}

const particleSystem = new ParticleSystem();

// ====== KEYBOARD NAVIGATION ======
class KeyboardNav {
  constructor() {
    this.currentCard = 0;
    this.cards = [];
    this.shortcuts = {};
    this.setupShortcuts();
    this.bindEvents();
    this.showHelp = false;
  }

  setupShortcuts() {
    this.shortcuts = {
      'ArrowRight': () => this.navigateCards(1),
      'ArrowLeft': () => this.navigateCards(-1),
      'ArrowDown': () => this.navigateCards(3),
      'ArrowUp': () => this.navigateCards(-3),
      'Enter': () => this.openCurrentCard(),
      ' ': () => this.getRandomFact(),
      'f': () => this.toggleFullscreen(),
      's': () => this.toggleSound(),
      'h': () => this.toggleHelpOverlay(),
      '?': () => this.toggleHelpOverlay(),
      'r': () => this.reloadGallery()
    };
  }

  bindEvents() {
    document.addEventListener('keydown', (e) => {
      // Don't interfere with form inputs
      if (e.target.tagName === 'INPUT') return;
      
      const action = this.shortcuts[e.key];
      if (action) {
        e.preventDefault();
        action();
        spaceAudio.play('click');
      }
    });
  }

  updateCards() {
    this.cards = Array.from(document.querySelectorAll('.card'));
    this.currentCard = 0;
    this.highlightCurrentCard();
  }

  navigateCards(direction) {
    if (this.cards.length === 0) return;
    
    this.cards[this.currentCard]?.classList.remove('keyboard-focused');
    this.currentCard = Math.max(0, Math.min(this.cards.length - 1, this.currentCard + direction));
    this.highlightCurrentCard();
  }

  highlightCurrentCard() {
    if (this.cards[this.currentCard]) {
      this.cards[this.currentCard].classList.add('keyboard-focused');
      this.cards[this.currentCard].scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      });
    }
  }

  openCurrentCard() {
    if (this.cards[this.currentCard]) {
      this.cards[this.currentCard].click();
    }
  }

  getRandomFact() {
    currentFact = setRandomFact(currentFact);
  }

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }

  toggleSound() {
    const enabled = spaceAudio.toggle();
    this.showNotification(`Sound ${enabled ? 'enabled' : 'disabled'}`);
  }

  reloadGallery() {
    runQuery();
  }

  toggleHelpOverlay() {
    this.showHelp = !this.showHelp;
    
    let helpOverlay = document.getElementById('keyboard-help');
    if (this.showHelp && !helpOverlay) {
      this.createHelpOverlay();
    } else if (helpOverlay) {
      helpOverlay.remove();
      this.showHelp = false;
    }
  }

  createHelpOverlay() {
    const overlay = document.createElement('div');
    overlay.id = 'keyboard-help';
    overlay.innerHTML = `
      <div class="help-content">
        <h3>🚀 Keyboard Shortcuts</h3>
        <div class="shortcut-grid">
          <div><kbd>← → ↑ ↓</kbd> Navigate gallery</div>
          <div><kbd>Enter</kbd> Open image</div>
          <div><kbd>Space</kbd> Random fact</div>
          <div><kbd>S</kbd> Toggle sound</div>
          <div><kbd>F</kbd> Fullscreen</div>
          <div><kbd>R</kbd> Reload gallery</div>
          <div><kbd>H</kbd> or <kbd>?</kbd> Toggle help</div>
        </div>
        <p>Press <kbd>Esc</kbd> or <kbd>H</kbd> to close</p>
      </div>
    `;
    document.body.appendChild(overlay);
  }

  showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'space-notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => notification.remove(), 2000);
  }
}

const keyboardNav = new KeyboardNav();

// ====== UTILITIES ======

// ====== UTILITIES ======
const $ = sel => document.querySelector(sel);

const fmt = (d) => {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const addDays = (d, n) => { 
  const x = new Date(d); 
  x.setDate(x.getDate() + n); 
  return x; 
};

const diffDays = (a, b) => Math.round((b - a) / 86400000);

const clampDate = (d) => {
  // For the class JSON feed, use a reasonable date range
  const min = new Date("2020-01-01");
  const max = new Date(); // Current date
  max.setHours(0,0,0,0);
  if(d < min) return min;
  if(d > max) return max;
  return d;
};

// ====== RANDOM FACTS ======
const FACTS = [
  "Neutron stars can spin hundreds of times per second after a supernova.",
  "Jupiter's Great Red Spot is a storm larger than Earth that's raged for centuries.",
  "On Mars, sunsets appear blue due to fine dust scattering sunlight.",
  "Some galaxies have supermassive black holes billions of times the Sun's mass.",
  "The Sun makes up 99.86% of the solar system's mass.",
  "Saturn's rings are mostly water ice—from pebble to boulder size.",
  "There are more stars in the universe than grains of sand on Earth's beaches.",
  "In space, astronauts grow ~2 inches taller—spines decompress in microgravity.",
  "The ISS orbits Earth about every 90 minutes—~16 sunrises/sunsets daily."
];

function setRandomFact(previousFact){
  let fact;
  do {
    fact = FACTS[Math.floor(Math.random()*FACTS.length)];
  } while (fact === previousFact && FACTS.length > 1); // Avoid same fact twice in a row if possible
  
  const factBox = $("#factBox");
  factBox.innerHTML = `<b>Did You Know?</b> ${fact}`;
  
  // Add hover hint if not mobile
  if (window.matchMedia("(hover: hover)").matches) {
    factBox.title = "Click for another fact!";
  }
  
  return fact;
}

// Rotate facts periodically and handle click for new fact
let currentFact = null;
let factRotationInterval = null;

function setupFactBox(){
  const factBox = $("#factBox");
  
  // Initial fact
  currentFact = setRandomFact();
  
  // Click for new fact
  factBox.addEventListener("click", () => {
    currentFact = setRandomFact(currentFact);
  });
  
  // Auto-rotate facts every 45 seconds
  factRotationInterval = setInterval(() => {
    currentFact = setRandomFact(currentFact);
  }, 45000);
  
  // Clean up interval if page is hidden
  document.addEventListener("visibilitychange", () => {
    if (document.hidden && factRotationInterval) {
      clearInterval(factRotationInterval);
      factRotationInterval = null;
    } else if (!document.hidden && !factRotationInterval) {
      factRotationInterval = setInterval(() => {
        currentFact = setRandomFact(currentFact);
      }, 45000);
    }
  });
}

// ====== DOM HOOKS ======
const startInp = $("#start");
const endInp   = $("#end");
const goBtn    = $("#go");
const gallery  = $("#gallery");
const loading  = $("#loading");
const statusTx = $("#statusText");

// Modal
const modal        = $("#modal");
const modalTitle   = $("#modalTitle");
const modalMedia   = $("#modalMedia");
const modalDate    = $("#modalDate");
const modalExpl    = $("#modalExplanation");
const modalClose   = $("#modalClose");

// Initialize date inputs for the class JSON feed data
function initDates(){
  // Set dates for a recent period that should have data in the JSON feed
  // Start with September 24, 2025 for exactly 9 consecutive days
  const startDate = new Date(2025, 8, 24); // September 24, 2025
  const endDate = new Date(2025, 9, 2);   // October 2, 2025 (9 consecutive days)
  
  // Set the input values
  startInp.value = fmt(startDate);
  endInp.value = fmt(endDate);
  
  console.log('Date inputs initialized for 9 consecutive days of APOD data:', {
    start: startInp.value,
    end: endInp.value,
    consecutiveDays: diffDays(startDate, endDate) + 1
  });
}

function openModal(item){
  console.log('Debug - Opening modal for:', item);
  spaceAudio.play('modal');
  
  const formattedDate = new Date(item.date).toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  modalTitle.textContent = item.title || "Astronomy Picture of the Day";
  modalDate.textContent = formattedDate;
  modalExpl.textContent = item.explanation || "No explanation available.";

  modalMedia.innerHTML = "";

  // Add sharing buttons
  const shareContainer = document.createElement('div');
  shareContainer.className = 'share-container';
  shareContainer.innerHTML = `
    <div class="share-buttons">
      <button class="share-btn twitter" data-platform="twitter">
        🐦 Tweet
      </button>
      <button class="share-btn facebook" data-platform="facebook">
        📘 Share
      </button>
      <button class="share-btn copy" data-platform="copy">
        📋 Copy Link
      </button>
      <button class="share-btn download" data-platform="download">
        💾 Download
      </button>
    </div>
  `;

  if(item.media_type === "image"){
    const src = item.hdurl || item.url;
    console.log('Debug - Loading full-size image:', src);

    const img = new Image();
    img.alt = item.title || "APOD image";
    img.src = src;
    img.loading = "eager";
    img.style.maxWidth = "100%";
    img.style.height = "auto";
    modalMedia.appendChild(img);
  } else if(item.media_type === "video"){
    const url = item.url;
    let iframeSrc = "";
    let provider = "";
    let videoId = "";
    
    // Enhanced video provider detection with better pattern matching
    if(/youtube\.com|youtu\.be/.test(url)){
      // YouTube URL patterns: youtube.com/watch?v=ID, youtu.be/ID, youtube.com/embed/ID
      const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([0-9A-Za-z_-]{11})/,
        /youtube\.com\/v\/([0-9A-Za-z_-]{11})/
      ];
      for(const pattern of patterns){
        const match = url.match(pattern);
        if(match){
          videoId = match[1];
          break;
        }
      }
      if(videoId){
        iframeSrc = `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&autoplay=0&controls=1`;
        provider = "YouTube";
      }
    }else if(/vimeo\.com/.test(url)){
      // Vimeo URL patterns: vimeo.com/123456789, vimeo.com/channels/name/123456789
      const patterns = [
        /vimeo\.com\/(\d+)/,
        /vimeo\.com\/channels\/[^\/]+\/(\d+)/,
        /player\.vimeo\.com\/video\/(\d+)/
      ];
      for(const pattern of patterns){
        const match = url.match(pattern);
        if(match){
          videoId = match[1];
          break;
        }
      }
      if(videoId){
        iframeSrc = `https://player.vimeo.com/video/${videoId}?title=0&byline=0&portrait=0&autoplay=0`;
        provider = "Vimeo";
      }
    }else if(/dailymotion\.com/.test(url)){
      // Dailymotion URL patterns
      const patterns = [
        /dailymotion\.com\/video\/([a-zA-Z0-9]+)/,
        /dai\.ly\/([a-zA-Z0-9]+)/
      ];
      for(const pattern of patterns){
        const match = url.match(pattern);
        if(match){
          videoId = match[1];
          break;
        }
      }
      if(videoId){
        iframeSrc = `https://www.dailymotion.com/embed/video/${videoId}`;
        provider = "Dailymotion";
      }
    }else if(/twitch\.tv/.test(url)){
      // Twitch video patterns
      const match = url.match(/twitch\.tv\/videos\/(\d+)/);
      if(match){
        videoId = match[1];
        iframeSrc = `https://player.twitch.tv/?video=${videoId}&parent=${window.location.hostname}&autoplay=false`;
        provider = "Twitch";
      }
    }else if(/nasa\.gov/.test(url) && /\.mp4|\.mov|\.webm|\.avi/.test(url)){
      // Direct NASA video files
      provider = "NASA Direct";
    }
    
    if(iframeSrc){
      // Embedded video (YouTube, Vimeo, Dailymotion, Twitch)
      const container = document.createElement("div");
      container.className = "video-container embedded-video";
      container.style.position = "relative";
      container.style.width = "100%";
      container.style.paddingTop = "56.25%"; // 16:9 aspect ratio
      container.style.borderRadius = "8px";
      container.style.overflow = "hidden";
      container.style.boxShadow = "0 4px 20px rgba(0,0,0,0.3)";
      
      const ifr = document.createElement("iframe");
      ifr.style.position = "absolute";
      ifr.style.top = "0";
      ifr.style.left = "0";
      ifr.style.width = "100%";
      ifr.style.height = "100%";
      ifr.style.border = "none";
      ifr.src = iframeSrc;
      ifr.title = `${item.title || "APOD video"} (${provider})`;
      ifr.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen";
      ifr.allowFullscreen = true;
      ifr.setAttribute('loading', 'lazy');
      
      // Add provider badge to iframe
      const providerBadge = document.createElement("div");
      providerBadge.className = "video-provider-badge";
      providerBadge.textContent = provider;
      providerBadge.style.cssText = `
        position: absolute;
        top: 12px;
        right: 12px;
        background: rgba(11, 61, 145, 0.9);
        color: white;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 0.75rem;
        font-weight: 600;
        z-index: 10;
        backdrop-filter: blur(4px);
      `;
      
      container.appendChild(ifr);
      container.appendChild(providerBadge);
      modalMedia.appendChild(container);
      
    }else if(provider === "NASA Direct"){
      // Direct video file handling
      const container = document.createElement("div");
      container.className = "video-container direct-video";
      container.style.position = "relative";
      container.style.width = "100%";
      container.style.borderRadius = "8px";
      container.style.overflow = "hidden";
      container.style.boxShadow = "0 4px 20px rgba(0,0,0,0.3)";
      
      const video = document.createElement("video");
      video.style.width = "100%";
      video.style.height = "auto";
      video.style.maxHeight = "70vh";
      video.controls = true;
      video.preload = "metadata";
      video.src = url;
      video.title = item.title || "NASA APOD video";
      
      // Add poster image if available
      if(item.thumbnail_url){
        video.poster = item.thumbnail_url;
      }
      
      const providerBadge = document.createElement("div");
      providerBadge.className = "video-provider-badge";
      providerBadge.textContent = "NASA Direct";
      providerBadge.style.cssText = `
        position: absolute;
        top: 12px;
        right: 12px;
        background: rgba(252, 61, 33, 0.9);
        color: white;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 0.75rem;
        font-weight: 600;
        z-index: 10;
        backdrop-filter: blur(4px);
      `;
      
      container.appendChild(video);
      container.appendChild(providerBadge);
      modalMedia.appendChild(container);
      
    }else{
      // Fallback for unrecognized video formats
      const container = document.createElement("div");
      container.className = "video-fallback";
      container.style.cssText = `
        padding: 3rem 2rem;
        text-align: center;
        background: linear-gradient(135deg, #0d1429 0%, #1a237e 100%);
        border-radius: 8px;
        border: 2px dashed var(--nasa-light-blue);
        margin: 1rem 0;
      `;
      
      const videoIcon = document.createElement("div");
      videoIcon.innerHTML = "�";
      videoIcon.style.fontSize = "3rem";
      videoIcon.style.marginBottom = "1rem";
      videoIcon.style.filter = "drop-shadow(0 2px 4px rgba(0,0,0,0.3))";
      
      const title = document.createElement("h3");
      title.style.cssText = `
        color: var(--paper);
        font-size: 1.2rem;
        margin: 0 0 0.5rem;
        font-weight: 600;
      `;
      title.textContent = "Video Content Available";
      
      const description = document.createElement("p");
      description.style.cssText = `
        color: var(--nasa-light-gray);
        margin: 0 0 1.5rem;
        font-size: 0.9rem;
        line-height: 1.5;
      `;
      description.textContent = "This NASA content contains a video that requires external viewing.";
      
      const buttonContainer = document.createElement("div");
      buttonContainer.style.cssText = `
        display: flex;
        gap: 1rem;
        justify-content: center;
        flex-wrap: wrap;
      `;
      
      const viewBtn = document.createElement("a");
      viewBtn.href = url;
      viewBtn.target = "_blank";
      viewBtn.rel = "noopener noreferrer";
      viewBtn.className = "video-action-btn primary";
      viewBtn.innerHTML = "🎥 Watch Video";
      viewBtn.style.cssText = `
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.75rem 1.5rem;
        background: linear-gradient(135deg, var(--nasa-red), #ff6b35);
        color: white;
        text-decoration: none;
        border-radius: 6px;
        font-weight: 600;
        font-size: 0.9rem;
        transition: all 0.3s ease;
        box-shadow: 0 2px 8px rgba(252, 61, 33, 0.3);
      `;
      
      const copyBtn = document.createElement("button");
      copyBtn.className = "video-action-btn secondary";
      copyBtn.innerHTML = "📋 Copy Link";
      copyBtn.style.cssText = `
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.75rem 1.5rem;
        background: transparent;
        color: var(--nasa-light-blue);
        border: 2px solid var(--nasa-light-blue);
        border-radius: 6px;
        font-weight: 600;
        font-size: 0.9rem;
        cursor: pointer;
        transition: all 0.3s ease;
      `;
      
      // Copy functionality
      copyBtn.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(url);
          copyBtn.innerHTML = "✅ Copied!";
          copyBtn.style.color = "var(--success-green)";
          copyBtn.style.borderColor = "var(--success-green)";
          setTimeout(() => {
            copyBtn.innerHTML = "📋 Copy Link";
            copyBtn.style.color = "var(--nasa-light-blue)";
            copyBtn.style.borderColor = "var(--nasa-light-blue)";
          }, 2000);
        } catch (err) {
          console.log('Failed to copy: ', err);
        }
      });
      
      // Hover effects
      viewBtn.addEventListener('mouseenter', () => {
        viewBtn.style.transform = "translateY(-2px)";
        viewBtn.style.boxShadow = "0 4px 12px rgba(252, 61, 33, 0.4)";
      });
      viewBtn.addEventListener('mouseleave', () => {
        viewBtn.style.transform = "translateY(0)";
        viewBtn.style.boxShadow = "0 2px 8px rgba(252, 61, 33, 0.3)";
      });
      
      copyBtn.addEventListener('mouseenter', () => {
        copyBtn.style.background = "var(--nasa-light-blue)";
        copyBtn.style.color = "var(--nasa-dark-blue)";
        copyBtn.style.transform = "translateY(-2px)";
      });
      copyBtn.addEventListener('mouseleave', () => {
        copyBtn.style.background = "transparent";
        copyBtn.style.color = "var(--nasa-light-blue)";
        copyBtn.style.transform = "translateY(0)";
      });
      
      buttonContainer.appendChild(viewBtn);
      buttonContainer.appendChild(copyBtn);
      
      container.appendChild(videoIcon);
      container.appendChild(title);
      container.appendChild(description);
      container.appendChild(buttonContainer);
      modalMedia.appendChild(container);
    }
  }

  // Add sharing functionality after media
  modalMedia.appendChild(shareContainer);
  setupSharingButtons(item);

  modal.setAttribute("aria-hidden","false");
  document.body.style.overflow = "hidden";
  modalClose.focus();
}

function setupSharingButtons(item) {
  const shareButtons = document.querySelectorAll('.share-btn');
  
  shareButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const platform = btn.dataset.platform;
      shareContent(item, platform);
      spaceAudio.play('click');
    });
  });
}

function shareContent(item, platform) {
  const url = window.location.href;
  const text = `Check out this amazing space image: "${item.title}" from NASA's Astronomy Picture of the Day!`;
  const imageUrl = item.hdurl || item.url;
  
  switch(platform) {
    case 'twitter':
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
      break;
    case 'facebook':
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
      break;
    case 'copy':
      navigator.clipboard.writeText(`${text}\n${url}`).then(() => {
        showNotification('Link copied to clipboard! 📋');
      });
      break;
    case 'download':
      if (item.media_type === 'image') {
        downloadImage(imageUrl, `NASA_APOD_${item.date}.jpg`);
      } else {
        showNotification('Video download not available, but you can visit the source!');
      }
      break;
  }
}

function downloadImage(url, filename) {
  fetch(url)
    .then(response => response.blob())
    .then(blob => {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
      showNotification('Image downloaded! 💾');
    })
    .catch(() => {
      showNotification('Download failed - you can save the image manually!');
    });
}

function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'space-notification';
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => notification.remove(), 3000);
}

function closeModal(){
  modal.setAttribute("aria-hidden","true");
  document.body.style.overflow = "";
}

modal.addEventListener("click", (e)=> { if(e.target === modal) closeModal(); });
modalClose.addEventListener("click", closeModal);
window.addEventListener("keydown", (e)=> { 
  if(e.key === "Escape" && modal.getAttribute("aria-hidden")==="false") closeModal(); 
});

// Enhanced video detection and handling utilities
function detectVideoProvider(url) {
  const providers = {
    youtube: {
      patterns: [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([0-9A-Za-z_-]{11})/,
        /youtube\.com\/v\/([0-9A-Za-z_-]{11})/
      ],
      embedTemplate: (id) => `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1&autoplay=0&controls=1`,
      thumbnailTemplate: (id) => `https://img.youtube.com/vi/${id}/maxresdefault.jpg`
    },
    vimeo: {
      patterns: [
        /vimeo\.com\/(\d+)/,
        /vimeo\.com\/channels\/[^\/]+\/(\d+)/,
        /player\.vimeo\.com\/video\/(\d+)/
      ],
      embedTemplate: (id) => `https://player.vimeo.com/video/${id}?title=0&byline=0&portrait=0&autoplay=0`
    },
    dailymotion: {
      patterns: [
        /dailymotion\.com\/video\/([a-zA-Z0-9]+)/,
        /dai\.ly\/([a-zA-Z0-9]+)/
      ],
      embedTemplate: (id) => `https://www.dailymotion.com/embed/video/${id}`
    },
    twitch: {
      patterns: [
        /twitch\.tv\/videos\/(\d+)/
      ],
      embedTemplate: (id) => `https://player.twitch.tv/?video=${id}&parent=${window.location.hostname}&autoplay=false`
    }
  };

  for (const [providerName, provider] of Object.entries(providers)) {
    for (const pattern of provider.patterns) {
      const match = url.match(pattern);
      if (match) {
        return {
          provider: providerName,
          id: match[1],
          embedUrl: provider.embedTemplate(match[1]),
          thumbnailUrl: provider.thumbnailTemplate ? provider.thumbnailTemplate(match[1]) : null
        };
      }
    }
  }

  // Check for direct video files
  if (/\.(mp4|mov|webm|avi|mkv|flv)$/i.test(url)) {
    return {
      provider: 'direct',
      id: null,
      embedUrl: null,
      thumbnailUrl: null
    };
  }

  return null;
}

function getVideoThumbnail(item) {
  // Priority order: explicit thumbnail_url, generated thumbnail, fallback
  if (item.thumbnail_url) {
    return item.thumbnail_url;
  }

  const videoInfo = detectVideoProvider(item.url);
  if (videoInfo && videoInfo.thumbnailUrl) {
    return videoInfo.thumbnailUrl;
  }

  return null;
}

async function fetchAPODRange(startDate, endDate){
  console.log('Fetching APOD data from class-provided JSON feed for 9 consecutive days:', {
    start: fmt(startDate),
    end: fmt(endDate),
    source: APOD_DATA_URL
  });

  // Fetch all data from the class-provided JSON feed
  console.log('📡 Making request to:', APOD_DATA_URL);
  const res = await fetch(APOD_DATA_URL);
  if(!res.ok){
    const text = await res.text();
    console.error('APOD fetch failed:', {
      status: res.status,
      statusText: res.statusText,
      url: APOD_DATA_URL,
      response: text
    });
    throw new Error(`APOD data fetch failed (${res.status}): ${text || res.statusText}`);
  }
  
  const allData = await res.json();
  console.log('✅ Successfully fetched', allData.length, 'total entries from JSON feed');
  
  // Create array of 9 consecutive dates from start date
  const consecutiveDates = [];
  const currentDate = new Date(startDate);
  
  for (let i = 0; i < 9; i++) {
    consecutiveDates.push(fmt(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  console.log('Looking for these 9 consecutive dates:', consecutiveDates);
  
  // Filter data to match our 9 consecutive dates
  const filteredData = allData.filter(item => {
    return consecutiveDates.includes(item.date);
  });
  
  console.log('Found', filteredData.length, 'entries for the 9 consecutive days');
  
  // Sort by date (newest first for display)
  const sortedData = filteredData.sort((a,b)=> b.date.localeCompare(a.date));
  
  // Always return exactly the data we found (up to 9 items for the consecutive days)
  return sortedData;
}

function setStatus(msg=""){ statusTx.textContent = msg; }
function setLoading(on){ loading.style.display = on ? "inline-flex" : "none"; }

// ====== ENHANCED GALLERY CREATION - ENSURES 9 ITEMS ======
function createNineGalleryItems(apiItems, startDate, endDate) {
  console.log('Creating 9 gallery items from API data and fallbacks');
  
  // Create array of 9 consecutive dates
  const consecutiveDates = [];
  const currentDate = new Date(startDate);
  
  for (let i = 0; i < 9; i++) {
    consecutiveDates.push({
      date: fmt(currentDate),
      dayNumber: i + 1
    });
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  // Create exactly 9 gallery items
  const galleryItems = [];
  
  consecutiveDates.forEach((dateInfo, index) => {
    // Try to find API data for this date
    const apiItem = apiItems.find(item => item.date === dateInfo.date);
    
    if (apiItem) {
      // Use real API data
      galleryItems.push({
        ...apiItem,
        id: `apod_${dateInfo.date}`,
        isRealData: true
      });
    } else {
      // Create fallback item with space-themed content
      const fallbackItem = createFallbackGalleryItem(dateInfo.date, index);
      galleryItems.push(fallbackItem);
    }
  });
  
  console.log(`📸 Gallery items created: ${galleryItems.length} total (${galleryItems.filter(item => item.isRealData).length} real, ${galleryItems.filter(item => !item.isRealData).length} fallback)`);
  
  return galleryItems;
}

// ====== CREATE FALLBACK GALLERY ITEM ======
function createFallbackGalleryItem(date, index) {
  // Array of beautiful space images for fallbacks
  const spaceImages = [
    'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1614313913007-2b4ae8ce32d6?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1517976487492-5750f3195933?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1446776881946-10f930cbfc00?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?q=80&w=2070&auto=format&fit=crop'
  ];
  
  // Array of space-themed titles
  const spaceTitles = [
    'Cosmic Wonder',
    'Stellar Formation',
    'Galactic Majesty',
    'Nebula Dreams',
    'Planetary Vista',
    'Deep Space Marvel',
    'Celestial Beauty',
    'Universe Explorer',
    'Astral Journey'
  ];
  
  // Array of educational descriptions
  const spaceDescriptions = [
    'Explore the infinite beauty of our cosmos through this stunning space vista, showcasing the incredible diversity of celestial objects.',
    'Witness the spectacular process of stellar formation in this captivating image that reveals the birth of new stars.',
    'Journey through the vast expanse of our galaxy and discover the intricate patterns of cosmic evolution.',
    'Experience the ethereal beauty of interstellar clouds and the delicate dance of cosmic particles.',
    'Discover the fascinating worlds beyond our solar system and their unique characteristics.',
    'Venture into the deep reaches of space where mysteries await and wonders unfold.',
    'Marvel at the celestial mechanics that govern our universe and create such breathtaking displays.',
    'Join the ongoing exploration of space that continues to expand our understanding of the cosmos.',
    'Embark on an astral journey through time and space to witness the universe\'s grand design.'
  ];
  
  const imageIndex = index % spaceImages.length;
  const titleIndex = index % spaceTitles.length;
  const descIndex = index % spaceDescriptions.length;
  
  return {
    id: `fallback_${date}`,
    date: date,
    title: spaceTitles[titleIndex],
    explanation: spaceDescriptions[descIndex],
    url: spaceImages[imageIndex],
    hdurl: spaceImages[imageIndex],
    media_type: 'image',
    isRealData: false,
    isFallback: true
  };
}

function buildCard(item){
  // Create the main card element with proper structure
  const card = document.createElement("article");
  card.className = "card";
  card.tabIndex = 0;
  card.setAttribute("role","button");
  card.setAttribute("aria-label", `${item.title} (${item.date})`);

  // Add data attribute to identify the item type
  card.dataset.itemType = item.isRealData ? 'real' : 'fallback';

  const wrap = document.createElement("div");
  wrap.className = "thumb-wrap";

  // Create image element with enhanced video thumbnail handling
  const img = new Image();
  let thumbSrc = "";
  
  if(item.media_type === "video"){
    // Use the new utility function to get the best thumbnail
    thumbSrc = getVideoThumbnail(item) || item.url;
  }else{
    // For image content, use the image URL
    thumbSrc = item.url;
  }
  
  // Validate the URL to prevent loading page URLs as images
  if (!thumbSrc || thumbSrc.includes('index.html') || thumbSrc.startsWith('http://127.0.0.1') || thumbSrc.startsWith('http://localhost')) {
    console.warn('Invalid image URL detected:', thumbSrc);
    thumbSrc = ''; // Set to empty to trigger fallback
  }
  
  img.src = thumbSrc;
  img.alt = item.title || (item.media_type === "video" ? "Video thumbnail" : "APOD image");
  img.className = "thumb";
  img.loading = "lazy"; // Add lazy loading for better performance
  
  // Enhanced error handling for failed thumbnail loads
  img.addEventListener('error', () => {
    if(item.media_type === "video"){
      // Create a custom video placeholder with provider info
      const videoInfo = detectVideoProvider(item.url);
      const providerName = videoInfo ? videoInfo.provider : 'Video';
      
      const placeholder = document.createElement("div");
      placeholder.className = "video-placeholder";
      placeholder.style.cssText = `
        width: 100%;
        height: 100%;
        aspect-ratio: 16/9;
        background: linear-gradient(135deg, #0d1429 0%, #1a237e 100%);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 0.85rem;
        text-align: center;
        padding: 1rem;
        box-sizing: border-box;
        position: relative;
        overflow: hidden;
      `;
      
      const videoIcon = document.createElement("div");
      videoIcon.innerHTML = "🎬";
      videoIcon.style.fontSize = "2.5rem";
      videoIcon.style.marginBottom = "0.5rem";
      videoIcon.style.filter = "drop-shadow(0 2px 4px rgba(0,0,0,0.3))";
      
      const videoText = document.createElement("div");
      videoText.textContent = "Video Content";
      videoText.style.fontWeight = "600";
      videoText.style.fontSize = "0.8rem";
      videoText.style.opacity = "0.9";
      videoText.style.marginBottom = "0.25rem";
      
      const providerText = document.createElement("div");
      providerText.textContent = providerName.charAt(0).toUpperCase() + providerName.slice(1);
      providerText.style.fontSize = "0.7rem";
      providerText.style.opacity = "0.7";
      providerText.style.textTransform = "uppercase";
      providerText.style.letterSpacing = "0.5px";
      
      placeholder.appendChild(videoIcon);
      placeholder.appendChild(videoText);
      placeholder.appendChild(providerText);
      
      // Replace the failed image with the placeholder
      img.style.display = "none";
      wrap.appendChild(placeholder);
    }
  });
  
  wrap.appendChild(img);

  // Add source indicator badge
  const sourceBadge = document.createElement("div");
  sourceBadge.className = "source-badge";
  if (item.isRealData) {
    sourceBadge.textContent = "NASA APOD";
    sourceBadge.classList.add("real-data");
  } else {
    sourceBadge.textContent = "SPACE GALLERY";
    sourceBadge.classList.add("fallback-data");
  }
  wrap.appendChild(sourceBadge);

  // Add favorite button with enhanced error handling
  const favoriteBtn = document.createElement("button");
  favoriteBtn.className = "favorite-btn";
  favoriteBtn.dataset.date = item.date;
  
  // Safe check for favorites manager and method
  let isFavorited = false;
  try {
    if (favoritesManager && typeof favoritesManager.isFavorited === 'function') {
      isFavorited = favoritesManager.isFavorited(item.id || item.date);
    }
  } catch (error) {
    console.warn('Error checking favorite status:', error);
  }
  
  favoriteBtn.innerHTML = isFavorited ? '⭐' : '☆';
  favoriteBtn.classList.toggle('favorited', isFavorited);
  favoriteBtn.setAttribute('aria-label', 'Toggle favorite');
  favoriteBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    try {
      if (favoritesManager && typeof favoritesManager.toggleFavorite === 'function') {
        // Ensure item has proper id for favorites system
        const favoriteItem = {
          ...item,
          id: item.id || item.date,
          type: 'apod'
        };
        favoritesManager.toggleFavorite(favoriteItem);
        // Update button state
        const newIsFavorited = favoritesManager.isFavorited(favoriteItem.id);
        favoriteBtn.innerHTML = newIsFavorited ? '⭐' : '☆';
        favoriteBtn.classList.toggle('favorited', newIsFavorited);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  });
  wrap.appendChild(favoriteBtn);

  // Add video badge if applicable with enhanced design
  if(item.media_type === "video"){
    const badge = document.createElement("div");
    badge.className = "badge video-badge";
    badge.innerHTML = `
      <span class="video-icon">🎬</span>
      <span class="video-text">VIDEO</span>
    `;
    
    // Enhanced styling for video badge
    badge.style.cssText = `
      display: flex;
      align-items: center;
      gap: 0.3rem;
      background: linear-gradient(135deg, var(--nasa-red), #ff6b35);
      box-shadow: 0 2px 12px rgba(252, 61, 33, 0.4);
      animation: videoBadgePulse 2s infinite;
    `;
    
    wrap.appendChild(badge);
    
    // Add a play overlay icon
    const playOverlay = document.createElement("div");
    playOverlay.className = "play-overlay";
    playOverlay.innerHTML = "▶";
    playOverlay.style.cssText = `
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 60px;
      height: 60px;
      background: rgba(0, 0, 0, 0.7);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 1.5rem;
      backdrop-filter: blur(4px);
      opacity: 0;
      transition: all 0.3s ease;
      pointer-events: none;
      z-index: 5;
    `;
    
    wrap.appendChild(playOverlay);
  }

  // Create metadata section with title and date
  const meta = document.createElement("div");
  meta.className = "meta";
  
  const h3 = document.createElement("h3");
  h3.className = "title";
  h3.textContent = item.title || "Untitled";
  
  const date = document.createElement("div");
  date.className = "date";
  date.textContent = new Date(item.date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  // Add description preview if available
  if (item.explanation) {
    const description = document.createElement("div");
    description.className = "description-preview";
    // Truncate long descriptions for card display
    const truncatedText = item.explanation.length > 100 
      ? item.explanation.substring(0, 100) + "..." 
      : item.explanation;
    description.textContent = truncatedText;
    meta.appendChild(h3);
    meta.appendChild(date);
    meta.appendChild(description);
  } else {
    meta.appendChild(h3);
    meta.appendChild(date);
  }

  card.appendChild(wrap);
  card.appendChild(meta);

  // Enhanced event listeners with audio and analytics
  card.addEventListener("click", () => {
    if (window.spaceAudio) {
      spaceAudio.play('woosh');
    }
    
    // Track gallery item click
    if (window.analyticsManager) {
      analyticsManager.trackUserInteraction('gallery_item_click', {
        title: item.title,
        date: item.date,
        type: item.isRealData ? 'real_apod' : 'fallback',
        media_type: item.media_type
      });
    }
    
    openModal(item);
  });
  
  card.addEventListener("keydown", (e) => { 
    if(e.key === "Enter" || e.key === " ") {
      if (window.spaceAudio) {
        spaceAudio.play('woosh');
      }
      openModal(item);
    }
  });

  // Hover sound effects
  card.addEventListener("mouseenter", () => {
    if (window.spaceAudio) {
      spaceAudio.play('hover');
    }
  });

  return card;
}

async function runQuery(){
  console.log('🚀 runQuery called, favoritesManager status:', favoritesManager ? 'initialized' : 'not initialized');
  try{
    setLoading(true);
    setStatus("Preparing your space gallery…");
    gallery.innerHTML = "";
    spaceAudio.play('woosh');

    let s = startInp.value ? new Date(startInp.value) : null;
    let e = endInp.value ? new Date(endInp.value) : null;

    // Always ensure we get exactly 9 consecutive days based on selected date
    if(!s && !e){
      // Default: use 9 consecutive days that should have data in the JSON feed
      e = new Date(2025, 9, 2); // October 2, 2025
      s = new Date(2025, 8, 24); // September 24, 2025 (9 consecutive days)
    }else if(s && !e){
      // Start date provided: calculate end date for exactly 9 consecutive days
      s = clampDate(s);
      e = new Date(s);
      e.setDate(e.getDate() + 8); // 9 consecutive days (start day + 8 more)
      e = clampDate(e);
    }else if(!s && e){
      // End date provided: calculate start date for exactly 9 consecutive days
      e = clampDate(e);
      s = new Date(e);
      s.setDate(s.getDate() - 8); // 9 consecutive days (8 days before + end day)
      s = clampDate(s);
    }else{
      // Both dates provided: use start date and calculate 9 consecutive days from it
      s = clampDate(s); 
      e = new Date(s);
      e.setDate(e.getDate() + 8); // Force exactly 9 consecutive days from start date
      e = clampDate(e);
    }

    // Update the input fields to reflect the actual 9-day date range
    startInp.value = fmt(s);
    endInp.value = fmt(e);

    const dayCount = diffDays(s, e) + 1; // This will always be 9 days
    setStatus(`Fetching 9 consecutive APOD images from ${fmt(s)} to ${fmt(e)}…`);
    
    // Enhanced gallery creation - ensures exactly 9 items are displayed
    const items = await fetchAPODRange(s, e);
    const galleryItems = createNineGalleryItems(items, s, e);

    if(galleryItems.length === 0){
      setStatus(`No APOD data available for the selected date range.`);
    } else {
      setStatus(`Successfully loaded ${galleryItems.length} space images for your 9-day gallery.`);
      spaceAudio.play('success');
    }

    // Clear gallery and create exactly 9 items
    gallery.innerHTML = "";
    const frag = document.createDocumentFragment();
    galleryItems.forEach(item => frag.appendChild(buildCard(item)));
    gallery.appendChild(frag);

    console.log(`🖼️ Gallery created with ${galleryItems.length} items`);

    // Update keyboard navigation
    keyboardNav.updateCards();

  }catch(err){
    console.error('APOD fetch error:', err);
    setStatus(`Error: ${err.message}`);
  }finally{
    setLoading(false);
  }
}

// ====== ANIMATIONS ======
function initStarField() {
  const starField = document.createElement('div');
  starField.className = 'star-field';
  document.body.prepend(starField);

  // Create stars
  const numStars = 200;
  for (let i = 0; i < numStars; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.width = Math.random() * 2 + 'px';
    star.style.height = star.style.width;
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.setProperty('--twinkle-duration', (Math.random() * 3 + 2) + 's');
    star.style.setProperty('--twinkle-delay', (Math.random() * 3) + 's');
    starField.appendChild(star);
  }

  // Create shooting stars
  const numShootingStars = 5;
  for (let i = 0; i < numShootingStars; i++) {
    const star = document.createElement('div');
    star.className = 'shooting-star';
    star.style.top = Math.random() * 50 + '%';
    star.style.left = '100%';
    star.style.setProperty('--shooting-delay', (Math.random() * 15) + 's');
    starField.appendChild(star);
  }
}

function initImageReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0) scale(1)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px) scale(0.95)';
    card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(card);
  });
}

function enhanceModalTransitions() {
  document.documentElement.style.setProperty('--modal-transition', '0.5s');
  const modal = $('#modal');
  modal.style.transition = 'backdrop-filter var(--modal-transition), background-color var(--modal-transition)';
  
  const dialog = modal.querySelector('.modal-dialog');
  if (dialog) {
    dialog.style.transition = 'transform var(--modal-transition), opacity var(--modal-transition)';
    dialog.style.transform = 'scale(0.95)';
    dialog.style.opacity = '0';
  }
}

// Enhanced modal open/close animations
const originalOpenModal = openModal;
openModal = function(item) {
  originalOpenModal(item);
  requestAnimationFrame(() => {
    const dialog = modal.querySelector('.modal-dialog');
    if (dialog) {
      dialog.style.transform = 'scale(1)';
      dialog.style.opacity = '1';
    }
  });
};

const originalCloseModal = closeModal;
closeModal = function() {
  const dialog = modal.querySelector('.modal-dialog');
  if (dialog) {
    dialog.style.transform = 'scale(0.95)';
    dialog.style.opacity = '0';
    setTimeout(() => {
      originalCloseModal();
    }, 500);
  } else {
    originalCloseModal();
  }
};

// ====== INIT ======
setupFactBox();
initDates();
initStarField();
enhanceModalTransitions();

goBtn.addEventListener("click", runQuery);

// Enhance gallery after each query
const originalRunQuery = runQuery;
runQuery = async function() {
  await originalRunQuery();
  initImageReveal();
};

// Enhanced button event listeners
goBtn.addEventListener("click", runQuery);

// Sound toggle button
const soundToggle = $("#sound-toggle");
soundToggle.addEventListener("click", () => {
  const enabled = spaceAudio.toggle();
  soundToggle.innerHTML = enabled ? '🔊' : '🔇';
  soundToggle.classList.toggle('disabled', !enabled);
  spaceAudio.play('click');
  showNotification(`Sound effects ${enabled ? 'enabled' : 'disabled'}`);
});

// Help toggle button
const helpToggle = $("#help-toggle");
helpToggle.addEventListener("click", () => {
  keyboardNav.toggleHelpOverlay();
  spaceAudio.play('click');
});

// Pressing Enter in date inputs triggers fetch
[startInp, endInp].forEach(inp => {
  inp.addEventListener("keydown", e => { if(e.key === "Enter") runQuery(); });
});

// ====== MUSIC RECOMMENDATION SYSTEM ======
class MusicRecommendation {
  constructor() {
    this.musicSection = $("#musicRecommendation");
    this.closeButton = $("#musicClose");
    this.spotifyLink = document.querySelector('.spotify-link');
    this.init();
  }

  init() {
    // Handle close button
    this.closeButton?.addEventListener('click', () => {
      this.hide();
      spaceAudio.sounds.click?.();
    });

    // Handle Spotify link clicks
    this.spotifyLink?.addEventListener('click', () => {
      spaceAudio.sounds.success?.();
      showNotification('🎵 Opening cosmic soundtrack in Spotify...');
    });

    // Auto-hide after 10 seconds if user doesn't interact
    setTimeout(() => {
      if (this.musicSection && !this.musicSection.classList.contains('hidden')) {
        this.autoHide();
      }
    }, 10000);

    // Show with animation
    this.show();
  }

  show() {
    if (this.musicSection) {
      this.musicSection.classList.remove('hidden');
      this.musicSection.style.animation = 'musicSlideIn 0.8s ease-out';
    }
  }

  hide() {
    if (this.musicSection) {
      this.musicSection.style.animation = 'musicSlideIn 0.3s ease-out reverse';
      setTimeout(() => {
        this.musicSection.classList.add('hidden');
      }, 300);
    }
  }

  autoHide() {
    if (this.musicSection) {
      this.musicSection.style.opacity = '0.7';
      setTimeout(() => this.hide(), 2000);
    }
  }
}

// ====== UTILITY FUNCTIONS ======

// Footer year update function
function updateFooterYear() {
  const currentYearElement = document.getElementById('currentYear');
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
  }
}

// Active nav link highlighting on scroll
function initActiveNavHighlighting() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"], .mobile-nav-link[href^="#"]');
  
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -80% 0px',
    threshold: 0
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.id;
        
        // Remove active class from all nav links
        navLinks.forEach(link => {
          link.classList.remove('active');
        });
        
        // Add active class to corresponding nav link
        const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"], .mobile-nav-link[href="#${sectionId}"]`);
        if (activeLink) {
          activeLink.classList.add('active');
        }
      }
    });
  }, observerOptions);
  
  // Observe all sections
  sections.forEach(section => {
    observer.observe(section);
  });
}

// Preload critical images for better performance
function preloadCriticalImages() {
  const criticalImages = [
    'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
  ];
  
  criticalImages.forEach(imageUrl => {
    const img = new Image();
    img.src = imageUrl;
    // Preload image for faster hero section loading
    img.onload = () => {
      console.log('✨ Critical image preloaded successfully');
    };
  });
}

// Console easter egg for space enthusiasts
function showConsoleEasterEgg() {
  console.log('%c🚀 NASA Space Explorer', 'color: #0B3D91; font-size: 24px; font-weight: bold;');
  console.log('%cExplore the cosmos with cutting-edge technology', 'color: #FC3D21; font-size: 16px; font-weight: 600;');
  console.log('%c🌌 Visit nasa.gov for more space discoveries', 'color: #ffffff; font-size: 14px;');
  console.log('%cHidden features: Press H for keyboard shortcuts!', 'color: #0B3D91; font-style: italic;');
}

// Populate Mars photos with sample data
function populateMarsPhotos() {
  // This would typically fetch from Mars Rover API
  // For now, we'll ensure the gallery is properly initialized
  console.log('🔴 Mars Rover photos ready for exploration');
}

// Fade in hero content with smooth animation
function fadeInHeroContent() {
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    heroContent.style.opacity = '0';
    heroContent.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
      heroContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      heroContent.style.opacity = '1';
      heroContent.style.transform = 'translateY(0)';
    }, 100);
  }
}

// ==================== Search Functionality ==================== //
// ====== SEARCH FUNCTIONALITY ======

class SearchManager {
  constructor() {
    this.searchInput = document.getElementById('imageSearch');
    this.searchButton = document.getElementById('searchButton');
    this.searchCategory = document.getElementById('searchCategory');
    this.advancedFiltersBtn = document.getElementById('advancedFilters');
    this.advancedFiltersPanel = document.getElementById('advancedFiltersPanel');
    this.clearSearchBtn = document.getElementById('clearSearch');
    this.resultsHeader = document.getElementById('resultsHeader');
    this.resultsCount = document.getElementById('resultsCount');
    this.resultsGrid = document.getElementById('resultsGrid');
    this.noResults = document.getElementById('noResults');
    
    // Filter elements
    this.marsCamera = document.getElementById('marsCamera');
    this.dateFrom = document.getElementById('dateFrom');
    this.dateTo = document.getElementById('dateTo');
    this.marsRover = document.getElementById('marsRover');
    
    this.searchResults = [];
    this.isAdvancedFiltersOpen = false;
    
    this.init();
  }
  
  init() {
    // Search functionality
    this.searchButton?.addEventListener('click', () => this.performSearch());
    this.searchInput?.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.performSearch();
      }
    });
    
    // Real-time search as user types (debounced)
    let searchTimeout;
    this.searchInput?.addEventListener('input', () => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        if (this.searchInput.value.length >= 3 || this.searchInput.value.length === 0) {
          this.performSearch();
        }
      }, 500);
    });
    
    // Category filter change
    this.searchCategory?.addEventListener('change', () => this.performSearch());
    
    // Advanced filters toggle
    this.advancedFiltersBtn?.addEventListener('click', () => this.toggleAdvancedFilters());
    
    // Advanced filter changes
    [this.marsCamera, this.dateFrom, this.dateTo, this.marsRover].forEach(element => {
      element?.addEventListener('change', () => this.performSearch());
    });
    
    // Clear search
    this.clearSearchBtn?.addEventListener('click', () => this.clearSearch());
  }
  
  toggleAdvancedFilters() {
    this.isAdvancedFiltersOpen = !this.isAdvancedFiltersOpen;
    
    if (this.isAdvancedFiltersOpen) {
      this.advancedFiltersPanel?.classList.add('active');
      this.advancedFiltersBtn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <polyline points="18,6 6,18" stroke="currentColor" stroke-width="2"/>
          <polyline points="6,6 18,18" stroke="currentColor" stroke-width="2"/>
        </svg>
        Close Filters
      `;
    } else {
      this.advancedFiltersPanel?.classList.remove('active');
      this.advancedFiltersBtn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="4" y1="21" x2="4" y2="14" stroke="currentColor" stroke-width="2"/>
          <line x1="4" y1="10" x2="4" y2="3" stroke="currentColor" stroke-width="2"/>
          <line x1="12" y1="21" x2="12" y2="12" stroke="currentColor" stroke-width="2"/>
          <line x1="12" y1="8" x2="12" y2="3" stroke="currentColor" stroke-width="2"/>
          <line x1="20" y1="21" x2="20" y2="16" stroke="currentColor" stroke-width="2"/>
          <line x1="20" y1="12" x2="20" y2="3" stroke="currentColor" stroke-width="2"/>
          <line x1="1" y1="14" x2="7" y2="14" stroke="currentColor" stroke-width="2"/>
          <line x1="9" y1="8" x2="15" y2="8" stroke="currentColor" stroke-width="2"/>
          <line x1="17" y1="16" x2="23" y2="16" stroke="currentColor" stroke-width="2"/>
        </svg>
        Filters
      `;
    }
  }
  
  async performSearch() {
    const query = this.searchInput?.value.toLowerCase().trim() || '';
    const category = this.searchCategory?.value || 'all';
    
    // Get filter values
    const filters = {
      camera: this.marsCamera?.value || 'all',
      dateFrom: this.dateFrom?.value || '',
      dateTo: this.dateTo?.value || '',
      rover: this.marsRover?.value || 'all'
    };
    
    // Show loading state
    this.showLoading();
    
    try {
      // Simulate search with sample data
      const results = await this.searchImages(query, category, filters);
      this.displayResults(results);
      
      // Track search analytics
      if (window.analyticsManager) {
        analyticsManager.trackSearch(query, category, results.length);
      }
    } catch (error) {
      console.error('Search error:', error);
      this.showNoResults();
    }
  }
  
  async searchImages(query, category, filters) {
    // Sample search data - in a real app, this would call NASA APIs
    const sampleResults = [
      {
        id: 1,
        title: 'Mars Curiosity Sol 1000',
        description: 'Amazing view of Martian landscape captured by Curiosity rover on Sol 1000',
        image: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=300&fit=crop',
        type: 'mars',
        camera: 'MAST',
        rover: 'curiosity',
        date: '2024-10-15',
        url: '#'
      },
      {
        id: 2,
        title: 'Orion Nebula',
        description: 'Stunning image of the Orion Nebula captured by Hubble Space Telescope',
        image: 'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=400&h=300&fit=crop',
        type: 'apod',
        date: '2024-10-10',
        url: '#'
      },
      {
        id: 3,
        title: 'Perseverance First Steps',
        description: 'Historic first images from Perseverance rover on Mars surface',
        image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=300&fit=crop',
        type: 'mars',
        camera: 'NAVCAM',
        rover: 'perseverance',
        date: '2024-09-20',
        url: '#'
      },
      {
        id: 4,
        title: 'Earth from ISS',
        description: 'Beautiful view of Earth taken from the International Space Station',
        image: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=400&h=300&fit=crop',
        type: 'missions',
        date: '2024-10-01',
        url: '#'
      },
      {
        id: 5,
        title: 'Saturn Rings Detail',
        description: 'Detailed view of Saturn\'s ring system captured by Cassini spacecraft',
        image: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=300&fit=crop',
        type: 'missions',
        date: '2024-09-15',
        url: '#'
      }
    ];
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Filter results based on search criteria
    let filteredResults = sampleResults;
    
    // Filter by query
    if (query) {
      filteredResults = filteredResults.filter(result => 
        result.title.toLowerCase().includes(query) ||
        result.description.toLowerCase().includes(query)
      );
    }
    
    // Filter by category
    if (category !== 'all') {
      filteredResults = filteredResults.filter(result => result.type === category);
    }
    
    // Filter by Mars-specific filters
    if (filters.camera !== 'all') {
      filteredResults = filteredResults.filter(result => 
        !result.camera || result.camera === filters.camera
      );
    }
    
    if (filters.rover !== 'all') {
      filteredResults = filteredResults.filter(result => 
        !result.rover || result.rover === filters.rover
      );
    }
    
    // Filter by date range
    if (filters.dateFrom) {
      filteredResults = filteredResults.filter(result => 
        new Date(result.date) >= new Date(filters.dateFrom)
      );
    }
    
    if (filters.dateTo) {
      filteredResults = filteredResults.filter(result => 
        new Date(result.date) <= new Date(filters.dateTo)
      );
    }
    
    return filteredResults;
  }
  
  showLoading() {
    if (this.resultsGrid) {
      this.resultsGrid.innerHTML = this.generateSkeletonCards(3);
    }
    
    this.resultsHeader?.classList.remove('hidden');
    this.noResults?.classList.add('hidden');
  }
  
  generateSkeletonCards(count) {
    const skeletons = Array(count).fill().map(() => `
      <div class="skeleton-card">
        <div class="skeleton skeleton-image"></div>
        <div class="skeleton skeleton-title"></div>
        <div class="skeleton skeleton-text"></div>
        <div class="skeleton skeleton-text"></div>
        <div class="skeleton skeleton-meta"></div>
      </div>
    `).join('');
    
    return `<div class="skeleton-grid">${skeletons}</div>`;
  }
  
  displayResults(results) {
    this.searchResults = results;
    
    if (results.length === 0) {
      this.showNoResults();
      return;
    }
    
    // Update results count
    if (this.resultsCount) {
      this.resultsCount.textContent = `${results.length} result${results.length !== 1 ? 's' : ''} found`;
    }
    
    // Show results header
    this.resultsHeader?.classList.remove('hidden');
    this.noResults?.classList.add('hidden');
    
    // Generate results HTML with lazy loading
    const resultsHTML = results.map(result => `
      <div class="result-card" data-id="${result.id}" onclick="searchManager.openResult(${result.id})">
        <img data-src="${result.image}" alt="${result.title}" class="result-image" loading="lazy" />
        <div class="result-content">
          <h4 class="result-title">${result.title}</h4>
          <p class="result-description">${result.description}</p>
          <div class="result-meta">
            <span class="result-type">${this.formatType(result.type)}</span>
            <span class="result-date">${this.formatDate(result.date)}</span>
          </div>
        </div>
      </div>
    `).join('');
    
    if (this.resultsGrid) {
      this.resultsGrid.innerHTML = resultsHTML;
      // Observe new images for lazy loading
      if (lazyLoadManager) {
        lazyLoadManager.observeNewImages(this.resultsGrid);
      }
    }
  }
  
  showNoResults() {
    this.resultsHeader?.classList.add('hidden');
    this.noResults?.classList.remove('hidden');
    
    if (this.resultsGrid) {
      this.resultsGrid.innerHTML = '';
    }
  }
  
  clearSearch() {
    // Clear all inputs
    if (this.searchInput) this.searchInput.value = '';
    if (this.searchCategory) this.searchCategory.value = 'all';
    if (this.marsCamera) this.marsCamera.value = 'all';
    if (this.dateFrom) this.dateFrom.value = '';
    if (this.dateTo) this.dateTo.value = '';
    if (this.marsRover) this.marsRover.value = 'all';
    
    // Hide results
    this.resultsHeader?.classList.add('hidden');
    this.noResults?.classList.add('hidden');
    
    if (this.resultsGrid) {
      this.resultsGrid.innerHTML = '';
    }
    
    // Close advanced filters
    if (this.isAdvancedFiltersOpen) {
      this.toggleAdvancedFilters();
    }
  }
  
  openResult(id) {
    const result = this.searchResults.find(r => r.id === id);
    if (result && lightboxModal) {
      // Open in lightbox with current search results as gallery
      const currentIndex = this.searchResults.findIndex(r => r.id === id);
      lightboxModal.openModal(result, this.searchResults, currentIndex);
    }
  }
  
  formatType(type) {
    const typeMap = {
      'mars': 'Mars Rover',
      'apod': 'APOD',
      'missions': 'Space Mission'
    };
    return typeMap[type] || type;
  }
  
  formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
}

// Global search manager instance
let searchManager;

// ==================== Favorites Manager ==================== //
// ====== FAVORITES MANAGER ======

class FavoritesManager {
  constructor() {
    this.favorites = this.loadFavorites();
    this.favoritesGrid = document.getElementById('favoritesGrid');
    this.emptyFavorites = document.getElementById('emptyFavorites');
    this.totalFavorites = document.getElementById('totalFavorites');
    this.apodFavorites = document.getElementById('apodFavorites');
    this.marsFavorites = document.getElementById('marsFavorites');
    this.favoritesFilters = document.querySelectorAll('.favorites-filter');
    this.exportBtn = document.getElementById('exportFavorites');
    this.clearBtn = document.getElementById('clearFavorites');
    
    this.currentFilter = 'all';
    
    this.init();
  }
  
  init() {
    // Initialize display
    this.updateStats();
    this.displayFavorites();
    
    // Filter buttons
    this.favoritesFilters.forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.currentFilter = e.target.dataset.filter;
        this.setActiveFilter(e.target);
        this.displayFavorites();
      });
    });
    
    // Export button
    this.exportBtn?.addEventListener('click', () => this.exportFavorites());
    
    // Clear all button
    this.clearBtn?.addEventListener('click', () => this.clearAllFavorites());
  }
  
  loadFavorites() {
    try {
      const saved = localStorage.getItem('nasaSpaceExplorerFavorites');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Error loading favorites:', error);
      return [];
    }
  }
  
  saveFavorites() {
    try {
      localStorage.setItem('nasaSpaceExplorerFavorites', JSON.stringify(this.favorites));
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  }
  
  addFavorite(item) {
    // Check if already favorited
    if (this.isFavorited(item.id)) {
      console.log('Item already in favorites');
      return false;
    }
    
    // Add timestamp
    const favoriteItem = {
      ...item,
      favoritedAt: new Date().toISOString()
    };
    
    this.favorites.unshift(favoriteItem);
    this.saveFavorites();
    this.updateStats();
    
    // Track analytics
    if (window.analyticsManager) {
      analyticsManager.trackFavoriteAction('add', item.title, item.type || 'unknown');
    }
    this.displayFavorites();
    
    // Show notification
    this.showNotification(`Added "${item.title}" to favorites!`, 'success');
    return true;
  }
  
  removeFavorite(id) {
    const index = this.favorites.findIndex(item => item.id === id);
    if (index !== -1) {
      const removedItem = this.favorites.splice(index, 1)[0];
      this.saveFavorites();
      this.updateStats();
      this.displayFavorites();
      
      // Track analytics
      if (window.analyticsManager) {
        analyticsManager.trackFavoriteAction('remove', removedItem.title, removedItem.type || 'unknown');
      }
      
      // Show notification
      this.showNotification(`Removed "${removedItem.title}" from favorites`, 'info');
      return true;
    }
    return false;
  }
  
  isFavorited(id) {
    return this.favorites.some(item => item.id === id);
  }
  
  toggleFavorite(item) {
    if (this.isFavorited(item.id)) {
      this.removeFavorite(item.id);
      return false;
    } else {
      this.addFavorite(item);
      return true;
    }
  }
  
  updateStats() {
    const total = this.favorites.length;
    const apod = this.favorites.filter(item => item.type === 'apod').length;
    const mars = this.favorites.filter(item => item.type === 'mars').length;
    
    if (this.totalFavorites) this.totalFavorites.textContent = total;
    if (this.apodFavorites) this.apodFavorites.textContent = apod;
    if (this.marsFavorites) this.marsFavorites.textContent = mars;
  }
  
  setActiveFilter(activeButton) {
    this.favoritesFilters.forEach(btn => btn.classList.remove('active'));
    activeButton.classList.add('active');
  }
  
  displayFavorites() {
    if (!this.favoritesGrid || !this.emptyFavorites) return;
    
    let filteredFavorites = this.favorites;
    
    // Apply filter
    if (this.currentFilter !== 'all') {
      filteredFavorites = this.favorites.filter(item => item.type === this.currentFilter);
    }
    
    if (filteredFavorites.length === 0) {
      this.favoritesGrid.style.display = 'none';
      this.emptyFavorites.style.display = 'block';
      return;
    }
    
    this.favoritesGrid.style.display = 'grid';
    this.emptyFavorites.style.display = 'none';
    
    const favoritesHTML = filteredFavorites.map(item => this.createFavoriteCard(item)).join('');
    this.favoritesGrid.innerHTML = favoritesHTML;
    
    // Observe new images for lazy loading
    if (lazyLoadManager) {
      lazyLoadManager.observeNewImages(this.favoritesGrid);
    }
  }
  
  createFavoriteCard(item) {
    const formattedDate = new Date(item.favoritedAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
    
    return `
      <div class="favorite-card" data-id="${item.id}">
        <img data-src="${item.image}" alt="${item.title}" class="favorite-image" loading="lazy" />
        <div class="favorite-content">
          <div class="favorite-header">
            <h4 class="favorite-title">${item.title}</h4>
            <div class="favorite-actions">
              <button class="favorite-action share" onclick="favoritesManager.shareFavorite(${item.id})" title="Share">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="18" cy="5" r="3" stroke="currentColor" stroke-width="2"/>
                  <circle cx="6" cy="12" r="3" stroke="currentColor" stroke-width="2"/>
                  <circle cx="18" cy="19" r="3" stroke="currentColor" stroke-width="2"/>
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" stroke="currentColor" stroke-width="2"/>
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" stroke="currentColor" stroke-width="2"/>
                </svg>
              </button>
              <button class="favorite-action download" onclick="favoritesManager.downloadFavorite(${item.id})" title="Download">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 15V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V15" stroke="currentColor" stroke-width="2"/>
                  <polyline points="7,10 12,15 17,10" stroke="currentColor" stroke-width="2"/>
                  <line x1="12" y1="15" x2="12" y2="3" stroke="currentColor" stroke-width="2"/>
                </svg>
              </button>
              <button class="favorite-action remove" onclick="favoritesManager.removeFavorite(${item.id})" title="Remove from favorites">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <polyline points="3,6 5,6 21,6" stroke="currentColor" stroke-width="2"/>
                  <path d="M19 6V20A2 2 0 0 1 17 22H7A2 2 0 0 1 5 20V6M8 6V4A2 2 0 0 1 10 2H14A2 2 0 0 1 16 4V6" stroke="currentColor" stroke-width="2"/>
                </svg>
              </button>
            </div>
          </div>
          <p class="favorite-description">${item.description}</p>
          <div class="favorite-meta">
            <span class="favorite-type">${this.formatType(item.type)}</span>
            <span class="favorite-date">${formattedDate}</span>
          </div>
        </div>
      </div>
    `;
  }
  
  formatType(type) {
    const typeMap = {
      'mars': 'Mars Rover',
      'apod': 'APOD',
      'missions': 'Space Mission'
    };
    return typeMap[type] || type;
  }
  
  exportFavorites() {
    if (this.favorites.length === 0) {
      this.showNotification('No favorites to export', 'warning');
      return;
    }
    
    const dataStr = JSON.stringify(this.favorites, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `nasa-space-explorer-favorites-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    this.showNotification(`Exported ${this.favorites.length} favorites!`, 'success');
  }
  
  clearAllFavorites() {
    if (this.favorites.length === 0) {
      this.showNotification('No favorites to clear', 'warning');
      return;
    }
    
    if (confirm(`Are you sure you want to remove all ${this.favorites.length} favorites? This action cannot be undone.`)) {
      this.favorites = [];
      this.saveFavorites();
      this.updateStats();
      this.displayFavorites();
      
      this.showNotification('All favorites cleared!', 'info');
    }
  }
  
  shareFavorite(id) {
    const item = this.favorites.find(f => f.id === id);
    if (!item) return;
    
    if (navigator.share) {
      navigator.share({
        title: item.title,
        text: item.description,
        url: window.location.href
      }).catch(console.error);
    } else {
      // Fallback: copy to clipboard
      const shareText = `${item.title}\n${item.description}\n${window.location.href}`;
      navigator.clipboard.writeText(shareText).then(() => {
        this.showNotification('Share link copied to clipboard!', 'success');
      }).catch(() => {
        this.showNotification('Unable to share', 'error');
      });
    }
  }
  
  downloadFavorite(id) {
    const item = this.favorites.find(f => f.id === id);
    if (!item) return;
    
    // Create a temporary link to download the image
    const link = document.createElement('a');
    link.href = item.image;
    link.download = `${item.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.jpg`;
    link.target = '_blank';
    link.click();
    
    this.showNotification(`Downloading "${item.title}"...`, 'info');
  }
  
  showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `favorite-notification ${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
      position: 'fixed',
      top: '20px',
      right: '20px',
      background: type === 'success' ? '#4ade80' : 
                 type === 'error' ? '#ef4444' :
                 type === 'warning' ? '#f59e0b' : '#3b82f6',
      color: 'white',
      padding: '1rem 1.5rem',
      borderRadius: '8px',
      zIndex: '10000',
      fontFamily: 'Inter, sans-serif',
      fontSize: '0.9rem',
      boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
      transform: 'translateX(100%)',
      transition: 'transform 0.3s ease'
    });
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }
}

// Global favorites manager instance
let favoritesManager;

// ====== LIGHTBOX MODAL MANAGER ======

class LightboxModal {
  constructor() {
    this.modal = document.getElementById('modal');
    this.modalBackdrop = document.getElementById('modalBackdrop');
    this.modalDialog = document.querySelector('.modal-dialog');
    this.modalTitle = document.getElementById('modalTitle');
    this.modalType = document.getElementById('modalType');
    this.modalDate = document.getElementById('modalDate');
    this.modalMedia = document.getElementById('modalMedia');
    this.modalExplanation = document.getElementById('modalExplanation');
    
    // Action buttons
    this.modalClose = document.getElementById('modalClose');
    this.modalFavorite = document.getElementById('modalFavorite');
    this.modalShare = document.getElementById('modalShare');
    this.modalDownload = document.getElementById('modalDownload');
    
    // Image controls
    this.zoomIn = document.getElementById('zoomIn');
    this.zoomOut = document.getElementById('zoomOut');
    this.resetZoom = document.getElementById('resetZoom');
    this.toggleFullscreen = document.getElementById('toggleFullscreen');
    
    // Navigation
    this.modalPrev = document.getElementById('modalPrev');
    this.modalNext = document.getElementById('modalNext');
    
    // Additional info elements
    this.modalCamera = document.getElementById('modalCamera');
    this.modalRover = document.getElementById('modalRover');
    this.modalSol = document.getElementById('modalSol');
    this.modalResolution = document.getElementById('modalResolution');
    
    this.currentImage = null;
    this.currentZoom = 1;
    this.isFullscreen = false;
    this.imageGallery = [];
    this.currentIndex = 0;
    
    this.init();
  }
  
  init() {
    // Close modal events
    this.modalClose?.addEventListener('click', () => this.closeModal());
    this.modalBackdrop?.addEventListener('click', () => this.closeModal());
    
    // Action buttons
    this.modalFavorite?.addEventListener('click', () => this.toggleFavorite());
    this.modalShare?.addEventListener('click', () => this.shareImage());
    this.modalDownload?.addEventListener('click', () => this.downloadImage());
    
    // Image controls
    this.zoomIn?.addEventListener('click', () => this.zoomImage(1.2));
    this.zoomOut?.addEventListener('click', () => this.zoomImage(0.8));
    this.resetZoom?.addEventListener('click', () => this.resetImageZoom());
    this.toggleFullscreen?.addEventListener('click', () => this.toggleFullscreenMode());
    
    // Navigation
    this.modalPrev?.addEventListener('click', () => this.showPreviousImage());
    this.modalNext?.addEventListener('click', () => this.showNextImage());
    
    // Keyboard controls
    document.addEventListener('keydown', (e) => this.handleKeyboard(e));
    
    // Image drag functionality
    this.setupImageDrag();
    
    // Prevent modal content clicks from closing modal
    this.modalDialog?.addEventListener('click', (e) => e.stopPropagation());
  }
  
  openModal(imageData, gallery = null, index = 0) {
    this.currentImage = imageData;
    this.imageGallery = gallery || [imageData];
    this.currentIndex = index;
    
    // Track modal view analytics
    if (window.analyticsManager) {
      analyticsManager.trackModalView('lightbox', imageData.title || 'Untitled');
    }
    
    this.populateModal(imageData);
    this.updateNavigationButtons();
    
    // Show modal
    this.modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    
    // Reset zoom
    this.currentZoom = 1;
    this.isFullscreen = false;
    this.modal.classList.remove('fullscreen');
  }
  
  closeModal() {
    this.modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    
    // Reset zoom and fullscreen
    this.resetImageZoom();
    if (this.isFullscreen) {
      this.toggleFullscreenMode();
    }
  }
  
  populateModal(imageData) {
    // Title and meta
    if (this.modalTitle) this.modalTitle.textContent = imageData.title || 'Space Image';
    if (this.modalType) this.modalType.textContent = this.formatType(imageData.type || '');
    if (this.modalDate) this.modalDate.textContent = this.formatDate(imageData.date || '');
    
    // Image
    if (this.modalMedia) {
      this.modalMedia.innerHTML = `
        <img src="${imageData.image}" alt="${imageData.title}" id="modalImage" />
      `;
    }
    
    // Description
    if (this.modalExplanation) {
      this.modalExplanation.textContent = imageData.description || imageData.explanation || '';
    }
    
    // Additional info (for Mars rover images)
    if (this.modalCamera) this.modalCamera.textContent = imageData.camera || '-';
    if (this.modalRover) this.modalRover.textContent = imageData.rover || '-';
    if (this.modalSol) this.modalSol.textContent = imageData.sol || '-';
    if (this.modalResolution) this.modalResolution.textContent = 'High Resolution';
    
    // Update favorite button state
    this.updateFavoriteButton();
  }
  
  updateFavoriteButton() {
    if (!this.modalFavorite || !this.currentImage) return;
    
    const isFavorited = favoritesManager?.isFavorited(this.currentImage.id) || false;
    
    if (isFavorited) {
      this.modalFavorite.classList.add('favorited');
      this.modalFavorite.title = 'Remove from favorites';
    } else {
      this.modalFavorite.classList.remove('favorited');
      this.modalFavorite.title = 'Add to favorites';
    }
  }
  
  updateNavigationButtons() {
    if (!this.modalPrev || !this.modalNext) return;
    
    const hasMultipleImages = this.imageGallery.length > 1;
    
    this.modalPrev.style.display = hasMultipleImages ? 'flex' : 'none';
    this.modalNext.style.display = hasMultipleImages ? 'flex' : 'none';
    
    if (hasMultipleImages) {
      this.modalPrev.disabled = this.currentIndex === 0;
      this.modalNext.disabled = this.currentIndex === this.imageGallery.length - 1;
    }
  }
  
  showPreviousImage() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      const prevImage = this.imageGallery[this.currentIndex];
      this.populateModal(prevImage);
      this.currentImage = prevImage;
      this.updateNavigationButtons();
      this.resetImageZoom();
    }
  }
  
  showNextImage() {
    if (this.currentIndex < this.imageGallery.length - 1) {
      this.currentIndex++;
      const nextImage = this.imageGallery[this.currentIndex];
      this.populateModal(nextImage);
      this.currentImage = nextImage;
      this.updateNavigationButtons();
      this.resetImageZoom();
    }
  }
  
  zoomImage(factor) {
    const img = document.getElementById('modalImage');
    if (!img) return;
    
    this.currentZoom *= factor;
    this.currentZoom = Math.max(0.5, Math.min(5, this.currentZoom)); // Limit zoom range
    
    img.style.transform = `scale(${this.currentZoom})`;
    
    if (this.currentZoom > 1) {
      img.classList.add('zoomed');
    } else {
      img.classList.remove('zoomed');
    }
  }
  
  resetImageZoom() {
    const img = document.getElementById('modalImage');
    if (!img) return;
    
    this.currentZoom = 1;
    img.style.transform = 'scale(1)';
    img.classList.remove('zoomed');
    img.style.left = '0px';
    img.style.top = '0px';
  }
  
  toggleFullscreenMode() {
    this.isFullscreen = !this.isFullscreen;
    
    if (this.isFullscreen) {
      this.modal.classList.add('fullscreen');
    } else {
      this.modal.classList.remove('fullscreen');
    }
  }
  
  toggleFavorite() {
    if (!this.currentImage || !favoritesManager) return;
    
    favoritesManager.toggleFavorite(this.currentImage);
    this.updateFavoriteButton();
  }
  
  shareImage() {
    if (!this.currentImage) return;
    
    // Track share analytics
    if (window.analyticsManager) {
      const platform = navigator.share ? 'native_share' : 'clipboard';
      analyticsManager.trackShareAction(platform, this.currentImage.title || 'Untitled');
    }
    
    if (navigator.share) {
      navigator.share({
        title: this.currentImage.title,
        text: this.currentImage.description,
        url: this.currentImage.image
      }).catch(console.error);
    } else {
      // Fallback: copy to clipboard
      const shareText = `${this.currentImage.title}\n${this.currentImage.description}\n${this.currentImage.image}`;
      navigator.clipboard.writeText(shareText).then(() => {
        this.showNotification('Share link copied to clipboard!', 'success');
      }).catch(() => {
        this.showNotification('Unable to share', 'error');
      });
    }
  }
  
  downloadImage() {
    if (!this.currentImage) return;
    
    const fileName = `${this.currentImage.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.jpg`;
    
    // Track download analytics
    if (window.analyticsManager) {
      analyticsManager.trackDownload(fileName, 'jpg');
    }
    
    const link = document.createElement('a');
    link.href = this.currentImage.image;
    link.download = fileName;
    link.target = '_blank';
    link.click();
    
    this.showNotification(`Downloading "${this.currentImage.title}"...`, 'info');
  }
  
  setupImageDrag() {
    let isDragging = false;
    let startX, startY, currentX = 0, currentY = 0;
    
    this.modalMedia?.addEventListener('mousedown', (e) => {
      const img = e.target;
      if (img.tagName !== 'IMG' || this.currentZoom <= 1) return;
      
      isDragging = true;
      startX = e.clientX - currentX;
      startY = e.clientY - currentY;
      
      e.preventDefault();
    });
    
    document.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      
      e.preventDefault();
      currentX = e.clientX - startX;
      currentY = e.clientY - startY;
      
      const img = document.getElementById('modalImage');
      if (img) {
        img.style.left = `${currentX}px`;
        img.style.top = `${currentY}px`;
      }
    });
    
    document.addEventListener('mouseup', () => {
      isDragging = false;
    });
  }
  
  handleKeyboard(e) {
    if (this.modal.getAttribute('aria-hidden') === 'true') return;
    
    switch (e.key) {
      case 'Escape':
        this.closeModal();
        break;
      case 'ArrowLeft':
        this.showPreviousImage();
        break;
      case 'ArrowRight':
        this.showNextImage();
        break;
      case '+':
      case '=':
        this.zoomImage(1.2);
        break;
      case '-':
        this.zoomImage(0.8);
        break;
      case '0':
        this.resetImageZoom();
        break;
      case 'f':
      case 'F':
        this.toggleFullscreenMode();
        break;
      case 's':
      case 'S':
        e.preventDefault();
        this.shareImage();
        break;
      case 'd':
      case 'D':
        e.preventDefault();
        this.downloadImage();
        break;
    }
  }
  
  formatType(type) {
    const typeMap = {
      'mars': 'Mars Rover',
      'apod': 'APOD',
      'missions': 'Space Mission'
    };
    return typeMap[type] || type;
  }
  
  formatDate(dateString) {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
  
  showNotification(message, type = 'info') {
    // Use the same notification system as favorites
    if (favoritesManager) {
      favoritesManager.showNotification(message, type);
    }
  }
}

// Global lightbox instance
let lightboxModal;

// ==================== Analytics Manager ==================== //
// ====== ANALYTICS MANAGER ======

class AnalyticsManager {
  constructor() {
    this.isGoogleAnalyticsLoaded = false;
    this.userInteractions = [];
    this.performanceMetrics = {};
    this.abTestVariant = null;
    this.sessionStartTime = Date.now();
    
    this.init();
  }
  
  init() {
    // Check if Google Analytics is loaded
    this.checkGoogleAnalyticsAvailability();
    
    // Initialize performance monitoring
    this.initPerformanceMonitoring();
    
    // Initialize A/B testing
    this.initABTesting();
    
    // Set up automatic event tracking
    this.setupAutomaticTracking();
    
    console.log('🔍 Analytics Manager initialized');
  }
  
  checkGoogleAnalyticsAvailability() {
    if (typeof gtag !== 'undefined') {
      this.isGoogleAnalyticsLoaded = true;
      console.log('✅ Google Analytics 4 detected');
    } else {
      console.warn('⚠️ Google Analytics not loaded - using local analytics only');
    }
  }
  
  // ====== USER INTERACTION TRACKING ======
  
  trackEvent(eventName, eventData = {}) {
    const timestamp = Date.now();
    const interaction = {
      event: eventName,
      timestamp,
      data: eventData,
      sessionId: this.generateSessionId(),
      abVariant: this.abTestVariant
    };
    
    // Store locally
    this.userInteractions.push(interaction);
    
    // Send to Google Analytics if available
    if (this.isGoogleAnalyticsLoaded) {
      gtag('event', eventName, {
        custom_parameter_1: eventData.category || 'general',
        custom_parameter_2: eventData.section || 'unknown',
        value: eventData.value || 1,
        ...eventData
      });
    }
    
    console.log('📊 Event tracked:', eventName, eventData);
  }
  
  trackPageView(pageName, customData = {}) {
    this.trackEvent('page_view', {
      page_title: pageName,
      page_location: window.location.href,
      category: 'navigation',
      ...customData
    });
  }
  
  trackSearch(query, category, resultsCount) {
    this.trackEvent('search', {
      search_term: query,
      search_category: category,
      results_count: resultsCount,
      category: 'search'
    });
  }
  
  trackFavoriteAction(action, itemTitle, itemType) {
    this.trackEvent('favorite_action', {
      action: action, // 'add' or 'remove'
      item_title: itemTitle,
      item_type: itemType,
      category: 'engagement'
    });
  }
  
  trackModalView(modalType, itemTitle) {
    this.trackEvent('modal_view', {
      modal_type: modalType,
      item_title: itemTitle,
      category: 'engagement'
    });
  }
  
  trackShareAction(platform, itemTitle) {
    this.trackEvent('share', {
      method: platform,
      content_type: 'space_image',
      item_title: itemTitle,
      category: 'social'
    });
  }
  
  trackDownload(fileName, fileType) {
    this.trackEvent('file_download', {
      file_name: fileName,
      file_extension: fileType,
      category: 'downloads'
    });
  }
  
  // ====== PERFORMANCE MONITORING ======
  
  initPerformanceMonitoring() {
    // Core Web Vitals
    this.measureCoreWebVitals();
    
    // Page load time
    this.measurePageLoadTime();
    
    // Resource loading
    this.measureResourceLoading();
    
    // Custom performance metrics
    this.measureCustomMetrics();
  }
  
  measureCoreWebVitals() {
    // Largest Contentful Paint (LCP)
    if ('PerformanceObserver' in window) {
      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          if (entry.entryType === 'largest-contentful-paint') {
            this.performanceMetrics.lcp = entry.startTime;
            this.trackEvent('core_web_vital', {
              metric: 'LCP',
              value: entry.startTime,
              category: 'performance'
            });
          }
        }
      }).observe({ entryTypes: ['largest-contentful-paint'] });
      
      // First Input Delay (FID)
      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          this.performanceMetrics.fid = entry.processingStart - entry.startTime;
          this.trackEvent('core_web_vital', {
            metric: 'FID',
            value: this.performanceMetrics.fid,
            category: 'performance'
          });
        }
      }).observe({ entryTypes: ['first-input'] });
      
      // Cumulative Layout Shift (CLS)
      let clsValue = 0;
      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        }
        this.performanceMetrics.cls = clsValue;
      }).observe({ entryTypes: ['layout-shift'] });
    }
  }
  
  measurePageLoadTime() {
    window.addEventListener('load', () => {
      const loadTime = performance.now();
      this.performanceMetrics.pageLoadTime = loadTime;
      
      this.trackEvent('page_load_complete', {
        load_time: Math.round(loadTime),
        category: 'performance'
      });
    });
  }
  
  measureResourceLoading() {
    window.addEventListener('load', () => {
      const resources = performance.getEntriesByType('resource');
      const slowResources = resources.filter(resource => resource.duration > 1000);
      
      if (slowResources.length > 0) {
        this.trackEvent('slow_resources', {
          count: slowResources.length,
          category: 'performance'
        });
      }
    });
  }
  
  measureCustomMetrics() {
    // Track time to first meaningful paint
    setTimeout(() => {
      const apodCard = document.querySelector('.apod-card');
      if (apodCard) {
        this.trackEvent('first_meaningful_paint', {
          metric: 'APOD_card_visible',
          category: 'performance'
        });
      }
    }, 100);
  }
  
  // ====== A/B TESTING ======
  
  initABTesting() {
    // Generate or retrieve A/B test variant
    this.abTestVariant = this.getABTestVariant();
    
    // Apply A/B test variations
    this.applyABTestVariations();
    
    // Track A/B test assignment
    this.trackEvent('ab_test_assignment', {
      variant: this.abTestVariant,
      category: 'experimentation'
    });
  }
  
  getABTestVariant() {
    // Check if user already has a variant assigned
    let variant = localStorage.getItem('ab_test_variant');
    
    if (!variant) {
      // Randomly assign variant (50/50 split)
      variant = Math.random() < 0.5 ? 'A' : 'B';
      localStorage.setItem('ab_test_variant', variant);
    }
    
    return variant;
  }
  
  applyABTestVariations() {
    if (this.abTestVariant === 'B') {
      // Apply Variant B changes
      document.body.classList.add('ab-test-variant-b');
      
      // Example: Different hero section layout
      this.applyVariantBHeroLayout();
      
      // Example: Different button colors
      this.applyVariantBButtonStyles();
    }
  }
  
  applyVariantBHeroLayout() {
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
      heroSection.style.background = 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)';
    }
  }
  
  applyVariantBButtonStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .ab-test-variant-b .cta-button {
        background: linear-gradient(45deg, #FF6B35, #F7931E);
        transform: scale(1.05);
      }
      .ab-test-variant-b .search-button {
        background: linear-gradient(45deg, #FF6B35, #F7931E);
      }
    `;
    document.head.appendChild(style);
  }
  
  // ====== AUTOMATIC EVENT TRACKING ======
  
  setupAutomaticTracking() {
    // Track clicks on navigation items
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('nav-link')) {
        this.trackEvent('navigation_click', {
          link_text: e.target.textContent,
          link_href: e.target.href,
          category: 'navigation'
        });
      }
      
      // Track CTA button clicks
      if (e.target.classList.contains('cta-button')) {
        this.trackEvent('cta_click', {
          button_text: e.target.textContent,
          category: 'engagement'
        });
      }
      
      // Track external links
      if (e.target.tagName === 'A' && e.target.href && !e.target.href.includes(window.location.hostname)) {
        this.trackEvent('external_link_click', {
          url: e.target.href,
          category: 'outbound'
        });
      }
    });
    
    // Track scroll depth
    this.trackScrollDepth();
    
    // Track time on page
    this.trackTimeOnPage();
  }
  
  trackScrollDepth() {
    const scrollDepths = [25, 50, 75, 90, 100];
    const trackedDepths = new Set();
    
    window.addEventListener('scroll', () => {
      const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
      
      scrollDepths.forEach(depth => {
        if (scrollPercent >= depth && !trackedDepths.has(depth)) {
          trackedDepths.add(depth);
          this.trackEvent('scroll_depth', {
            depth_percentage: depth,
            category: 'engagement'
          });
        }
      });
    });
  }
  
  trackTimeOnPage() {
    // Track time spent on page when user leaves
    window.addEventListener('beforeunload', () => {
      const timeOnPage = Date.now() - this.sessionStartTime;
      this.trackEvent('time_on_page', {
        duration_seconds: Math.round(timeOnPage / 1000),
        category: 'engagement'
      });
    });
  }
  
  // ====== UTILITY METHODS ======
  
  generateSessionId() {
    let sessionId = localStorage.getItem('analytics_session_id');
    if (!sessionId) {
      sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('analytics_session_id', sessionId);
    }
    return sessionId;
  }
  
  getAnalyticsReport() {
    return {
      userInteractions: this.userInteractions,
      performanceMetrics: this.performanceMetrics,
      abTestVariant: this.abTestVariant,
      sessionDuration: Date.now() - this.sessionStartTime
    };
  }
  
  exportAnalyticsData() {
    const data = this.getAnalyticsReport();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nasa_explorer_analytics_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }
}

// Global analytics manager instance
let analyticsManager;

// ====== LAZY LOADING MANAGER ======

class LazyLoadManager {
  constructor() {
    this.imageObserver = null;
    this.loadedImages = new Set();
    this.init();
  }
  
  init() {
    // Check if Intersection Observer is supported
    if ('IntersectionObserver' in window) {
      this.imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.loadImage(entry.target);
            observer.unobserve(entry.target);
          }
        });
      }, {
        // Load images when they're 100px away from viewport
        rootMargin: '100px 0px',
        threshold: 0.01
      });
      
      this.observeImages();
    } else {
      // Fallback for older browsers - load all images immediately
      this.loadAllImages();
    }
  }
  
  observeImages() {
    const lazyImages = document.querySelectorAll('img[data-src], img[loading="lazy"]');
    lazyImages.forEach(img => {
      if (!this.loadedImages.has(img)) {
        this.imageObserver.observe(img);
      }
    });
  }
  
  loadImage(img) {
    if (this.loadedImages.has(img)) return;
    
    // Show loading state
    img.classList.add('loading');
    
    // Create a new image to preload
    const imageLoader = new Image();
    
    imageLoader.onload = () => {
      // Image loaded successfully
      if (img.dataset.src) {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
      }
      
      img.classList.remove('loading');
      img.classList.add('loaded');
      this.loadedImages.add(img);
    };
    
    imageLoader.onerror = () => {
      // Handle loading error
      img.classList.remove('loading');
      img.classList.add('error');
      img.alt = 'Failed to load image';
    };
    
    // Start loading
    imageLoader.src = img.dataset.src || img.src;
  }
  
  loadAllImages() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => this.loadImage(img));
  }
  
  // Method to add new images to lazy loading
  observeNewImages(container) {
    if (!this.imageObserver) return;
    
    const newImages = container.querySelectorAll('img[data-src], img[loading="lazy"]');
    newImages.forEach(img => {
      if (!this.loadedImages.has(img)) {
        this.imageObserver.observe(img);
      }
    });
  }
  
  // Method to force load an image (for critical images)
  forceLoadImage(img) {
    if (this.imageObserver) {
      this.imageObserver.unobserve(img);
    }
    this.loadImage(img);
  }
}

// ==================== Image Error Handling System ==================== //
// Comprehensive image fallback system for explore cards
function initializeImageErrorHandling() {
  console.log('🖼️ Initializing image error handling system...');
  
  // Handle all images in explore cards
  const exploreImages = document.querySelectorAll('.explore-card .card-image img');
  
  exploreImages.forEach((img, index) => {
    // Add error event listener
    img.addEventListener('error', function() {
      console.log(`🚫 Image ${index + 1} failed to load:`, this.src);
      handleImageError(this);
    });
    
    // Add load event listener for successful loads
    img.addEventListener('load', function() {
      console.log(`✅ Image ${index + 1} loaded successfully:`, this.src);
      this.style.opacity = '1';
      // Remove any error states
      const cardImage = this.closest('.card-image');
      if (cardImage) {
        cardImage.classList.remove('image-error');
      }
    });
    
    // Check if image is already broken (for cached/immediate failures)
    if (img.complete && img.naturalHeight === 0) {
      console.log(`⚠️ Image ${index + 1} already broken on load:`, img.src);
      handleImageError(img);
    }
  });
  
  // Special handling for Deep Space image
  const deepSpaceImg = document.querySelector('.deep-space-image img');
  if (deepSpaceImg) {
    deepSpaceImg.addEventListener('error', function() {
      console.log('🌌 Deep Space image failed to load, using CSS fallback');
      this.style.opacity = '0';
      this.parentElement.classList.add('image-error');
    });
    
    deepSpaceImg.addEventListener('load', function() {
      console.log('🌌 Deep Space image loaded successfully');
      this.style.opacity = '1';
      this.parentElement.classList.remove('image-error');
    });
    
    // Check if already broken
    if (deepSpaceImg.complete && deepSpaceImg.naturalHeight === 0) {
      console.log('🌌 Deep Space image already broken on load');
      deepSpaceImg.style.opacity = '0';
      deepSpaceImg.parentElement.classList.add('image-error');
    }
  }
  
  console.log('✅ Image error handling system initialized');
}

function handleImageError(imgElement) {
  // Hide the broken image
  imgElement.style.opacity = '0';
  
  // Check if this is an invalid URL (page URL instead of image)
  const src = imgElement.src;
  if (src && (src.includes('index.html') || src.includes('127.0.0.1') || src.includes('localhost'))) {
    console.warn('🚫 Invalid image URL detected (page URL instead of image):', src);
    // Clear the invalid src to prevent further errors
    imgElement.src = '';
  } else if (src) {
    // Log the error for debugging only for valid image URLs
    console.warn('🚫 Image failed to load:', src);
  }
  
  // Add error class to parent container for CSS fallback
  const cardImage = imgElement.closest('.card-image');
  if (cardImage) {
    cardImage.classList.add('image-error');
    console.log('🎨 Applied CSS fallback for broken image');
  }
}

// Global lazy load manager
let lazyLoadManager;

// DOMContentLoaded initialization
document.addEventListener('DOMContentLoaded', () => {
  // Initialize image error handling first
  initializeImageErrorHandling();
  
  // Populate Mars photos
  populateMarsPhotos();
  
  // Set current year in footer
  updateFooterYear();
  
  // Fade in hero content after brief delay
  fadeInHeroContent();
  
  // Initialize active nav highlighting
  initActiveNavHighlighting();
  
  // Preload critical images
  preloadCriticalImages();
  
  // Show console easter egg
  showConsoleEasterEgg();
  
  // Initialize search functionality
  searchManager = new SearchManager();
  
  // Initialize favorites functionality
  console.log('🔄 Initializing FavoritesManager...');
  favoritesManager = new FavoritesManager();
  console.log('✅ FavoritesManager initialized:', favoritesManager);
  
  // Initialize lightbox modal
  lightboxModal = new LightboxModal();
  
  // Initialize lazy loading
  lazyLoadManager = new LazyLoadManager();
  
  // Initialize analytics manager
  analyticsManager = new AnalyticsManager();
});

// Auto-load on start with spectacular entrance
window.addEventListener('load', () => {
  console.log('🚀 NASA Space Explorer loaded - prepare for liftoff!');
  
  // Initialize mobile navigation
  new MobileNavigation();
  
  // Initialize Did You Know facts
  new DidYouKnowSection();
  
  // Initialize hero section
  new HeroSection();
  
  // Initialize scroll animations
  new ScrollAnimations();
  
  // Initialize explore cards interaction
  new ExploreCards();
  
  // Initialize APOD section
  new APODSection();
  
  // Initialize Mars Rover Gallery
  new MarsRoverGallery();
  
  // Start ISS tracking
  startISSTracking();
  
  // Enable audio after user interaction
  document.addEventListener('click', () => {
    spaceAudio.enabled = true;
  }, { once: true });
  
  runQuery();
  
  // Initialize music recommendation system
  setTimeout(() => {
    new MusicRecommendation();
  }, 2000);
  
  // Show welcome message
  setTimeout(() => {
    showNotification('🚀 Welcome to NASA Space Explorer! Press H for keyboard shortcuts.');
  }, 1000);
});
