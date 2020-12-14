<template>
    <nav>
        <v-app-bar flat app>

            <v-app-bar-nav-icon class="grey--text" @click="drawer = !drawer"></v-app-bar-nav-icon>

            <v-toolbar-title class="text-uppercase grey--text">
                <span class="font-weight-light">Wel</span>
                <span v-if="authenticated">Come - {{userInfo.name}}</span>
            </v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn text color="grey" v-on:click="logout">
                <span>Sign out</span>
                <v-icon right>mdi-exit-to-app</v-icon>
            </v-btn>

        </v-app-bar>

    </nav>
</template>

<script>
    import {mapGetters} from 'vuex';
    export default {
        name: "Navbar",

        computed: {
            ...mapGetters({
                authenticated: 'authenticated',
                userInfo: 'userInfo',
            })
        },

        methods: {
            logout: async function(){

                try {
                    await this.$store.dispatch('logout').then(()=> {
                        this.$router.push({ path: '/' });
                    });
                }catch (e) {
                    console.log(e);
                }

            },
        },
    }
</script>

<style scoped>

</style>