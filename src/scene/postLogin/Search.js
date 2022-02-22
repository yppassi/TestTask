import { ActivityIndicator, FlatList, Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'
import Colors from '../../common/styles/Colors'
import Utils from '../../common/util/Utils'
import { connect } from 'react-redux'
import { getBreakingBadSearchCharacters, updateBreakingBadUIConstraints } from '../../redux/breakingBadList/Action'
import { BREAKING_BAD_KEY, BREAKING_BAD_SEARCH_DATA, BREAKING_BAD_SEARCH_REQUEST_LOADING } from '../../redux/Types'
import { BreakingBadListComponent } from '../../common/components/breakingBad'

class Search extends Component {
  state = {
    inputValue: ""
  }

  componentDidMount() {
    const { getBreakingBadSearchCharacters } = this.props
    const { inputValue } = this.state
    getBreakingBadSearchCharacters(inputValue)
  }

  componentWillUnmount() {
    const { updateBreakingBadUIConstraints } = this.props
    updateBreakingBadUIConstraints({
      [BREAKING_BAD_SEARCH_DATA]: []
    })
  }

  onSearchCharacters = (value) => {
    const { getBreakingBadSearchCharacters } = this.props
    this.setState({
      inputValue: value
    })
    getBreakingBadSearchCharacters(value)
  }

  renderItem = ({ item, index }) => {
    const { navigation } = this.props
    return (
      <View key={item.char_id} style={{ width: '50%', height: Utils.scaleSize(230) }}>
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
    const cross_img = require("../../../assets/images/cross.png")
    const { container, searchContainer, textInput, crossImg } = this.getStyles()
    return (
      <View style={container}>
        <View style={searchContainer}>
          <TextInput
            placeholder='Search'
            placeholderTextColor={Colors.white}
            style={textInput}
            onChangeText={(value) => { this.onSearchCharacters(value) }}
          />
          <TouchableOpacity onPress={() => { navigation.pop() }} style={{ padding: Utils.scaleSize(5) }}>
            <Image source={cross_img} resizeMode={'contain'} style={crossImg} />
          </TouchableOpacity>
        </View>

        {loading ? <View style={{ height: Utils.scaleSize(20), alignItems: 'center' }}><ActivityIndicator size={'small'} color={Colors.white} /></View> : null}
        <FlatList
          keyExtractor={(item, index) => `breaking_bad_search_list${item.char_id}`}
          contentContainerStyle={{ paddingBottom: Utils.scaleSize(10), flexGrow: 1 }}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          data={data}
          ListEmptyComponent={
            loading ? null :
              <View style={{ marginTop: Utils.scaleSize(20), width: "95%", alignSelf: 'center' }}>
                <Text style={{ color: Colors.green_color_theme, fontFamily: "Roboto-Light", fontSize: Utils.scaleSize(16) }}>{"No character found"}</Text>
                <Text style={{ color: Colors.white, fontFamily: "Roboto-Light", fontSize: Utils.scaleSize(16), marginTop: Utils.scaleSize(5) }}>{"Try Again"}</Text>
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
      },
      searchContainer: {
        height: Utils.scaleSize(Platform.OS === 'ios' ? 76 : 68),
        backgroundColor: Colors.gray_color_theme,
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        paddingHorizontal: Utils.scaleSize(10)
      },
      textInput: {
        fontSize: Utils.scaleSize(20),
        flex: 1,
        color: Colors.white,
        fontFamily: "Roboto-Thin"
      },
      crossImg: {
        height: Utils.scaleSize(15),
        width: Utils.scaleSize(15),
        tintColor: Colors.white
      }
    })
  }
}



const mapStateToProps = ({ breaking_bad }) => {
  const breaking_bad_key = breaking_bad && breaking_bad[BREAKING_BAD_KEY] ? breaking_bad[BREAKING_BAD_KEY] : {}
  const data = breaking_bad_key && breaking_bad_key[BREAKING_BAD_SEARCH_DATA] ? breaking_bad_key[BREAKING_BAD_SEARCH_DATA] : []
  const loading = breaking_bad_key && breaking_bad_key[BREAKING_BAD_SEARCH_REQUEST_LOADING] ? breaking_bad_key[BREAKING_BAD_SEARCH_REQUEST_LOADING] : false


  return ({
    data,
    loading,
  })
}

export default connect(mapStateToProps, {
  getBreakingBadSearchCharacters,
  updateBreakingBadUIConstraints
})(Search)