import { Button, EditText } from '@dooboo-ui/native';
import { Image, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import React, { ReactElement, useState } from 'react';
import { ThemeType, useThemeContext } from '@dooboo-ui/native-theme';

import { IC_LOGO } from '../../utils/Icons';
import { RootStackNavigationProps } from '../navigation/RootStackNavigator';
import { getString } from '../../../STRINGS';
import styled from 'styled-components/native';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }): string => theme.background};
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

interface Props {
  navigation: RootStackNavigationProps<'default'>;
}

function Page(props: Props): ReactElement {
  const { theme, changeThemeType, themeType } = useThemeContext();
  const [userId, setUserId] = useState<string>('');
  const [errorText, setErrorText] = useState<string>('');
  const { navigation } = props;

  const next = (): void => {
    if (!userId) {
      return setErrorText(getString('WRITE_USER_ID'));
    }
    setErrorText('');
    navigation.navigate('Main', {
      userId,
    });
  };

  return (
    <Container>
      <StatusBar
        barStyle={
          themeType === ThemeType.LIGHT
            ? 'dark-content' : 'light-content'
        }
      />
      <ScrollView
        style={{ width: '100%' }}
        contentContainerStyle={{
          alignItems: 'center',
        }}
      >
        <TouchableOpacity
          onPress={(): void => changeThemeType()}
        >
          <Image
            source={IC_LOGO}
            style={{
              marginTop: 120,
              width: 300,
              height: 80,
            }}
          />
        </TouchableOpacity>
        <View style={{ marginHorizontal: 48 }}>
          <EditText
            testID="input-id"
            errorTestID="error-id"
            textStyle={{ color: theme.fontColor, fontSize: 16 }}
            labelTextStyle={{ fontSize: 14 }}
            style={{ marginTop: 60 }}
            isRow={true}
            label={getString('USER_ID')}
            borderColor={theme.font}
            focusColor={theme.focused}
            placeholderTextColor={theme.placeholder}
            placeholder={getString('USER_ID_HINT')}
            value={userId}
            onChangeText={(text: string): void => setUserId(text)}
            onSubmitEditing={next}
            errorText={errorText}
          />
          <Button
            testID="btn-sign-up"
            onPress={next}
            containerStyle={{
              marginTop: 24,
              flexDirection: 'row',
              height: 52,
              justifyContent: 'center',
            }}
            style={{
              width: '100%',
              borderWidth: 1,
              borderColor: theme.focused,
            }}
            textStyle={{
              fontSize: 16,
              fontWeight: 'bold',
              color: theme.focused,
            }}
            text={getString('LOGIN')}
          />
          <Text style={{
            marginVertical: 32,
            color: theme.placeholder,
            fontSize: 16,
          }}>{getString('USER_ID_DESCRIPTION')}</Text>
        </View>
      </ScrollView>
    </Container>
  );
}

export default Page;
