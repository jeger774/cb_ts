import React, { useState } from 'react';
import { useData, useTheme } from '../hooks';
import { Block, Input, Auction } from '../components';

const Auctions = () => {
  const { auctions } = useData();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [auction, setAuction] = useState(auctions);
  const { colors, sizes } = useTheme();

  return (
    <Block>
      {/* search input */}
      <Block color={colors.card} flex={0} padding={sizes.padding}>
        <Input
          flex={0}
          color={colors.searchbar}
          search
          placeholder={'Search'}
        />
      </Block>

      {/* auctions list */}
      <Block
        scroll
        paddingHorizontal={sizes.padding}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: sizes.l }}>
        <Block justify="space-between" marginTop={sizes.sm}>
          {auction?.map((auctionItem) => (
            <Auction {...auctionItem} key={`card-${auctionItem?.id}`} />
          ))}
        </Block>
      </Block>
    </Block>
  );
};

export default Auctions;
