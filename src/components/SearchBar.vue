<template>
  <div>
    <header>
      <h2>Список автомобилей</h2>
    </header>
    <section>
      <input type="text" placeholder="Поиск..." @input="setInputValue($event.target.value)">
      <ul v-if="carsAmount">
        <li v-for="car in sortedListOfCars" :key="car.id" @click="findCar(car)" :class="{active: carID === car.id}">
          {{ car.name }}
        </li>
      </ul>
      <ul v-else>
        <li>Совпадений не найдено</li>
      </ul>
    </section>
  </div>
</template>

<script>
export default {
  name: "SearchBar",
  props: ['carID', 'sortedListOfCars'],
  data() {
    return {
      inputValue: '',
    }
  },
  methods: {
    findCar(car) {
      this.$emit('findCar', car);
    },
    setInputValue(data) {
      this.inputValue = data;
      this.$emit('setInputValue', data);
    }
  },
  computed: {
    carsAmount() {
      return this.sortedListOfCars.length;
    }
  },
}
</script>

<style>
section {
  width: 100%;
}

section ul {
  margin-top: .5rem;
}

section ul li {
  padding: .5rem;
}
</style>