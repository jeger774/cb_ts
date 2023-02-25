import React from 'react';
import Block from './Block';
import Image from './Image';
import Text from './Text';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IAuction } from '../constants/types';
import { useTheme } from '../hooks';

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

  return (
    <Block
      card
      flex={0}
      row={true}
      marginBottom={sizes.s}
      paddingLeft={sizes.s}
      paddingRight={sizes.xs}
      left={-sizes.sm}
      width={CARD_WIDTH * 2.2 + sizes.sm}
      style={{ borderColor: '#A0A0A0', borderWidth: 0.2 }}>
      <Image
        source={{ uri: image }}
        marginTop={sizes.s}
        style={{
          height: 65,
          width: 65,
          borderColor: '#A0A0A0',
          borderWidth: 1,
        }}
      />
      <Text bold position="absolute" marginLeft={15} marginTop={60}>
        {quantity === 1 ? '' : quantity}
      </Text>
      <Block flex={1} justify="center" paddingLeft={sizes.s}>
        <Text h5 bold color={nameColor}>
          {title}
        </Text>
        <Text p>
          Buyout: {Math.floor(price / 10000)}{' '}
          <Image source={icons.gold} style={{ height: 16, width: 16 }} />{' '}
          {Math.floor((price % 10000) / 100)}{' '}
          <Image source={icons.silver} style={{ height: 16, width: 16 }} />{' '}
          {(price % 10000) % 100}{' '}
          <Image source={icons.copper} style={{ height: 16, width: 16 }} />
        </Text>
      </Block>
    </Block>
  );
};

export default Auction;
