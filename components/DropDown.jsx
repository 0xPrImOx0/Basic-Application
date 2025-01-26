import { View, Text } from "react-native";
import React from "react";
import { Picker } from "@react-native-picker/picker";

const DropDown = ({
  selectedValue,
  onValueChange,
  styles,
  dataList,
  noOfData,
  label,
  value,
}) => {
  return (
    <Picker
      selectedValue={selectedValue}
      onValueChange={onValueChange}
      style={styles}
    >
      {dataList ? (
        dataList.map((data, index) => (
          <Picker.Item key={index} label={data} value={data} />
        ))
      ) : noOfData > 0 ? (
        Array.from({ length: noOfData }, (_, index) => (
          <Picker.Item key={index} label={label[index]} value={value[index]} />
        ))
      ) : (
        <Picker.Item
          label={"No Data Displayed no/invalid 'noOfData' props received"}
          value={""}
        />
      )}
    </Picker>
  );
};

export default DropDown;
