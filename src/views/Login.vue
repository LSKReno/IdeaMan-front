<template>
  <div style="padding-top: 10px">
    <Row>
      <Col span="12">
        <h1>IdeaMan.</h1>
        <h3>
          A community to build research network, finding your potential
          research opportunities.
        </h3>
      </Col>
      <Col span="12">
        <div class="container">
          <div class="login-box">
            <div>
              <Input
                placeholder="用户名（不是姓名）"
                v-model="formLogin.usernameOrEmail"
                class="login-form-element"
              >
                <Icon type="ios-contact" slot="prefix" />
              </Input>
            </div>
            <div class="login-input">
              <Input placeholder="密码" class="login-form-element" v-model="formLogin.password">
                <Icon type="ios-key" slot="prefix" />
              </Input>
            </div>
            <div class="login-input">
              <Button type="info" class="login-form-element" @click="login">登录</Button>
            </div>
            <div class="login-input">
              <Row class="login-form-element">
                <Col span="12">
                  <div>
                    <router-link to="/register">新用户</router-link>
                  </div>
                </Col>
                <Col span="12">
                  <div style="text-align: right">
                    <router-link to="/forgotpassword">忘记密码</router-link>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  </div>
</template>

<script>
import { login as LoginApi } from "../api/sign";

export default {
  name: "Login",
  data() {
    return {
      formLogin: {
        usernameOrEmail: "",
        password: "",
      },
    };
  },
  methods: {
    async login() {
      let res = await LoginApi({
        username: this.formLogin.usernameOrEmail,
        password: this.formLogin.password,
      });
      if (res.code == 0) {
        // localStorage 存储
        window.localStorage.setItem(
          "ideaman_info",
          JSON.stringify(res.data[0])
        );

        let userinfo = JSON.parse(window.localStorage.getItem("ideaman_info"));
        let ideamanToken = window.localStorage.getItem("ideaman_token");

        this.$store.commit("authorize", {
          name: userinfo.name,
          username: userinfo.username,
          avatar: userinfo.avatar,
          token: ideamanToken,
        });
        this.$Message.success("登录成功。");
        this.$router.push({ path: "/" });
      }

      // localStorage 存储
      // window.localStorage.setItem('auth_name', "Reno")
      // window.localStorage.setItem('auth_username', "lskreno")
      // window.localStorage.setItem('auth_token', "ihh65sDGv6fsfas13c5as13.as1f3czx1c65a5s31as.asf4c35ds1v321a3d1c")

      // this.$http.post('/auth/login', {
      //   username: this.formLogin.usernameOrEmail,
      //   password: this.formLogin.password,
      // }).then(response => {
      //   this.$store.commit('authorize', {
      //     name: response.data.name,
      //     username: response.data.username,
      //     token: response.data.token,
      //   })

      //   // localStorage 存储
      //   window.localStorage.setItem('auth_name', response.data.name)
      //   window.localStorage.setItem('auth_username', response.data.username)
      //   window.localStorage.setItem('auth_token', response.data.token)

      //   this.$Message.success('登录成功。')
      //   this.$router.push({path: '/'})
      // }).catch(e => {
      //   window.console.log(e)
      //   this.$Message.error('登录失败：' + e)
      // })
    },
  },
};
</script>

<style scoped>
.container {
  float: left;
  position: relative;
  left: 45%;
}

.login-box {
  position: relative;
  left: -45%;
}

.login-input {
  margin-top: 18px;
}

.login-form-element {
  width: 200%;
}
</style>