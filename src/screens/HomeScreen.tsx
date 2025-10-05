import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

// Image assets from Figma
const headerLogo = "http://localhost:3845/assets/062b695275c0b24826ab6cfbc5ea097d710b0032.png";
const headerIcon = "http://localhost:3845/assets/85c041811a3356f9b1f271464cfe38c5a4288c55.svg";
const searchIcon = "http://localhost:3845/assets/5880ef6c3cc47f23e1779e67f3faa75e815f3d73.svg";

const plantItems = [
  {
    id: 'Truck 1',
    name: 'Truck 1',
    branch: 'Main Branch',
    image: "http://localhost:3845/assets/70b415db7bb37cc70533f70472c759841746b920.png",
    isBookmarked: true,
  },
  {
    id: 'Truck 2',
    name: 'Truck 2',
    branch: 'Main Branch',
    image: "http://localhost:3845/assets/70b415db7bb37cc70533f70472c759841746b920.png",
    isBookmarked: false,
  },
  {
    id: 'Truck 3',
    name: 'Truck 3',
    branch: 'Main Branch',
    image: "http://localhost:3845/assets/70b415db7bb37cc70533f70472c759841746b920.png",
    isBookmarked: true,
  },
  {
    id: 'Truck 4',
    name: 'Truck 4',
    branch: 'Main Branch',
    image: "http://localhost:3845/assets/70b415db7bb37cc70533f70472c759841746b920.png",
    isBookmarked: false,
  },
];

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#473d78" />
      
      {/* Pinned Header */}
      <View style={styles.headerCustom}>
        <View style={styles.headerLeftSection}>
          <View style={styles.logoContainer}>
            <Image source={{ uri: headerLogo }} style={styles.logoImage} />
          </View>
        </View>
        <View style={styles.headerRightSection}>
          <Text style={styles.onlineStatus}>Online</Text>
          <View style={styles.headerIconContainer}>
            <View style={styles.headerIconWrapper}>
              <Image source={{ uri: headerIcon }} style={styles.headerIcon} />
            </View>
          </View>
        </View>
      </View>

      {/* Pinned Search Bar */}
      <View style={styles.searchBarContainer}>
        <View style={styles.searchBar}>
          <View style={styles.searchContent}>
            <Text style={styles.searchPlaceholder}>Search...</Text>
          </View>
          <View style={styles.searchIconContainer}>
            <View style={styles.searchIconWrapper}>
              <Image source={{ uri: searchIcon }} style={styles.searchIcon} />
            </View>
          </View>
        </View>
      </View>

      {/* Scrollable Content */}
      <ScrollView style={styles.scrollableContent}>
        {/* Sync Status Section */}
        <View style={styles.syncSection}>
          <View style={styles.syncContent}>
            <Text style={styles.syncTitle}>Plant items</Text>
            <View style={styles.syncButton}>
              <MaterialIcons name="sync" size={20} color="#8a3ffc" />
            </View>
          </View>
        </View>

        {/* Plant Items List */}
        <View style={styles.plantItemsList}>
          {plantItems.map((item) => (
            <View key={item.id} style={styles.listItem}>
              <View style={styles.itemTopSection}>
                <View style={styles.imageContainer}>
                  <Image style={styles.itemImage} source={{ uri: item.image }} />
                </View>
                <View style={styles.textContentContainer}>
                  <View style={styles.textSection}>
                    <View style={styles.textGroup}>
                      <Text style={styles.itemLabel}>Plant item</Text>
                      <Text style={styles.itemName}>{item.id} | {item.name}</Text>
                    </View>
                    <View style={styles.textGroup}>
                      <Text style={styles.itemLabel}>Branch</Text>
                      <Text style={styles.itemName}>{item.branch}</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.bookmarkContainer}>
                  <MaterialCommunityIcons 
                    name={item.isBookmarked ? "bookmark" : "bookmark-outline"} 
                    size={24} 
                    color="#8a3ffc" 
                  />
                </View>
              </View>
              <View style={styles.buttonsSection}>
                <View style={styles.viewTasksButton}>
                  <View style={styles.buttonInnerFrame}>
                    <Text style={styles.buttonText}>View Tasks</Text>
                  </View>
                </View>
                <View style={styles.placeholderButton} />
                <View style={styles.placeholderButton} />
              </View>
            </View>
          ))}
        </View>

        {/* Tabs Section */}
        <View style={styles.tabsSection}>
          <View style={styles.tabItem}>
            <MaterialIcons name="home" size={24} color="#473d78" />
            <Text style={styles.tabText}>Home</Text>
          </View>
          <View style={styles.tabItem}>
            <MaterialIcons name="list" size={24} color="#8a3ffc" />
            <Text style={styles.tabText}>Tasks</Text>
          </View>
          <View style={styles.tabItem}>
            <MaterialIcons name="person" size={24} color="#473d78" />
            <Text style={styles.tabText}>Profile</Text>
          </View>
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <View style={styles.fab}>
        <MaterialIcons name="add" size={32} color="#fff" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  
  // Header Styles - Exact from Figma
  headerCustom: {
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
    gap: 15,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: 139.5,
    flexShrink: 0,
  },
  logoContainer: {
    height: 39,
    width: 32,
    flexShrink: 0,
  },
  logoImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  headerRightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: 135,
    flexShrink: 0,
  },
  onlineStatus: {
    fontFamily: 'Roboto',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    color: 'green',
    letterSpacing: 0.25,
    width: 41,
  },
  headerIconContainer: {
    flexDirection: 'row',
    gap: 18.75,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: 36,
    flexShrink: 0,
  },
  headerIconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 36,
    height: 36,
    flexShrink: 0,
  },
  headerIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },

  // Search Bar Styles - Exact from Figma
  searchBarContainer: {
    width: '100%',
    height: 72,
    zIndex: 1000,
  },
  searchBar: {
    position: 'absolute',
    backgroundColor: '#f8f7fe',
    bottom: 0,
    left: 16,
    width: 343,
    maxWidth: 720,
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 4,
    overflow: 'hidden',
  },
  searchContent: {
    flex: 1,
    height: '100%',
    alignItems: 'flex-start',
    justifyContent: 'center',
    minHeight: 1,
    minWidth: 1,
    paddingLeft: 20,
    paddingRight: 20,
    paddingVertical: 4,
  },
  searchPlaceholder: {
    fontFamily: 'Roboto',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    color: '#49454f',
    letterSpacing: 0.5,
    whiteSpace: 'pre',
  },
  searchIconContainer: {
    position: 'absolute',
    right: 4,
    top: '50%',
    transform: [{ translateY: -12 }],
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  searchIconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 48,
    height: 48,
    flexShrink: 0,
  },
  searchIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },

  // Scrollable Content
  scrollableContent: {
    flex: 1,
    marginTop: 0, // No margin since header and search are absolutely positioned
  },

  // Sync Section
  syncSection: {
    paddingHorizontal: 15,
    paddingVertical: 16,
    backgroundColor: '#fff',
  },
  syncContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 48,
  },
  syncTitle: {
    fontFamily: 'Roboto',
    fontSize: 16,
    fontWeight: '500',
    color: '#473d78',
  },
  syncButton: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Plant Items List
  plantItemsList: {
    gap: 0,
  },
  listItem: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc2dc',
    paddingHorizontal: 15,
    paddingVertical: 16,
  },
  itemTopSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
    paddingBottom: 12,
  },
  imageContainer: {
    width: 48,
    height: 48,
    borderRadius: 4,
    overflow: 'hidden',
    flexShrink: 0,
  },
  itemImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  textContentContainer: {
    flex: 1,
    minHeight: 48,
    justifyContent: 'space-between',
  },
  textSection: {
    gap: 8,
    paddingVertical: 4,
  },
  textGroup: {
    gap: 4,
  },
  itemLabel: {
    fontFamily: 'Roboto',
    fontSize: 12,
    fontWeight: '400',
    color: '#666',
    lineHeight: 16,
  },
  itemName: {
    fontFamily: 'Roboto',
    fontSize: 14,
    fontWeight: '500',
    color: '#473d78',
    lineHeight: 20,
  },
  bookmarkContainer: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  buttonsSection: {
    flexDirection: 'row',
    gap: 8,
    paddingTop: 8,
  },
  viewTasksButton: {
    flex: 1,
    height: 36,
    borderWidth: 1,
    borderColor: '#8a3ffc',
    borderRadius: 4,
    overflow: 'hidden',
  },
  buttonInnerFrame: {
    backgroundColor: '#8a3ffc',
    borderWidth: 1,
    borderColor: '#8a3ffc',
    borderRadius: 3,
    paddingHorizontal: 16,
    paddingVertical: 8,
    minHeight: 34,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: 'Roboto',
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
    letterSpacing: 0.1,
  },
  placeholderButton: {
    width: 36,
    height: 36,
    backgroundColor: 'transparent',
  },

  // Tabs Section
  tabsSection: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  tabText: {
    fontFamily: 'Roboto',
    fontSize: 12,
    fontWeight: '400',
    color: '#473d78',
  },

  // Floating Action Button
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: '#8a3ffc',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    zIndex: 1000,
  },
});

export default HomeScreen;
