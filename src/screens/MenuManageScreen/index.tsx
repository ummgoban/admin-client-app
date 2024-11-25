import React, {useEffect, useState} from 'react';
import {Text} from 'react-native';

import MenuManageDetailScreen from './MenuManageDetailScreen';

import EmptyMarket from '@/components/common/EmptyMarket';
import NonRegister from '@/components/common/NonRegister';
import useMarket from '@/hooks/useMarket';
import useProduct from '@/hooks/useProduct';
import useProfile from '@/hooks/useProfile';
import {MenuType} from '@/types/ProductType';

const MenuManageScreen = () => {
  const {profile} = useProfile();
  const {products, fetch: fetchProduct} = useProduct();
  const {marketInfo} = useMarket();

  const [menus, setMenus] = useState<MenuType[]>([]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  useEffect(() => {
    if (products) {
      setMenus(products);
    }
  }, [products]);

  if (!products) {
    return <Text>메뉴 정보를 불러오는데 실패했습니다.</Text>;
  }

  if (!profile) {
    return <NonRegister />;
  }

  if (!marketInfo) {
    return <EmptyMarket />;
  }

  return <MenuManageDetailScreen menus={menus} updateMenus={setMenus} />;
};

export default MenuManageScreen;
