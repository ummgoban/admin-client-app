import {Alert, Text} from 'react-native';

import {useEffect, useState} from 'react';

import React from 'react';
import MenuManageDetailScreen from './MenuManageDetailScreen';

import {getProducts} from '@/apis/Product';
import useMarket from '@/hooks/useMarket';
import {MenuType} from '@/types/ProductType';

const MenuManageScreen = () => {
  const [menus, setMenus] = useState<MenuType[] | null>([]);
  const {market} = useMarket();

  useEffect(() => {
    const fetchMenus = async () => {
      if (!market || !market.length) {
        return;
      }
      const res = await getProducts(market[0].id);
      if (!res) {
        Alert.alert('메뉴 정보를 불러오는데 실패했습니다.');
        return;
      }
      setMenus(res);
    };

    fetchMenus();
  }, [market]);

  if (!menus) {
    return <Text>메뉴 정보를 불러오는데 실패했습니다.</Text>;
  }

  return <MenuManageDetailScreen menus={menus} updateMenus={setMenus} />;
};

export default MenuManageScreen;
