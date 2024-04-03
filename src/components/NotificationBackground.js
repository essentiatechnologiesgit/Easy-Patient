import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BackgroundTimer from 'react-native-background-timer';
import moment from 'moment';
import notifee, { AndroidImportance } from '@notifee/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const NotificationBackground = () => {
  const [currentTime, setCurrentTime] = useState(moment().format('HH:mm'));
  const [secondsLeft, setSecondsLeft] = useState(60);

  useEffect(() => {
    startTimer();
    return () => BackgroundTimer.stopBackgroundTimer();
  }, []);

  useEffect(() => {
    if (secondsLeft === 0) {
      triggerAlarmIfNeeded();
      setSecondsLeft(60);
    }
  }, [secondsLeft]);

  const startTimer = () => {
    BackgroundTimer.runBackgroundTimer(() => {
      setSecondsLeft(secs => secs - 1);
      setCurrentTime(moment().format('HH:mm'));
    }, 1000);
  };

  const triggerAlarmIfNeeded = async () => {
    try {
        const AlarmsArray = JSON.parse(await AsyncStorage.getItem('Alarms'));
        if (AlarmsArray) {
          AlarmsArray.forEach(alarm => {
            const { days, times } = alarm;
            const currentTime = moment().startOf('minute');
  
            times.forEach(timeObj => {
              const { time } = timeObj;
              const alarmTime = moment(`${days[0]} ${time}`).startOf('minute');
              
              if (alarmTime.isSame(currentTime)) {
                displayNotification();
              }
            });
          });
        }
      } catch (error) {
        console.error('Error triggering alarm:', error);
      }
  };

  const displayNotification = async () => {
    // Request permissions (required for iOS)
    if (Platform.OS === 'ios') {
      await notifee.requestPermission();
    }

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default 1',
      name: 'Default Channel 1',
      sound: 'default',
      importance: AndroidImportance.HIGH,
    });

    // Display a notification
    await notifee.displayNotification({
      title: 'Notification Title',
      body: 'Main body content of the notification',
      android: {
        channelId,
        pressAction: {
          id: 'default',
        },
      },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.time}>Current Time: {currentTime}</Text>
      <Text style={styles.time}>Seconds Left: {secondsLeft}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  time: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default NotificationBackground;
