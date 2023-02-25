import React from 'react';
import Block from './Block';
import Text from './Text';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { INotification } from '../constants/types';
import { useTheme } from '../hooks';

const Auction = ({ id, subject, message }: INotification) => {
  const { sizes } = useTheme();
  const CARD_WIDTH = (sizes.width - sizes.padding * 2 - sizes.sm) / 2;

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
      <Block flex={1} justify="center" paddingLeft={sizes.s}>
        <Text>{id}</Text>
        <Text h5 bold>
          {subject}
        </Text>
        <Text p>Message: {message}</Text>
      </Block>
    </Block>
  );
};

export default Auction;
