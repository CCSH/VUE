import Vue from 'vue'
//全局方法
Vue.mixin({
    methods: {
        // 获取显示名字（value => label）
        displayName(value, arr) {
          if (arr && arr.length > 0) {
            const item = arr.find((v) => v.value == value);
            return item ? item.label : value
          }
          return value;
        }
    }
})