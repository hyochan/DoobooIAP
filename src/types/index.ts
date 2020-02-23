import { StyleProp, TextStyle } from 'react-native';

import { SFC } from 'react';
import firebase from 'firebase';

export interface User {
  displayName: string;
  age: number;
  job: string;
}

export type FirebaseUser = firebase.User;

interface IconProps {
  style?: StyleProp<TextStyle>;
  width?: number | string;
  height?: number | string;
  children?: never;
}

export type IconType = SFC<IconProps>;
