/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState, useMemo } from 'react';
import { ActivityIndicator, Dimensions, FlatList } from 'react-native';
import { useTheme } from '../hooks/';
import { Block, Input, Modal, Text, Image, Button } from '../components/';
import { IAuctions, IRealmData } from '../constants/types';
import { LineChart } from 'react-native-chart-kit';
import { DOMParser } from 'xmldom';
import { regionState, realmState, factionState } from '../states/SettingsAtoms';
import { useRecoilValue } from 'recoil';

const getItemData = async (
  days: number,
  id: number,
  realm: number,
  faction: number,
  region: string,
) => {
  const data = await fetch(
    `http://jeger.co.hu:6555/item?id=${id}&days=${days}&realm=${realm}&faction=${faction}&region=${region}`,
  );
  try {
    //console.log(data.status);
    const result = await data.json();
    return result;
  } catch (error) {
    //console.log('GETITEMDATA', error);
    const text = await data.text();
    console.log('Response text:', text);
    return JSON.parse(text);
  }
};

const Charts = () => {
  const [queryData, setQueryData] = useState<IAuctions[]>([]);
  const [query, setQuery] = useState<string>('');
  const [days, setDays] = useState<number>(1);
  const [showDaysModal, setDaysModal] = useState(false);
  const { assets, colors, sizes } = useTheme();
  const [id, setId] = useState<number>(0);
  const [invalid, setInvalid] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const region = useRecoilValue(regionState);
  const realmName = useRecoilValue(realmState);
  const faction = useRecoilValue(factionState) === 'Alliance' ? 2 : 6;
  const [realmId, setRealmId] = useState<number>(4815);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://jeger.co.hu:8080/json/${region}_realm_data.json`,
      );
      const json: Record<string, IRealmData> = await response.json();
      const matchingEntry = Object.entries(json).find(
        ([key, entry]) => entry.name === realmName,
      );
      if (matchingEntry) {
        setRealmId(matchingEntry[1].id);
      }
    };
    fetchData();
  }, [realmName, region]);

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
        const idStartIndex = jsonString.indexOf('"id":') + 5;
        const idEndIndex = jsonString.indexOf(',', idStartIndex);
        const extractedId = parseInt(
          jsonString.substring(idStartIndex, idEndIndex),
          10,
        );
        if (doc && jsonString && extractedId) {
          setId(extractedId);
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
    getItemData(days, id, realmId, faction, region)
      .then((result) => {
        setQueryData(result);
        if (result.length < 1) {
          setInvalid(true);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.log('USEEFFECT', error);
      });
  }, [days, id, faction, realmId, region]);

  const numberOfItemsData = useMemo(
    () => [
      {
        label: 'Number of items',
        data: queryData.map((el) => el.noItems),
        color: (opacity = 1) => `rgba(236, 150, 2, ${opacity})`,
      },
    ],
    [queryData],
  );

  const minimumPriceData = useMemo(
    () => [
      {
        label: 'Minimum price',
        data: queryData.map((el) => el.minPrice / 10000),
        color: (opacity = 1) => `rgba(236, 150, 2, ${opacity})`,
      },
    ],
    [queryData],
  );

  const medianPriceData = useMemo(
    () => [
      {
        label: 'Median price',
        data: queryData.map((el) => el.medianPrice / 10000),
        color: (opacity = 1) => `rgba(236, 150, 2, ${opacity})`,
      },
    ],
    [queryData],
  );

  const chartConfig = {
    backgroundGradientFrom: '#202020',
    backgroundGradientTo: '#202020',
    fillShadowGradientFrom: '#FF9F00',
    fillShadowGradientTo: '#4A2E00',
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 0,
    },
    propsForDots: {
      r: '4',
      strokeWidth: '1',
      stroke: '#FFFFFF',
    },
  };

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
          success={!invalid && query !== ''}
          danger={invalid}
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

        {/* price charts */}
        <Block scroll color="#202020" showsVerticalScrollIndicator={true}>
          <Text
            h5
            semibold
            white
            center
            marginBottom={sizes.s}
            marginTop={sizes.s}>
            Number of items
          </Text>
          <LineChart
            data={{
              labels: queryData.map((el) => {
                const date = new Date(el.createdAt);
                return `${
                  date.getMonth() + 1
                }.${date.getDate()}, ${date.getHours()}:${date.getMinutes()}`;
              }),
              datasets: numberOfItemsData,
            }}
            width={Dimensions.get('window').width}
            height={250}
            chartConfig={chartConfig}
            verticalLabelRotation={90}
            style={{ paddingBottom: 45 }}
          />
          <Text
            h5
            semibold
            white
            center
            marginBottom={sizes.s}
            marginTop={sizes.s}>
            Minimum price
          </Text>
          <LineChart
            data={{
              labels: queryData.map((el) => {
                const date = new Date(el.createdAt);
                return `${
                  date.getMonth() + 1
                }.${date.getDate()}, ${date.getHours()}:${date.getMinutes()}`;
              }),
              datasets: minimumPriceData,
            }}
            width={Dimensions.get('window').width}
            height={250}
            chartConfig={chartConfig}
            verticalLabelRotation={90}
            style={{ paddingBottom: 45 }}
          />
          <Text
            h5
            semibold
            white
            center
            marginBottom={sizes.s}
            marginTop={sizes.s}>
            Median price
          </Text>
          <LineChart
            data={{
              labels: queryData.map((el) => {
                const date = new Date(el.createdAt);
                return `${
                  date.getMonth() + 1
                }.${date.getDate()}, ${date.getHours()}:${date.getMinutes()}`;
              }),
              datasets: medianPriceData,
            }}
            width={Dimensions.get('window').width}
            height={250}
            chartConfig={chartConfig}
            verticalLabelRotation={90}
            style={{ paddingBottom: 45 }}
          />
        </Block>
      </Block>
    );
  } else {
    return <SearchHeader />;
  }
};

export default Charts;
