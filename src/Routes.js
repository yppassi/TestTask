import React, { PureComponent } from 'react';
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack';
import { keyboardAwareFunc } from './common/base_components';
import { Detail, Favorite, Home, Search } from './scene/postLogin';

const RouteConfigs = {
    Home: {
        screen: Home,
        navigationOptions: ({ navigation }) => ({
            header: null
        }),
    },
    Favorite:{
        screen: Favorite,
        navigationOptions: ({ navigation }) => ({
            header: null
        }),
    },
    Search:{
        screen: Search,
        navigationOptions: ({ navigation }) => ({
            header: null
        }),
    },
    Detail:{
        screen: Detail,
        navigationOptions: ({ navigation }) => ({
            header: null
        }),
    }
    
};

const StackNavigatorConfig = {
    initialRouteName: 'Home'
};

const Navigator = createAppContainer(createStackNavigator(RouteConfigs, StackNavigatorConfig));

class RNRoutes extends PureComponent {

    constructor(props) {
        super(props);
        this.onNavigationStateChange = this.onNavigationStateChange.bind(this);
    }

    static router = Navigator.router;

    onNavigationStateChange(prevState, currentState) {
    }

    render() {
        const { screenProps, navigation } = this.props;

        return (
            <Navigator
                navigation={navigation}
                onNavigationStateChange={this.onNavigationStateChange}
                screenProps={screenProps}
            />
        );
    }
}

export default RNRoutes;
