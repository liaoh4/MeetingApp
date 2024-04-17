<script >
export default {
  name: "Navbar",
  data(){
    return{
      searchQuery:''
    }
  },
  methods:{
    login(){
      this.$router.push('/user/login');
    },
    signup(){
      this.$router.push('/user/register');
    },
    search(query){
      this.$router.push({
        path:'/query',
        query:{searchQuery: this.searchQuery}
          })
      console.log('search query is:', query)
    }
  }
}

</script>

<template>
  <nav >
    <table style=" width: 100%">
      <tr>
        <!--  logo -->
        <td style ="width: 40%; text-align:left">
          <router-link :to = "{name : 'Home'}">
            <img id = "logo" src="../assets/meeting.png"/>
          </router-link>
        </td>
        <!-- search -->
        <td style ="width: 30%; text-align: right">
          <div class="search-container">
            <input v-model = "searchQuery" id = "search" type="text" placeholder="Search...">
            <input @click = "search(searchQuery)" type="submit" value="Search">

          </div>
        </td>


        <!--  button -->
        <td style ="width: 30%; text-align: right">
          <div class = "button-container">
            <button @click = "login" class="btn-spacing" style="width: 60px; height: 30px;border: none;background-color: #FFFFFF; color: #003366;" >Log in</button>

            <button @click = "signup"  class="btn-spacing" style="width: 60px; height: 30px;border: none;border-radius: 10px;background-color:#333333;color: #ffffff;">Sign up</button>
          </div>
        </td>
      </tr>
    </table>




  </nav>
</template>

<style scoped>
.button-container {
  text-align: right; /* 设置文本右对齐 */
}
button {
  margin-right: 5px; /* 设置按钮与右边的距离为20px */
}
#logo{
  max-width: 150px; /* 设置最大宽度为 200 像素 */
  max-height: 75px; /* 设置最大高度为 150 像素 */
}

nav{
  background-color:#FFFFFF;
}
.search-container {
  display: flex; /* 使用 flex 布局 */
  align-items: center; /* 垂直居中 */
}

input[type="text"] {
  padding: 8px; /* 设置内边距 */
  height: 30px;
  border-radius: 10px; /* 设置圆角 */
  border: 1px solid #ccc; /* 设置边框 */
  width: 200px; /* 设置宽度 */
  margin-right: 5px; /* 设置右边距 */
}

input[type="submit"] {
  padding: 8px 15px; /* 设置内边距 */
  height:30px;
  border: none; /* 移除边框 */
  border-radius: 10px; /* 设置圆角 */
  background-color: #ef6b3B; /* 设置背景颜色 */
  color: white; /* 设置文字颜色 */
  cursor: pointer; /* 设置鼠标样式为手型 */
}

</style>
