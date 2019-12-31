import React from 'react';
import { StyleSheet, Text, Dimensions, View, Image } from 'react-native';
import { SafeAreaView } from 'react-navigation'; 
import {MaterialCommunityIcons} from '@expo/vector-icons';
import DetailHeader from '../components/DetailHeader';
import NullPage from '../components/NullPage';

const { width, height } = Dimensions.get('window');

export default class DetailScreen extends React.Component {
  static navigationOptions = {
    tabBarIcon: ({tintColor}) => (
      <MaterialCommunityIcons name="book-open-page-variant" size={30} style={{color:tintColor}} />
    )
  }

  post = this.props.navigation.getParam('post')


  _deletesignal = () => {
    this.props.navigation.navigate("MainScreen", {signal: this.post.id})
  }

  render(){
    return (
      <SafeAreaView style={styles.container}>
        <DetailHeader deleteProps={this._deletesignal} />
        {this.post?
          <View>
            <View style={styles.detailbox}>
              <Text styles={styles.detailtitle}>
                제목 : {this.post.title}
              </Text>
            </View>
            {
              this.post.imageUri?
              <Image source={{uri: this.post.imageUri}} style={{width: 200, height: 200}} />:
              null
            }
            <View style={styles.detailbox}>
              <Text styles={styles.detailtitle}>
                내용 : {this.post.content}
              </Text>
            </View>
        </View>
        :<NullPage/>
        }
      </SafeAreaView>
    );
  }
  }
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CCEEFF',
    paddingTop: 10,
  },
  textstyle: {
      fontSize: 40,
      color: '#BD2DCE',
  },
  detailbox: {
    marginVertical:30,
    marginLeft:30,
    borderLeftWidth:5,
    paddingLeft:20,
  },
  detailtitle:{
    fontSize: 40,
  },
  detailcontent:{
    fontSize: 20,
  }
});
