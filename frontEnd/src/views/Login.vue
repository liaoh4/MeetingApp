<script >

import axios from "axios";
import swal from 'sweetalert2';
const url = 'http://localhost'
export default{
  name:'Login',
  data: function(){
    return {
      email:'',
      password:'',
      token: null,


    }
  },

  methods:{
    login: function(){

      console.log('Login...');
      console.log(this.email);
      console.log(this.password);
      axios.post(url + ':3000/user/login',{email: this.email, password: this.password})
          .then(response => {
             sessionStorage.setItem('token', response.data.token);
            new swal({
              text: "Login successful. Please continue",
              icon: "Success"
            });
            this.$router.push('/');
          })
          .catch(error =>{
            console.error('Failed', error);
          });
    },

  }
}


</script>


<template>
  <div class="form-container">
    <form @submit.prevent="login">
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

        </tr>
        <tr>
          <td>
            <button type="submit">Login</button>
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
