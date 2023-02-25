/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useMemo, useState } from 'react';
import { useTheme } from '../hooks';
import {
  Block,
  Input,
  Auction,
  Text,
  Button,
  Modal,
  Image,
} from '../components';
import { IAuction, IApiResponse } from '../constants/types';
import { ActivityIndicator, FlatList } from 'react-native';
import { DOMParser } from 'xmldom';

const getItems = async (days: number, id: number) => {
  const data = await fetch(
    `http://jeger.co.hu:6555/items?days=${days}&id=${id}`,
  );
  try {
    const result = await data.json();
    return result;
  } catch (error) {
    const text = await data.text();
    console.log('Response text:', text);
    return JSON.parse(text);
  }
};

const Auctions = () => {
  const [queryData, setQueryData] = useState<IAuction[]>([]);
  const [responseData, setResponseData] = useState<IApiResponse[]>([]);
  const [query, setQuery] = useState<string>('');
  const [days, setDays] = useState<number>(1);
  const [showDaysModal, setDaysModal] = useState(false);
  const [id, setId] = useState<number>(0);
  const [name, setName] = useState<string>('');
  const [icon, setIcon] = useState<string>('');
  const [quality, setQuality] = useState<number>(0);
  const [invalid, setInvalid] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { assets, colors, sizes } = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://www.wowhead.com/item=${query}&xml`,
        );
        const xml = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(xml, 'text/xml');
        if (!doc) {
          setInvalid(true);
          return null;
        }
        const jsonString = doc.getElementsByTagName('json')[0].textContent;
        if (!jsonString) {
          setInvalid(true);
          return null;
        }

        const fixedJsonString = jsonString.replace(
          /([{,])(\s*)([a-zA-Z0-9_]+?)\s*:/g,
          '$1"$3": ',
        );

        const json = JSON.parse(`{${fixedJsonString}}`);
        const extractedId = json.id;
        const extractedName = json.name;
        const extractedQuality = json.quality;
        const extractedIcon = doc.getElementsByTagName('icon')[0].textContent;

        if (
          doc &&
          jsonString &&
          extractedId &&
          extractedName &&
          extractedQuality &&
          extractedIcon
        ) {
          setId(extractedId);
          setName(extractedName);
          setQuality(extractedQuality);
          setIcon(extractedIcon);
          setInvalid(false);
        }
      } catch (error) {
        setInvalid(true);
        console.log(error);
      }
    };
    if (query !== '') {
      fetchData();
    }
  }, [query]);

  useEffect(() => {
    setIsLoading(true);
    getItems(days, id)
      .then((result) => {
        setResponseData(result);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log('USEEFFECT', error);
      });
  }, [days, id]);

  useEffect(() => {
    setQueryData(
      responseData.map((item) => ({
        title: name,
        quantity: item.quantity,
        price: item.buyout,
        quality: quality,
        image: `https://wow.zamimg.com/images/wow/icons/large/${icon}.jpg`,
      })),
    );
  }, [responseData, name, icon, quality]);

  const SearchHeader = () => {
    return (
      <Block flex={0} row color={colors.card} padding={sizes.padding}>
        <Input
          flex={1}
          color={colors.searchbar}
          search
          placeholder={'Search'}
          onSubmitEditing={(event) => {
            setQuery(event.nativeEvent.text);
          }}
        />
        <Button
          color={colors.primary}
          radius={10}
          width={100}
          marginLeft={sizes.s}
          onPress={() => setDaysModal(true)}>
          <Block row align="center">
            <Text white semibold transform="uppercase" marginRight={sizes.s}>
              {days} day(s)
            </Text>
            <Image
              source={assets.arrow}
              color={colors.white}
              transform={[{ rotate: '90deg' }]}
            />
          </Block>
        </Button>
        <Modal
          visible={showDaysModal}
          onRequestClose={() => setDaysModal(false)}>
          <FlatList
            keyExtractor={(index) => `${index}`}
            data={[1, 2, 3, 4, 5]}
            renderItem={({ item }) => (
              <Button
                marginBottom={sizes.sm}
                onPress={() => {
                  setDays(item);
                  setDaysModal(false);
                }}>
                <Text p white semibold transform="uppercase">
                  {item}
                </Text>
              </Button>
            )}
          />
        </Modal>
      </Block>
    );
  };

  if (query === '') {
    return (
      <Block>
        <SearchHeader />
        <Block flex={1} center>
          <Text h4 center semibold marginBottom={sizes.m}>
            Search for an item...
          </Text>
        </Block>
      </Block>
    );
  } else if (invalid) {
    return (
      <Block>
        <SearchHeader />

        <Block flex={1} center>
          <Text h4 center semibold marginBottom={sizes.m}>
            Item not found!
          </Text>
        </Block>
      </Block>
    );
  } else if (isLoading) {
    return (
      <Block>
        <SearchHeader />

        <Block flex={1} center paddingBottom={sizes.xxl}>
          <ActivityIndicator size="large" color="#EC9602" />
        </Block>
      </Block>
    );
  } else if (!invalid && query !== '' && queryData) {
    return (
      <Block>
        <SearchHeader />

        <Block
          flex={1}
          scroll
          paddingHorizontal={sizes.padding}
          showsVerticalScrollIndicator={true}
          contentContainerStyle={{ paddingBottom: sizes.l }}>
          <Block justify="space-between" marginTop={sizes.sm}>
            {queryData?.map((auctionItem) => (
              <Auction {...auctionItem} />
            ))}
          </Block>
        </Block>
      </Block>
    );
  } else {
    return <SearchHeader />;
  }
};

export default Auctions;
