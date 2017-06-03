
// 创建一个对象存储一系列我们接下来要写的 mutation 函数
export default {
    // TODO: 放置我们的状态变更函数
    UPDATE_TITLE(state, title) {
      console.log(title);
      state.headerTitle = title;
    },
    UPDATE_MENUSHOW(state) {
      state.menuShow = !state.menuShow;
    },
    UPDATE_LOADING(state, data) {
      state.loadingShow = data;
    },
    UPDATE_NEWS(state) {
      state.news = 0;
    },
    MENU_FN(state) {
      state.menu += "xx";
    }
}