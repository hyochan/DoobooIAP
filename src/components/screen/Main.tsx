import {
  Alert,
  EmitterSubscription,
  Image,
  Platform,
  SectionList,
  Text,
  View,
} from 'react-native';
import RNIap, {
  InAppPurchase,
  Product,
  PurchaseError,
  Subscription,
  SubscriptionPurchase,
  finishTransaction,
  purchaseErrorListener,
  purchaseUpdatedListener,
} from 'react-native-iap';
import React, { ReactElement, useCallback, useEffect, useState } from 'react';

import { Button } from '@dooboo-ui/native';
import { IC_COIN } from '../../utils/Icons';
import { RootStackNavigationProps } from '../navigation/RootStackNavigator';
import { colors } from '../../theme';
import { getString } from '../../../STRINGS';
import styled from 'styled-components/native';
import { useThemeContext } from '@dooboo-ui/native-theme';

const Container = styled.SafeAreaView`
  flex: 1;
  align-self: stretch;
  overflow: scroll;
  background-color: ${({ theme }): string => theme.background};

  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
`;

const Header = styled.View`
  height: 160px;
  width: 100%;
  background-color: ${colors.blue};
  justify-content: center;
  align-items: center;
`;

const itemSkus = Platform.select({
  default: [
    'com.dooboolab.nonconsumable',
    'com.dooboolab.consumable1000',
    'com.dooboolab.consumable5000',
    'com.dooboolab.consumable10000',
  ],
  android: [
    'android.test.purchased',
    'android.test.canceled',
    'android.test.refunded',
    'android.test.item_unavailable',
    // 'point_1000', '5000_point', // dooboolab
  ],
});

const itemSubs = Platform.select({
  default: [
    'com.dooboolab.subscription1000',
    'com.dooboolab.subscription5000',
    'com.dooboolab.subscription10000',
  ],
});

enum ITEM_TYPE {
  PRODUCT = 'product',
  SUBSCRIPTION = 'subscription',
}

function getSkuType(item: Product | Subscription): ITEM_TYPE {
  switch (item.type) {
    case 'iap':
    case 'inapp':
      return ITEM_TYPE.PRODUCT;

    case 'sub':
    case 'subs':
      return ITEM_TYPE.PRODUCT;
  }
}

type IOS_PERIOD_UNIT = '' | 'DAY' | 'WEEK' | 'MONTH' | 'YEAR';
function iosConvertPeriodToDays(
  periodCount: number,
  periodUnit: IOS_PERIOD_UNIT,
): number {
  switch (periodUnit) {
    case '':
      return 0;
    case 'DAY':
      return periodCount;
    case 'WEEK':
      return 7 * periodCount;
    case 'MONTH':
      return 30 * periodCount;
    case 'YEAR':
      return 365 * periodCount;
  }
}

// https://developer.android.com/reference/java/time/Period
type ANDROID_PERIOD =
  | string
  | 'P3D'
  | 'P7D'
  | 'P1W'
  | 'P4W2D'
  | 'P1M'
  | 'P3M'
  | 'P1Y';
function androidConvertPeriodToDays(period: ANDROID_PERIOD): number {
  const unit = [365, 30, 7, 1];
  return period
    .split(/P(\d+Y)?(\d+M)?(\d+W)?(\d+D)?/)
    .slice(1, 5)
    .map((p, i) => (!p ? 0 : Number(p.replace(/\D/g, '')) * unit[i]))
    .reduce((a, b) => a + b, 0);
}

function getTrialPeriod(subscription?: Subscription): number {
  if (!subscription) {
    return 0;
  }

  const {
    introductoryPriceNumberOfPeriodsIOS: periodCountIOS,
    introductoryPriceSubscriptionPeriodIOS: periodUnitIOS,
    freeTrialPeriodAndroid: periodAndroid,
  } = subscription;
  switch (Platform.OS) {
    case 'android':
      return androidConvertPeriodToDays(periodAndroid as ANDROID_PERIOD);
    case 'ios':
      return iosConvertPeriodToDays(
        Number(periodCountIOS),
        periodUnitIOS as IOS_PERIOD_UNIT,
      );
    default:
      return 0;
  }
}

interface Props {
  navigation: RootStackNavigationProps<'Main'>;
}

interface SectionProduct {
  title: string;
  data: Product[];
}

interface SectionSubscription {
  title: string;
  data: Subscription[];
}

type Section = SectionProduct | SectionSubscription;

let purchaseUpdateSubscription: EmitterSubscription;
let purchaseErrorSubscription: EmitterSubscription;

