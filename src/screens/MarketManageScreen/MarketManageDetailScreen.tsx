import React, {useState} from 'react';
import {View} from 'react-native';
import S from './MarketManageScreen.style';
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
    console.log('저장된 데이터:', menuData);

    const updatedMenus = (prevMenus: MenuType[]) => {
      const existingMenuIndex = prevMenus.findIndex(
        (menu: MenuType) => menu.id === menuData.id,
      );
      if (existingMenuIndex !== -1) {
        const newMenus = [...prevMenus];
        newMenus[existingMenuIndex] = menuData;
        return newMenus;
      } else {
        return [...prevMenus, menuData];
      }
    };
    updateMenus(updatedMenus(menus));

    setCurrentMenu(null);
    setModalVisible(false);
  };

  const handleModalClose = () => {
    setCurrentMenu(null);
    setModalVisible(false);
  };
  return (
    <View>
      <S.MainText>개별상품</S.MainText>
      <S.AddProductView>
        <S.AddProductWrapper onPress={handleAddProduct}>
          <S.AddText>+ 상품 추가하기 </S.AddText>
        </S.AddProductWrapper>
      </S.AddProductView>

      <ScrollView>
        {menus.map(menu => (
          <Menu
            key={menu.id}
            id={menu.id}
            name={menu.name}
            image={menu.image}
            discountRate={Math.round(
              ((menu.originalPrice - menu.discountPrice) * 100) /
                menu.originalPrice,
            )}
            originalPrice={menu.originalPrice}
            discountPrice={menu.discountPrice}
            status={menu.status}
            stock={menu.stock}
            onEdit={() => handleEditProduct(menu)}
          />
        ))}
      </ScrollView>
      <MenuModal
        isVisible={modalVisible}
        onClose={handleModalClose}
        onSave={handleSaveMenu}
        initialData={currentMenu}
      />
    </View>
  );
};

export default MenuManageDetailScreen;
