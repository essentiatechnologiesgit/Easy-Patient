import BackgroundTimer from 'react-native-background-timer';
import moment from 'moment';
import notifee, { AndroidImportance, AndroidBadgeIconType } from '@notifee/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';


const BackgroundService = () => {
  
  BackgroundTimer.start();
  BackgroundTimer.runBackgroundTimer(async () => {
    console.log("The time when function called",moment());
    try {
      const currentTime = moment().format('HH:mm');
      // displayNotification("this", "that");
      const AlarmsArray = JSON.parse(await AsyncStorage.getItem('Alarms'));
      if (AlarmsArray) {
        AlarmsArray.forEach(alarm => {
          const { days, times, dosage, medicine, picture_link,selectedImage } = alarm;
          const currentTime = moment().startOf('minute');
      
          times.forEach(timeObj => {
            const { time } = timeObj;
            const alarmTime = moment(`${days[0]} ${time}`).startOf('minute');
            if (alarmTime.isSame(currentTime)) {
              console.log("Alarm Time and Curr Time", alarmTime, currentTime);
              // console.log("Times ", times);
              displayNotifications(dosage, medicine,picture_link,selectedImage,selectedImage);
            }
          });
        });
      }
    } catch (error) {
      console.error('Background task errgor:', error);
    }
  }, 60000);
};




const displayNotifications = async (dosage, medicine,picture_link,selectedImage) => {
  console.log("Inside for Displaying notification alarm");
  const renderImage = (selectedImage) => {
  
    switch (selectedImage) {
        case 1:
            return  require('../assets/blackMed.png');
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
            return require('../assets/blueDrink.png');;
        case 9:
            return require('../assets/yellowMed.png');;
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
            return <Image source={{ uri: image }} style={styles.ProfileImage} />;
        case 18:
            return <Image source={{ uri: image }} style={styles.ProfileImage} />;
        default:
            return <Image source={blackMed} style={styles.Profilelogo} />;
    }
  };

  if (Platform.OS === 'ios') {
    await notifee.requestPermission();
  }

  const channelId = await notifee.createChannel({
    id: 'default 2',
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
