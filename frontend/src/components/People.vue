<template>
  <div class="people">
    <h2 class="people__header">People</h2>
    <ul class="people__list" v-for="person in people">
      <li class="people__list-item" v-if="person.birthday.season == season">
        {{ person.name }}
        {{ person.birthday.day }}
      </li>
    </ul>
  </div>
</template>
<script>
/**
 * @vue-prop {String} season - Estación seleccionada
 * @vue-data {Array} [people = []] - Lista de personas
 * @vue-event {Array} fetchPeople - Llama a la api para adquirir la lista de personas
 */
export default {
  name: "People",
  props: {
    season: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      people: [],
    };
  },
  async mounted() {
    await this.fetchPeople();
  },
  methods: {
    async fetchPeople() {
      const response = await fetch("https://proyectotema3api.onrender.com/api/people", {
        method: "GET",
        headers: { Connection: "Keep-Alive" },
      });
      if (response.ok) {
        const data = await response.json();
        this.people = data;
      }
    },
  },
};
</script>
<style lang="scss">
.people {
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
