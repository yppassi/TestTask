import { ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'
import Colors from '../../common/styles/Colors'
import { HeaderNew } from '../../common/base_components'
import { connect } from 'react-redux'
import { getBreakingBadCharacters } from '../../redux/breakingBadList/Action'
import { BREAKING_BAD_DATA, BREAKING_BAD_KEY, BREAKING_BAD_REQUEST_LOADING, BREAKING_BAD_REQUEST_STATUS, MESSAGE, STATUS } from '../../redux/Types'
import Utils from '../../common/util/Utils'
import { BreakingBadListComponent } from '../../common/components/breakingBad'

class Home extends Component {

    componentDidMount() {
        const { getBreakingBadCharacters } = this.props
        getBreakingBadCharacters()
    }

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
        const { data, loading, navigation } = this.props
        const { container } = this.getStyles()
        return (
            <View style={container}>
                <HeaderNew
                    onFav={() => { navigation.navigate("Favorite") }}
                    onSearch={() => { navigation.navigate("Search") }}
                />
                {loading ? <View style={{ flex: 1, justifyContent: 'center' }}><ActivityIndicator size={'small'} color={Colors.white} /></View> :
                    <FlatList
                        keyExtractor={(item, index) => `breaking_bad_list${item.char_id}`}
                        contentContainerStyle={{ paddingBottom: Utils.scaleSize(10), flexGrow: 1 }}
                        numColumns={2}
                        showsVerticalScrollIndicator={false}
                        data={data}
                        ListEmptyComponent={
                            loading ? null :
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                                    <Text style={{ color: Colors.white, fontFamily: "Roboto-Light", fontSize: Utils.scaleSize(14) }}>{"No data found"}</Text>
                                </View>
                        }
                        renderItem={this.renderItem}
                    />
                }
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
    const data = breaking_bad_key && breaking_bad_key[BREAKING_BAD_DATA] ? breaking_bad_key[BREAKING_BAD_DATA] : []
    const loading = breaking_bad_key && breaking_bad_key[BREAKING_BAD_REQUEST_LOADING] ? breaking_bad_key[BREAKING_BAD_REQUEST_LOADING] : false
    const request_status = breaking_bad_key && breaking_bad_key[BREAKING_BAD_REQUEST_STATUS] ? breaking_bad_key[BREAKING_BAD_REQUEST_STATUS] : {}
    const type = request_status && request_status[STATUS] ? request_status[STATUS] : ""
    const message = request_status && request_status[MESSAGE] ? request_status[MESSAGE] : ""

    return ({
        data,
        loading,
        type,
        message
    })
}

export default connect(mapStateToProps, {
    getBreakingBadCharacters
})(Home)