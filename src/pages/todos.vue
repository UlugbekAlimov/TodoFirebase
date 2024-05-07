<template>
  <v-container>
    <div class="d-flex justify-center ma-4">
      <v-btn @click="signOut" color="error" prepend-icon="mdi-home">log out
        <!-- <v-icon></v-icon> -->
      </v-btn>
    </div>
    
    <v-card
      style="border-radius: 12px;"
      class="mx-auto pa-8"
      elevation="16"
      width="850"
    >
      <v-card-title style="font-size: 30px;" class="d-flex justify-center align-center">
        Todos
      </v-card-title>

      <div class="d-flex flex-column">
        <v-text-field placeholder="What needs to be done?" v-model="newTodo" @keydown.enter="addTodo" variant="outlined" hide-details></v-text-field>
      </div>

      <listblock :todos="todos" :removeTodo="removeTodo" :editTodo="editTodo" :db="db"></listblock>

    </v-card>
    
  </v-container>
</template>

<script>
import { ref, onMounted } from 'vue';
import listblock from '@/components/listblock.vue';
import { db , auth  } from '@/firebase.js';
import { collection, addDoc, onSnapshot, deleteDoc, doc, updateDoc } from "firebase/firestore"

export default {
  components: {
    listblock
  },
  setup() {
    const newTodo = ref('');
    const todos = ref([]);

    const addTodo = async () => {
      if (newTodo.value.trim() !== '') {
        try {
          const docRef = await addDoc(collection(db, 'todo_crud'), {
            name: newTodo.value.trim()
          });
          console.log('Document written with ID: ', docRef.id);
          
          newTodo.value = '';
        } catch (error) {
          console.error('Error adding document: ', error);
        }
      }
    };

    const removeTodo = async (id) => {
      try {
        await deleteDoc(doc(db, 'todo_crud', id));

        todos.value = todos.value.filter(todo => todo.id !== id);
      } catch (error) {
        console.error('Error removing document: ', error);
      }
    };

    const editTodo = async (id, newName) => {
      try {
        await updateDoc(doc(db, 'todo_crud', id), {
          name: newName
        });

        const index = todos.value.findIndex(todo => todo.id === id);
        todos.value[index].name = newName;
      } catch (error) {
        console.error('Error updating document: ', error);
      }
    };

    const signOut = async () => {
      try {
        await auth.signOut(); 
        console.log('Successfully signed out');
        localStorage.removeItem('userToken');
      } catch (error) {
        console.error('Error signing out:', error);
      }
    };

    onMounted(() => {
      const unsubscribe = onSnapshot(collection(db, 'todo_crud'), (querySnapshot) => {
        todos.value = [];
        querySnapshot.forEach((doc) => {
          todos.value.push({ id: doc.id, name: doc.data().name });
        });
      });

      return unsubscribe;
    });

    return {
      newTodo,
      todos,
      addTodo,
      removeTodo,
      editTodo,
      db,
      signOut,
    };
  }
};
</script>
