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

const ButtonWrapper = styled.View`
  margin-top: 20px;
  width: 100%;
  flex-direction: row;
`;

const FindPwTouchOpacity = styled.TouchableOpacity`
  padding: 20px;
  margin-bottom: 44px;
  align-self: center;
`;

const FindPwText = styled.Text`
  color: ${({ theme }): string => theme.link};
  text-decoration-line: underline;
`;

const StyledAgreementTextWrapper = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0 0 40px 0;
`;

const StyledAgreementText = styled.Text`
  line-height: 22px;
  color: #777;
`;

const StyledAgreementLinedText = styled.Text`
  line-height: 22px;
  color: ${({ theme }): string => theme.link};
  text-decoration-line: underline;
`;

interface Props {
  navigation: RootStackNavigationProps<'default'>;
}

function Page(props: Props): ReactElement {
  const { theme, changeThemeType, themeType } = useThemeContext();
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorEmail, setErrorEmail] = useState<string>('');
  const [errorPassword, setPasswordError] = useState<string>('');
  const { navigation } = props;

  const next = (): void => {
    // if (!userId) {
    //   return setErrorText(getString('WRITE_USER_ID'));
    // }
    // setErrorText('');
    // navigation.navigate('Main', {
    //   userId,
    // });
  };

  const goToSignUp = (): void => {
    navigation.navigate('SignUp');
  };

  const goToFindPw = (): void => {
    navigation.navigate('FindPw');
  };

  const goToWebView = (uri: string): void => {
    props.navigation.navigate('WebView', { uri });
  };

  const signIn = async (): Promise<void> => {
    props.navigation.navigate('Main');
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
          style={{ marginTop: 120 }}
          onPress={(): void => changeThemeType()}
        >
          <Image
            source={IC_LOGO}
            style={{
              width: 300,
              height: 80,
            }}
          />
        </TouchableOpacity>
        <View style={{ marginHorizontal: 48 }}>
          <EditText
            testID="input-email"
            errorTestID="error-email"
            keyboardType="email-address"
            textStyle={{ color: theme.font, fontSize: 16 }}
            labelTextStyle={{ fontSize: 14 }}
            style={{ marginTop: 60 }}
            isRow={true}
            label={getString('EMAIL')}
            borderColor={theme.font}
            focusColor={theme.focused}
            placeholderTextColor={theme.placeholder}
            placeholder={getString('EMAIL_HINT')}
            value={email}
            onChangeText={(text: string): void => setEmail(text)}
            onSubmitEditing={next}
            errorText={errorEmail}
          />
          <EditText
            testID="input-password"
            errorTestID="error-password"
            textStyle={{ color: theme.font, fontSize: 16 }}
            labelTextStyle={{ fontSize: 14 }}
            style={{ marginTop: 32 }}
            isRow={true}
            label={getString('PASSWORD')}
            borderColor={theme.font}
            focusColor={theme.focused}
            placeholderTextColor={theme.placeholder}
            placeholder="******"
            value={password}
            onChangeText={(text: string): void => setPassword(text)}
            onSubmitEditing={next}
            errorText={errorPassword}
          />
          <ButtonWrapper>
            <Button
              testID="btn-sign-up"
              onPress={goToSignUp}
              containerStyle={{
                flex: 1,
                flexDirection: 'row',
                height: 52,
                justifyContent: 'center',
              }}
              style={{
                width: '100%',
                backgroundColor: theme.background,
                borderColor: theme.primary,
                borderWidth: 1,
              }}
              textStyle={{
                color: theme.primary,
                fontSize: 14,
                fontWeight: 'bold',
              }}
              text={getString('SIGN_UP')}
            />
            <View style={{ width: 20 }} />
            <Button
              testID="btn-sign-in"
              isLoading={isLoggingIn}
              onPress={signIn}
              containerStyle={{
                flex: 1,
                flexDirection: 'row',
                height: 52,
                justifyContent: 'center',
                backgroundColor: theme.primary,
              }}
              textStyle={{
                color: theme.fontInverse,
                fontSize: 14,
                fontWeight: 'bold',
              }}
              text={getString('LOGIN')}
            />
          </ButtonWrapper>
          <FindPwTouchOpacity testID="btn-find-pw" onPress={goToFindPw}>
            <FindPwText>
              {getString('FORGOT_PW')}
            </FindPwText>
          </FindPwTouchOpacity>
          <StyledAgreementTextWrapper>
            <StyledAgreementText>{getString('AGREEMENT1')}</StyledAgreementText>
            <StyledAgreementLinedText
              testID="btn-terms"
              onPress={(): void => goToWebView('https://dooboolab.com/termsofservice')}
            >
              {getString('AGREEMENT2')}
            </StyledAgreementLinedText>
            <StyledAgreementText>{getString('AGREEMENT3')}</StyledAgreementText>
            <StyledAgreementLinedText
              testID="btn-privacy"
              onPress={(): void => goToWebView('https://dooboolab.com/privacyandpolicy')}
            >
              {getString('AGREEMENT4')}
            </StyledAgreementLinedText>
            <StyledAgreementText>{getString('AGREEMENT5')}</StyledAgreementText>
          </StyledAgreementTextWrapper>
        </View>
      </ScrollView>
    </Container>
  );
}

export default Page;
