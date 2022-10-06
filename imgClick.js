const app = Vue.createApp({
    data (){
        return {
            mygithub: 'https://github.com/opda0887',
            tutorial: 'https://github.com/opda0887/Todo-web',
        }
    },
    methods: {
        openLink(link) {
            window.location = link
        }
    }
})

app.mount('#topic')