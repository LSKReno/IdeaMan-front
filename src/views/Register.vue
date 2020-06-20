<template>
  <div style="margin: 0 200px;">
    <h1>Register in seconds.</h1>
    <Form ref="registrationForm" style="margin-top: 60px" :model="registrationForm" label-position="right" :label-width="200">
      <FormItem label="用户名">
        <Input v-model="registrationForm.username" placeholder="在 Ideaman 整个平台中的唯一名字"></Input>
      </FormItem>
      <FormItem label="姓名" class="register-element">
        <Input v-model="registrationForm.name" placeholder="您在出版物中使用的名字；如果经常发表英文文献，可使用英文名"></Input>
      </FormItem>
      <FormItem label="密码" class="register-element">
        <Input type="password" v-model="registrationForm.password" placeholder="密码"></Input>
      </FormItem>
      <FormItem label="确认密码" class="register-element">
        <Input type="password" v-model="registrationForm.passwordConfirmed" placeholder="再次输入密码"></Input>
      </FormItem>
      <FormItem label="Email" class="register-element">
        <Input type="email" v-model="registrationForm.email" placeholder="请使用 .edu 等教育机构或 .com / .org 等研究机构"></Input>
      </FormItem>
      <FormItem label="手机号码" class="register-element">
        <Input v-model="registrationForm.phoneNumber" placeholder="您的手机号码">
          <Select v-model="registrationForm.phoneAreaCode" slot="prepend" style="min-width: 150px">
            <Option v-for="p in phoneAreaCodes" :key="p.code" :value="p.code">{{ p.name }}</Option>
          </Select>
        </Input>
      </FormItem>
      <FormItem label="短信验证码" class="register-element">
        <Input v-model="registrationForm.phoneNumberValidationCode" placeholder="6 位短信验证码">
          <Button slot="append">获取验证码</Button>
        </Input>
      </FormItem>
      <FormItem label="" class="register-element">
        <Button type="primary" @click="registerSubmit" class="register-element">确认注册</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
  export default {
    name: 'Register',
    data () {
      return {
        registrationForm: {
          username: '',
          name: '',
          password: '',
          passwordConfirmed: '',
          email: '',
          phoneNumber: '',
          phoneNumberValidationCode: '',
          phoneAreaCode: '+86',
        },
        phoneAreaCodes: [
          {
            name: 'China (+86)',
            code: '+86',
          },
          {
            name: 'United States (+1)',
            code: '+1',
          },
        ]
      }
    },
    methods: {
      registerSubmit() {
        this.$http.post('/auth/register', this.registrationForm).then(response => {
          this.$Message.success('注册成功。请在新打开的页面登录')
          this.$router.push({path: '/login'})
        }).catch(e => {
          this.$Message.error('注册失败：' + e)
          window.console.log(e)
        })
      }
    }
  };
</script>

<style scoped>
.register-element {
  margin-top: 18px;
}
</style>