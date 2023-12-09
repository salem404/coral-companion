<template>
    <div class="todolist">
        <header class="todolist__header">
            <h2>Tasks</h2>
            <form class="todolist__new" @submit.prevent="addTask">
                <input v-model="newTask" placeholder="I need..." required />
                <button>Add</button>
            </form>
        </header>
        <ul class="todolist__content" v-if="!isEmpty">
            <li
                class="todolist__content-item"
                v-for="task in tasks"
                :key="task.id"
            >
                <input type="checkbox" v-model="task.completed" />
                <span v-if="!task.isEditing">{{ task.description }}</span>
                <input v-else v-model="task.description" type="text" />
                <button @click="task.isEditing = !task.isEditing">
                    {{ task.isEditing ? "Save" : "Edit" }}
                </button>
                <button @click="deleteTask(task.id)">Delete</button>
            </li>
        </ul>
        <div class="todolist__content-empty" v-else>
            <p>You made it! There is nothing else to do...</p>
        </div>
    </div>
</template>
<script>
import apiServiceMixin from "@/services/apiServiceMixin.js";
import { mapState } from "vuex";

export default {
    name: "ToDoList",
    mixins: [apiServiceMixin],
    data() {
        return {
            tasks: [],
            newTask: "",
            isEmpty: true,
        };
    },
    computed: {
        ...mapState(["profile"]),
    },
    async mounted() {
        await this.fetchTasks();
    },
    methods: {
        async fetchTasks() {
            while (!this.apiService) {
                await new Promise((resolve) => setTimeout(resolve, 100));
            }
            try {
                const response = await this.apiService.getTasksByProfileId(
                    this.profile.id,
                );
                this.tasks = response.data;
                if (this.tasks.length > 0) {
                    this.isEmpty = false;
                }
            } catch (error) {
                console.error(error);
            }
        },
        async addTask() {
            try {
                const response = await this.apiService.createTask(
                    this.profile.id,
                    this.newTask,
                    0,
                );
                this.fetchTasks();
                this.newTask = "";
                this.isEmpty = false;
            } catch (error) {
                console.error(error);
            }
        },
    },
};
</script>
