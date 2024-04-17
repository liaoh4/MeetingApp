<script >

import axios from "axios";

const url = 'http://localhost'
export default{
  name:'Register',
  data: function(){
    return {
      email:'',
      password:'',
      confirmPassword:''

    }
  },

  methods:{
    registerUser: function(){
      if(this.password!==this.confirmPassword){
        alert('Password is not consistent！');
        return;
      }
      console.log('Registering...');
      console.log(this.email);
      console.log(this.password);

      axios.post(url + ':3000/user/register',{email: this.email, password: this.password})
          .then(response => {
            console.log('user created !', response.data);
            alert('user created');
            this.$router.push('/user/login');
          })
          .catch(error =>{
            console.error('failed', error);
          });

    },



  }
}

</script>

<template>
  <div class="form-container">
  <form @submit.prevent="registerUser">
    <table>
      <tr>
        <td>
          <label for="email">Email:</label>
        </td>
        <td>
          <input v-model= "email" type="email" id="email" name="email">
        </td>
      </tr>
      <tr>

      </tr>
      <tr>
        <td>
          <label for="password">Password:</label>
        </td>
        <td>
          <input v-model ="password" type="password" id="password" name="password">
        </td>
      </tr>
      <tr>
        <td>
          <label for="confirmPassword">Confirm Password:</label>
        </td>
        <td>
          <input v-model ="this.confirmPassword" type="password" id="confirmPassword" name="confirmPassword">
        </td>
      </tr>

      <tr>

      </tr>
      <tr>
        <td>
          <button type="submit">Register</button>
        </td>

      </tr>
    </table>
  </form>
  </div>
</template>

<style scoped>
.form-container {
  width: 300px; /* 设置表单容器的宽度 */
  margin: 0 auto; /* 设置左右边距为 auto，实现水平居中 */
  margin-top: 50px;
}

table {
  border-collapse: separate; /* 启用独立边框模型 */
  border-spacing: 10px; /* 设置行间距为10像素 */
}

button{
  padding: 8px 15px; /* 设置内边距 */
  height:30px;
  border: none; /* 移除边框 */
  border-radius: 10px; /* 设置圆角 */
  background-color: #333333; /* 设置背景颜色 */
  color: white; /* 设置文字颜色 */
  cursor: pointer; /* 设置鼠标样式为手型 */
}
input {
  padding: 8px; /* 设置内边距 */
  height: 10px;
  border-radius: 5px; /* 设置圆角 */
  border: 1px solid #ccc; /* 设置边框 */
  width: 200px; /* 设置宽度 */
  margin-right: 5px; /* 设置右边距 */
}
</style>
