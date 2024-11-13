import React, {useState} from 'react';
import {Alert} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

import {createProduct, updateProduct} from '@/apis/Product';
import Menu from '@/components/menu/Menu';
import MenuModal from '@/components/menu/MenuModal';
import useMarket from '@/hooks/useMarket';

import S from './MenuManageDetailScreen.style';
import {MenuType} from '@/types/ProductType';

type Props = {
  menus: MenuType[];
  updateMenus: (Menus: MenuType[]) => void;
};
const MenuManageDetailScreen = ({menus, updateMenus}: Props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentMenu, setCurrentMenu] = useState<MenuType | null>(null);

  const marketList = useMarket();

  const handleAddProduct = () => {
    setCurrentMenu(null);
    setModalVisible(true);
  };

  const handleEditProduct = (menu: MenuType) => {
    setCurrentMenu(menu);
    setModalVisible(true);
  };

  const handleSaveMenu = async (menuData: MenuType) => {
    if (!marketList || !marketList.length) {
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
      image: menuData.image,
      name: menuData.name,
      originPrice: Number(menuData.originPrice.toString().replace(/,/g, '')),
      discountPrice: Number(
        menuData.discountPrice.toString().replace(/,/g, ''),
      ),
      discountRate: menuData.discountRate,
      stock: menuData.stock,
      status: menuData.status,
    };

    const res = currentMenu
      ? await updateProduct(currentMenu.id, body)
      : await createProduct(marketList[0].id, body);

    if (!res) {
      console.error('상품 추가 실패');
      Alert.alert('상품 추가 실패');
      return;
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

  return (
    <ScrollView>
      <S.MainText>개별상품</S.MainText>
      <S.AddProductView>
        <S.AddProductWrapper onPress={handleAddProduct}>
          <S.AddText>+ 상품 추가하기 </S.AddText>
        </S.AddProductWrapper>
      </S.AddProductView>

      {menus.map(menu => (
        <Menu
          key={menu.id}
          menu={menu}
          onEdit={() => handleEditProduct(menu)}
          onIncreaseStock={() => handleIncreaseStock(menu.id)}
          onDecreaseStock={() => handleDecreaseStock(menu.id)}
        />
      ))}

      <MenuModal
        isVisible={modalVisible}
        onClose={handleModalClose}
        onSave={handleSaveMenu}
        initialData={currentMenu}
      />
    </ScrollView>
  );
};

export default MenuManageDetailScreen;
