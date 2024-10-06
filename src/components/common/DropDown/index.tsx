import React, {useState, useEffect} from 'react';
import DropDownSelector from './DropDownSelector';
import {TagType} from '@/types/TagType';
import {getTagHistory} from '@/apis/Tag';

const DropDownSelectorComponent = () => {
  // TODO: 해당 로직 메뉴 추가 페이지로 이동
  const [selectedOption, setSelectedOption] = useState<TagType[]>([]);
  const [dropDownOption, setDropDownOption] = useState<TagType[]>([]);

  useEffect(() => {
    const fetchTags = async () => {
      const data = await getTagHistory();
      if (data) {
        setDropDownOption(data);
      }
    };
    fetchTags();
  }, []);

  const handleDrowDownOption = (newOptionName: string) => {
    const isOptionSelected = selectedOption.some(
      option => option.name === newOptionName,
    );
    const isOptionDropDown = dropDownOption.find(
      option => option.name === newOptionName,
    );
    if (!isOptionSelected) {
      let newOption: TagType;
      if (isOptionDropDown) {
        newOption = isOptionDropDown;
      } else {
        // TODO: api 호출 이후 setState api response로 변경
        const newId = Math.max(...dropDownOption.map(option => option.id)) + 1;
        newOption = {id: newId, name: newOptionName};
        setDropDownOption(prev => [...prev, newOption]);
      }
      setSelectedOption(prev => [...prev, newOption]);
    }
  };
  return (
    <DropDownSelector
      values={selectedOption}
      options={dropDownOption}
      onChange={handleDrowDownOption}
      placeholder="반찬 태그 선택 및 추가"
    />
  );
};

export default DropDownSelectorComponent;
