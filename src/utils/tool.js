// 获取显示名字（value => label）
export const displayName = (value, arr) => {
 if (arr && arr.length > 0) {
   const item = arr.find((v) => v.value == value);
   return item ? item.label : "";
 }
 return "";
};