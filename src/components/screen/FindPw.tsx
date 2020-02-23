import { Button, EditText } from '@dooboo-ui/native';
import React, { ReactElement, useState } from 'react';

import { Alert } from 'react-native';
import { RootStackNavigationProps } from '../navigation/RootStackNavigator';
import firebase from 'firebase';
import { getString } from '../../../STRINGS';
import styled from 'styled-components/native';
import { useThemeContext } from '@dooboo-ui/native-theme';
import { validateEmail } from '../../utils/common';

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }): string => theme.background};
`;

const Wrapper = styled.View`
  margin: 44px;
`;

const ButtonWrapper = styled.View`
  width: 100%;
  margin-top: 20px;
`;

interface Props {
  navigation: RootStackNavigationProps<'FindPw'>;
}

function Page(): ReactElement {
  const [email, setEmail] = useState<string>('');
  const [errorEmail, setErrorEmail] = useState<string>('');
  const [findingPw, setFindingPw] = useState<boolean>(false);

  const { theme } = useThemeContext();

  const onFindPw = async (): Promise<void> => {
    if (!validateEmail(email)) {
      setErrorEmail(getString('EMAIL_FORMAT_NOT_VALID'));
      return;
    }

    setFindingPw(true);
    try {
      await firebase.auth().sendPasswordResetEmail(email);
    } catch (err) {
      Alert.alert(getString('ERROR'), `${err.code}: ${err.message}`);
    } finally {
      Alert.alert(getString('SUCCESS'), getString('EMAIL_PASSWORD_RESET_SENT'));
      setFindingPw(false);
    }
  };

  return (
    <Container>
      <Wrapper>
        <EditText
          testID="input-email"
          errorTestID="error-email"
          textStyle={{
            color: theme.font,
          }}
          borderColor={theme.font}
          focusColor={theme.focused}
          placeholderTextColor={theme.placeholder}
          label={getString('EMAIL')}
          placeholder="hello@example.com"
          value={email}
          onChangeText={(text: string): void => {
            setEmail(text);
            setErrorEmail('');
          }}
          style={{ marginTop: 20 }}
          errorText={errorEmail}
          onSubmitEditing={onFindPw}
        />
        <ButtonWrapper>
          <Button
            testID="btn-find-pw"
            isLoading={findingPw}
            onPress={onFindPw}
            containerStyle={{ height: 52, backgroundColor: theme.primary }}
            textStyle={{ color: theme.fontInverse, fontWeight: 'bold' }}
            text={getString('FIND_PW')}
          />
        </ButtonWrapper>
      </Wrapper>
    </Container>
  );
}

export default Page;
