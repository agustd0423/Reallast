import React from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {AsyncStorage} from 'react-native';

export default class MainScreen extends React.Component {
  static navigationOptions = {
    tabBarIcon: ({tintColor}) => (
      <MaterialCommunityIcons name="calendar-multiselect" size={30} style={{color:tintColor}} />
    )
  }

  _storeData = async() => {
    await AsyncStorage.setItem('@diary:state',JSON.stringify(this.state))
  }

  _getData = async() => {
    const mystate = await AsyncStorage.getItem('@diary:state');
    if (mystate !== null) {
      this.setState(JSON.parse(mystate));
    }
  }

  constructor(props){
    super(props)
    this.state = {
      selectedDate : '',
      Posts: [
        {
        id: 1,
        title: '12월 29일에 쓴 글',
        content: '본문',
        date: '2019-12-29',
      }, 
        {
          id: 2,
          title: '12월 30일에 쓴 글',
          content: '본문',
          date: '2019-12-30',
        },
      ]
    }
    
  }
  componentDidMount() {
    this._getData()
    this.props.navigation.addListener(
      'didFocus',
      () => {
        newpost = this.props.navigation.getParam('myparam')
        signal = this.props.navigation.getParam('signal')
        if(newpost) {
          const PrevPosts = [...this.state.Posts]
          this.setState({ Posts: PrevPosts.concat(newpost) },this._storeData)
          this.props.navigation.navigate('MainScreen',{myparam: false})
        }
        else if (signal) {
          const PrevPosts2 = [...this.state.Posts]

          deleteIndex = PrevPosts2.findIndex((item)=>{return item.id == signal})
          PrevPosts2.splice(deleteIndex,1)

          this.setState({Posts:PrevPosts2}, this._storeData)
          this.props.navigation.navigate('MainScreen', {signal: false})
        }
      }
    )
  
  }
  
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Calendar
          onDayPress = { (day) => {this.setState(this.state.selectedDate = day)} } //선택된 날짜의 값을 받아온다.
          current = {new Date()} />
          <ScrollView>
            <FlatList 
              data = {this.state.Posts.filter( data => { return data.date == this.state.selectedDate.dateString })}
              renderItem = {({item, index}) => {
                return (
                  <TouchableOpacity 
                    onPress = {() => {this.props.navigation.navigate('Detail',{post:item})}}>
                    <View>
                      <Text>
                        제목 : {item.title}
                      </Text>
                      <Text>
                        본문 :{item.content}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )
                }}
                keyExtractor = {(item, index) => {return '$(index)'}} />
          </ScrollView>
      </SafeAreaView>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CCEEFF',
    paddingTop: 50,
  },
  textstyle: {
      fontSize: 40,
      color: '#BD2DCE',
  },
  listitem: {
    marginLeft: 50,
    marginTop:20,
    borderLeftColor: "black",
    borderLeftWidth: 4,
    paddingLeft:30,
  },
});
