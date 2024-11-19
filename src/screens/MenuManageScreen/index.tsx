import {Alert, Text} from 'react-native';

import {useState, useEffect} from 'react';

import React from 'react';
import MenuManageDetailScreen from './MenuManageDetailScreenScreen';
import {MenuType} from '@/types/MenuType';
import {getMenus, getTags} from '@/apis/Menu';
import {TagType} from '@/types/TagType';
const MenuManageScreen = () => {
  const [menus, setMenus] = useState<MenuType[] | null>([]);
  const [tags, setTags] = useState<TagType[] | null>([]);
  useEffect(() => {
    const fetchMenus = async () => {
      const res = await getMenus();
      if (!res) {
        Alert.alert('메뉴 정보를 불러오는데 실패했습니다.');
        return;
      }
      setMenus(res);
    };
    const fetchTags = async () => {
      const res = await getTags();
      if (!res) {
        Alert.alert('메뉴 정보를 불러오는데 실패했습니다.');
        return;
      }
      setTags(res);
    };
    fetchMenus();
    fetchTags();
  }, []);

  if (!menus || !tags) {
    return <Text>메뉴 정보를 불러오는데 실패했습니다.</Text>;
  }

  return (
    <MenuManageDetailScreen menus={menus} tags={tags} updateMenus={setMenus} />
  );
};

export default MenuManageScreen;
