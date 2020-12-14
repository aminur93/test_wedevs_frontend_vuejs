<template>
    <v-app>

        <navbar />

        <v-main class="mx-4 mb-4">
            <router-view></router-view>
        </v-main>

    </v-app>
</template>

<script>
    import Navbar from '../components/Navbar';

  export default {
      components: {
          Navbar
      },
      name: 'Home'
  }
</script>

<style scoped>
    #app{
        background: #f5f5f5;
    }

    .theme--light.v-card{
        background: #f5f5f5;
    }
</style>
