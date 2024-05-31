import BackgroundTimer from 'react-native-background-timer';
import moment from 'moment';
import notifee, { AndroidImportance } from '@notifee/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image, Platform, NativeEventEmitter, NativeModules } from 'react-native';

const BackgroundService = () => {
  // Ensure BackgroundTimer has addListener and removeListeners
  if (!BackgroundTimer.addListener) {
    BackgroundTimer.addListener = () => {};
  }
  if (!BackgroundTimer.removeListeners) {
    BackgroundTimer.removeListeners = () => {};
  }

  BackgroundTimer.start();
  BackgroundTimer.runBackgroundTimer(async () => {
    console.log("The time when function called", moment());
    try {
      const currentTime = moment().format('YYYY-MM-DD HH:mm');
      const AlarmsArray = JSON.parse(await AsyncStorage.getItem('Alarms'));
      if (AlarmsArray) {
        AlarmsArray.forEach(alarm => {
          const { times, dosage, medicine, picture_link, selectedImage } = alarm;
          times.forEach(timeObj => {
            const { time } = timeObj;
            if (time === currentTime) {
              console.log("Alarm Time and Curr Time", time, currentTime);
              displayNotifications(dosage, medicine, picture_link, selectedImage);
            }
          });
        });
      }
    } catch (error) {
      console.error('Background task error:', error);
    }
  }, 60000);
};

const displayNotifications = async (dosage, medicine, picture_link, selectedImage) => {
  const renderImage = (selectedImage) => {
    switch (selectedImage) {
      case 1:
        return require('../assets/blackMed.png');
      case 2:
        return require('../assets/blackCapsule.png');
      case 3:
        return require('../assets/blackDrop.png');
      case 4:
        return require('../assets/blackDrink.png');
      case 5:
        return require('../assets/blueMed.png');
      case 6:
        return require('../assets/blueCapsule.png');
      case 7:
        return require('../assets/blueDrop.png');
      case 8:
        return require('../assets/blueDrink.png');
      case 9:
        return require('../assets/yellowMed.png');
      case 10:
        return require('../assets/blueCapsule.png');
      case 11:
        return require('../assets/blueDrop.png');
      case 12:
        return require('../assets/blueDrink.png');
      case 13:
        return require('../assets/redMed.png');
      case 14:
        return require('../assets/redCapsule.png');
      case 15:
        return require('../assets/redDrop.png');
      case 16:
        return require('../assets/redDrink.png');
      case 17:
      case 18:
        return <Image source={{ uri: picture_link }} />;
      default:
        return <Image source={require('../assets/blackMed.png')} />;
    }
  };

  if (Platform.OS === 'ios') {
    await notifee.requestPermission();
  }

  const channelId = await notifee.createChannel({
    id: 'default_2',
    name: 'Default Channel 2',
    sound: 'notification',
    importance: AndroidImportance.HIGH,
  });

  await notifee.displayNotification({
    title: `${medicine}`,
    body: `To take ${dosage}`,
    android: {
      channelId,
      smallIcon: 'ic_launcher_foreground',
      largeIcon: picture_link ? picture_link : renderImage(selectedImage),
      showTimestamp: true,
      pressAction: {
        id: 'default',
      },
    },
  });
};

export default BackgroundService;
