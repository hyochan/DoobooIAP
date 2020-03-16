import React, { ReactElement } from 'react';
import {
  RenderResult,
  act,
  fireEvent,
  render,
} from '@testing-library/react-native';
import { createTestElement, createTestProps } from '../../../../test/testUtils';

import Main from '../Main';
import { ThemeType } from '@dooboo-ui/native-theme';
import renderer from 'react-test-renderer';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let props: any;
let component: ReactElement;
let testingLib: RenderResult;

describe('[Main] screen rendering test', () => {
  beforeEach(() => {
    props = createTestProps();
    component = createTestElement(<Main {...props} />);
    testingLib = render(component);
  });

  it('should render outer component and snapshot matches', () => {
    const json = renderer.create(component).toJSON();
    expect(json).toMatchSnapshot();
    expect(json).toBeTruthy();
  });

  it('should render [Dark] theme', () => {
    component = createTestElement(<Main {...props} />, ThemeType.DARK);
    testingLib = render(component);
    const { baseElement } = testingLib;
    expect(baseElement).toMatchSnapshot();
    expect(baseElement).toBeTruthy();
  });
});
