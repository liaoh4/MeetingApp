<script >
import axios from "axios";
import Question from '../components/Question.vue';
const url = 'http://localhost'
export default {
  data(){
    return{
      newQuery: '',
      answers:[],
      questions: [],

    }
  },
  methods:{
    postQuery: function () {

      if (this.newQuery === '') {
        return
      }
      this.questions.push(
          {
            question: this.newQuery,
            answers: []
          })

      axios.post(url + ':3000/query/add', {
        question: this.newQuery,

      })
          .then(response => {
            console.log(response.data);
          })
          .catch(err => {
            console.log('Error:', err);
          })
      this.newQuery = '';
    },
  },
  components:{Question},
}

</script>

<template>
  <div id="ask">

    <div>

      <input v-model='newQuery' type="text" placeholder="Type the query...">
      <button class='QPbutton' @click='postQuery()'>Post</button>

    </div>

    <div>
      <Question v-for='(question, i) in questions' v-bind:key="i+question+question.myid " v-bind:question.sync='question' >
        Q: {{ question.question }}
      </Question>


    </div>

  </div>
</template>

<style scoped>

</style>
