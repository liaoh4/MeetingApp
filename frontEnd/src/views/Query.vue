<template>
  <div id="ask">


    <div>

     <h2 style="color:#ef6b3B"> Question: {{searchText}}</h2>
      <div v-if="answers.length > 0">
        <Answer v-for='(answer, i) in answers' :key="i+answer" class="answer">
          Answer: {{ answer }}
        </Answer>

      </div>
      <div class='ansBox'>
        <input type="anstext" v-model='newAnswer' placeholder="Answer...">
        <button class="button" @click="postAnswer()">Post</button>
      </div>

    </div>
  </div>
</template>

<script>
import axios from "axios";
import Question from '../components/Question.vue';
import Answer from '../components/Answer.vue';
const url = 'http://localhost'


export default {

  data() {
    return {

      questions: [],
      newQuery: '',
      searchText:'',


      result: '',
      newAnswer:'',
      answers:[],
      question:'',

    };
  },

  methods: {


    async search(searchText) {
      if(searchText===''){
        console.log('null')
        return
      }

      try{
        const response = await axios.get(url + ':3000/query/answer/'+encodeURIComponent(searchText));

        if (response) {
          this.answers = response.data.answers;
          this.question = response.data.question;
          console.log(this.answers );
          console.log(this.question)

        } else {
          this.answers = [];
          console.log(response.data.length)
          console.log('false')

        }
      } catch (error) {
        console.error('该问题不存在:', error);
        this.answers = [];

      }
    },
    postAnswer: function(){
      if(this.newAnswer===''){
        return
      }

      this.answers.push(this.newAnswer);
      console.log(this.question)

      axios.post(url+':3000/query/answer/'+encodeURIComponent(this.question), {

        answer: this.newAnswer
      })
          .then(response => {
            console.log('Ans posted: ',response.data);
          })
          .catch(err =>{
            console.log('Error:' , err);
          })

      this.newAnswer = ''
    }
  },



 created() {
     const text= this.$route.query.searchQuery;
     this.searchText = text;
     console.log('is:', text);
     this.search(text);

  },
  updated(){


  },
  components: {
    Answer,Question

  }
}
</script>


<style>
.QPbutton {
  padding: 8px 15px; /* 设置内边距 */
  height:30px;
  border: none; /* 移除边框 */
  border-radius: 10px; /* 设置圆角 */
  background-color: #ef6b3B; /* 设置背景颜色 */
  color: white; /* 设置文字颜色 */
  cursor: pointer; /* 设置鼠标样式为手型 */
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

