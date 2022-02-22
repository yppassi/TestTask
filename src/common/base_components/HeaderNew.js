import { Image, Platform, Text, TouchableOpacity, View } from 'react-native'
import PropTypes from 'prop-types';
import React, { Component } from 'react'
import Utils from '../util/Utils'
import Colors from '../styles/Colors'

export default class HeaderNew extends Component {

    static propTypes = {
        left_title: PropTypes.string,
        is_show_cross_icon:PropTypes.bool,
        is_show_back_arrow: PropTypes.bool,
        onSearch: PropTypes.func,
        onFav: PropTypes.func,
        onBack: PropTypes.func,
        onCross: PropTypes.func,

    };

    static defaultProps = {
        left_title: "The Breaking bad",
        is_show_back_arrow: false,
        is_show_cross_icon: false,

    };

    render() {
        const { left_title, is_show_back_arrow, onSearch, onFav, onBack, is_show_cross_icon, onCross } = this.props
        const { container, headerTitle, backImg, rightContainer, imgStyle, btn } = this.getStyles()
        const search_img = require("../../../assets/images/search.png")
        const back_img = require("../../../assets/images/back.png")
        const fav_img = require("../../../assets/images/HEART_FILLED.png")
        const cross_img = require("../../../assets/images/cross.png")
        return (
            <View style={container}>
                {is_show_back_arrow ?
                    <TouchableOpacity activeOpacity={0.6} onPress={onBack} style={[btn, { flex: 1 }]}>
                        <Image source={back_img} resizeMode={'contain'} style={backImg} />
                    </TouchableOpacity> :
                    <Text style={headerTitle}>{left_title}</Text>
                }
                {is_show_cross_icon ?
                    <View style={{flex: 0.3, alignItems:'flex-end'}}>
                        <TouchableOpacity activeOpacity={0.6} onPress={onCross} style={btn}>
                            <Image source={cross_img} resizeMode={'contain'} style={[imgStyle, { tintColor: Colors.white, height: Utils.scaleSize(15),width: Utils.scaleSize(15) }]} />
                        </TouchableOpacity>
                    </View> :
                    <View style={rightContainer}>
                        <TouchableOpacity activeOpacity={0.6} onPress={onSearch} style={btn}>
                            <Image source={search_img} resizeMode={'contain'} style={[imgStyle, { tintColor: Colors.white, }]} />
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.6} onPress={onFav} style={btn}>
                            <Image source={fav_img} resizeMode={'contain'} style={imgStyle} />
                        </TouchableOpacity>
                    </View>
                }
            </View>
        )
    }

    getStyles = () => {
        const {is_show_search_icon} =this.props
        return ({
            container: {
                height: Utils.scaleSize(Platform.OS === 'ios' ? 76 : 68),
                width: '95%',
                alignSelf: "center",
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between'
            },
            headerTitle: {
                fontFamily: "Roboto-Bold",
                color: Colors.white,
                fontSize: Utils.scaleSize(18),
                flex: 1
            },
            backImg: {
                tintColor: Colors.white,
                height: Utils.scaleSize(15),
                width: Utils.scaleSize(15)
            },
            rightContainer: {
                flex: 0.3,
                justifyContent:is_show_search_icon ? "space-between" : "flex-end",
                flexDirection: 'row',
                alignItems: 'center'
            },
            imgStyle: {
                height: Utils.scaleSize(20),
                width: Utils.scaleSize(20)
            },
            btn: {
                padding: Utils.scaleSize(5)
            }
        })
    }
}

