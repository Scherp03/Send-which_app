<template>
  <q-page padding >
    <input v-model="message"
    @keyup.enter="alertMessage"
    v-autofocus
    :class="{'error ' : message.length>22}" 
    :style="errorStyle"
    ref="messageInput"/>
    <h2 class="border-gray" v-show="message.length">{{message}}</h2>

    <button class="id" @click=alertMessage>Sign in</button>

    <button class="id">Sign up</button>

    <hr>

    <p>LoweCase message : {{ messageLowerCase}}</p>
 

  </q-page>
</template>
<script setup>
defineOptions({
  data(){
    return{
      message: "Welcome to Sendwich APP",
      
      // user:'',
      // password:'',

    }
  },

  methods:{
    login(){

    },
    signUp(){

    },
    
    alertMessage(){
      alert(this.message)
    }
  },
  computed:{
    messageLowerCase(){
      return this.message.toLowerCase()
    },
    errorStyle(){
      if( this.message.length > 22){
        return 'color: red; backgrond: pink;'
      }
    }
  },
  directives:{
    autofocus:{
      inserted(el){
        el.focus()
      }
    }
  },
  beforeCreate(){
    console.log('before create')
  },
  created(){
    console.log('created')
  },
  beforeMount(){
    console.log('before mount')
  },
  mounted(){
    console.log(this.$refs)

  },
  beforeUpdate(){
    console.log('before update')
  },
  updated(){
    console.log('updatede')
  }

});
</script>


<style>

.q-page{
  background-color: red;
}
.border-gray{
  border: 1px solid gray;
}
.id{
  background-color: redS;
}
.error{
  color: red;
  background-color: pink ;
}

</style>