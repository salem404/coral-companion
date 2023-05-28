<template>
  <div class="crops">
    <h2 class="crops__header">Crops</h2>
    <ul class="crops__list" v-for="crop in crops">
      <li class="crops__list-item" v-if="crop.seasons.includes(season)">
        {{ crop.name }}
      </li>
    </ul>
  </div>
</template>
<script>
/**
 * @vue-prop {String} season - Estación seleccionada
 * @vue-data {Array} [crops = []] - Lista de personas
 * @vue-event {Array} fetchCrops - Llama a la api para adquirir la lista de cultivos
 */
export default {
  name: "Crops",
  props: {
    season: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      crops: [],
    };
  },
  async mounted() {
    await this.fetchCrops();
  },
  methods: {
    async fetchCrops() {
      const response = await fetch("https://proyectotema3api.onrender.com/api/crops", {
        method: "GET",
        headers: { Connection: "Keep-Alive" },
      });
      if (response.ok) {
        const data = await response.json();
        this.crops = data;
      }
    },
  },
};
</script>
<style lang="scss">
.crops {
  background: var(--white);
  border: 8px solid var(--dark-blue);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 40px;
  padding: 1em;
  min-width: 130%;
  max-height: 50%;
  display: flex;
  flex-direction: column;
  justify-items: center;
  &__header {
    font-size: 2em;
    margin: 0;
    color: var(--black);
    margin-bottom: 10px;
  }
  &__list {
    list-style: circle;
    padding-left: 2em;
  }
}
</style>
