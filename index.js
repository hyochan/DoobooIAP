import { AppRegistry, YellowBox } from 'react-native';
import App from './src/App';

/**
 * NOTE: Add Base64 polyfill, sometimes atob and btoa is missing
 * */
import Base64 from 'Base64';
global.btoa = Base64.btoa;
global.atob = Base64.atob;

/**
 * React Native 0.54 warning message ignore.
 */
YellowBox.ignoreWarnings([
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillReceiveProps is deprecated',
  'Module RCTImageLoader',
]);

AppRegistry.registerComponent('DoobooIAP', () => App);
