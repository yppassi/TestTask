import { Image, Text, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'
import Utils from '../../util/Utils'
import Colors from '../../styles/Colors'
import FavoriteBtn from './FavoriteBtn'

class BreakingBadListComponent extends Component {

    render() {
        const { logo, name, nickName, id, data, navigation } = this.props
        const { container, img, bottomContainer, titleTxt, descriptionTxt } = this.getStyles()
        return (
            <TouchableOpacity onPress={()=>{navigation.navigate("Detail",{data:data})}} style={container}>
                <Image source={{ uri: logo }} style={img} />
                <View style={bottomContainer}>
                    <View style={{ padding: Utils.scaleSize(5) }}>
                        <Text style={titleTxt}>{name}</Text>
                        <Text style={descriptionTxt}>{nickName}</Text>
                    </View>
                    <FavoriteBtn data={data} id={id} />
                </View>
            </TouchableOpacity>
        )
    }

    getStyles = () => {
        return ({
            container: {
                flexGrow: 1,
                marginHorizontal: Utils.scaleSize(10),
                marginVertical: Utils.scaleSize(15)
            },
            img: {
                height: Utils.scaleSize(160),
                width: "100%",
                borderRadius: Utils.scaleSize(5)
            },
            bottomContainer: {
                flexDirection: 'row',
                justifyContent: 'space-between'
            },
            titleTxt: {
                color: Colors.white,
                fontFamily: "Roboto-Light",
                fontSize: Utils.scaleSize(13)
            },
            descriptionTxt: {
                color: Colors.white,
                fontFamily: "Roboto-Light",
                fontSize: Utils.scaleSize(11)
            },
        })
    }
}



export default BreakingBadListComponent