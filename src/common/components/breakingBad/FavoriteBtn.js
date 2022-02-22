import { Image, TouchableOpacity, } from 'react-native'
import React, { Component } from 'react'
import { BREAKING_BAD_FAVORITES_DATA, BREAKING_BAD_KEY } from '../../../redux/Types';
import { connect } from 'react-redux';
import { updateBreakingBadUIConstraints } from '../../../redux/breakingBadList/Action'
import Utils from '../../util/Utils';


class FavoriteBtn extends Component {
    state = {
        isFavCharacter: false
    }

    componentDidMount() {
        const { fav_data, id } = this.props
        const index = fav_data.findIndex(item => item.char_id === id);
        if (index > -1) {
            this.setState({
                isFavCharacter: true
            })
        }
        else {
            this.setState({
                isFavCharacter: false
            })
        }
    }
    componentDidUpdate(prevProps) {
        const { fav_data, id, length } = this.props
        if (length !== prevProps.length) {
            const index = fav_data.findIndex(item => item.char_id === id);
            if (index > -1) {
                this.setState({
                    isFavCharacter: true
                })
            }
            else {
                this.setState({
                    isFavCharacter: false
                })
            }
        }

    }


    onClickFav = () => {
        const { data, id, fav_data, updateBreakingBadUIConstraints } = this.props
        const index = fav_data.findIndex(item => item.char_id === id);
        let arr = fav_data
        if (index === -1) {
            arr.push(data)
            this.setState({
                isFavCharacter: true
            })
        }
        else {
            arr.splice(index, 1);
            this.setState({
                isFavCharacter: false
            })
        }
        updateBreakingBadUIConstraints({
            [BREAKING_BAD_FAVORITES_DATA]: arr
        })
    }

    render() {
        const fav_img = require("../../../../assets/images/HEART_FILLED.png")
        const un_fav_img = require("../../../../assets/images/HEART.png")
        const { favImg } = this.getStyles()
        const { isFavCharacter } = this.state
        return (
            <TouchableOpacity onPress={() => { this.onClickFav() }} style={{ padding: Utils.scaleSize(5) }} activeOpacity={0.6}>
                <Image source={isFavCharacter ? fav_img : un_fav_img} style={favImg} resizeMode={'contain'} />
            </TouchableOpacity>
        )
    }
    getStyles = () => {
        return ({
            favImg: {
                height: Utils.scaleSize(15),
                width: Utils.scaleSize(15)
            }
        })
    }
}


const mapStateToProps = ({ breaking_bad }) => {
    const breaking_bad_key = breaking_bad && breaking_bad[BREAKING_BAD_KEY] ? breaking_bad[BREAKING_BAD_KEY] : {}
    const fav_data = breaking_bad_key && breaking_bad_key[BREAKING_BAD_FAVORITES_DATA] ? breaking_bad_key[BREAKING_BAD_FAVORITES_DATA] : []
    return ({
        fav_data,
        length: fav_data && fav_data.length ? fav_data.length : 0
    })
}

export default connect(mapStateToProps, {
    updateBreakingBadUIConstraints
})(FavoriteBtn)