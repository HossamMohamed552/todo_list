<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
    >
     <v-row>
       <v-col cols="8">
         <div class="d-flex justify-start align-center">
           <router-link to="/" class="mr-2"><v-btn text>To Do List</v-btn></router-link>
           <router-link to="/weather" class="cursor"><v-btn text>Current Weather : {{ currentWeather }} c</v-btn></router-link>
         </div>
       </v-col>
       <v-col cols="4">
         <div class="d-flex justify-end align-center">
           <v-switch
             v-model="$vuetify.theme.dark"
           ></v-switch>
         </div>
       </v-col>
     </v-row>
    </v-app-bar>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({}),
  computed: {
    currentWeather () {
      return Math.floor(this.$store.state.currentWeather?.main?.temp)
    }
  }
}
</script>
<style lang="scss" scoped>
.cursor {
  cursor: pointer;
}
</style>
