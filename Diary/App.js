import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation'
import MainScreen from './screens/MainScreen';
import WriteScreen from './screens/WriteScreen';
import DetailScreen from './screens/DetailScreen';
import {MaterialCommunityIcons} from '@expo/vector-icons';

//Screen 객체의 묶음
const BaseNavi = createBottomTabNavigator ({
  MainScreen : {
    screen : MainScreen,
  },
  DetailScreen : {
    screen : DetailScreen,
  },
  WriteScreen : {
    screen : WriteScreen,
  },
  
},
{
  tabBarOptions : {
    showLabel: false
  }
})

const BaseNavi2 = createStackNavigator(

  {
    Write : WriteScreen,
    Tab : BaseNavi,
    Detail : DetailScreen,
  },
  {
    initialRouteName: 'Tab',
    mode : 'modal', 
    headerMode: 'none', 
  }
)

const MyNavi = createAppContainer(BaseNavi2)

export default function App() {
    return (
      <View style={styles.container}>
        <MyNavi />
      </View>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
