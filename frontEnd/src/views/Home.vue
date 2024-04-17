<script >

import axios from "axios";
import Question from '../components/Question.vue';
import Answer from '../components/Answer.vue';
const url = 'http://localhost'
export default{
  data(){
    return{
      questions:[],

    }
  },
  methods:{
    getAllQueries: function () {
      console.log('Getting all queries');
      axios.get(url + ':3000/query/get')
          .then(response => {
            console.log(response.data);
            this.questions = [];
            this.questions = response.data;
            console.log(this.questions);
          })
          .catch(err => {
            console.log('Error:', err);
          })
    },

  },
  mounted(){
    this.getAllQueries();
  },
  components: {
    Question

  }

}

</script>

<template>
  <div>
    <Question v-for='(question, i) in questions' v-bind:key="i+question+question.myid " v-bind:question.sync='question' >
      Q: {{ question.question }}
    </Question>


  </div>

</template>

<style scoped>

</style>
