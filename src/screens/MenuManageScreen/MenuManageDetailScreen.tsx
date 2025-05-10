import React, {useState} from 'react';
import {Alert} from 'react-native';
import {RefreshControl, ScrollView} from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/Feather';

import {
  createProduct,
  updateProduct,
  addProductStock,
  minusProductStock,
} from '@/apis/Product';
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
  updateMenus: (updateFn: (prevMenus: MenuType[]) => MenuType[]) => void;
};
const MenuManageDetailScreen = ({menus, updateMenus}: Props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentMenu, setCurrentMenu] = useState<MenuType | null>(null);

  const {marketInfo} = useMarket();
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
    if (!marketInfo || !profile?.marketId) {
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

  const handleIncreaseStock = async (menuData: MenuType) => {
    const targetMenu = menus.find(menu => menu.id === menuData.id);
    if (!targetMenu) return;
    if (targetMenu.stock === 0) {
      const body: MenuType = {
        id: menuData.id,
        image: menuData.image,
        name: menuData.name,
        originPrice: Number(menuData.originPrice.toString().replace(/,/g, '')),
        discountPrice: Number(
          menuData.discountPrice.toString().replace(/,/g, ''),
        ),
        discountRate: menuData.discountRate,
        stock: 1,
        productStatus: 'IN_STOCK',
        tags: menuData.tags,
      };
      const res = await updateProduct(menuData.id, body);

      if (!res) {
        console.error('상품 수정 실패');
        Alert.alert('상품 수정 실패');
      } else {
        await refresh();
      }
      return;
    } else {
      const count = targetMenu.stock + 1;
      const success = await addProductStock(menuData.id);
      if (!success) {
        console.error('재고 증가 실패');
        Alert.alert('재고 증가 실패');
        return;
      } else {
        updateMenus((prevMenus: MenuType[]) =>
          prevMenus.map(menu =>
            menu.id === menuData.id ? {...menu, stock: count} : menu,
          ),
        );
      }
    }
  };

  const handleDecreaseStock = async (menuData: MenuType) => {
    const targetMenu = menus.find(menu => menu.id === menuData.id);
    if (!targetMenu) return;

    const count = targetMenu.stock - 1;
    if (count < 0) {
      Alert.alert('더 이상 재고를 차감할 수 없습니다.');
    } else if (count === 0) {
      const body: MenuType = {
        id: menuData.id,
        image: menuData.image,
        name: menuData.name,
        originPrice: Number(menuData.originPrice.toString().replace(/,/g, '')),
        discountPrice: Number(
          menuData.discountPrice.toString().replace(/,/g, ''),
        ),
        discountRate: menuData.discountRate,
        stock: 0,
        productStatus: 'OUT_OF_STOCK',
        tags: menuData.tags,
      };
      const res = await updateProduct(menuData.id, body);

      if (!res) {
        console.error('상품 수정 실패');
        Alert.alert('상품 수정 실패');
      } else {
        await refresh();
      }
      return;
    } else {
      const success = await minusProductStock(menuData.id);
      if (!success) {
        console.error('재고 차감 실패');
        Alert.alert('재고 차감 실패');
        return;
      } else {
        updateMenus((prevMenus: MenuType[]) =>
          prevMenus.map(menu =>
            menu.id === menuData.id ? {...menu, stock: count} : menu,
          ),
        );
      }
    }
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
          onIncreaseStock={() => handleIncreaseStock(menu)}
          onDecreaseStock={() => handleDecreaseStock(menu)}
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
