<script setup lang="ts">
import http from '@/services/http';
import { reactive } from 'vue';
import { ref } from 'vue';

const user = reactive({
    email: '',
    password: '',
});

const message = ref('');

async function login() {
    try {
        const response = await http.post('/login', user);
        console.log(response.data);
    } catch (error) {
        message.value = error?.response?.data.message;
    }
}
</script>

<template>
    <div>
        <h1>Login</h1>
        <p>{{ message }}</p>
        <form @submit.prevent="login">
            <input type="text" placeholder="Email" v-model="user.email" />
            <input type="password" placeholder="Password" v-model="user.password" />
            <button type="submit">Login</button>
        </form>
    </div>
</template>

