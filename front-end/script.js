

const app = Vue.createApp({
    //data, functions
    data(){
        return{
            title:'The final empire',//proprietà
            id:1
        }
    },
    methods: {
        changeId(){
            this.id=1
        }
    }
})

app.mount('#app')