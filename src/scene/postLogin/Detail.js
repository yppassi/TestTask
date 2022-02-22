import { ImageBackground, Text, View, TouchableOpacity, Image, Platform, ScrollView, FlatList } from 'react-native'
import React, { Component } from 'react'
import Colors from '../../common/styles/Colors'
import Utils from '../../common/util/Utils'
import FavoriteBtn from '../../common/components/breakingBad/FavoriteBtn'

export default class Detail extends Component {


  render() {
    const { navigation } = this.props
    const data = navigation.getParam("data")
    const char_id = data && data.char_id ? data.char_id : ""
    const img = data && data.img ? data.img : null
    const name = data && data.name ? data.name : ""
    const nickName = data && data.nickname ? data.nickname : ""
    const portrayed = data && data.portrayed ? data.portrayed : ""
    const birthday = data && data.birthday ? data.birthday : ""
    const occupation = data && data.occupation ? data.occupation : []
    const appearence = data && data.appearance ? data.appearance : []

    const back_img = require("../../../assets/images/back.png")
    const fav_img = require("../../../assets/images/HEART_FILLED.png")
    const gift_box_img = require("../../../assets/images/giftbox.png")

    const { container, headerContainer, backImg, favImg, userSmallImg, backgroundImg, nameTxt, nickNameTxt, bottomInfoContainer, portrayedContainer, potrayedTitle, potrayedTxt, birthdayContainer, birthdateTxt, giftBoxImg, appearenceContainer } = this.getStyles()
    return (
      <ScrollView showsVerticalScrollIndicator={false} style={container}>
        <View style={headerContainer}>
          <TouchableOpacity onPress={()=>{navigation.pop()}} activeOpacity={0.6} style={{ padding: Utils.scaleSize(5) }}>
            <Image source={back_img} resizeMode={'contain'} style={backImg} />
          </TouchableOpacity>

          {/* <TouchableOpacity activeOpacity={0.6} style={{ padding: Utils.scaleSize(5) }}>
            <Image source={fav_img} resizeMode={'contain'} style={favImg} />
          </TouchableOpacity> */}
          <FavoriteBtn data={data} id={char_id} />
        </View>

        <Image source={{ uri: img }} style={userSmallImg} />
        <ImageBackground source={{ uri: img }} style={backgroundImg} />
        <Text style={nameTxt}>{name}</Text>
        <Text style={nickNameTxt}>{nickName}</Text>

        <View style={bottomInfoContainer}>
          <View style={portrayedContainer}>
            <View>
              <Text style={potrayedTitle}>{"Potrayed"}</Text>
              <Text style={potrayedTxt}>{portrayed}</Text>
            </View>
            <View style={birthdayContainer}>
              <Text style={birthdateTxt}>{birthday}</Text>
              <Image source={gift_box_img} style={giftBoxImg} />
            </View>
          </View>

          <View style={{ marginTop: Utils.scaleSize(20) }}>
            <Text style={potrayedTitle}>{"Occupation"}</Text>
            {occupation.map((item, index) => {
              return (
                <Text style={[potrayedTxt, { marginTop: Utils.scaleSize(5) }]}>{item}</Text>
              )
            })}
          </View>

          <View style={{ marginTop: Utils.scaleSize(20) }}>
            <Text style={potrayedTitle}>{"Appeared in"}</Text>
            <FlatList
              contentContainerStyle={{ marginTop: Utils.scaleSize(10) }}
              keyExtractor={(item, index) => `apperance${item.char_id}`}
              data={appearence}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => {
                return (
                  <View key={index} style={appearenceContainer}>
                    <Text style={potrayedTxt}>{`Season ${item}`}</Text>
                  </View>
                )
              }}
            />
          </View>

        </View>
      </ScrollView>
    )
  }
  getStyles = () => {
    return ({
      container: {
        flex: 1,
        backgroundColor: Colors.black
      },
      headerContainer: {
        flexDirection: "row",
        justifyContent: 'space-between',
        width: '95%',
        alignSelf: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: Utils.scaleSize(20),
        zIndex: 999
      },
      backImg: {
        height: Utils.scaleSize(15),
        width: Utils.scaleSize(15),
        tintColor: Colors.white
      },
      favImg: {
        height: Utils.scaleSize(20),
        width: Utils.scaleSize(20)
      },
      userSmallImg: {
        height: Utils.scaleSize(150),
        width: Utils.scaleSize(130),
        zIndex: 999,
        position: 'absolute',
        top: Utils.scaleSize(190),
        alignSelf: 'center'
      },
      backgroundImg: {
        height: Utils.scaleSize(350),
        justifyContent: 'flex-end',
        paddingTop: Utils.scaleSize(10),
        alignItems: 'center',
        zIndex: -999,
        opacity: 0.3,
        marginBottom: Utils.scaleSize(10)
      },
      nameTxt: {
        color: Colors.white,
        fontFamily: "Roboto-Bold",
        fontSize: Utils.scaleSize(22),
        textAlign: 'center'
      },
      nickNameTxt: {
        color: Colors.white,
        fontFamily: "Roboto-Light",
        fontSize: Utils.scaleSize(11),
        textAlign: 'center'
      },
      bottomInfoContainer: {
        width: '95%',
        alignSelf: 'center',
        marginTop: Utils.scaleSize(15)
      },
      portrayedContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
      },
      potrayedTitle: {
        color: Colors.green_color_theme,
        fontFamily: "Roboto-Light",
        fontSize: Utils.scaleSize(12)
      },
      potrayedTxt: {
        color: Colors.white,
        fontFamily: "Roboto-Light",
        fontSize: Utils.scaleSize(11)
      },
      birthdayContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      birthdateTxt: {
        color: Colors.white,
        fontFamily: "Roboto-Light",
        fontSize: Utils.scaleSize(12)
      },
      giftBoxImg: {
        height: Utils.scaleSize(12),
        width: Utils.scaleSize(12),
        tintColor: Colors.white,
        marginLeft: Utils.scaleSize(5)
      },
      appearenceContainer: {
        backgroundColor: Colors.gray_color_theme,
        height: Utils.scaleSize(20),
        paddingHorizontal: Utils.scaleSize(5),
        marginHorizontal: Utils.scaleSize(2),
        justifyContent: 'center',
        alignItems: 'center'
      }
    })
  }
}