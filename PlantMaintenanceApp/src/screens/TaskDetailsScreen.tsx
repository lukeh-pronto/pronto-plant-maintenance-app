import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Button } from '../components';
import { useLanguage } from '../contexts/LanguageContext';
import PreStartChecklistScreen from './PreStartChecklistScreen';

// Image assets from Figma
const plantImage = "http://localhost:3845/assets/70b415db7bb37cc70533f70472c759841746b920.png";
const arrowLeftIcon = "http://localhost:3845/assets/b747559d9ac5d472651933432b83241700356c90.svg";

interface TaskDetailsScreenProps {
  plantItem?: {
    id: string;
    name: string;
    branch: string;
    image: any;
  };
  onBack: () => void;
  isOfflineMode?: boolean;
  onShowQueue?: () => void;
}

type TabType = 'pre-starts' | 'plant-item' | 'task-history';

const { width: screenWidth } = Dimensions.get('window');

const TaskDetailsScreen: React.FC<TaskDetailsScreenProps> = ({ 
  plantItem,
  onBack,
  isOfflineMode = false,
  onShowQueue
}) => {
  const { t } = useLanguage();
  const [showPreStartChecklist, setShowPreStartChecklist] = useState(false);
  // Default plant item if none provided
  const defaultPlantItem = {
    id: '0401',
    name: 'Titan-950 Ultra Hauler',
    branch: 'Melbourne Branch',
    image: require('../../assets/equipment/titan-950-hauler.png'),
  };

  const currentPlantItem = plantItem || defaultPlantItem;
  const [activeTab, setActiveTab] = useState<TabType>('pre-starts');
  const scrollViewRef = useRef<ScrollView>(null);

  const tabs = [
    { id: 'pre-starts' as TabType, label: 'Pre-starts' },
    { id: 'plant-item' as TabType, label: t.plantItem },
    { id: 'task-history' as TabType, label: t.taskHistory },
  ];

  const handleTabPress = (tabId: TabType) => {
    setActiveTab(tabId);
    const tabIndex = tabs.findIndex(tab => tab.id === tabId);
    scrollViewRef.current?.scrollTo({
      x: tabIndex * screenWidth,
      animated: true,
    });
  };

  const handleScroll = (event: any) => {
    const scrollX = event.nativeEvent.contentOffset.x;
    const tabIndex = Math.round(scrollX / screenWidth);
    const newTab = tabs[tabIndex];
    if (newTab && newTab.id !== activeTab) {
      setActiveTab(newTab.id);
    }
  };

  const preStartTasks = [
    {
      id: '1',
      title: t.truckDailySafetyCheck,
      equipment: '0401 | Titan-950 Ultra Hauler',
      type: 'Pre-start',
    },
    {
      id: '2',
      title: 'Fleet Vehicle Daily Inspection',
      equipment: '0401 | Titan-950 Ultra Hauler',
      type: 'Pre-start',
    },
  ];

  const taskHistoryItems = [
    {
      id: '1',
      status: 'Complete',
      title: t.truckDailySafetyCheck,
      equipment: '0401 | Titan-950 Ultra Hauler',
      type: 'Pre-start',
    },
    {
      id: '2',
      status: 'Complete',
      title: '26 Week Overhaul',
      equipment: '0401 | Titan-950 Ultra Hauler',
      type: 'PM',
    },
  ];

  const renderTaskItem = (task: typeof preStartTasks[0]) => (
    <View key={task.id} style={styles.taskItem}>
      <View style={styles.taskItemContent}>
        <View style={styles.taskTopSection}>
          <View style={styles.taskLeftContent}>
            <View style={styles.taskTextGroup}>
              <Text style={styles.taskTitle}>{task.title}</Text>
              <Text style={styles.taskEquipment}>{task.equipment}</Text>
            </View>
          </View>
          <View style={styles.taskRightContent}>
            <Text style={styles.taskType}>{t.type}: {task.type}</Text>
          </View>
        </View>
        <View style={styles.taskButtonsSection}>
          <Button 
            title="Begin Pre-start" 
            onPress={() => setShowPreStartChecklist(true)}
          />
        </View>
      </View>
    </View>
  );

  const renderTaskHistoryItem = (task: typeof taskHistoryItems[0]) => (
    <View key={task.id} style={styles.taskItem}>
      <View style={styles.taskItemContent}>
        <View style={styles.taskTopSection}>
          <View style={styles.taskLeftContent}>
            <View style={styles.taskTextGroup}>
              <Text style={styles.taskStatus}>{task.status}</Text>
              <Text style={styles.taskTitle}>{task.title}</Text>
              <Text style={styles.taskEquipment}>{task.equipment}</Text>
            </View>
          </View>
          <View style={styles.taskRightContent}>
            <Text style={styles.taskType}>{t.type}: {task.type}</Text>
          </View>
        </View>
        <View style={styles.taskButtonsSection}>
          <Button 
            title="View Details" 
            onPress={() => console.log('View Details pressed')}
          />
        </View>
      </View>
    </View>
  );


  // Show PreStartChecklistScreen if requested
  if (showPreStartChecklist) {
    return (
        <PreStartChecklistScreen 
          onBack={() => {
            setShowPreStartChecklist(false);
            onBack(); // Go back to HomeScreen
          }}
          plantItem={plantItem || defaultPlantItem}
          isOfflineMode={isOfflineMode}
          onShowQueue={onShowQueue}
        />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#ddd8f7" />
      
      {/* Purple background above header */}
      <View style={styles.statusBarBackground} />
      
      {/* App Bar */}
      <View style={styles.appBar}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <MaterialIcons name="arrow-back" size={24} color="#232323" />
        </TouchableOpacity>
        <View style={styles.appBarContent}>
          <Text style={styles.appBarTitle}>{currentPlantItem.name}</Text>
          <Text style={styles.appBarSubtitle}>{currentPlantItem.id}</Text>
        </View>
      <TouchableOpacity 
        style={styles.statusContainer}
        onPress={() => {
          // First trigger the queue opening, then navigate back
          if (onShowQueue) {
            onShowQueue();
          }
          // Navigate back to HomeScreen
          onBack();
        }}
        activeOpacity={0.7}
      >
        <Text style={[styles.statusText, isOfflineMode && styles.offlineStatus]}>
          {isOfflineMode ? 'Offline' : 'Online'}
        </Text>
      </TouchableOpacity>
      </View>

      {/* Plant Image */}
      <View style={styles.plantImageContainer}>
        <Image source={currentPlantItem.image} style={styles.plantImage} />
      </View>

      {/* Content Container */}
      <View style={styles.contentContainer}>
        {/* Tabs */}
        <View style={styles.tabsContainer}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.id}
              style={[
                styles.tab,
                activeTab === tab.id && styles.activeTab
              ]}
              onPress={() => handleTabPress(tab.id)}
            >
              <View style={[
                styles.tabBar,
                activeTab === tab.id && styles.activeTabBar
              ]} />
              <Text style={[
                styles.tabText,
                activeTab === tab.id && styles.activeTabText
              ]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tab Content - Swipable */}
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={handleScroll}
          style={styles.tabContentScrollView}
        >
          {/* Pre-starts Tab */}
          <View style={styles.tabPage}>
            <View style={styles.tabContent}>
              {preStartTasks.map(renderTaskItem)}
            </View>
          </View>
          
          {/* Plant item Tab */}
          <View style={styles.tabPage}>
            <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
              <View style={styles.plantItemContent}>
                {/* Plant Details */}
                <View style={styles.plantDetailsSection}>
                  <View style={styles.detailRow}>
                    <View style={styles.detailColumn}>
                      <Text style={styles.detailLabel}>{t.costCentre}</Text>
                      <Text style={styles.detailValue}>MINING</Text>
                    </View>
                    <View style={styles.detailColumn}>
                      <Text style={styles.detailLabel}>{t.branch}</Text>
                      <Text style={styles.detailValue}>MELB</Text>
                    </View>
                  </View>
                  
                  <View style={styles.detailRow}>
                    <View style={styles.detailColumn}>
                      <Text style={styles.detailLabel}>{t.parentPlant1}</Text>
                      <Text style={styles.detailValue}>HTKO</Text>
                    </View>
                    <View style={styles.detailColumn}>
                      <Text style={styles.detailLabel}>{t.parentPlant2}</Text>
                      <Text style={styles.detailValue}>KOMATSU</Text>
                    </View>
                  </View>
                </View>

                {/* Divider */}
                <View style={styles.divider} />

                {/* Registration Details */}
                <View style={styles.registrationSection}>
                  <Text style={styles.sectionTitle}>{t.registrationDetails}</Text>
                  
                  <View style={styles.detailRow}>
                    <View style={styles.detailColumn}>
                      <Text style={styles.detailLabel}>{t.approvalBody}</Text>
                      <Text style={styles.detailValue}>DTI</Text>
                    </View>
                    <View style={styles.detailColumn}>
                      <Text style={styles.detailLabel}>{t.approvalNo}</Text>
                      <Text style={styles.detailValue}>12222</Text>
                    </View>
                  </View>
                  
                  <View style={styles.detailRow}>
                    <View style={styles.detailColumn}>
                      <Text style={styles.detailLabel}>{t.expiryDate}</Text>
                      <Text style={styles.detailValue}>22-FEB-1997</Text>
                    </View>
                    <View style={styles.detailColumn}>
                      {/* Empty column for spacing */}
                    </View>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
          
          {/* Task History Tab */}
          <View style={styles.tabPage}>
            <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
              {taskHistoryItems.map(renderTaskHistoryItem)}
            </ScrollView>
          </View>
        </ScrollView>
      </View>
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
  appBar: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    backgroundColor: '#ddd8f7',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    height: 56,
    zIndex: 1000,
  },
  backButton: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  appBarContent: {
    flex: 1,
    paddingHorizontal: 10,
  },
  appBarTitle: {
    fontFamily: 'Roboto',
    fontSize: 16,
    fontWeight: '600',
    color: '#242424',
    lineHeight: 22,
  },
  appBarSubtitle: {
    fontFamily: 'Roboto',
    fontSize: 12,
    fontWeight: '400',
    color: '#49454f',
    lineHeight: 16,
    letterSpacing: 0.32,
  },
  statusContainer: {
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  statusText: {
    fontFamily: 'Roboto',
    fontSize: 11,
    fontWeight: '400',
    color: '#14662c',
    letterSpacing: 0.25,
  },
  offlineStatus: {
    color: '#d32f2f', // Red color for offline
  },
  plantImageContainer: {
    position: 'absolute',
    top: 106, // 50px status bar + 56px header
    left: 0,
    right: 0,
    height: 250,
    overflow: 'hidden',
    width: '100%',
  },
  plantImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  contentContainer: {
    position: 'absolute',
    top: 356, // 106px header + 250px image
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 0,
  },
  tabsContainer: {
    flexDirection: 'row',
    height: 40,
  },
  tab: {
    flex: 1,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: '#e9e9ff',
  },
  activeTab: {
    backgroundColor: '#e9e9ff',
  },
  tabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#e9e9ff',
  },
  activeTabBar: {
    backgroundColor: '#8a3ffc',
  },
  tabText: {
    fontFamily: 'Roboto',
    fontSize: 14,
    fontWeight: '500',
    color: '#49454f',
    textAlign: 'center',
    letterSpacing: 0.1,
    lineHeight: 20,
  },
  activeTabText: {
    fontWeight: '600',
    color: '#8a3ffc',
    letterSpacing: 0.16,
    lineHeight: 18,
  },
  tabContentScrollView: {
    flex: 1,
  },
  tabPage: {
    width: screenWidth,
    flex: 1,
  },
  tabContent: {
    flex: 1,
  },
  taskItem: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd8f7',
    marginBottom: 8,
  },
  taskItemContent: {
    flexDirection: 'column',
    paddingHorizontal: 0,
    paddingTop: 16,
    paddingBottom: 16,
    gap: 15,
  },
  taskTopSection: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 8,
    gap: 16,
  },
  taskLeftContent: {
    flex: 1,
    justifyContent: 'center',
  },
  taskTextGroup: {
    gap: 12,
  },
  taskTitle: {
    fontFamily: 'Roboto',
    fontSize: 14,
    fontWeight: '400',
    color: '#232323',
    lineHeight: 20,
    letterSpacing: 0.16,
  },
  taskEquipment: {
    fontFamily: 'Roboto',
    fontSize: 12,
    fontWeight: '400',
    color: '#747474',
    lineHeight: 16,
    letterSpacing: 0.32,
  },
  taskStatus: {
    fontFamily: 'Roboto',
    fontSize: 12,
    fontWeight: '400',
    color: 'green',
    lineHeight: 16,
    letterSpacing: 0.4,
  },
  taskRightContent: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    gap: 8,
  },
  taskType: {
    fontFamily: 'Roboto',
    fontSize: 12,
    fontWeight: '400',
    color: '#656565',
    lineHeight: 16,
    letterSpacing: 0.32,
  },
  taskButtonsSection: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 10,
  },
  placeholderText: {
    fontFamily: 'Roboto',
    fontSize: 16,
    color: '#49454f',
    textAlign: 'center',
    marginTop: 50,
  },

  // Plant Item Content Styles
  plantItemContent: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
    gap: 16,
  },
  plantDetailsSection: {
    gap: 16,
  },
  detailRow: {
    flexDirection: 'row',
    gap: 24,
    marginBottom: 16,
  },
  detailColumn: {
    flex: 1,
    gap: 0,
  },
  detailLabel: {
    fontFamily: 'Roboto',
    fontSize: 12,
    fontWeight: '400',
    color: '#747474',
    lineHeight: 16,
    letterSpacing: 0.32,
  },
  detailValue: {
    fontFamily: 'Roboto',
    fontSize: 14,
    fontWeight: '400',
    color: '#232323',
    lineHeight: 20,
    letterSpacing: 0.16,
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd8f7',
    marginVertical: 0,
  },
  registrationSection: {
    gap: 16,
  },
  sectionTitle: {
    fontFamily: 'Roboto',
    fontSize: 14,
    fontWeight: '500',
    color: '#49454f',
    lineHeight: 20,
    letterSpacing: 0.1,
  },
});

export default TaskDetailsScreen;
