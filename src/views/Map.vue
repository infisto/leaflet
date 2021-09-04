<template>
  <div class="map-wrapper">
    <div class="map-wrapper__inner">
      <l-map style="height: 100%" :zoom="zoom" :center="center" :max-zoom="12" :min-zoom="6" @update:zoom="zoomUpdated">
        <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
        <l-circle-marker
            v-for="(car, index) in sortedListOfCars"
            :key="car.id"
            :lat-lng="[car.latitude, car.longitude]"
            :radius="circle.radius"
            :color="id === car.id ? 'green' : '#fa5271'"
            @click="findCar(car, index)"
        >
          <l-tooltip>{{car.name}}</l-tooltip>
        </l-circle-marker>
      </l-map>
      <search-bar class="map-search-bar" @findCar="findCar" :id="id" @setInputValue="setInputValue"></search-bar>
    </div>
  </div>
</template>

<script>
import SearchBar from "@/components/SearchBar";
export default {
  name: "Map",
  components: {SearchBar},
  data () {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
          '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 8,
      center: [50.760918, 4.110170],
      circle: {
        radius: 10,
      },
      id: null,
      inputValue: ''
    };
  },
  methods: {
    findCar(car) {
      this.id = car.id
      this.center = [car.latitude, car.longitude]
      if (this.zoom !== 12) {
        setTimeout(() => {
          this.zoom = 12
        }, 700)
      }
    },
    setInputValue(data) {
      this.inputValue = data
    },
    zoomUpdated (zoom) {
      this.zoom = zoom;
    },
  },
  computed: {
    sortedListOfCars() {
      return this.$store.getters.getObjects.filter(item => {
        if (item.name.toLowerCase().includes(this.inputValue.toLowerCase())) {
          return item
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.map-wrapper {
  height: 100%;
  width: 100%;
  background-color: #d2fce8;
  display: flex;
  justify-content: center;
  align-items: center;
}
.map-wrapper__inner {
  height: 80%;
  max-width: 90%;
  flex: 1 0 auto;
  -webkit-box-shadow: 12px 18px 55px 19px rgba(34, 60, 80, 0.38);
  -moz-box-shadow: 12px 18px 55px 19px rgba(34, 60, 80, 0.38);
  box-shadow: 12px 18px 55px 19px rgba(34, 60, 80, 0.38);
  position: relative;
}
.map-search-bar {
  min-width: 300px;
  position: absolute;
  top: 2rem;
  right: 2rem;
  z-index: 10000;
  height: 90%;
  background-color: #faa5b5;
  border-radius: .5rem;
  transition: .3s;
}
.map-search-bar:hover {
  -webkit-box-shadow: -1px -2px 25px 7px rgba(34, 60, 80, 0.2);
  -moz-box-shadow: -1px -2px 25px 7px rgba(34, 60, 80, 0.2);
  box-shadow: -1px -2px 25px 7px rgba(34, 60, 80, 0.2);
}
</style>