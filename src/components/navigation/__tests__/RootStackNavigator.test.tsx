import 'react-native';

import * as firebase from 'firebase';

import React, { ReactElement } from 'react';
import { act, render, wait } from '@testing-library/react-native';
import { createTestElement, createTestProps } from '../../../../test/testUtils';

import StackNavigator from '../RootStackNavigator';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let props: any;
let component: ReactElement;

const onAuthStateChanged = jest.fn();

const getRedirectResult = jest.fn(() => {
  return Promise.resolve({
    user: {
      displayName: 'redirectResultTestDisplayName',
      email: 'redirectTest@test.com',
      emailVerified: true,
    },
  });
});

const sendEmailVerification = jest.fn(() => {
  return Promise.resolve('result of sendEmailVerification');
});

const sendPasswordResetEmail = jest.fn(() => Promise.resolve());

const createUserWithEmailAndPassword = jest.fn(() => {
  return Promise.resolve('result of createUserWithEmailAndPassword');
});

const signInWithEmailAndPassword = jest.fn(() => {
  return Promise.resolve('result of signInWithEmailAndPassword');
});

const signInWithRedirect = jest.fn(() => {
  return Promise.resolve('result of signInWithRedirect');
});

const initializeApp = jest
  .spyOn(firebase, 'initializeApp')
  .mockImplementation((): any => {
    return {
      auth: (): object => {
        return {
          createUserWithEmailAndPassword,
          signInWithEmailAndPassword,
          currentUser: {
            sendEmailVerification,
          },
          signInWithRedirect,
        };
      },
    };
  });

jest.spyOn(firebase, 'auth').mockImplementation((): any => {
  return {
    onAuthStateChanged,
    currentUser: {
      displayName: 'testDisplayName',
      email: 'test@test.com',
      emailVerified: true,
    },
    getRedirectResult,
    sendPasswordResetEmail,
  };
});

describe('[Stack] navigator', () => {
  beforeEach(() => {
    props = createTestProps();
    component = createTestElement(<StackNavigator {...props} />);
  });

  it('should renders without crashing', async () => {
    const { container } = render(component);
    await act(() => wait());
    expect(container).toBeTruthy();
    expect(container).toMatchSnapshot();
  });
});
