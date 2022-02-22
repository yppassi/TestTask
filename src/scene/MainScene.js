import React, { PureComponent } from 'react'
import Routes from '../Routes';
import { connect } from 'react-redux';
import { DEVICE_KEY, DEVICE_IS_LOGGED_IN, DEVICE_ROUTE_LOADING, DEVICE_IS_LOGIN_SKIPPED, DEVICE_IS_WELCOME_SCREEN_SKIPPED } from '../redux/Types';
import { updateDeviceUIConstraints } from '../redux/device/Action';

class MainScene extends PureComponent {
    static propTypes = {

    }

    // componentDidMount = () => {
    //     this.init();
    // }

    // init = async () => {
    //     const { updateDeviceUIConstraints, updateUserUIConstraints, getWelcomeScreenData } = this.props;

    //     //Intialize data
    //     updateDeviceUIConstraints({
    //         [DEVICE_ROUTE_LOADING]: true
    //     });

    //     //User Data
    //     const user_data_obj = await IKONICCStorage.getIKONICCLoginData();
    //     const user_data = user_data_obj && user_data_obj[STATUS] === SUCCESS ? user_data_obj[RESPONSE] : {};

    //     // //Skip Login Data
    //     // const skip_login_data_obj = await ODMStorage.getODMSkipLoginData();
    //     // const skip_login_data = skip_login_data_obj && skip_login_data_obj[STATUS] === SUCCESS ? skip_login_data_obj[RESPONSE] : {};

    //     //Skip Welcome Screen Data
    //     const skip_welcome_screen_data_obj = await IKONICCStorage.getIKONICCSkipWelcomeScreenData();
    //     const skip_welcome_screen_data = skip_welcome_screen_data_obj && skip_welcome_screen_data_obj[STATUS] === SUCCESS ? skip_welcome_screen_data_obj[RESPONSE] : {};

    //     //Finalize data
    //     const is_logged_in = user_data && user_data.uid ? true : false;
    //     // const is_login_skipped = skip_login_data && skip_login_data[DEVICE_IS_LOGIN_SKIPPED] ? true : false;
    //     const is_welcome_screen_skipped = skip_welcome_screen_data && skip_welcome_screen_data[DEVICE_IS_WELCOME_SCREEN_SKIPPED] ? true : false;

    //     updateDeviceUIConstraints({
    //         [DEVICE_ROUTE_LOADING]: false,
    //         [DEVICE_IS_LOGGED_IN]: is_logged_in,
    //         // [DEVICE_IS_LOGIN_SKIPPED]: is_login_skipped,
    //         [DEVICE_IS_WELCOME_SCREEN_SKIPPED]: is_welcome_screen_skipped
    //     });
    //     updateUserUIConstraints({
    //         [USER_DATA]: is_logged_in ? user_data : {}
    //     });

    //     // if (!is_welcome_screen_skipped) {
    //     //     getWelcomeScreenData();
    //     // }
    // }

    // Loading = () => <WView dial={5} flex backgroundColor={Colors.white}>
    //     <WSpinner size={'large'} color={Colors.theme_color} />
    // </WView>

    render() {
        const { isLogin, checkingLogin, isLoginSkipped, isWelcomeScreenLoading, isWelcomeScreenSkipped, ...rest } = this.props;

        // if (checkingLogin || isWelcomeScreenLoading) return (
        //     <this.Loading />
        // );

        // if (isLogin) return (
        //     <PostLoginRoutes
        //         {...rest}
        //     />
        // );

        // if (isWelcomeScreenSkipped) {
        //     return (
        //         <Routes
        //             {...rest}
        //         />
        //     );
        // }

        return (
            <Routes
                    {...rest}
                />
        );
    }
}


const mapToProps = ({ device }) => {
    const device_info = device && device[DEVICE_KEY] ? device[DEVICE_KEY] : {};

    const isLogin = device_info && device_info[DEVICE_IS_LOGGED_IN] ? device_info[DEVICE_IS_LOGGED_IN] : false;
    const isLoginSkipped = device_info && device_info[DEVICE_IS_LOGIN_SKIPPED] ? device_info[DEVICE_IS_LOGIN_SKIPPED] : false;
    const isWelcomeScreenSkipped = device_info && device_info[DEVICE_IS_WELCOME_SCREEN_SKIPPED] ? device_info[DEVICE_IS_WELCOME_SCREEN_SKIPPED] : false;
    const checkingLogin = device_info && device_info[DEVICE_ROUTE_LOADING] ? device_info[DEVICE_ROUTE_LOADING] : false;

    // console.log("isLogin ===> ", isLogin);

    return ({
        isLogin,
        isLoginSkipped,
        checkingLogin,
        isWelcomeScreenSkipped
    });
}

export default connect(mapToProps, {
    updateDeviceUIConstraints,
})(MainScene);
