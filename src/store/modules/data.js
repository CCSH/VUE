const state = {
  //属性
  data: null
}

const mutations = {
  //改变
  hanldeData(state, val) {
    state.data = val
  }
}

const actions = {
  //事件
  actionData({ commit }){
    setTimeout(() => {
      // 调用commit方法来提交mutation
      commit('hanldeData', {"name":'ccsh'})
    }, 1000);
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
