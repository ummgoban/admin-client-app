import React, {useState} from 'react';
import {Alert} from 'react-native';
import {RefreshControl, ScrollView} from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/AntDesign';

import {createProduct, updateProduct} from '@/apis/Product';
import Menu from '@/components/menu/Menu';
import MenuModal from '@/components/menu/MenuModal';
import useMarket from '@/hooks/useMarket';
import useProduct from '@/hooks/useProduct';
import useProfile from '@/hooks/useProfile';
import usePullDownRefresh from '@/hooks/usePullDownRefresh';
import {MenuType, TagType} from '@/types/ProductType';

import S from './MenuManageDetailScreen.style';

type Props = {
  menus: MenuType[];
  updateMenus: (Menus: MenuType[]) => void;
};
const MenuManageDetailScreen = ({menus, updateMenus}: Props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentMenu, setCurrentMenu] = useState<MenuType | null>(null);

  const {market} = useMarket();
  const {profile} = useProfile();
  const {refresh} = useProduct();

  const {refreshing, onRefresh} = usePullDownRefresh(refresh);

  const handleAddProduct = () => {
    setCurrentMenu(null);
    setModalVisible(true);
  };

  const handleEditProduct = (menu: MenuType) => {
    setCurrentMenu(menu);
    setModalVisible(true);
  };

  const handleSaveMenu = async (menuData: MenuType) => {
    if (!market || !market.length || !profile?.marketId) {
      console.debug('MemuManageDetailScreen', '마켓 정보가 없습니다.');
      return;
    }

    const updatedMenus = menus.map(menu => {
      if (menu.id === menuData.id) {
        return menuData;
      }
      return menu;
    });

    if (!menus.find(menu => menu.id === menuData.id)) {
      updatedMenus.push(menuData);
    }

    const body = {
      id: menuData.id,
      image: menuData.image,
      name: menuData.name,
      originPrice: Number(menuData.originPrice.toString().replace(/,/g, '')),
      discountPrice: Number(
        menuData.discountPrice.toString().replace(/,/g, ''),
      ),
      discountRate: menuData.discountRate,
      stock: menuData.stock,
      productStatus: menuData.productStatus,
      tags: menuData.tags,
    };
    const res = currentMenu
      ? await updateProduct(currentMenu.id, body)
      : await createProduct(profile?.marketId, body);

    if (!res) {
      console.error('상품 추가 실패');
      Alert.alert('상품 추가 실패');
    } else {
      await refresh();
    }

    setCurrentMenu(null);
    setModalVisible(false);
  };
  const handleModalClose = () => {
    setCurrentMenu(null);
    setModalVisible(false);
  };

  const handleIncreaseStock = (menuId: number) => {
    const updatedMenus = menus.map(menu => {
      if (menu.id === menuId) {
        return {...menu, stock: menu.stock + 1};
      }
      return menu;
    });
    updateMenus(updatedMenus);
  };

  const handleDecreaseStock = (menuId: number) => {
    const updatedMenus = menus.map(menu => {
      if (menu.id === menuId && menu.stock > 0) {
        return {...menu, stock: menu.stock - 1};
      }
      return menu;
    });
    updateMenus(updatedMenus);
  };

  const getPresetTags = (marketMenus: MenuType[]): TagType[] => {
    const uniqueTags = new Map<number, TagType>();

    marketMenus.forEach(menu => {
      menu.tags.forEach(tag => {
        if (!uniqueTags.has(tag.id)) {
          uniqueTags.set(tag.id, tag);
        }
      });
    });
    return Array.from(uniqueTags.values());
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
      }>
      {menus.map(menu => (
        <Menu
          key={menu.id}
          menu={menu}
          onEdit={() => handleEditProduct(menu)}
          onIncreaseStock={() => handleIncreaseStock(menu.id)}
          onDecreaseStock={() => handleDecreaseStock(menu.id)}
        />
      ))}
      <S.AddProductView>
        <S.AddButton onPress={handleAddProduct}>
          <Icon name="plus" size={16} color="rgba(255, 255, 255, 1)" />
          <S.AddButtonText>상품 추가하기</S.AddButtonText>
        </S.AddButton>
      </S.AddProductView>

      <MenuModal
        isVisible={modalVisible}
        onClose={handleModalClose}
        onSave={handleSaveMenu}
        initialData={currentMenu}
        presetTags={getPresetTags(menus)}
      />
    </ScrollView>
  );
};

export default MenuManageDetailScreen;
