import EventEmitter from 'EventEmitter';
import React, { PureComponent } from 'react';
import {
    Dimensions,
    Platform,
    StatusBar,
    Alert,
    SafeAreaView,
    NativeModules,
    Linking,
    View
} from 'react-native';
import { MainScene } from './scene';
import Colors from './common/styles/Colors';
import { ConnectionInfo } from './common/base_components';
import { connect } from 'react-redux'
import Utils from './common/util/Utils';
import { updateDeviceUIConstraints } from './redux/device/Action'
import { DEVICE_IS_LOGGED_IN } from './redux/Types';

const PORTRAIT = 0;
const LANDSCAPE = 1;

class Rootrn extends PureComponent {

    constructor(props) {
        super(props);
        this._orientationEventEmitter = new EventEmitter();
        this.state = {
            booted: false,
            orientation: null,
            viewableScreenWidth: null,
            viewableScreenHeightWithHeader: null,
            viewableScreenHeight: null,
            screenWidth: null,
            screenHeight: null,
            scale: null,
            fontScale: null,
            userHasActivatedCallback: null,
            isOnline: null
        };

        this._isMount = true;
        this.TestEventEmitter = new EventEmitter();
    }

    _setState = (value, cb) => {
        if (!this._isMount) return;

        if (cb) this.setState(value, cb);
        else this.setState(value);
    }

    componentWillUnmount = async () => {
        this._isMount = false;
    }

    componentDidMount() {

        // Get some initial size data
        const width = Math.round(Dimensions.get('window').width);
        const height = Math.round(Dimensions.get('window').height);
        const scale = Dimensions.get('window').scale;
        const fontScale = Dimensions.get('window').fontScale;

        // Set to state
        this.setState({
            screenWidth: width,
            screenHeight: height,
            orientation: width > height ? LANDSCAPE : PORTRAIT,
            scale: scale,
            fontScale: fontScale
        });
        // this._isUserLogin()
    }

    // closeSplash = () => {
    //     if (Platform.OS === "android") {
    //     }
    // }

    showAlert(title, body) {
        Alert.alert(
            title, body,
            [
                { text: 'OK', onPress: () => Utils.log('OK Pressed') },
            ],
            { cancelable: false },
        );
    }

    _onScreenUpdate(event) {
        const width = Math.round(event.nativeEvent.layout.width);
        const height = Math.round(event.nativeEvent.layout.height);
        const orientation = width > height ? 'LANDSCAPE' : 'PORTRAIT';
        if (orientation !== this.state.orientation) {
            // emit orientation change event
            this._orientationEventEmitter.emit('orientation');
        }
        if (
            this.state.viewableScreenWidth !== width
        ) {
            this.setState({
                viewableScreenWidth: width,
                viewableScreenHeightWithHeader: height - this.headerHeight(),
                viewableScreenHeight: height,
                orientation: orientation
            });
        }
    }

    /**
     * Get header height
     */
    headerHeight() {
        return Platform.OS === 'ios' ? 64 : 56;
    }

    Wrapper = ({ children }) => {
        return <View
            onLayout={(event) => this._onScreenUpdate(event)}
            style={{
                flex: 1,
                backgroundColor: Colors.black,
            }}>
            {children}
        </View>
    }

    _handleStatus = async (isOnline) => {
        try {

        } catch (error) {

        }
    }

    render() {

        return (
            <this.Wrapper>
                <StatusBar hidden={true} barStyle={"dark-content"} backgroundColor={Colors.black} />
                {React.createElement(MainScene, {
                    screenProps: {
                        booted: this.state.booted,
                        isPortrait: this.state.viewableScreenHeight > this.state.viewableScreenWidth,
                        screenWidth: this.state.viewableScreenWidth,
                        screenHeight: this.state.viewableScreenHeight,
                        screenHeightWithHeader: this.state.viewableScreenHeightWithHeader,
                        screenOrientation: this.state.screenOrientation,
                        scale: this.state.scale,
                        fontScale: this.state.fontScale,
                        gcScannerEventEmitter: this.ikoniccEventEmitter,
                        isOnline: this.state.isOnline
                    }
                })}
                <ConnectionInfo
                    onConnectionStatusChange={this._handleStatus.bind(this)} />
            </this.Wrapper>
        );
    }
}

const mapToProps = ({ }) => {

    return ({});
}

export default connect(mapToProps, {
    updateDeviceUIConstraints
})(Rootrn);
