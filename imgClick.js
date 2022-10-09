const app1 = Vue.createApp({
    data() {
        return {
            viewMenu: false,
        }
    },

    methods: {
        openMenu() {
            this.viewMenu = !this.viewMenu
        }
    }
})

app1.mount('#menu')