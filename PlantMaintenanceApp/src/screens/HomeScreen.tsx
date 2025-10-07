import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  TextInput,
  Alert,
  ActivityIndicator,
  Animated,
  Modal,
} from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import QRScannerScreenMock from './QRScannerScreenMock';
import TaskDetailsScreen from './TaskDetailsScreen';
import { Button, LanguageSelector } from '../components';
import { useLanguage } from '../contexts/LanguageContext';

// Image assets from Figma
const headerLogo = require('../../assets/logo.png');
const headerIcon = "http://localhost:3845/assets/85c041811a3356f9b1f271464cfe38c5a4288c55.svg";
const searchIcon = "http://localhost:3845/assets/5880ef6c3cc47f23e1779e67f3faa75e815f3d73.svg";
const syncIcon = "http://localhost:3845/assets/28274b41e189ad17676733b76177d20841f84677.svg";
const fabIcon = "http://localhost:3845/assets/94266c8a549e1c7e094e14d6e1586a017c41b0b8.svg";



// Plant items with exact Figma data and additional items
const allPlantItems = [
  {
    id: '0401',
    name: 'Titan-950 Ultra Hauler',
    branch: 'Melbourne Branch',
    image: require('../../assets/equipment/titan-950-hauler.png'),
    isBookmarked: true,
  },
  {
    id: '0303',
    name: 'Wheel Loader',
    branch: 'Melbourne Branch',
    image: require('../../assets/equipment/wheel-loader.png'),
    isBookmarked: false,
  },
  {
    id: '0309',
    name: 'Diesel Tanker',
    branch: 'Melbourne Branch',
    image: require('../../assets/equipment/diesel-tanker.png'),
    isBookmarked: false,
  },
  {
    id: '0322',
    name: 'Excavator',
    branch: 'Melbourne Branch',
    image: require('../../assets/equipment/excavator.png'),
    isBookmarked: false,
  },
  {
    id: '0405',
    name: 'Bulldozer D8T',
    branch: 'Sydney Branch',
    image: require('../../assets/equipment/titan-950-hauler.png'),
    isBookmarked: false,
  },
  {
    id: '0406',
    name: 'Crane Mobile 200T',
    branch: 'Brisbane Branch',
    image: require('../../assets/equipment/wheel-loader.png'),
    isBookmarked: true,
  },
  {
    id: '0407',
    name: 'Forklift 5T Hyster',
    branch: 'Perth Branch',
    image: require('../../assets/equipment/diesel-tanker.png'),
    isBookmarked: false,
  },
  {
    id: '0408',
    name: 'Backhoe Loader JCB',
    branch: 'Adelaide Branch',
    image: require('../../assets/equipment/excavator.png'),
    isBookmarked: false,
  },
  {
    id: '0409',
    name: 'Compactor Road Roller',
    branch: 'Melbourne Branch',
    image: require('../../assets/equipment/titan-950-hauler.png'),
    isBookmarked: false,
  },
  {
    id: '0410',
    name: 'Concrete Mixer Truck',
    branch: 'Sydney Branch',
    image: require('../../assets/equipment/wheel-loader.png'),
    isBookmarked: false,
  },
  {
    id: '0411',
    name: 'Dump Truck 40T',
    branch: 'Brisbane Branch',
    image: require('../../assets/equipment/diesel-tanker.png'),
    isBookmarked: true,
  },
  {
    id: '0412',
    name: 'Grader Motor',
    branch: 'Perth Branch',
    image: require('../../assets/equipment/excavator.png'),
    isBookmarked: false,
  },
  {
    id: '0413',
    name: 'Skid Steer Loader',
    branch: 'Adelaide Branch',
    image: require('../../assets/equipment/titan-950-hauler.png'),
    isBookmarked: false,
  },
  {
    id: '0414',
    name: 'Trencher Chain',
    branch: 'Melbourne Branch',
    image: require('../../assets/equipment/wheel-loader.png'),
    isBookmarked: false,
  },
  {
    id: '0415',
    name: 'Articulated Hauler',
    branch: 'Sydney Branch',
    image: require('../../assets/equipment/diesel-tanker.png'),
    isBookmarked: false,
  },
  {
    id: '0416',
    name: 'Telehandler 15T',
    branch: 'Brisbane Branch',
    image: require('../../assets/equipment/excavator.png'),
    isBookmarked: true,
  },
  {
    id: '0417',
    name: 'Mini Excavator',
    branch: 'Perth Branch',
    image: require('../../assets/equipment/titan-950-hauler.png'),
    isBookmarked: false,
  },
  {
    id: '0418',
    name: 'Paver Asphalt',
    branch: 'Adelaide Branch',
    image: require('../../assets/equipment/wheel-loader.png'),
    isBookmarked: false,
  },
  {
    id: '0419',
    name: 'Drilling Rig',
    branch: 'Melbourne Branch',
    image: require('../../assets/equipment/diesel-tanker.png'),
    isBookmarked: false,
  },
  {
    id: '0420',
    name: 'Scissor Lift Platform',
    branch: 'Sydney Branch',
    image: require('../../assets/equipment/excavator.png'),
    isBookmarked: false,
  },
];

