<template>
  <section class="weather">
    <v-container>
      <v-row>
        <v-col cols="4" v-for="(item,index) in listOfWeather" :key="index">
          <v-card>
            <v-card-title class="center">date : {{ new Date(item.dt_txt).toLocaleString('en-US').substring(0, 10) }}</v-card-title>
            <v-card-title class="center">time: {{ new Date(item.dt_txt).toLocaleString('en-US', { hour: 'numeric', hour12: true }) }}</v-card-title>
            <v-card-text class="center">Temp Max : {{ Math.floor(item.main.temp_max) }} c</v-card-text>
            <v-card-text class="center">Temp Min : {{ Math.floor(item.main.temp_min) }} c</v-card-text>
            <v-card-text class="center">Temp : {{ Math.floor(item.main.temp) }} c</v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>
<script>
export default {
  name: 'weatherView',
  data () {
    return {
      listOfWeather: []
    }
  },
  created () {
    const success = (position) => {
      this.userLatitude = position.coords.latitude
      this.userLongitude = position.coords.longitude
      this.axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${this.userLatitude}&lon=${this.userLongitude}&appid=04c1e0e56c6a29c619226e46167aa81e&units=metric`).then((response) => {
        this.listOfWeather = response.data.list
      })
    }
    const error = (err) => {
      console.log(err)
    }
    navigator.geolocation.getCurrentPosition(success, error)
  }
}
</script>
<style>

</style>
