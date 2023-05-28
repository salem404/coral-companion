<template>
  <div class="todolist">
    <h1 class="todolist__header">Things to do</h1>
    <form class="todolist__new" @submit.prevent="addTarea">
      <input
        class="todolist__new-input"
        v-model="newTarea"
        placeholder="I need..."
        required
      />
      <button class="todolist__new-btn">Add</button>
    </form>
    <div v-if="!isEmpty">
      <ul class="todolist__list">
        <li class="todolist__list-item" v-for="(tarea, index) in tareas" :key="index">
          <label>
            <input
              class="todolost__list-item-input"
              v-if="!tarea.done"
              type="checkbox"
              v-model="tarea.done"
              @change="saveTarea(index)"
            />

            <span :class="{ done: tarea.done }" @click="updateInputValue">{{
              tarea.nombre
            }}</span>
          </label>

          <button class="todolist__list-item-btn" @click="deleteTarea(index)">
            Delete
          </button>
        </li>
      </ul>
    </div>
    <p class="todolist__empty" v-else>You made it! There is nothing else to do...</p>
  </div>
</template>
<style lang="scss">
.todolist {
  background: var(--white);
  border: 8px solid var(--dark-blue);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 40px;
  padding: 1em;
  width: 50%;
  max-height: 90%;
  min-height: 60%;
  overflow: scroll;
  &__header {
    font-size: 2.5em;
    color: var(--black);
    margin-bottom: 10px;
  }
  &__new {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    &-input {
      all: unset;
      border-bottom: 2px solid var(--dark-blue);
      &::placeholder {
        color: grey;
      }
    }
    &-btn {
      background: var(--blue);
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      padding: 0.5em 1.5em;
      color: var(--white);
      border-radius: 35px;
      font-size: 1.3em;
      text-align: center;
      transition: 120ms;
      cursor: pointer;
      &:hover {
        box-shadow: 0px 6px 4px 0 rgba(0, 0, 0, 0.108);
        transform: translateY(-2px);
      }
      &:active {
        box-shadow: 0px 0px 4px 0 rgba(0, 0, 0, 0.108);
        transform: translateY(2px);
      }
    }
  }
  &__list {
    list-style: disc;
    padding: 1em;
    display: flex;
    flex-direction: column-reverse;
    gap: 0.5em;

    &-item {
      &-input {
        cursor: pointer;
        background-color: rgb(198, 198, 198);
        border: 2px solid #888;
      }
      &-btn {
        margin-left: 1em;
        background: var(--pink);
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        padding: 0.25em 0.5em;
        color: var(--white);
        border-radius: 35px;
        font-size: 1em;
        text-align: center;
        transition: 120ms;
        cursor: pointer;
        align-self: flex-end;
        &:hover {
          box-shadow: 0px 6px 4px 0 rgba(0, 0, 0, 0.108);
          transform: translateY(-2px);
        }
        &:active {
          box-shadow: 0px 0px 4px 0 rgba(0, 0, 0, 0.108);
          transform: translateY(2px);
        }
      }
    }
  }
  &__empty {
    text-justify: center;
  }
}
.done {
  text-decoration: line-through;
}
</style>
<script>
/**
 * @vue-data {Array} [tareas=[]] - Lista de tareas
 * @vue-data {String} [newTarea=""] - Tarea nueva a añadir
 * @vue-data {Boolean} [isEmpty=true] - Estado de la lista de tareas
 * @vue-event {Array} fetchTareas - Llama a la api para adquirir la lista de tareas
 * @vue-event {Array} saveTarea - Llama a la api para guardar una tarea existente
 * @vue-event {Array} addTarea - Llama a la api para añador una tarea nueva
 * @vue-event {Array} deleteTarea - Llama a la api para eliminar una tarea
 */
export default {
  name: "ToDoList",
  data() {
    return {
      tareas: [],
      newTarea: "",
      isEmpty: true,
    };
  },
  async mounted() {
    await this.fetchTareas();
  },
  methods: {
    async fetchTareas() {
      const response = await fetch("https://proyectotema3api.onrender.com/api/tareas", {
        method: "GET",
        headers: { Connection: "Keep-Alive" },
      });
      if (response.ok) {
        const data = await response.json();
        this.tareas = data;
        this.isEmpty = false;
      } else {
        this.isEmpty = true;
      }
    },
    async saveTarea(index) {
      const tarea = {
        nombre: this.tareas[index].nombre,
        done: this.tareas[index].done,
      };
      console.log(tarea);
      const response = await fetch(
        `https://proyectotema3api.onrender.com/api/tareas/${tarea.nombre}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(tarea),
        }
      );
      const data = await response.json();
      this.tareas[index].editing = false;
    },
    async addTarea() {
      this.tareas = [];
      if (this.newTarea) {
        const tarea = {
          nombre: this.newTarea,
          done: "false",
        };
        const response = await fetch("https://proyectotema3api.onrender.com/api/tareas", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(tarea),
        });
        const data = await response.json();
        this.fetchTareas();
        this.newTarea = "";
      }
    },
    async deleteTarea(index) {
      const tarea = this.tareas[index];
      const response = await fetch(
        `https://proyectotema3api.onrender.com/api/tareas/${tarea.nombre}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        this.fetchTareas();
      }
    },
  },
};
</script>