function Intro(): React.ReactElement {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalPayedAmount, setTotalPayedAmount] = useState<number>(10000);
  const { theme } = useThemeContext();

  const getProducts = useCallback(async (): Promise<void> => {
    RNIap.clearProductsIOS();

    try {
      const result = await RNIap.initConnection();
      await RNIap.consumeAllItemsAndroid();
      console.log('result', result);
    } catch (err) {
      console.warn(err.code, err.message);
    }

    purchaseUpdateSubscription = purchaseUpdatedListener(
      async (purchase: InAppPurchase | SubscriptionPurchase) => {
        const receipt = purchase.transactionReceipt;
        if (receipt) {
          try {
            const ackResult = await finishTransaction(purchase);
            console.log('ackResult', ackResult);
          } catch (ackErr) {
            console.warn('ackErr', ackErr);
          }

          Alert.alert('purchase error', JSON.stringify(receipt));
        }
      },
    );

    purchaseErrorSubscription = purchaseErrorListener(
      (error: PurchaseError) => {
        console.log('purchaseErrorListener', error);
        Alert.alert('purchase error', JSON.stringify(error));
      },
    );

    const products = await RNIap.getProducts(itemSkus);
    products.forEach((product) => {
      product.type = 'inapp';
    });
    // console.log('products', JSON.stringify(products));
    const subscriptions = await RNIap.getSubscriptions(itemSubs);
    subscriptions.forEach((subscription) => {
      subscription.type = 'subs';
    });
    console.log('subscriptions', JSON.stringify(subscriptions));
    const list = [
      {
        title: getString('ONE_TIME_PURCHASE'),
        data: products,
      },
      {
        title: getString('SUBSCRIPTION_PURCHASE'),
        data: subscriptions,
      },
    ];
    setSections(list);
    setLoading(false);
  }, [sections]);

  useEffect(() => {
    getProducts();

    return (): void => {
      if (purchaseUpdateSubscription) {
        purchaseUpdateSubscription.remove();
      }
      if (purchaseErrorSubscription) {
        purchaseErrorSubscription.remove();
      }
    };
  }, []);

  const purchase = (item: Product | Subscription): void => {
    if (getSkuType(item) === ITEM_TYPE.PRODUCT) {
      RNIap.requestPurchase(item.productId);
    } else {
      RNIap.requestSubscription(item.productId);
    }
  };

  const renderHeader = (): ReactElement => (
    <Header>
      <Text
        style={{
          fontSize: 28,
          color: 'white',
        }}
      >
        {totalPayedAmount.toLocaleString()}
      </Text>
      <Text
        style={{
          marginTop: 8,
          fontSize: 16,
          color: 'white',
        }}
      >
        {getString('TOTAL_PURCHASE')}
      </Text>
    </Header>
  );

  const renderSectionHeader = (title: string): ReactElement => (
    <View
      style={{
        height: 40,
        flexDirection: 'row',
        paddingHorizontal: 16,
        backgroundColor: theme.placeholder,
      }}
    >
      <Text
        style={{
          fontSize: 13,
          color: theme.background,
          marginTop: 12,
        }}
      >
        {title}
      </Text>
    </View>
  );

  const renderItem = (item: Product | Subscription): ReactElement => (
    <View
      style={{
        padding: 16,
        flexDirection: 'row',
        backgroundColor: theme.background,
        borderBottomWidth: 1,
        borderBottomColor: theme.placeholder,
      }}
    >
      <Image
        source={IC_COIN}
        style={{
          height: 80,
          width: 80,
        }}
      />
      <View
        style={{
          flexDirection: 'column',
          marginLeft: 32,
          marginRight: 20,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            color: theme.brandLight,
            marginBottom: 4,
          }}
        >
          {item.title}
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: theme.font,
          }}
        >
          {item.productId}
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontWeight: 'bold',
            color: theme.warning,
          }}
        >
          {getSkuType(item) === ITEM_TYPE.SUBSCRIPTION &&
            getTrialPeriod(item as Subscription) !== 0 &&
            `FREE TRIAL DAYS: ${getTrialPeriod(item as Subscription)}`}
        </Text>
        <Button
          containerStyle={{
            width: 120,
            marginTop: 16,
          }}
          style={{
            backgroundColor: theme.background,
            height: 40,
            width: 120,
            borderWidth: 1,
            borderColor: theme.focused,
            borderRadius: 8,
            paddingHorizontal: 10,
          }}
          textStyle={{
            color: theme.font,
          }}
          onPress={(): void => purchase(item)}
          text={item.localizedPrice}
        />
      </View>
    </View>
  );

  return (
    <Container>
      <SectionList
        style={{ width: '100%' }}
        ListHeaderComponent={renderHeader}
        refreshing={loading}
        onRefresh={getProducts}
        // @ts-ignore
        sections={sections}
        keyExtractor={(item, index): string => index.toString()}
        renderItem={({ item }): ReactElement => renderItem(item)}
        renderSectionHeader={({ section: { title } }): ReactElement =>
          renderSectionHeader(title)
        }
      />
    </Container>
  );
}

export default Intro;