// Skeleton shimmer component with enhanced pulsing
const SkeletonShimmer = ({ children, style }: { children: React.ReactNode; style?: any }) => {
  const shimmerValue = useRef(new Animated.Value(0)).current;
  const pulseValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Shimmer animation (opacity)
    const shimmerAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerValue, {
          toValue: 1,
          duration: 800,
          useNativeDriver: false,
        }),
        Animated.timing(shimmerValue, {
          toValue: 0,
          duration: 800,
          useNativeDriver: false,
        }),
      ])
    );

    // Pulse animation (scale)
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseValue, {
          toValue: 1.02,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(pulseValue, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
      ])
    );

    shimmerAnimation.start();
    pulseAnimation.start();
    
    return () => {
      shimmerAnimation.stop();
      pulseAnimation.stop();
    };
  }, [shimmerValue, pulseValue]);

  const opacity = shimmerValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.4, 0.8],
  });

  const backgroundColor = shimmerValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['#e1e9ee', '#f0f4f7', '#e1e9ee'],
  });

  return (
    <Animated.View 
      style={[
        style, 
        { 
          opacity,
          backgroundColor,
          transform: [{ scale: pulseValue }]
        }
      ]}
    >
      {children}
    </Animated.View>
  );
};

const HomeScreen = () => {
  const { t } = useLanguage();
  const [searchText, setSearchText] = useState('');
  const [displayedItems, setDisplayedItems] = useState(8); // Initially show 8 items
  const [loading, setLoading] = useState(false);
  const [bookmarkedItems, setBookmarkedItems] = useState(
    allPlantItems.reduce((acc, item) => {
      acc[item.id] = item.isBookmarked;
      return acc;
    }, {} as Record<string, boolean>)
  );
  const [sortBy, setSortBy] = useState<'name' | 'id' | 'branch'>('name');
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [showTaskDetails, setShowTaskDetails] = useState(false);
  const [selectedPlantItem, setSelectedPlantItem] = useState<any>(null);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const [showHamburgerMenu, setShowHamburgerMenu] = useState(false);
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  const [showQueueViewer, setShowQueueViewer] = useState(false);
  const [queuedItems, setQueuedItems] = useState([
    {
      id: '1',
      plantItem: 'Titan-950 Ultra Hauler',
      plantId: '0401',
      task: 'Fluid levels check',
      status: 'defect',
      timestamp: new Date().toISOString(),
      comments: 'Low hydraulic fluid detected',
      workRequestId: 'WR-2024-001',
      priority: 'High',
      assignedTo: 'Maintenance Team A',
      location: 'Melbourne Branch',
      photos: [
        { id: '1', uri: 'https://via.placeholder.com/150x100/ff6b6b/ffffff?text=Defect+1' },
        { id: '2', uri: 'https://via.placeholder.com/150x100/4ecdc4/ffffff?text=Defect+2' }
      ]
    },
    {
      id: '2', 
      plantItem: 'Truck 1',
      plantId: 'T001',
      task: 'Tire condition and pressure',
      status: 'defect',
      timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
      comments: 'Front left tire showing wear',
      workRequestId: 'WR-2024-002',
      priority: 'Medium',
      assignedTo: 'Maintenance Team B',
      location: 'Sydney Branch',
      photos: [
        { id: '3', uri: 'https://via.placeholder.com/150x100/45b7d1/ffffff?text=Tire+1' }
      ]
    }
  ]);

  const [completedItems, setCompletedItems] = useState([
    {
      id: '3',
      plantItem: 'Excavator 2',
      plantId: 'E002',
      task: 'Engine oil change',
      status: 'completed',
      timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      comments: 'Regular maintenance completed',
      photos: [],
      workRequestId: 'WR-2024-003',
      priority: 'Low',
      assignedTo: 'Maintenance Team A',
      location: 'Brisbane Branch',
      completedAt: new Date(Date.now() - 43200000).toISOString(), // 12 hours ago
      completedBy: 'John Smith'
    },
    {
      id: '4',
      plantItem: 'Wheel Loader 1',
      plantId: 'WL001',
      task: 'Brake system inspection',
      status: 'completed',
      timestamp: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
      comments: 'Brake pads replaced, system tested',
      photos: [],
      workRequestId: 'WR-2024-004',
      priority: 'High',
      assignedTo: 'Maintenance Team C',
      location: 'Perth Branch',
      completedAt: new Date(Date.now() - 129600000).toISOString(), // 36 hours ago
      completedBy: 'Sarah Johnson'
    }
  ]);

  const filteredAndSortedItems = useMemo(() => {
    // First filter by search text
    let filtered = allPlantItems.filter(item => {
      if (!searchText.trim()) return true;
      
      const searchLower = searchText.toLowerCase();
      return (
        (item.name || '').toLowerCase().includes(searchLower) ||
        (item.branch || '').toLowerCase().includes(searchLower) ||
        (item.id || '').toLowerCase().includes(searchLower)
      );
    });
    
    // Sort by selected criteria, but prioritize bookmarked items
    let sorted;
    if (sortBy === 'name') {
      // Sort by name alphabetically, but bookmarked items first
      sorted = [...filtered].sort((a, b) => {
        const aBookmarked = bookmarkedItems[a.id];
        const bBookmarked = bookmarkedItems[b.id];
        
        // If one is bookmarked and the other isn't, bookmarked comes first
        if (aBookmarked && !bBookmarked) return -1;
        if (!aBookmarked && bBookmarked) return 1;
        
        // If both have same bookmark status, sort by name
        return (a.name || '').localeCompare(b.name || '');
      });
    } else if (sortBy === 'id') {
      // Sort by ID alphabetically, but bookmarked items first
      sorted = [...filtered].sort((a, b) => {
        const aBookmarked = bookmarkedItems[a.id];
        const bBookmarked = bookmarkedItems[b.id];
        
        // If one is bookmarked and the other isn't, bookmarked comes first
        if (aBookmarked && !bBookmarked) return -1;
        if (!aBookmarked && bBookmarked) return 1;
        
        // If both have same bookmark status, sort by ID
        return (a.id || '').localeCompare(b.id || '');
      });
    } else if (sortBy === 'branch') {
      // Sort by branch alphabetically, but bookmarked items first
      sorted = [...filtered].sort((a, b) => {
        const aBookmarked = bookmarkedItems[a.id];
        const bBookmarked = bookmarkedItems[b.id];
        
        // If one is bookmarked and the other isn't, bookmarked comes first
        if (aBookmarked && !bBookmarked) return -1;
        if (!aBookmarked && bBookmarked) return 1;
        
        // If both have same bookmark status, sort by branch
        return (a.branch || '').localeCompare(b.branch || '');
      });
    } else {
      // Default to name sorting with bookmarked items first
      sorted = [...filtered].sort((a, b) => {
        const aBookmarked = bookmarkedItems[a.id];
        const bBookmarked = bookmarkedItems[b.id];
        
        // If one is bookmarked and the other isn't, bookmarked comes first
        if (aBookmarked && !bBookmarked) return -1;
        if (!aBookmarked && bBookmarked) return 1;
        
        // If both have same bookmark status, sort by name
        return (a.name || '').localeCompare(b.name || '');
      });
    }

    // For search results, show all items. For normal browsing, limit to displayedItems
    if (searchText.trim()) {
      return sorted;
    } else {
      return sorted.slice(0, displayedItems);
    }
  }, [searchText, bookmarkedItems, displayedItems, sortBy]);

  const loadMoreItems = () => {
    if (loading || searchText.trim()) return; // Don't load more if searching
    
    setLoading(true);
    // Simulate loading delay
    setTimeout(() => {
      setDisplayedItems(prev => Math.min(prev + 6, allPlantItems.length));
      setLoading(false);
    }, 500);
  };

  const handleScroll = (event: any) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const paddingToBottom = 20;
    
    if (layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom) {
      loadMoreItems();
    }
  };

  const toggleBookmark = (itemId: string) => {
    const item = allPlantItems.find(item => item.id === itemId);
    const isCurrentlyBookmarked = bookmarkedItems[itemId];
    
    setBookmarkedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));

    // Show snackbar notification
    if (item) {
      const action = !isCurrentlyBookmarked ? 'bookmarked' : 'removed from bookmarks';
      setSnackbarMessage(`${item.name} ${action}`);
      setSnackbarVisible(true);
      
      // Auto-hide snackbar after 3 seconds
      setTimeout(() => {
        setSnackbarVisible(false);
      }, 3000);
    }
  };

  const openCamera = () => {
    setShowQRScanner(true);
  };

  const handleQRScan = (data: string) => {
    // Handle the scanned QR code data
    console.log('QR Code scanned:', data);
    
    // Search for equipment by ID
    const foundItem = allPlantItems.find(item => item.id === data);
    if (foundItem) {
      // Close QR scanner and go directly to plant item page
      setShowQRScanner(false);
      openTaskDetails(foundItem);
    } else {
      // Show error alert only if item not found
      Alert.alert(
        'Equipment Not Found',
        `No equipment found with ID: ${data}`,
        [{ text: 'OK' }]
      );
    }
  };

  const closeQRScanner = () => {
    setShowQRScanner(false);
  };

  const openTaskDetails = (plantItem: any) => {
    setSelectedPlantItem(plantItem);
    setShowTaskDetails(true);
  };

  const closeTaskDetails = () => {
    setShowTaskDetails(false);
    setSelectedPlantItem(null);
  };

  // Handle queue opening after navigation
  const handleQueueAfterNavigation = () => {
    setShowQueueViewer(true);
  };

  const handleSort = (sortOption: 'name' | 'id' | 'branch') => {
    setSortBy(sortOption);
    setShowSortMenu(false);
  };

  const getSortText = () => {
    switch (sortBy) {
      case 'name': return `${t.sortBy} ${t.sortByName}`;
      case 'id': return `${t.sortBy} ${t.sortById}`;
      case 'branch': return `${t.sortBy} ${t.sortByBranch}`;
      default: return `${t.sortBy} ${t.sortByName}`;
    }
  };

  const closeSortMenu = () => {
    setShowSortMenu(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#ddd8f7" />
      
      {/* Touch handler to close dropdown */}
      {showSortMenu && (
        <TouchableOpacity 
          style={styles.overlay} 
          activeOpacity={1} 
          onPress={closeSortMenu}
        />
      )}
      
      {/* Purple background above header */}
      <View style={styles.statusBarBackground} />
      
      {/* Pinned Header */}
      <View style={styles.headerCustom}>
        <View style={styles.headerLeftSection}>
          <TouchableOpacity 
            style={styles.hamburgerMenuWrapper}
            onPress={() => setShowHamburgerMenu(true)}
          >
            <MaterialIcons name="menu" size={24} color="#242424" />
          </TouchableOpacity>
          <View style={styles.logoContainer}>
            <Image source={headerLogo} style={styles.logoImage} />
          </View>
        </View>
        <View style={styles.headerCenterSection}>
          <Text style={styles.headerTitle}>Pronto Maintenance Management</Text>
        </View>
        <View style={styles.headerRightSection}>
      <TouchableOpacity 
        style={styles.statusButton}
        onPress={() => setShowQueueViewer(true)}
        activeOpacity={0.7}
      >
        <Text style={[styles.onlineStatus, isOfflineMode && styles.offlineStatus]}>
          {isOfflineMode ? 'Offline' : 'Online'}
        </Text>
      </TouchableOpacity>
        </View>
      </View>

      {/* Pinned Search Bar */}
      <View style={styles.searchBarContainer}>
        <View style={styles.searchBar}>
          <TextInput
            style={styles.searchInput}
            placeholder={t.searchPlaceholder}
            placeholderTextColor="#757575"
            value={searchText}
            onChangeText={setSearchText}
            returnKeyType="search"
          />
          <TouchableOpacity 
            style={styles.searchIconWrapper}
            onPress={() => {
              if (searchText.trim()) {
                setSearchText('');
              }
            }}
          >
            <MaterialIcons 
              name={searchText.trim() ? "close" : "search"} 
              size={20} 
              color="#5C5C5C" 
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Pinned Sync Section */}
      <View style={styles.pinnedSyncContainer}>
        <View style={styles.syncSection}>
          <Text style={styles.syncText}>{t.lastSynced} 24 Jun 2025 - 10:00 AM</Text>
          <TouchableOpacity 
            style={styles.sortButton}
            onPress={() => setShowSortMenu(!showSortMenu)}
          >
            <Text style={styles.sortText}>{getSortText()}</Text>
            <MaterialIcons 
              name="more-vert" 
              size={16} 
              color="#232323" 
            />
          </TouchableOpacity>
          
          {/* Sort Dropdown Menu */}
          {showSortMenu && (
            <View style={styles.sortDropdown}>
              <TouchableOpacity 
                style={[styles.sortOption, sortBy === 'name' && styles.sortOptionSelected]}
                onPress={() => handleSort('name')}
              >
                <Text style={[styles.sortOptionText, sortBy === 'name' && styles.sortOptionTextSelected]}>{t.sortByName}</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.sortOption, sortBy === 'id' && styles.sortOptionSelected]}
                onPress={() => handleSort('id')}
              >
                <Text style={[styles.sortOptionText, sortBy === 'id' && styles.sortOptionTextSelected]}>{t.sortById}</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.sortOption, sortBy === 'branch' && styles.sortOptionSelected]}
                onPress={() => handleSort('branch')}
              >
                <Text style={[styles.sortOptionText, sortBy === 'branch' && styles.sortOptionTextSelected]}>{t.sortByBranch}</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      {/* Scrollable Content */}
      <ScrollView 
        style={styles.scrollableContent} 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContainer}
        onScroll={handleScroll}
        scrollEventThrottle={400}
      >
        {/* Plant Items List */}
        {filteredAndSortedItems.length > 0 ? (
          filteredAndSortedItems.map((item, index) => (
            <View key={item.id} style={[styles.listItem, index === 0 && styles.firstListItem]}>
              <View style={styles.listItemRow}>
                {/* Full Height Image */}
                <View style={styles.imageContainer}>
                  <Image source={item.image} style={styles.itemImage} />
                </View>
                
                {/* Text Content and Button Container */}
                <View style={styles.contentContainer}>
                  {/* Text Content */}
                  <View style={styles.textContent}>
                    <View style={styles.textGroup}>
                      <Text style={styles.itemLabel}>Plant item</Text>
                      <Text style={styles.itemTitle}>{item.id} | {item.name}</Text>
                    </View>
                    <View style={styles.textGroup}>
                      <Text style={styles.itemLabel}>{t.sortByBranch}</Text>
                      <Text style={styles.itemTitle}>{item.branch}</Text>
                    </View>
                  </View>
                  
                  {/* View Tasks Button */}
                  <View style={styles.buttonContainer}>
                    <Button 
                      title="View Tasks"
                      onPress={() => openTaskDetails(item)}
                    />
                  </View>
                </View>
                
                {/* Bookmark Icon */}
                <TouchableOpacity 
                  style={styles.bookmarkContainer}
                  onPress={() => toggleBookmark(item.id)}
                >
                  <MaterialCommunityIcons 
                    name={bookmarkedItems[item.id] ? "bookmark" : "bookmark-outline"} 
                    size={24} 
                    color="#8a3ffc" 
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) : searchText.trim() ? (
          /* No Search Results Message */
          <View style={styles.noResultsContainer}>
            <MaterialIcons name="search-off" size={48} color="#8a3ffc" />
            <Text style={styles.noResultsTitle}>No items found</Text>
            <Text style={styles.noResultsSubtitle}>
              Try adjusting your search terms or browse all equipment
            </Text>
            <TouchableOpacity 
              style={styles.clearSearchButton}
              onPress={() => setSearchText('')}
            >
              <Text style={styles.clearSearchButtonText}>Clear Search</Text>
            </TouchableOpacity>
          </View>
        ) : null}
        
        {/* Skeleton Loading Cards */}
        {loading && (
          <>
            {Array.from({ length: 3 }).map((_, index) => (
              <View key={`skeleton-${index}`} style={styles.listItem}>
                <View style={styles.listItemRow}>
                  {/* Skeleton Image */}
                  <SkeletonShimmer style={[styles.imageContainer, styles.skeletonImage]}>
                    <View />
                  </SkeletonShimmer>
                  
                  {/* Skeleton Content */}
                  <View style={styles.contentContainer}>
                    <View style={styles.textContent}>
                      <View style={styles.textGroup}>
                        <SkeletonShimmer style={[styles.skeletonText, styles.skeletonLabel]}>
                          <View />
                        </SkeletonShimmer>
                        <SkeletonShimmer style={[styles.skeletonText, styles.skeletonTitle]}>
                          <View />
                        </SkeletonShimmer>
                      </View>
                      <View style={styles.textGroup}>
                        <SkeletonShimmer style={[styles.skeletonText, styles.skeletonLabel]}>
                          <View />
                        </SkeletonShimmer>
                        <SkeletonShimmer style={[styles.skeletonText, styles.skeletonBranch]}>
                          <View />
                        </SkeletonShimmer>
                      </View>
                    </View>
                    
                    {/* Skeleton Button */}
                    <View style={styles.buttonContainer}>
                      <SkeletonShimmer style={[styles.skeletonButton, { height: 36, width: 100, borderRadius: 4 }]}>
                        <View />
                      </SkeletonShimmer>
                    </View>
                  </View>
                  
                  {/* Skeleton Bookmark */}
                  <SkeletonShimmer style={[styles.bookmarkContainer, styles.skeletonBookmark]}>
                    <View />
                  </SkeletonShimmer>
                </View>
              </View>
            ))}
          </>
        )}
        
        {/* End of List Indicator */}
        {!searchText.trim() && displayedItems >= allPlantItems.length && (
          <View style={styles.endOfListContainer}>
            <Text style={styles.endOfListText}>You've reached the end of the list</Text>
          </View>
        )}
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab} onPress={openCamera}>
        <MaterialIcons name="qr-code-scanner" size={32} color="#ffffff" />
      </TouchableOpacity>

      {/* QR Scanner Modal */}
      <Modal
        visible={showQRScanner}
        animationType="slide"
        presentationStyle="fullScreen"
      >
        <QRScannerScreenMock
          onScan={handleQRScan}
          onClose={closeQRScanner}
        />
      </Modal>

      {/* Task Details Modal */}
      {selectedPlantItem && (
        <Modal
          visible={showTaskDetails}
          animationType="slide"
          presentationStyle="fullScreen"
        >
          <TaskDetailsScreen
            plantItem={selectedPlantItem}
            onBack={closeTaskDetails}
            isOfflineMode={isOfflineMode}
            onShowQueue={handleQueueAfterNavigation}
          />
        </Modal>
      )}

      {/* Queue Viewer Modal */}
      {showQueueViewer && (
        <Modal
          visible={showQueueViewer}
          animationType="slide"
          presentationStyle="fullScreen"
        >
          <View style={styles.queueModalContainer}>
            <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
            
            {/* Header */}
            <View style={styles.queueHeader}>
              <View style={styles.queueHeaderSpacer} />
              <TouchableOpacity 
                style={styles.queueCloseButton}
                onPress={() => setShowQueueViewer(false)}
              >
                <MaterialIcons name="close" size={24} color="#242424" />
              </TouchableOpacity>
            </View>

            {/* Queue Items */}
            <ScrollView style={styles.queueContent}>
              <Text style={styles.queuePageTitle}>Work Request Queue</Text>
              
              {/* Current Queue Section */}
              <View style={[styles.queueSection, styles.queueSectionFirst]}>
                <Text style={styles.queueSectionTitle}>Queued ({queuedItems.length})</Text>
                {queuedItems.length === 0 ? (
                  <View style={styles.emptyQueue}>
                    <MaterialIcons name="inbox" size={48} color="#ccc" />
                    <Text style={styles.emptyQueueText}>No work requests in queue</Text>
                  </View>
                ) : (
                  queuedItems.map((item) => (
                    <View key={item.id} style={styles.queueItem}>
                      <View style={styles.queueItemHeader}>
                        <View style={styles.queueItemTitleContainer}>
                          <Text style={styles.queueItemTitle}>{item.plantItem}</Text>
                          <Text style={styles.queueItemId}>ID: {item.plantId}</Text>
                        </View>
                        <View style={styles.queueItemTimeContainer}>
                          <Text style={styles.queueItemTime}>
                            {new Date(item.timestamp).toLocaleTimeString()}
                          </Text>
                          <View style={[styles.priorityBadge, item.priority === 'High' && styles.highPriorityBadge]}>
                            <Text style={[styles.priorityText, item.priority === 'High' && styles.highPriorityText]}>
                              {item.priority}
                            </Text>
                          </View>
                        </View>
                      </View>
                      <Text style={styles.queueItemTask}>{item.task}</Text>
                      <View style={styles.queueItemDetails}>
                        <Text style={styles.queueItemDetail}>{t.workRequest}: {item.workRequestId}</Text>
                        <Text style={styles.queueItemDetail}>{t.assignedTo}: {item.assignedTo}</Text>
                        <Text style={styles.queueItemDetail}>{t.location}: {item.location}</Text>
                      </View>
                      {item.comments && (
                        <Text style={styles.queueItemComments}>{item.comments}</Text>
                      )}
                      <View style={styles.queueItemStatus}>
                        <View style={[styles.statusBadge, item.status === 'defect' && styles.defectBadge]}>
                          <Text style={[styles.statusText, item.status === 'defect' && styles.defectText]}>
                            {item.status === 'defect' ? 'Defect' : 'OK'}
                          </Text>
                        </View>
                      </View>
                    </View>
                  ))
                )}
              </View>

              {/* Completed Items Section */}
              <View style={styles.queueSection}>
                <Text style={styles.queueSectionTitle}>Sent ({completedItems.length})</Text>
                {completedItems.map((item) => (
                  <View key={item.id} style={[styles.queueItem, styles.completedItem]}>
                    <View style={styles.queueItemHeader}>
                      <View style={styles.queueItemTitleContainer}>
                        <Text style={styles.queueItemTitle}>{item.plantItem}</Text>
                        <Text style={styles.queueItemId}>ID: {item.plantId}</Text>
                      </View>
                      <View style={styles.queueItemTimeContainer}>
                        <Text style={styles.queueItemTime}>
                          Completed {new Date(item.completedAt).toLocaleDateString()}
                        </Text>
                        <View style={styles.completedBadge}>
                          <Text style={styles.completedText}>Completed</Text>
                        </View>
                      </View>
                    </View>
                    <Text style={styles.queueItemTask}>{item.task}</Text>
                    <View style={styles.queueItemDetails}>
                      <Text style={styles.queueItemDetail}>{t.workRequest}: {item.workRequestId}</Text>
                      <Text style={styles.queueItemDetail}>{t.completedBy}: {item.completedBy}</Text>
                      <Text style={styles.queueItemDetail}>{t.location}: {item.location}</Text>
                    </View>
                    {item.comments && (
                      <Text style={styles.queueItemComments}>{item.comments}</Text>
                    )}
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
        </Modal>
      )}

      {/* Snackbar */}
      {snackbarVisible && (
        <View style={styles.snackbar}>
          <View style={styles.snackbarContent}>
            <MaterialIcons 
              name="bookmark" 
              size={20} 
              color="#ffffff" 
              style={styles.snackbarIcon}
            />
            <Text style={styles.snackbarText}>{snackbarMessage}</Text>
            <TouchableOpacity 
              style={styles.snackbarClose}
              onPress={() => setSnackbarVisible(false)}
            >
              <MaterialIcons name="close" size={20} color="#ffffff" />
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Language Selector Modal */}
      <LanguageSelector
        visible={showLanguageSelector}
        onClose={() => setShowLanguageSelector(false)}
      />

      {/* Hamburger Menu Modal */}
      <Modal
        visible={showHamburgerMenu}
        animationType="slide"
        presentationStyle="fullScreen"
        onRequestClose={() => setShowHamburgerMenu(false)}
      >
        <View style={styles.fullPageMenuContainer}>
          {/* Header with close button */}
          <View style={styles.fullPageMenuHeader}>
            <View style={styles.fullPageMenuHeaderSpacer} />
            <TouchableOpacity 
              style={styles.fullPageMenuClose}
              onPress={() => {
                console.log('Close button pressed');
                setShowHamburgerMenu(false);
              }}
              activeOpacity={0.7}
            >
              <MaterialIcons name="close" size={24} color="#242424" />
            </TouchableOpacity>
          </View>
          
          {/* User Profile Section */}
          <View style={styles.userProfileSection}>
            <View style={styles.userAvatar}>
              <Text style={styles.userAvatarText}>D</Text>
            </View>
            <Text style={styles.userName}>David Wood</Text>
          </View>
          
          {/* Menu Items */}
          <View style={styles.fullPageMenuContent}>
            <TouchableOpacity 
              style={styles.fullPageMenuItem}
              onPress={() => {
                setShowHamburgerMenu(false);
                // Handle About action
              }}
            >
              <Text style={styles.fullPageMenuItemText}>About</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.fullPageMenuItem}
              onPress={() => {
                setShowHamburgerMenu(false);
                setShowLanguageSelector(true);
              }}
            >
              <Text style={styles.fullPageMenuItemText}>Language</Text>
            </TouchableOpacity>

        <TouchableOpacity 
          style={styles.fullPageMenuItem}
          onPress={() => {
            setIsOfflineMode(!isOfflineMode);
            setShowHamburgerMenu(false);
          }}
        >
          <Text style={styles.fullPageMenuItemText}>
            {isOfflineMode ? 'Go Online' : 'Go Offline'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.fullPageMenuItem}
          onPress={() => {
            setShowQueueViewer(true);
            setShowHamburgerMenu(false);
          }}
        >
        <Text style={styles.fullPageMenuItemText}>
          View Work Requests ({queuedItems.length})
        </Text>
        </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.fullPageMenuItem}
              onPress={() => {
                setShowHamburgerMenu(false);
                // Handle Pronto Xi action
              }}
            >
              <Text style={styles.fullPageMenuItemText}>Pronto Xi</Text>
              <MaterialIcons name="open-in-new" size={24} color="#242424" />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.fullPageMenuItem}
              onPress={() => {
                setShowHamburgerMenu(false);
                // Handle Deregister action
              }}
            >
              <Text style={styles.fullPageMenuItemText}>Deregister</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  
  // Purple background above header
  statusBarBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 50,
    backgroundColor: '#ddd8f7',
    zIndex: 1001,
  },
  
  // Header Styles
  headerCustom: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    backgroundColor: '#ddd8f7',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    paddingTop: 8,
    paddingBottom: 0,
    height: 56,
    width: '100%',
    zIndex: 1000,
  },
  headerLeftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingRight: 12,
  },
  hamburgerMenuWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 24,
    height: 24,
  },
  logoContainer: {
    height: 24,
    width: 24,
    borderRadius: 2,
  },
  logoImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  headerCenterSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  headerTitle: {
    fontFamily: 'Roboto',
    fontSize: 16,
    fontWeight: '600',
    color: '#242424',
    textAlign: 'center',
  },
  headerRightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 4,
  },
  onlineStatus: {
    fontFamily: 'Roboto',
    fontSize: 11,
    fontWeight: '400',
    color: '#14662c',
    letterSpacing: 0.25,
  },
  offlineStatus: {
    color: '#d32f2f', // Red color for offline
  },
  statusButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  headerIconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 36,
    height: 36,
    borderRadius: 75,
  },
  headerIconImage: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },

  // Search Bar Styles
  searchBarContainer: {
    position: 'absolute',
    top: 106, // 50px padding + 56px header
    left: 0,
    right: 0,
    height: 68, // Adjusted for new search bar height
    zIndex: 999,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  searchBar: {
    backgroundColor: '#ffffff',
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#dbdbdb',
    flex: 1,
    maxWidth: 720,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Roboto',
    fontSize: 14,
    fontWeight: '400',
    color: '#49454f',
    letterSpacing: 0.16,
    paddingVertical: 0,
    paddingHorizontal: 6,
    lineHeight: 18,
  },
  searchIconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 24,
    height: 24,
  },
  searchIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },

  // Pinned Sync Container
  pinnedSyncContainer: {
    position: 'absolute',
    top: 174, // Header (56) + Search Bar (68) + small gap
    left: 0,
    right: 0,
    zIndex: 1000, // Increased z-index to ensure sync section is above scrollable content
    overflow: 'visible', // Allow dropdown to extend beyond container
  },

  // Scrollable Content
  scrollableContent: {
    flex: 1,
    marginTop: 174, // Header (56) + Search Bar (68) + Sync Section (48) - removed extra gap
  },
  scrollContainer: {
    paddingBottom: 100, // Space for FAB only
    paddingTop: 0, // Remove any top padding
  },

  // Sync Section
  syncSection: {
    backgroundColor: '#f8f7fe',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 5, // Reduce padding to minimize height
    height: 48, // Reduce height to minimize gap
    marginBottom: 0, // Ensure no margin below sync section
    overflow: 'visible', // Allow dropdown to extend beyond container
  },
  syncText: {
    fontFamily: 'Roboto',
    fontSize: 12,
    fontWeight: '400',
    color: '#747474',
    letterSpacing: 0.32,
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 32,
    paddingHorizontal: 8,
    paddingVertical: 3,
    gap: 0,
  },
  sortIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
  },
  sortText: {
    fontFamily: 'Roboto',
    fontSize: 12,
    fontWeight: '400',
    color: '#232323',
    letterSpacing: 0.32,
  },
  
  // Sort Dropdown Styles
  sortDropdown: {
    position: 'absolute',
    top: '100%',
    right: 0,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    zIndex: 1005, // Much higher z-index to ensure it appears above scrollable content
    minWidth: 120,
  },
  sortOption: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  sortOptionSelected: {
    backgroundColor: '#f8f7fe',
  },
  sortOptionText: {
    fontFamily: 'Roboto',
    fontSize: 14,
    fontWeight: '400',
    color: '#232323',
  },
  sortOptionTextSelected: {
    color: '#8a3ffc',
    fontWeight: '500',
  },
  
  // Overlay for closing dropdown
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    zIndex: 999,
  },

  // List Items
  listItem: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd8f7',
  },
  firstListItem: {
    paddingTop: 0, // Remove top padding from first item
    marginTop: 0, // Reduce negative margin to prevent text cutoff
  },
  listItemRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 15,
  },
  
  // Image with exact Figma height
  imageContainer: {
    width: 146,
    height: 146,
    overflow: 'hidden',
  },
  itemImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  
  // Content Container (Text + Button)
  contentContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between', // Spread text and button
    alignSelf: 'stretch',
  },
  
  // Text Content
  textContent: {
    flex: 1,
    gap: 8,
    justifyContent: 'center', // Center text vertically in its space
  },
  textGroup: {
    gap: 2,
  },
  itemLabel: {
    fontFamily: 'Roboto',
    fontSize: 12,
    fontWeight: '400',
    color: '#747474',
    letterSpacing: 0.4,
  },
  itemTitle: {
    fontFamily: 'Roboto',
    fontSize: 14,
    fontWeight: '400',
    color: '#232323',
    letterSpacing: 0.16,
  },
  
  // Bookmark
  bookmarkContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: 24,
    height: 24,
    alignSelf: 'flex-start', // Align to top
    marginTop: 8,
  },
  
  // Button
  buttonContainer: {
    alignItems: 'flex-start',
    paddingTop: 8, // Small gap from text
  },

  // FAB
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 16,
    backgroundColor: '#8a3ffc',
    borderRadius: 42,
    width: 84,
    height: 84,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  fabIconImage: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  // Skeleton Styles (backgroundColor will be animated)
  skeletonImage: {
    // backgroundColor animated by SkeletonShimmer
  },
  skeletonText: {
    borderRadius: 4,
    // backgroundColor animated by SkeletonShimmer
  },
  skeletonLabel: {
    height: 12,
    width: '40%',
    marginBottom: 4,
  },
  skeletonTitle: {
    height: 16,
    width: '80%',
  },
  skeletonBranch: {
    height: 16,
    width: '60%',
  },
  skeletonButton: {
    // backgroundColor animated by SkeletonShimmer
  },
  skeletonBookmark: {
    borderRadius: 12,
    // backgroundColor animated by SkeletonShimmer
  },
  endOfListContainer: {
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  endOfListText: {
    fontSize: 14,
    color: '#999',
    fontFamily: 'Roboto',
    fontStyle: 'italic',
  },

  // No Results Styles
  noResultsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  noResultsTitle: {
    fontFamily: 'Roboto',
    fontSize: 18,
    fontWeight: '500',
    color: '#232323',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  noResultsSubtitle: {
    fontFamily: 'Roboto',
    fontSize: 14,
    fontWeight: '400',
    color: '#747474',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  clearSearchButton: {
    backgroundColor: '#8a3ffc',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  clearSearchButtonText: {
    fontFamily: 'Roboto',
    fontSize: 14,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center',
  },

  // Snackbar Styles
  snackbar: {
    position: 'absolute',
    bottom: 30, // Lower position for better accessibility
    left: 16,
    right: 16,
    zIndex: 1000,
  },
  snackbarContent: {
    backgroundColor: '#232323', // prontoText
    borderRadius: 0,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  snackbarIcon: {
    marginRight: 8,
  },
  snackbarText: {
    flex: 1,
    fontFamily: 'Roboto',
    fontSize: 14,
    fontWeight: '500',
    color: '#ffffff',
  },
  snackbarClose: {
    padding: 4,
    marginLeft: 8,
  },

  // Full Page Menu Styles
  fullPageMenuContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  fullPageMenuHeader: {
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingTop: 50,
  },
  fullPageMenuHeaderSpacer: {
    flex: 1,
  },
  fullPageMenuClose: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  userProfileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    paddingTop: 20,
    gap: 8,
  },
  userAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#eaddff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userAvatarText: {
    fontFamily: 'Roboto',
    fontSize: 9.6,
    fontWeight: '500',
    color: '#4f378a',
    textAlign: 'center',
  },
  userName: {
    fontFamily: 'Roboto',
    fontSize: 14,
    fontWeight: '600',
    color: '#232323',
    letterSpacing: 0.16,
  },
  fullPageMenuContent: {
    flex: 1,
  },
  fullPageMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 48,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  fullPageMenuItemText: {
    fontFamily: 'Roboto',
    fontSize: 14,
    fontWeight: '400',
    color: '#232323',
    letterSpacing: 0.16,
  },

  // Queue Viewer Styles
  queueModalContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
      queueHeader: {
        height: 100,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingTop: 50,
      },
      queueHeaderSpacer: {
        flex: 1,
      },
      queueCloseButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 44,
        height: 44,
        borderRadius: 22,
      },
      queueContent: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 20,
      },
      queuePageTitle: {
        fontSize: 20,
        fontWeight: '500',
        color: '#242424',
        marginBottom: 20,
        fontFamily: 'Roboto',
      },
      queueSection: {
        marginBottom: 24,
        paddingTop: 0,
      },
      queueSectionTitle: {
        fontFamily: 'Roboto',
        fontSize: 14,
        fontWeight: '600',
        color: '#232323',
        marginBottom: 12,
        marginTop: 0,
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#f0f0ff',
        marginHorizontal: -16,
      },
      queueSectionFirst: {
        marginBottom: 24,
        paddingTop: 0,
      },
  emptyQueue: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyQueueText: {
    fontFamily: 'Roboto',
    fontSize: 16,
    fontWeight: '400',
    color: '#666',
    marginTop: 16,
  },
  queueItem: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd8f7',
  },
      queueItemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 4,
      },
      queueItemTitleContainer: {
        flex: 1,
      },
      queueItemTitle: {
        fontFamily: 'Roboto',
        fontSize: 16,
        fontWeight: '400',
        color: '#232323',
        lineHeight: 22,
      },
      queueItemId: {
        fontFamily: 'Roboto',
        fontSize: 12,
        fontWeight: '400',
        color: '#666',
        marginTop: 2,
      },
      queueItemTimeContainer: {
        alignItems: 'flex-end',
      },
      queueItemTime: {
        fontFamily: 'Roboto',
        fontSize: 12,
        fontWeight: '400',
        color: '#666',
        marginBottom: 4,
      },
      queueItemDetails: {
        marginVertical: 4,
      },
      queueItemDetail: {
        fontFamily: 'Roboto',
        fontSize: 12,
        fontWeight: '400',
        color: '#666',
        marginBottom: 2,
      },
      queueItemTask: {
        fontFamily: 'Roboto',
        fontSize: 14,
        fontWeight: '400',
        color: '#666',
        marginBottom: 4,
        lineHeight: 20,
      },
      queueItemComments: {
        fontFamily: 'Roboto',
        fontSize: 14,
        fontWeight: '400',
        color: '#232323',
        fontStyle: 'italic',
        marginBottom: 8,
      },
  queueItemStatus: {
    alignItems: 'flex-start',
  },
  statusBadge: {
    backgroundColor: '#e8f5e8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  defectBadge: {
    backgroundColor: '#ffebee',
  },
  statusText: {
    fontFamily: 'Roboto',
    fontSize: 12,
    fontWeight: '500',
    color: '#2e7d32',
  },
      defectText: {
        color: '#d32f2f',
      },
      priorityBadge: {
        backgroundColor: '#e3f2fd',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
        marginTop: 4,
      },
      highPriorityBadge: {
        backgroundColor: '#ffebee',
      },
      priorityText: {
        fontFamily: 'Roboto',
        fontSize: 10,
        fontWeight: '500',
        color: '#1976d2',
      },
      highPriorityText: {
        color: '#d32f2f',
      },
      completedItem: {
        backgroundColor: '#f8f9fa',
        borderColor: '#e0e0e0',
      },
      completedBadge: {
        backgroundColor: '#e8f5e8',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
        marginTop: 4,
      },
      completedText: {
        fontFamily: 'Roboto',
        fontSize: 10,
        fontWeight: '500',
        color: '#2e7d32',
      },
});

export default HomeScreen;