<template>
    <div class="todolist">
        <header class="todolist__header">
            <h2>Tasks</h2>
            <form class="todolist__new" @submit.prevent="addTarea">
                <input
                    class="todolist__new-input"
                    v-model="newTarea"
                    placeholder="I need..."
                    required
                />
                <button class="todolist__new-btn">Add</button>
            </form>
        </header>
        <div v-if="!isEmpty">
            <ul class="todolist__list">
                <li
                    class="todolist__list-item"
                    v-for="(tarea, index) in tareas"
                    :key="index"
                >
                    <label>
                        <input
                            class="todolost__list-item-input"
                            v-if="!tarea.done"
                            type="checkbox"
                            v-model="tarea.done"
                            @change="saveTarea(index)"
                        />

                        <span
                            :class="{ done: tarea.done }"
                            @click="updateInputValue"
                        >
                            {{ tarea.nombre }}
                        </span>
                    </label>

                    <button
                        class="todolist__list-item-btn"
                        @click="deleteTarea(index)"
                    >
                        Delete
                    </button>
                </li>
            </ul>
        </div>
        <p class="todolist__empty" v-else>
            You made it! There is nothing else to do...
        </p>
    </div>
</template>
<style lang="scss">
.todolist {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--padding-80, 12px);
    flex-shrink: 0;
    border-radius: var(--radio-L, 40px);
    border: 28px solid var(--borde-borde, #135c7d);
    background: var(--fondo-transparente, rgba(217, 217, 217, 0.82));

    /* Dark */
    box-shadow: 0px 4px 4px 0px rgba(17, 3, 0, 0.65);
    overflow: scroll;
    &__header {
        display: flex;
        flex-direction: row;
        padding: 0px var(--espaciado-desktop-80, 12px);
        align-items: center;
        gap: var(--espaciado-desktop-100, 28px);
        align-self: stretch;
        border-radius: var(--radio-200, 10px);
        border-right: 2px solid var(--borde-borde, #135c7d);
        border-bottom: 2px solid var(--borde-borde, #135c7d);
        border-left: 2px solid var(--borde-borde, #135c7d);
        background: var(--task-header, rgba(217, 217, 217, 0.82));
    }
    &__new {
        display: flex;
        padding: 12px 0px;
        justify-content: flex-end;
        align-items: center;
        gap: var(--espaciado-desktop-80, 12px);
        flex: 1 0 0;
        &-input {
            all: unset;
            color: var(--text-placeholder, #135c7d);

            /* PC/P */
            font-family: Quicksand;
            font-size: 28px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
            border-bottom: 2px dashed var(--dark-blue);
            &::placeholder {
                color: grey;
            }
        }
        &-btn {
            display: flex;
            justify-content: center;
            align-items: center;
            width: auto;
            padding: 0.4375rem 1.8rem;
            font-size: 1.25rem;
            font-family: Quicksand;
            font-style: normal;
            font-weight: 600;
            line-height: normal;
            color: var(--button-text, #110300);
            background: var(--button-fondo);
            border-radius: 40px;
            cursor: pointer;
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
            API_URL: "http://localhost/api",
        };
    },
    async mounted() {
        await this.fetchTareas();
    },
    methods: {
        async fetchTareas() {
            const response = await fetch(`${this.API_URL}/tareas`, {
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
            const response = await fetch(`${API_URL}/tareas/${tarea.nombre}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(tarea),
            });
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
                const response = await fetch(`${API_URL}/tareas`, {
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
            const response = await fetch(`${API_URL}/tareas/${tarea.nombre}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.ok) {
                this.fetchTareas();
            }
        },
    },
};
</script>
