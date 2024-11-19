import {Text} from 'react-native';

import {useEffect, useState} from 'react';

import React from 'react';
import MenuManageDetailScreen from './MenuManageDetailScreen';

import useMarket from '@/hooks/useMarket';
import useProduct from '@/hooks/useProduct';
import {MenuType} from '@/types/ProductType';

const MenuManageScreen = () => {
  const {market, fetch: fetchMarket} = useMarket();
  const {products, fetch: fetchProduct} = useProduct();

  const [menus, setMenus] = useState<MenuType[]>([]);

  useEffect(() => {
    fetchMarket();
  }, [fetchMarket]);

  useEffect(() => {
    if (market && market.length) {
      fetchProduct(market[0].id);
    }
  }, [fetchProduct, market]);

  useEffect(() => {
    if (products) {
      setMenus(products);
    }
  }, [products]);

  if (!products) {
    return <Text>메뉴 정보를 불러오는데 실패했습니다.</Text>;
  }

  return (
    <MenuManageDetailScreen menus={menus} tags={tags} updateMenus={setMenus} />
  );
};

export default MenuManageScreen;
