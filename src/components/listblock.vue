<template>
  <div class="todo-list" v-if="todos.length > 0">
    <div v-for="todo in todos" :key="todo.id" class="todo-item">
      <div class="todo-content">
        <span style="width: 99%">{{ todo.name }}</span>
      </div>
      <v-btn @click="removeTodo(todo.id)" color="error" class="delete-btn">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
      <v-btn @click="editTodoName(todo)" color="primary" class="delete-btn">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </div>
  </div>
  <div class="pt-4" v-else>No todos yet!</div>
</template>

<script>
import { ref } from 'vue';

export default {
  props: {
    todos: {
      type: Array,
      required: true
    },
    removeTodo: {
      type: Function,
      required: true
    },
    editTodo: {
      type: Function,
      required: true
    }
  },
  setup(props) {
    const editTodoName = async (todo) => {
      const newTodoName = prompt('Enter new todo name:', todo.name);
      if (newTodoName !== null) {
        props.editTodo(todo.id, newTodoName.trim());
      }
    };

    return {
      editTodoName
    };
  }
};
</script>

<style scoped>
.todo-list {
  margin-top: 20px;
}

.todo-item {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  height: 55px;
}

.delete-btn {
  margin-left: 13px; 
}

.todo-content {
  display: flex;
  justify-content: space-between;
  width: 80%;
  padding: 0px 10px;
}
</style>
