<!--组件-->
<template>
  <div class="demo">
    <label>
      用户名：
      <input v-validate="'required|alpha_dash'"  type="text" name="username" />
      <span v-show="allErrors.has('username')" class="help is-danger">{{ allErrors.first('username') }}</span>
    </label>
    <label>
      邮箱：
      <input v-validate="'required|email'"  type="text" name="email">
      <span v-show="allErrors.has('email')" class="help is-danger">{{ allErrors.first('email') }}</span>
    </label>
    <label>
      性别：
      <input type="text" />
    </label>
    <label>
      银行卡：
      <input type="text"  v-validate="'required|verify_coupon'"  name="bankCode"/>
      <span v-show="allErrors.has('bankCode')" class="help is-danger">{{ allErrors.first('bankCode') }}</span>
    </label>
    <label>
      手机号：
      <input v-validate="'required|mobile'"  type="text" name="mobile" data-vv-as="手机号">
      <span v-show="allErrors.has('mobile')" class="help is-danger">{{ allErrors.first('mobile') }}</span>
    </label>
    <label>
      身份证：
      <input type="text" />
    </label>
        <label>
      密码：
      <input type="password" name="password" data-vv-as=" "/>
    </label>
        <label>
      确认密码：
      <input type="password" v-validate="'confirmed:password'" name="configPassword"  data-vv-as="Address Line 1"/>
    </label>
    <span v-show="allErrors.has('configPassword')" class="help is-danger">{{ allErrors.first('configPassword') }}</span>

    <div> 
        <button class="btn" @click="onSubmit">提交</button>
    </div>
  </div>
</template>

<script>
    import { Validator } from 'vee-validate';

    export default {
      validator: null,
      data() {
        return {
            errorBag1: null,
        }
      },
      methods: {
          onSubmit(){
              console.log(this.allErrors.all());
              console.log("呵呵哒");
          }
      },
      created() {
        this.validator = new Validator({
            email: 'required|email',
            name: 'required|alpha|min:3'
        });
        this.$set(this, 'errorBag1', this.validator.errors);
      },
      mounted(){
        this.validator.validate('email','foobar.com').then((res) => {
           console.log("匹配这个email规则看看",res);
           console.log(this.errorBag1.all());
        });
        this.validator.validate('name','aacc').then((res) => {
           console.log("匹配这个name规则看看",res);
        });
        
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>