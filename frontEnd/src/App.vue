<template>
  <div id="app">

    <div id = "nav">
      <Navbar />

    </div>

    <div style="min-height: 60vh;width: 100%;">
      <router-view :baseURL="baseURL">
      </router-view>
    </div>


    <div id = "footer">
      <Footer />

    </div>
  </div>
</template>

<script>

import Question from './components/Question.vue';
import Answer from './components/Answer.vue';
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';


export default {
  data(){
    return{
      baseURL: "http://localhost:5173/",
    }

  },

  components: {
    Question,Answer,Navbar,Footer

  },
  mounted(){

  }


  }

</script>


<style>
.QPbutton {
  background-color: rgb(65 105 225);
  border: none;
  color: white;
  padding: 5px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 3px;
  width: 150px;
}
.answer{
  font-size: 1rem;
}
input[type=text] {
  width: 70%;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  background-color: white;
  background-position: 10px 10px;
  background-repeat: no-repeat;
  padding: 5px 8px 5px 20px;
}
</style>

