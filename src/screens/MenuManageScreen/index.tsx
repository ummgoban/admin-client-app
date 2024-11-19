import {Text} from 'react-native';

import React, {useEffect, useState} from 'react';
import MenuManageDetailScreen from './MenuManageDetailScreen';

import useMarket from '@/hooks/useMarket';
import useProduct from '@/hooks/useProduct';
import {MenuType} from '@/types/ProductType';
import useProfile from '@/hooks/useProfile';

const MenuManageScreen = () => {
  const {fetch: fetchMarket} = useMarket();
  const {products, fetch: fetchProduct} = useProduct();
  const {fetch: fetchProfile} = useProfile();

  const [menus, setMenus] = useState<MenuType[]>([]);

  useEffect(() => {
    fetchMarket();
  }, [fetchMarket]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  useEffect(() => {
    if (products) {
      setMenus(products);
    }
  }, [products]);

  if (!products) {
    return <Text>메뉴 정보를 불러오는데 실패했습니다.</Text>;
  }

  return <MenuManageDetailScreen menus={menus} updateMenus={setMenus} />;
};

export default MenuManageScreen;
