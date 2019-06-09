/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import fetch from "cross-fetch";
import weekday from 'weekday'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TextInput,
  ActivityIndicator
} from "react-native";
const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});
let currentDay;
let weekdays = ['mon','tue','wed','thu'];
type Props = {};
export default class App extends Component<Props> {
  currentDay = weekday();
  state = {
    searchText: "",
    response: "",
    loading: false,
    todayWeatherIcon: "//cdn.apixu.com/weather/64x64/day/116.png",
    
    icon2: "//cdn.apixu.com/weather/64x64/day/116.png",
    
    icon3: "//cdn.apixu.com/weather/64x64/day/116.png",
    
    icon4: "//cdn.apixu.com/weather/64x64/day/116.png",
    
    icon5: "//cdn.apixu.com/weather/64x64/day/116.png",
    temp1:12,
    temp2:12,
    temp3:11,
    temp4:11,
    cityName:"NONE",
    CurrentDate:'',
    kph:''
  };

  loadData = async () => {
    this.setState({loading:true})
     await fetch(
      `http://api.apixu.com/v1/forecast.json?key=bdb5234ab0f5463b80c112945193105&q=${
        this.state.searchText
      }&days=4`
    ).then(res => {
      res
        .json()
        .then(jsonObj =>{
          this.setState({
            response: jsonObj,
            todayWeatherIcon: jsonObj.current.condition.icon,
            icon2:jsonObj.forecast.forecastday["0"].day.condition.icon,
            icon3:jsonObj.forecast.forecastday["1"].day.condition.icon,
            icon4:jsonObj.forecast.forecastday["2"].day.condition.icon,
            icon5:jsonObj.forecast.forecastday["3"].day.condition.icon,        
            temp1:jsonObj.forecast.forecastday["0"].day.maxtemp_c,
            temp2:jsonObj.forecast.forecastday["1"].day.maxtemp_c,
            temp3:jsonObj.forecast.forecastday["2"].day.maxtemp_c,
            temp4:jsonObj.forecast.forecastday["3"].day.maxtemp_c,
            cityName:jsonObj.location.name,
            CurrentDate:`${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`,
            kph: jsonObj.current.wind_kph,
          }
          )
          
        }
        );
        currentDay=weekday(weekday());

    });
    this.setState({ searchText: "" });
    this.setState({ loading: false });
  };
   setTemp =  () => {
    if (this.state.response != "") {
      var ab = weekday(weekday()) + 1;
      for(i=0;i<=3;i++){
        ab++;
        if(ab>7){
          ab=1;
        }
        console.log(ab);
         weekdays[i] = weekday(ab); 
      }
      console.log(this.state.response);
      return Math.round(this.state.response.current.temp_c);
    } else {
      return "15";
    }
  };
  render() {
        if (this.state.loading) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#ba75b1"
          }}
        >
          <ActivityIndicator size="large" color="white" />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("./assets/bg/bg.png")}
          style={styles.backgroundImage}
        >
          <TextInput
            placeholder="Enter City Name "
            placeholderTextColor="white"
            value={this.state.searchText}
            onChangeText={value => this.setState({ searchText: value })}
            onEndEditing={this.loadData}
            style={{
              color: "#ffffff",
              borderColor: "white",
              borderWidth: 1,
              margin: 10,
              fontFamily: "helveticaneue",
              fontSize: 18
            }}
          />
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Image
              style={{ width: 120, height: 120 }}
              source={{ uri: `https:${this.state.todayWeatherIcon}` }}
            />
            <View
              style={{
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                margin: 15,
                marginTop: 31
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 15,
                  fontFamily: "helveticaneue"
                }}
              >
                {this.state.cityName}
              </Text>
              <Text
                style={{
                  color: "#fff",
                  fontSize: 15,
                  fontFamily: "helveticaneue"
                }}
              >
                {weekday()}, {this.state.CurrentDate}
              </Text>
            </View>
          </View>
          <View
            style={{
              flex: 2,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Text
              style={{
                flexWrap: "wrap",
                fontSize: 270,
                color: "#fff",
                fontFamily: "helveticaneue-light-001"
              }}
            >
              {this.setTemp()}
            </Text>
            <Image
              source={require("./assets/weather/degree.png")}
              style={{ marginBottom: 120 }}
            />
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "flex-start",
              justifyContent: "center"
            }}
          >
            <Text style={styles.instructions}>{this.state.kph}kph</Text>
            <View style={{ flexDirection: "row", marginTop: 40, margin: 20 }}>
              <Image source={require("./assets/weather/umbrela.png")} />
              <Text style={{ color: "#fff", fontSize: 20, paddingLeft: 10 }}>
                35%
              </Text>
            </View>
            <View style={{ flexDirection: "row", marginTop: 40, margin: 20 }}>
              <Image source={require("./assets/weather/drop.png")} />
              <Text style={{ color: "#fff", fontSize: 20, paddingLeft: 10 }}>
                72%
              </Text>
            </View>
          </View>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <View
              style={{
                backgroundColor: "#d9a9ce",
                flex: 1,
                flexDirection: "column",
                justifyContent: "space-around",
                alignItems: "center"
              }}
            >
              <Text style={{ color: "#fff", fontSize: 15 }}>{weekdays[0]}</Text>
              <Image style={{ width: 50, height: 50 }}
              source={{ uri: `https:${this.state.icon2}` }} />
              <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
                <Text style={{ color: "#fff", fontSize: 20 }}>{Math.round(this.state.temp1)}</Text>
                <Image source={require("./assets/weather/o_copy.png")} />
              </View>
            </View>
            <View
              style={{
                backgroundColor: "#d29cc7",
                flex: 1,
                flexDirection: "column",
                justifyContent: "space-around",
                alignItems: "center"
              }}
            >
              <Text
                style={{ color: "#fff", fontSize: 15, textAlign: "center" }}
              >
                {weekdays[1]}
              </Text>
              <Image style={{ width: 50, height: 50 }}
              source={{ uri: `https:${this.state.icon3}` }} />
              <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
                <Text style={{ color: "#fff", fontSize: 20 }}>{Math.round(this.state.temp2)}</Text>
                <Image source={require("./assets/weather/o_copy.png")} />
              </View>
            </View>
            <View
              style={{
                backgroundColor: "#c586ba",
                flex: 1,
                flexDirection: "column",
                justifyContent: "space-around",
                alignItems: "center"
              }}
            >
              <Text style={{ color: "#fff", fontSize: 15 }}>{weekdays[2]}</Text>
              <Image style={{ width: 50, height: 50 }}
              source={{ uri: `https:${this.state.icon4}` }} />
              <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
                <Text style={{ color: "#fff", fontSize: 20 }}>{Math.round(this.state.temp3)}</Text>
                <Image source={require("./assets/weather/o_copy.png")} />
              </View>
            </View>
            <View
              style={{
                backgroundColor: "#ba75b1",
                flex: 1,
                flexDirection: "column",
                justifyContent: "space-around",
                alignItems: "center"
              }}
            >
              <Text style={{ color: "#fff", fontSize: 15 }}>{weekdays[3]}</Text>
              <Image style={{ width: 50, height: 50 }}
              source={{ uri: `https:${this.state.icon5}` }} />
              <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
                <Text style={{ color: "#fff", fontSize: 20 }}>{Math.round(this.state.temp4)}</Text>
                <Image source={require("./assets/weather/o_copy.png")} />
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  backgroundImage: {
    flex: 1,
    alignSelf: "stretch"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#ffffff",
    margin: 20,
    marginTop: 40,
    fontSize: 18
  }
});
