import React, {useState} from 'react';
import S from './MenuManageDetailScreen.style';
import Menu from '@/components/menu/Menu';
import {MenuType} from '@/types/MenuType';
import {ScrollView} from 'react-native-gesture-handler';
import MenuModal from '@/components/menu/MenuModal';

type Props = {
  menus: MenuType[];
  updateMenus: (Menus: MenuType[]) => void;
};
const MenuManageDetailScreen = ({menus, updateMenus}: Props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentMenu, setCurrentMenu] = useState<MenuType | null>(null);

  const handleAddProduct = () => {
    setCurrentMenu(null);
    setModalVisible(true);
  };

  const handleEditProduct = (menu: MenuType) => {
    setCurrentMenu(menu);
    setModalVisible(true);
  };
  const handleSaveMenu = (menuData: MenuType) => {
    const updatedMenus = menus.map(menu => {
      if (menu.id === menuData.id) {
        return menuData;
      }
      return menu;
    });

    if (!menus.find(menu => menu.id === menuData.id)) {
      updatedMenus.push(menuData);
    }
    updateMenus(updatedMenus);
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
