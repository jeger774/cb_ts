import React, { useState } from 'react';
import { Platform, FlatList } from 'react-native';
import { useNavigation, useNavigationState } from '@react-navigation/core';
import { Block, Button, Image, Text, Modal } from '../components';
import { useTheme } from '../hooks';
import { useSetRecoilState } from 'recoil';
import { activeScreen } from '../states/ScreenState';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const isAndroid = Platform.OS === 'android';

const Settings = () => {
  const navigation = useNavigation();
  const { assets, colors, sizes } = useTheme();
  const [showRegionModal, setRegionModal] = useState(false);
  const [showRealmModal, setRealmModal] = useState(false);
  const [showFactionModal, setFactionModal] = useState(false);
  const [region, setRegion] = useState<string>('EU');
  const [realm, setRealm] = useState<string>('Thekal');
  const [faction, setFaction] = useState<string>('Alliance');
  const setActiveRoute = useSetRecoilState(activeScreen);
  const previousRoute = useNavigationState(
    (state) => state.routes[state.routes.length - 2]?.name,
  );

  return (
    <Block safe marginTop={sizes.md}>
      <Block>
        <Block flex={0}>
          <Button
            row
            flex={1}
            justify="flex-start"
            onPress={() => {
              setActiveRoute(previousRoute);
              navigation.goBack();
            }}>
            <Image
              radius={0}
              width={10}
              height={18}
              marginLeft={sizes.s}
              color={colors.white}
              source={assets.arrow}
              transform={[{ rotate: '180deg' }]}
            />
            <Text p white marginLeft={sizes.s}>
              {previousRoute}
            </Text>
          </Button>
          <Block flex={0} align="center">
            <Text h5 center white>
              {'Settings'}
            </Text>
          </Block>
        </Block>
      </Block>

      {/* Region selection */}
      <Block
        scroll
        flex={1}
        marginTop={-550}
        marginLeft={sizes.m}
        marginRight={sizes.m}
        showsVerticalScrollIndicator={false}>
        <Text
          white
          bold
          transform="uppercase"
          paddingBottom={sizes.s}
          marginLeft={sizes.s}>
          Region:
        </Text>
        <Button
          flex={1}
          row
          color={colors.card}
          radius={10}
          onPress={() => setRegionModal(true)}>
          <Block
            row
            align="center"
            justify="space-between"
            paddingHorizontal={sizes.sm}>
            <Text white bold transform="uppercase" marginRight={sizes.sm}>
              {region}
            </Text>
            <Image
              source={assets.arrow}
              color={colors.white}
              transform={[{ rotate: '90deg' }]}
            />
          </Block>
        </Button>
        <Modal
          visible={showRegionModal}
          onRequestClose={() => setRegionModal(false)}>
          <FlatList
            keyExtractor={(index) => `${index}`}
            data={['EU', 'US', 'KR', 'TW']}
            renderItem={({ item }) => (
              <Button
                marginBottom={sizes.sm}
                onPress={() => {
                  setRegion(item);
                  setRegionModal(false);
                }}>
                <Text p white semibold transform="uppercase">
                  {item}
                </Text>
              </Button>
            )}
          />
        </Modal>

        {/* Realm selection */}
        <Text
          white
          bold
          transform="uppercase"
          paddingBottom={sizes.s}
          marginLeft={sizes.s}
          paddingTop={sizes.m}>
          Realm:
        </Text>
        <Button
          flex={1}
          row
          color={colors.card}
          radius={10}
          onPress={() => setRealmModal(true)}>
          <Block
            row
            align="center"
            justify="space-between"
            paddingHorizontal={sizes.sm}>
            <Text white bold transform="uppercase" marginRight={sizes.sm}>
              {realm}
            </Text>
            <Image
              source={assets.arrow}
              color={colors.white}
              transform={[{ rotate: '90deg' }]}
            />
          </Block>
        </Button>
        <Modal
          visible={showRealmModal}
          onRequestClose={() => setRealmModal(false)}>
          <FlatList
            keyExtractor={(index) => `${index}`}
            data={['Thekal', 'Golemagg', 'Azshara', 'MirageRaceway', 'Jindo']}
            renderItem={({ item }) => (
              <Button
                marginBottom={sizes.sm}
                onPress={() => {
                  setRealm(item);
                  setRealmModal(false);
                }}>
                <Text p white semibold transform="uppercase">
                  {item}
                </Text>
              </Button>
            )}
          />
        </Modal>

        {/* Realm selection */}
        <Text
          white
          bold
          transform="uppercase"
          paddingBottom={sizes.s}
          marginLeft={sizes.s}
          paddingTop={sizes.m}>
          Faction:
        </Text>
        <Button
          flex={1}
          row
          color={colors.card}
          radius={10}
          onPress={() => setFactionModal(true)}>
          <Block
            row
            align="center"
            justify="space-between"
            paddingHorizontal={sizes.sm}>
            <Text white bold transform="uppercase" marginRight={sizes.sm}>
              {faction}
            </Text>
            <Image
              source={assets.arrow}
              color={colors.white}
              transform={[{ rotate: '90deg' }]}
            />
          </Block>
        </Button>
        <Modal
          visible={showFactionModal}
          onRequestClose={() => setFactionModal(false)}>
          <FlatList
            keyExtractor={(index) => `${index}`}
            data={['Alliance', 'Horde']}
            renderItem={({ item }) => (
              <Button
                marginBottom={sizes.sm}
                onPress={() => {
                  setFaction(item);
                  setFactionModal(false);
                }}>
                <Text p white semibold transform="uppercase">
                  {item}
                </Text>
              </Button>
            )}
          />
        </Modal>
      </Block>
    </Block>
  );
};

export default Settings;
