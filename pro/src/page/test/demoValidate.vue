<!--组件-->
<template>
    <div class="validator-example">
        <div class="columns is-multiline">
            <div class="column is-12">
                <label class="label">邮箱:</label>
                <p class="control has-icon has-icon-right">
                    <input v-model="email" name="email" :class="{'input': true, 'is-danger': errors.has('email') }" type="text" data-vv-name="您的邮箱" placeholder="请输入邮箱">
                    <i v-show="errors.has('email')" class="fa fa-warning"></i>
                    <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
                </p>
            </div>
            <div class="column is-12">
                <label class="label">Name</label>
                <p class="control has-icon has-icon-right">
                    <input v-model="name" name="name" :class="{'input': true, 'is-danger': errors.has('name') }" type="text" placeholder="Name">
                    <i v-show="errors.has('name')" class="fa fa-warning"></i>
                    <span v-show="errors.has('name')" class="help is-danger">{{ errors.first('name') }}</span>
                </p>
            </div>
            <!-- <div class="column is-12">
                <label class="label">用户名</label>
                <p class="control has-icon has-icon-right">
                    <input name="username" v-validate="'required|alpha|min:3'" data-vv-as="用户名" :class="{'input': true, 'is-danger': allErrors.has('username') }" type="text" placeholder="用户名">
                    <i v-show="allErrors.has('username')" class="fa fa-warning"></i>
                    <span v-show="allErrors.has('username')" class="help is-danger">{{ allErrors.first('username') }}</span>
                </p>
            </div>
            <div class="column is-12">
                <label class="label">手机号</label>
                <p class="control has-icon has-icon-right">
                    <input name="telephone" v-validate="'required|mobile'" data-vv-as="手机号码" :class="{'input': true, 'is-danger': allErrors.has('telephone') }" type="text" placeholder="手机号">
                    <i v-show="allErrors.has('telephone')" class="fa fa-warning"></i>
                    <span v-show="allErrors.has('telephone')" class="help is-danger">{{ allErrors.first('telephone') }}</span>
                </p>
            </div>
            <div class="column is-12">
                <label class="label">密码</label>
                <p class="control has-icon has-icon-right">
                    <input name="pass" v-validate="'required|alpha|min:3'" data-vv-as="密码" :class="{'input': true, 'is-danger': allErrors.has('pass') }" type="text" placeholder="密码">
                    <i v-show="allErrors.has('pass')" class="fa fa-warning"></i>
                    <span v-show="allErrors.has('pass')" class="help is-danger">{{ allErrors.first('pass') }}</span>
                </p>
            </div> -->
            <div class="column is-12">
                <p class="control">
                    <button class="button is-primary" @click="validateForm" type="button" name="button">Validate All</button>
                    <button class="button is-danger" @click="clearErrors" type="button" name="button">Clear</button>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    import { Validator } from 'vee-validate';

    export default {
      name: 'validator-example',
      validator: null,
      data: () => ({
        email: '',
        name: '',
        errors: null
      }),
      watch: {
        email(value) {
          this.validator.validate('email', value);
        },
        name(value) {
          this.validator.validate('name', value);
        }
      },
      methods: {
        validateForm() {
            console.log("email:==>",this.email)
            console.log("name:==>",this.name)

            this.validator.validateAll({
                email: this.email,
                name: this.name
            }).then(() => {
          // eslint-disable-next-line
              console.log('From Submitted!');
            }).catch(() => {
              // eslint-disable-next-line
              console.log("失败了")
            });
        },
        clearErrors() {
          this.errors.clear();
        }
      },
      created() {
        this.validator = new Validator({
          email: 'required|email',
          name: 'required|alpha|min:3'
        });
        this.$set(this, 'errors', this.validator.errors);
      }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>