import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TextInput,
  Image,
  Alert,
  Modal,
  ActivityIndicator,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useLanguage } from '../contexts/LanguageContext';
import { Button, AppHeader } from '../components';
import CompletionScreen from './CompletionScreen';


interface CheckItem {
  id: string;
  title: string;
  status: 'pending' | 'ok' | 'defect';
  isExpanded?: boolean;
  photos?: string[];
  comments?: string;
  workRequestStatus?: 'idle' | 'loading' | 'success' | 'offline';
}

interface PreStartChecklistScreenProps {
  onBack: () => void;
  plantItem: {
    id: string;
    name: string;
  };
  isOfflineMode?: boolean;
  onShowQueue?: () => void;
}

const PreStartChecklistScreen: React.FC<PreStartChecklistScreenProps> = ({ onBack, plantItem, isOfflineMode = false, onShowQueue }) => {
  const { t } = useLanguage();
  const scrollViewRef = useRef<ScrollView>(null);
  const [showCompletionScreen, setShowCompletionScreen] = useState(false);
  
  const [checkItems, setCheckItems] = useState<CheckItem[]>([
    { id: '1', title: t.fluidLevels, status: 'pending', workRequestStatus: 'idle' },
    { id: '2', title: t.tireCondition, status: 'pending', workRequestStatus: 'idle' },
    { id: '3', title: t.lightsIndicators, status: 'pending', workRequestStatus: 'idle' },
    { id: '4', title: t.brakeSystem, status: 'pending', workRequestStatus: 'idle' },
  ]);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [showPhotoBottomSheet, setShowPhotoBottomSheet] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const handleItemAction = (itemId: string, action: 'ok' | 'defect') => {
    setCheckItems(prev => 
      prev.map(item => 
        item.id === itemId 
          ? { 
              ...item, 
              status: action,
              isExpanded: action === 'defect' ? true : false
            }
          : item
      )
    );
    
    // If defect is selected, scroll to show the expanded content
    if (action === 'defect') {
      setTimeout(() => {
        scrollViewRef.current?.scrollTo({
          y: 200, // Adjust this value based on your content height
          animated: true,
        });
      }, 100);
    }
  };

  const handleEditToggle = (itemId: string) => {
    setCheckItems(prev => 
      prev.map(item => 
        item.id === itemId 
          ? { 
              ...item, 
              isExpanded: !item.isExpanded
            }
          : item
      )
    );
  };

  const handleAddPhoto = (itemId: string) => {
    setSelectedItemId(itemId);
    setShowPhotoBottomSheet(true);
  };

  const handleCameraPress = () => {
    setShowPhotoBottomSheet(false);
    addMockPhoto(selectedItemId!);
  };

  const handlePhotosPress = () => {
    setShowPhotoBottomSheet(false);
    addMockPhoto(selectedItemId!);
  };

  const handleCloseBottomSheet = () => {
    setShowPhotoBottomSheet(false);
    setSelectedItemId(null);
  };

  const handleRaiseWorkRequest = (itemId: string) => {
    const item = checkItems.find(i => i.id === itemId);
    if (!item) return;

    // Check if there are comments or photos
    const hasComments = item.comments && item.comments.trim().length > 0;
    const hasPhotos = item.photos && item.photos.length > 0;

    // Show alert only if BOTH comments and photos are missing
    if (!hasComments && !hasPhotos) {
      Alert.alert(
        t.incompleteWorkRequest,
        t.incompleteWorkRequestMessage,
        [
          {
            text: t.goBack,
            style: 'cancel'
          },
          {
            text: t.proceed,
            onPress: () => {
              // Proceed with submission
              setCheckItems(prev => 
                prev.map(i => 
                  i.id === itemId 
                    ? { ...i, workRequestStatus: 'loading' }
                    : i
                )
              );

              // Simulate API call
              setTimeout(() => {
                if (isOfflineMode) {
                  // Offline mode - show queued message
                  setCheckItems(prev => 
                    prev.map(i => 
                      i.id === itemId 
                        ? { ...i, workRequestStatus: 'offline' }
                        : i
                    )
                  );
                } else {
                  // Online mode - show success
                  setCheckItems(prev => 
                    prev.map(i => 
                      i.id === itemId 
                        ? { ...i, workRequestStatus: 'success' }
                        : i
                    )
                  );
                }
              }, 2000);
            }
          }
        ]
      );
    } else {
      // At least one of comments or photos is provided, proceed directly
      setCheckItems(prev => 
        prev.map(i => 
          i.id === itemId 
            ? { ...i, workRequestStatus: 'loading' }
            : i
        )
      );

      // Simulate API call
      setTimeout(() => {
        if (isOfflineMode) {
          // Offline mode - show queued message
          setCheckItems(prev => 
            prev.map(i => 
              i.id === itemId 
                ? { ...i, workRequestStatus: 'offline' }
                : i
            )
          );
        } else {
          // Online mode - show success
          setCheckItems(prev => 
            prev.map(i => 
              i.id === itemId 
                ? { ...i, workRequestStatus: 'success' }
                : i
            )
          );
        }
      }, 2000);
    }
  };

  const addMockPhoto = (itemId: string) => {
    // Add a mock photo URI
    const mockPhotoUri = `https://picsum.photos/200/200?random=${Date.now()}`;
    addPhotoToItem(itemId, mockPhotoUri);
  };

  const addPhotoToItem = (itemId: string, photoUri: string) => {
    setCheckItems(prev => 
      prev.map(item => 
        item.id === itemId 
          ? { 
              ...item, 
              photos: [...(item.photos || []), photoUri]
            }
          : item
      )
    );
  };

  const removePhoto = (itemId: string, photoIndex: number) => {
    setCheckItems(prev => 
      prev.map(item => 
        item.id === itemId 
          ? { 
              ...item, 
              photos: item.photos?.filter((_, index) => index !== photoIndex) || []
            }
          : item
      )
    );
  };

  const handleCommentChange = (itemId: string, comment: string) => {
    setCheckItems(prev => 
      prev.map(item => 
        item.id === itemId 
          ? { 
              ...item, 
              comments: comment
            }
          : item
      )
    );
  };

  const handleContinuePress = () => {
    if (allItemsCompleted) {
      // Check if any defects have no comments or photos
      const defectsWithoutDetails = checkItems.filter(item => 
        item.status === 'defect' && 
        (!item.comments || item.comments.trim() === '') && 
        (!item.photos || item.photos.length === 0)
      );

      if (defectsWithoutDetails.length > 0) {
        Alert.alert(
          t.incompleteDefectDetails,
          t.incompleteDefectDetailsMessage,
          [
            { text: t.goBack, style: 'cancel' },
            { text: t.proceed, style: 'default', onPress: () => setShowCompletionScreen(true) }
          ]
        );
        return;
      }

      setShowCompletionScreen(true);
    } else {
      setShowSnackbar(true);
      setTimeout(() => setShowSnackbar(false), 3000);
    }
  };

  const renderCheckItem = (item: CheckItem) => (
    <View key={item.id} style={styles.checkItem}>
      <View style={styles.checkItemHeader}>
        <Text style={styles.checkItemTitle}>{item.title}</Text>
        <TouchableOpacity 
          style={[
            styles.editButton,
            { borderColor: item.isExpanded ? "#8a3ffc" : "#757575" }
          ]}
          onPress={() => handleEditToggle(item.id)}
        >
          <MaterialIcons 
            name="edit-note" 
            size={24} 
            color={item.isExpanded ? "#8a3ffc" : "#757575"} 
          />
        </TouchableOpacity>
      </View>
      
      <View style={styles.checkItemContent}>
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[
              styles.okButton,
              item.status === 'ok' && styles.okButtonSelected
            ]}
            onPress={() => handleItemAction(item.id, 'ok')}
          >
            <Text style={styles.actionButtonText}>
              OK
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.defectButton,
              item.status === 'defect' && styles.defectButtonSelected
            ]}
            onPress={() => handleItemAction(item.id, 'defect')}
          >
            <Text style={styles.actionButtonText}>
              Defect
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Expanded content - show when expanded (regardless of defect status) */}
      {item.isExpanded && (
        <View style={styles.openContent}>
          {/* Comment field */}
          <View style={styles.commentFieldContainer}>
            <View style={styles.commentField}>
              <TextInput
                style={styles.commentInput}
                placeholder={t.addComments}
                placeholderTextColor="#757575"
                multiline
                numberOfLines={4}
                value={item.comments || ''}
                onChangeText={(text) => handleCommentChange(item.id, text)}
              />
            </View>
          </View>

          {/* Photo section */}
          <View style={styles.photoSection}>
            <View style={styles.photoContainer}>
              {/* Display existing photos */}
              {item.photos && item.photos.map((photo, index) => (
                <View key={index} style={styles.photoItem}>
                  <Image source={{ uri: photo }} style={styles.photoImage} />
                  <TouchableOpacity 
                    style={styles.photoRemoveButton}
                    onPress={() => removePhoto(item.id, index)}
                  >
                    <MaterialIcons name="close" size={16} color="#ffffff" />
                  </TouchableOpacity>
                </View>
              ))}
              
              {/* Add photo button */}
              <TouchableOpacity 
                style={styles.addPhotoButton}
                onPress={() => handleAddPhoto(item.id)}
              >
                <MaterialIcons name="add-a-photo" size={24} color="#757575" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Raise work request button - positioned after photo section */}
          <View style={styles.extraButtonContainer}>
            <TouchableOpacity 
              style={[
                styles.raiseWorkRequestButton,
                item.workRequestStatus === 'loading' && styles.raiseWorkRequestButtonLoading,
                item.workRequestStatus === 'success' && styles.raiseWorkRequestButtonSuccess,
                item.workRequestStatus === 'offline' && styles.raiseWorkRequestButtonOffline,
              ]}
              onPress={() => handleRaiseWorkRequest(item.id)}
              disabled={item.workRequestStatus === 'loading'}
            >
              <View style={styles.raiseWorkRequestContent}>
                {item.workRequestStatus === 'loading' ? (
                  <ActivityIndicator size="small" color="#232323" />
                ) : item.workRequestStatus === 'success' ? (
                  <MaterialIcons name="check" size={20} color="#232323" />
                ) : item.workRequestStatus === 'offline' ? (
                  <MaterialIcons name="cloud-off" size={20} color="#232323" />
                ) : (
                  <MaterialIcons name="assignment" size={20} color="#232323" />
                )}
                <Text style={styles.raiseWorkRequestText}>
                  {item.workRequestStatus === 'loading' 
                    ? t.raisingWorkRequest
                    : item.workRequestStatus === 'success' 
                    ? t.workRequestRaised
                    : item.workRequestStatus === 'offline' 
                    ? t.offlineRequestAdded
                    : t.raiseWorkRequest
                  }
                </Text>
              </View>
            </TouchableOpacity>
          </View>

        </View>
      )}
    </View>
  );

  const completedItems = checkItems.filter(item => item.status !== 'pending').length;
  const allItemsCompleted = completedItems === checkItems.length;
  const totalItems = checkItems.length;

  // Show CompletionScreen if requested
  if (showCompletionScreen) {
    return (
      <CompletionScreen
        equipmentName={plantItem.name}
        equipmentId={plantItem.id}
        onBack={() => {
          setShowCompletionScreen(false);
        }}
        onComplete={() => {
          setShowCompletionScreen(false);
          onBack();
        }}
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
          <Text style={styles.appBarTitle}>{t.preStartCheckTitle}</Text>
          <Text style={styles.appBarSubtitle}>{plantItem.name} | {plantItem.id}</Text>
        </View>
        <TouchableOpacity 
          style={styles.statusContainer}
          onPress={() => {
            // Navigate back first, then open queue
            onBack();
            // Small delay to ensure we're back on HomeScreen before opening queue
            setTimeout(() => {
              if (onShowQueue) {
                onShowQueue();
              }
            }, 200);
          }}
          activeOpacity={0.7}
        >
          <Text style={[styles.statusText, isOfflineMode && styles.offlineStatus]}>
            {isOfflineMode ? 'Offline' : 'Online'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Progress */}
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>
          {completedItems} of {totalItems} {t.itemsCompleted}
        </Text>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${(completedItems / totalItems) * 100}%` }
            ]} 
          />
        </View>
      </View>

      {/* Checklist */}
      <ScrollView 
        ref={scrollViewRef}
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {checkItems.map(renderCheckItem)}
      </ScrollView>

    {/* Continue Button - Pinned to Bottom */}
    <View style={styles.continueButtonContainer}>
      <TouchableOpacity 
        style={[
          styles.continueButton,
          !allItemsCompleted && styles.continueButtonDisabled
        ]}
        onPress={handleContinuePress}
      >
        <View style={[
          styles.continueButtonInner,
          !allItemsCompleted && styles.continueButtonInnerDisabled
        ]}>
          <Text style={[
            styles.continueButtonText,
            !allItemsCompleted && styles.continueButtonTextDisabled
          ]}>
            {t.continue}
          </Text>
        </View>
      </TouchableOpacity>
    </View>

      {/* Snackbar */}
      {showSnackbar && (
        <View style={styles.snackbar}>
          <Text style={styles.snackbarText}>{t.pleaseCompleteAll}</Text>
          <TouchableOpacity 
            style={styles.snackbarCloseButton}
            onPress={() => setShowSnackbar(false)}
          >
            <MaterialIcons name="close" size={20} color="#ffffff" />
          </TouchableOpacity>
        </View>
      )}

      {/* Photo Selection Bottom Sheet */}
      <Modal
        visible={showPhotoBottomSheet}
        transparent={true}
        animationType="slide"
        onRequestClose={handleCloseBottomSheet}
      >
        <View style={styles.bottomSheetOverlay}>
          <TouchableOpacity 
            style={styles.bottomSheetBackdrop}
            activeOpacity={1}
            onPress={handleCloseBottomSheet}
          />
          <View style={styles.bottomSheet}>
            <View style={styles.bottomSheetHeader}>
              <View style={styles.dragHandle} />
            </View>
            
            <TouchableOpacity 
              style={styles.bottomSheetOption}
              onPress={handleCameraPress}
            >
              <MaterialIcons name="camera-alt" size={24} color="#8a3ffc" />
              <Text style={styles.bottomSheetOptionText}>{t.camera}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.bottomSheetOption}
              onPress={handlePhotosPress}
            >
              <MaterialIcons name="photo-library" size={24} color="#8a3ffc" />
              <Text style={styles.bottomSheetOptionText}>{t.photos}</Text>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  appBarContent: {
    flex: 1,
    alignItems: 'flex-start',
    paddingHorizontal: 10,
  },
  appBarTitle: {
    fontFamily: 'Roboto',
    fontSize: 16,
    fontWeight: '600',
    color: '#232323',
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
    color: '#d32f2f',
  },
  progressContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#f8f9fa',
  },
  progressText: {
    fontFamily: 'Roboto',
    fontSize: 14,
    fontWeight: '500',
    color: '#232323',
    marginBottom: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#e0e0e0',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#8a3ffc',
    borderRadius: 2,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 20, // Minimal padding to start content closer to header
    paddingBottom: 200, // Extra space for the pinned continue button and snackbar
  },
  checkItem: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd8f7',
    paddingTop: 12,
    paddingBottom: 16,
    marginBottom: 4,
  },
  checkItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 5,
  },
  checkItemTitle: {
    fontFamily: 'Roboto',
    fontSize: 14,
    fontWeight: '400',
    color: '#232323',
    lineHeight: 20,
    letterSpacing: 0.16,
    flex: 1,
  },
  editButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#5C5C5C',
    backgroundColor: '#ffffff',
  },
  checkItemContent: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 20,
  },
  actionButton: {
    flex: 1,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#c5c5c5',
    borderRadius: 0,
    backgroundColor: '#ffffff',
  },
  actionButtonSelected: {
    backgroundColor: '#8a3ffc',
    borderColor: '#8a3ffc',
  },
  actionButtonText: {
    fontFamily: 'Roboto',
    fontSize: 14,
    fontWeight: '400',
    color: '#242424',
    lineHeight: 18,
    letterSpacing: 0.16,
  },
  okButton: {
    flex: 1,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#c5c5c5',
    borderRadius: 0,
    backgroundColor: '#ffffff',
  },
  okButtonSelected: {
    backgroundColor: 'rgba(0, 128, 0, 0.1)',
    borderColor: 'rgba(0, 128, 0, 0.1)',
  },
  defectButton: {
    flex: 1,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#c5c5c5',
    borderRadius: 0,
    backgroundColor: '#ffffff',
  },
  defectButtonSelected: {
    backgroundColor: '#f9dedc',
    borderColor: '#f9dedc',
  },
  continueButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    paddingHorizontal: 8,
    paddingVertical: 15,
    paddingBottom: 34, // Account for safe area
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  continueButton: {
    backgroundColor: '#8a3ffc',
    borderRadius: 0,
    padding: 3,
    height: 48,
  },
  continueButtonInner: {
    backgroundColor: 'transparent',
    borderRadius: 0,
    paddingHorizontal: 13,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  continueButtonText: {
    fontFamily: 'Roboto',
    fontSize: 14,
    fontWeight: '400',
    color: '#f2f2f2',
    lineHeight: 18,
    letterSpacing: 0.16,
  },
  continueButtonDisabled: {
    backgroundColor: '#e0e0e0',
    borderColor: '#e0e0e0',
  },
  continueButtonInnerDisabled: {
    backgroundColor: '#c0c0c0',
  },
  continueButtonTextDisabled: {
    color: '#9e9e9e',
  },
  snackbar: {
    position: 'absolute',
    bottom: 100,
    left: 16,
    right: 16,
    backgroundColor: '#333333',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 4,
    zIndex: 1000,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  snackbarText: {
    color: '#ffffff',
    fontSize: 14,
    flex: 1,
    textAlign: 'left',
  },
  snackbarCloseButton: {
    padding: 4,
    marginLeft: 8,
  },
  extraButtonContainer: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    paddingBottom: 16,
    gap: 4,
  },
  raiseWorkRequestButton: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#cac4d0',
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  raiseWorkRequestContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  raiseWorkRequestText: {
    fontFamily: 'Roboto',
    fontSize: 14,
    fontWeight: '400',
    color: '#232323',
    letterSpacing: 0.16,
  },
  raiseWorkRequestButtonLoading: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderColor: '#aaaaaa',
  },
  raiseWorkRequestButtonSuccess: {
    backgroundColor: 'rgba(0, 128, 0, 0.1)',
    borderColor: '#cac4d0',
  },
  raiseWorkRequestButtonOffline: {
    backgroundColor: '#F9DEDC',
    borderColor: '#cac4d0',
  },
  openContent: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 0,
    gap: 20,
  },
  commentFieldContainer: {
    height: 120,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#dbdbdb',
    backgroundColor: '#ffffff',
    position: 'relative',
  },
  commentField: {
    flex: 1,
    height: '100%',
    position: 'relative',
  },
  commentInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 11,
    fontFamily: 'Roboto',
    fontSize: 14,
    color: '#232323',
    textAlignVertical: 'top',
    height: '100%',
  },
  photoSection: {
    gap: 18,
  },
  photoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  photoItem: {
    width: 48,
    height: 48,
    position: 'relative',
  },
  photoImage: {
    width: 48,
    height: 48,
    borderRadius: 4,
  },
  photoRemoveButton: {
    position: 'absolute',
    top: -6,
    right: -4,
    width: 16,
    height: 16,
    backgroundColor: '#ff4444',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  addPhotoButton: {
    width: 48,
    height: 48,
    backgroundColor: '#f5f5f5',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderStyle: 'dashed',
  },

  // Bottom Sheet Styles
  bottomSheetOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  bottomSheetBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  bottomSheet: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 200,
  },
  bottomSheetHeader: {
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 12,
    paddingHorizontal: 16,
  },
  dragHandle: {
    width: 32,
    height: 4,
    backgroundColor: '#79747e',
    borderRadius: 100,
  },
  bottomSheetOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    gap: 16,
  },
  bottomSheetOptionText: {
    fontFamily: 'Roboto',
    fontSize: 20,
    fontWeight: '400',
    color: '#232323',
    lineHeight: 22,
  },
});

export default PreStartChecklistScreen;
