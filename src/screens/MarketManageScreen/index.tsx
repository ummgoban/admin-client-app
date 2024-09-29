import React from 'react';
import {View} from 'react-native';
import S from './MarketManageScreen.style';
import Menu from '@/components/menu/Menu';
import {MenuType} from '@/types/MenuType';
import {ScrollView} from 'react-native-gesture-handler';
const MenuManageScreen = () => {
  const dummyMenuData: MenuType[] = [
    {
      id: 1,
      name: '김치',
      image: 'https://legacy.reactjs.org/logo-og.png',
      discountRate: 61,
      originalPrice: 14900,
      discountPrice: 5900,
    },
    {
      id: 2,
      name: '간장게장',
      image: 'https://legacy.reactjs.org/logo-og.png',
      discountRate: 61,
      originalPrice: 14900,
      discountPrice: 5900,
      status: '숨김',
    },
    {
      id: 3,
      name: '계란찜',
      image: 'https://legacy.reactjs.org/logo-og.png',
      discountRate: 61,
      originalPrice: 14900,
      discountPrice: 5900,
      status: '품절',
    },
  ];
  return (
    <View>
      <S.MainText>개별상품</S.MainText>
      <S.AddProductView>
        <S.AddProductWrapper>
          <S.AddText>+ 상품 추가하기 </S.AddText>
        </S.AddProductWrapper>
      </S.AddProductView>

      <ScrollView>
        {dummyMenuData.map(menu => (
          <Menu
            key={menu.id}
            id={menu.id}
            name={menu.name}
            image={menu.image}
            discountRate={menu.discountRate}
            originalPrice={menu.originalPrice}
            discountPrice={menu.discountPrice}
            status={menu.status}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default MenuManageScreen;
