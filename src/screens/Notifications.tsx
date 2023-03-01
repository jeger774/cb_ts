import React, { useState } from 'react';
import { useNavigation, useNavigationState } from '@react-navigation/core';
import { Block, Button, Image, Text, Notification } from '../components';
import { useData, useTheme } from '../hooks';
import { useSetRecoilState } from 'recoil';
import { activeScreen } from '../states/ScreenState';

const Notifications = () => {
  const navigation = useNavigation();
  const { assets, colors, sizes } = useTheme();
  const setActiveRoute = useSetRecoilState(activeScreen);
  const previousRoute = useNavigationState(
    (state) => state.routes[state.routes.length - 2]?.name,
  );
  const { notifications } = useData();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [notif, setNotif] = useState(notifications);

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
              Notifications
            </Text>
          </Block>
        </Block>
      </Block>
      <Block
        scroll
        flex={1}
        paddingHorizontal={sizes.padding}
        marginTop={-550}
        showsVerticalScrollIndicator={false}>
        <Block justify="space-between" marginTop={sizes.sm}>
          {notif?.map((notifItem) => (
            <Notification {...notifItem} key={`card-${notifItem?.id}`} />
          ))}
        </Block>
      </Block>
    </Block>
  );
};

export default Notifications;
