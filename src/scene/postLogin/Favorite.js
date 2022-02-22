import { FlatList, Text, View } from 'react-native'
import React, { Component } from 'react'
import Colors from '../../common/styles/Colors'
import Utils from '../../common/util/Utils'
import { BREAKING_BAD_FAVORITES_DATA, BREAKING_BAD_KEY } from '../../redux/Types'
import { BreakingBadListComponent } from '../../common/components/breakingBad'
import { HeaderNew } from '../../common/base_components'
import { connect } from 'react-redux'

class Favorite extends Component {

    renderItem = ({ item, index }) => {
        const { navigation } = this.props
        return (
            <View key={item.char_id} style={{ width: "50%", height: Utils.scaleSize(230) }}>
                <BreakingBadListComponent
                    navigation={navigation}
                    key={item.char_id}
                    data={item}
                    logo={item && item.img ? item.img : null}
                    name={item && item.name ? item.name : ""}
                    nickName={item && item.nickname ? item.nickname : ""}
                    id={item && item.char_id ? item.char_id : index + 1}
                />
            </View>
        )
    }


    render() {
        const { data, navigation } = this.props
        const { container } = this.getStyles()
        return (
            <View style={container}>
                <HeaderNew
                    is_show_cross_icon={true}
                    left_title={"Favorites"}
                    onCross={() => { navigation.pop() }}
                />
                <FlatList
                    keyExtractor={(item, index) => `fav_list${item.char_id}`}
                    contentContainerStyle={{ paddingBottom: Utils.scaleSize(10), flexGrow: 1 }}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    data={data}
                    ListEmptyComponent={
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                            <Text style={{ color: Colors.white, fontFamily: "Roboto-Light", fontSize: Utils.scaleSize(14) }}>{"No data found"}</Text>
                        </View>
                    }
                    renderItem={this.renderItem}
                />
            </View>
        )
    }
    getStyles = () => {
        return ({
            container: {
                flex: 1,
                backgroundColor: Colors.black
            }
        })
    }
}

const mapStateToProps = ({ breaking_bad }) => {
    const breaking_bad_key = breaking_bad && breaking_bad[BREAKING_BAD_KEY] ? breaking_bad[BREAKING_BAD_KEY] : {}
    const data = breaking_bad_key && breaking_bad_key[BREAKING_BAD_FAVORITES_DATA] ? breaking_bad_key[BREAKING_BAD_FAVORITES_DATA] : []

    return ({
        data,
        length: data && data.length ? data.length : 0
    })
}

export default connect(mapStateToProps, {
})(Favorite)