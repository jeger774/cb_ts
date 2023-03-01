import React from 'react';
import Block from './Block';
import Image from './Image';
import Text from './Text';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IAuction } from '../constants/types';
import { useTheme } from '../hooks';
import { Platform } from 'react-native';

const isAndroid = Platform.OS === 'android';

const Auction = ({ image, title, quantity, price, quality }: IAuction) => {
  const { icons, sizes } = useTheme();
  const CARD_WIDTH = (sizes.width - sizes.padding * 2 - sizes.sm) / 2;

  let nameColor = '#A0A0A0';
  switch (quality) {
    case 0:
      nameColor = '#A0A0A0';
      break;
    case 1:
      nameColor = '#FFFFFF';
      break;
    case 2:
      nameColor = '#44FF44';
      break;
    case 3:
      nameColor = '#397FFF';
      break;
    case 4:
      nameColor = '#9F00FF';
      break;
    default:
      nameColor = '#FFFFFF';
      break;
  }

  let unitPrice = price / quantity;

  return (
    <Block
      card
      flex={0}
      row={true}
      radius={isAndroid ? 5 : 10}
      marginBottom={sizes.sm}
      paddingHorizontal={sizes.s}
      width={CARD_WIDTH * 2 + sizes.sm}
      style={{ borderColor: '#A0A0A0', borderWidth: 0.2 }}>
      <Image
        source={{ uri: image }}
        marginTop={sizes.xs}
        style={{
          height: 65,
          width: 65,
          borderColor: '#A0A0A0',
          borderWidth: 1,
        }}
      />
      <Text bold position="absolute" marginLeft={15} marginTop={55}>
        {quantity === 1 ? '' : quantity}
      </Text>
      <Block flex={1} justify="center" paddingLeft={sizes.s}>
        <Text h5 bold color={nameColor}>
          {title}
        </Text>
        <Text p semibold>
          Buyout: {Math.floor(price / 10000)}{' '}
          <Image source={icons.gold} style={{ height: 16, width: 16 }} />{' '}
          {Math.floor((price % 10000) / 100)}{' '}
          <Image source={icons.silver} style={{ height: 16, width: 16 }} />{' '}
          {Math.floor(price % 10000) % 100}{' '}
          <Image source={icons.copper} style={{ height: 16, width: 16 }} />
        </Text>
        {quantity === 1 ? (
          <></>
        ) : (
          <Text p>
            Price/unit: {Math.floor(unitPrice / 10000)}{' '}
            <Image source={icons.gold} style={{ height: 16, width: 16 }} />{' '}
            {Math.floor((unitPrice % 10000) / 100)}{' '}
            <Image source={icons.silver} style={{ height: 16, width: 16 }} />{' '}
            {Math.floor(unitPrice % 10000) % 100}{' '}
            <Image source={icons.copper} style={{ height: 16, width: 16 }} />
          </Text>
        )}
      </Block>
    </Block>
  );
};

export default Auction;
