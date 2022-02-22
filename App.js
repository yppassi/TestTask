
  
import React,{PureComponent} from 'react'
import { Root } from './src'
import { injectStore, store } from './src/redux';
import 'react-native-gesture-handler';

const WrappedComponent = injectStore(Root, store);
class App extends PureComponent {
    constructor(props) {
        super(props);
    }
  
    render() {
        return (
            <WrappedComponent />
        );
    }
}

export default App;
