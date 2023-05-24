<template>
  <div id="app">
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {}
  },
  created() {
    //页面准备加载
    //在模板渲染成html前调用，即通常初始化某些属性值，然后再渲染成视图。
  },
  computed: {
    //属性计算
    //computed 是计算属性。computed是在HTML DOM加载后马上执行的，如赋值；
  },
  mounted: {
    //页面加载完毕
    //mounted 是生命周期方法之一，会在对应生命周期时执行。mounted是vue中的一个钩子函数，一般在初始化页面完成后，再对dom节点进行相关操作。
  },
  watch: {
    //监听对象
    //watch 监听 是一个对象，键是要观察的数据，值可以是对应的回调函数，也可以是方法名，或者包含选项的对象，在工作中，我一般是用回调，观察某个数据的变化。
    //对于watched 属性 监听 需要自己手动去写监听的值 会大大的浪费一定性能去做监听这种事情 不像computed是自动的。
  },
  methods: {
    //事件方法
    //methods 是Vue实例对象上绑定的方法，供当前Vue组件作用域内使用，未调用不会执行。methods必须要有一定的触发条件才能执行，如点击事件
  },
}
</script>

<style lang="less">
html,
body,
h3,
p {
  margin: 0;
  padding: 0;
}
</style>
