<template>
  <div class="ivu-layout">
    <Layout>
      <Header class="header-home">
        <Row>
          <Col span="18">
            <Menu mode="horizontal" theme="dark" @on-select="selectMenu">
              <div class="nav-left">IdeaMan</div>
              <MenuItem name="/">
                <Icon type="ios-paper" />信息流
              </MenuItem>
              <MenuItem name="/mylibrary">
                <Icon type="ios-paper" />我保存的文献
              </MenuItem>
              <MenuItem name="/about">
                <Icon type="ios-paper" />关于本站
              </MenuItem>
            </Menu>
          </Col>
          <Col span="6">
            <Menu
              mode="horizontal"
              theme="dark"
              style="position: absolute; right: 0"
              @on-select="selectMenu"
            >
              <MenuItem name="/login" v-if="!isAuthorized">
                <Icon type="md-log-in" />登录
              </MenuItem>
              <MenuItem name="/register" v-if="!isAuthorized">
                <Icon type="md-contact" />注册
              </MenuItem>
              <Submenu name="3" v-if="isAuthorized">
                <template slot="title">
                  <Icon type="md-person" />
                  {{ currentName }}
                </template>
                <MenuItem name="/myprofile">
                  <Icon type="md-create">编辑信息</Icon>
                </MenuItem>
                <MenuItem name="/settings">
                  <Icon type="md-settings" />账户设置
                </MenuItem>
                <Divider />
                <MenuItem name="/logout">
                  <Icon type="md-log-out" />退出
                </MenuItem>
              </Submenu>
            </Menu>
          </Col>
        </Row>
      </Header>
      <Content style="padding: 20px 50px 20px 50px;">
        <router-view></router-view>
      </Content>
      <Footer style="display:flex;justify-content:center;align-items:center;">
        自豪地采用
        <a>
          <i>LibRec 3.0</i>
        </a>
        ： A leading Java-written recommender system library open-sourced under GPLv3.
      </Footer>
    </Layout>
  </div>
</template>

<script>
export default {
  name: "app",
  beforeCreate() {
    let userinfo = JSON.parse(window.localStorage.getItem("ideaman_info"));
    let ideamanToken = window.localStorage.getItem("ideaman_token");

    this.$store.commit("authorize", {
      name: userinfo.name,
      username: userinfo.username,
      avatar: userinfo.avatar,
      token: ideamanToken,
    });
  },
  data() {
    return {
      //
    };
  },
  computed: {
    isAuthorized() {
      return this.$store.getters.isAuthorized;
    },
    currentName() {
      return this.$store.state.auth.name || "(Name Unknown)";
    },
  },
  methods: {
    selectMenu(name) {
      if (name === "/logout") {
        this.logout();
      } else {
        this.$router.push({ path: name });
      }
    },

    logout() {
      this.$store.commit("removeAuthorization", {});
      window.localStorage.removeItem("ideaman_info");
      window.localStorage.removeItem("ideaman_token");
      // window.localStorage.removeItem("auth_name");
      // window.localStorage.removeItem("auth_username");
      // window.localStorage.removeItem("auth_token");
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.header-home {
  color: white;
  font-size: 22px;
}

.nav-left {
  float: left;
  position: relative;
  color: white;
  margin-right: 30px;
}
</style>
