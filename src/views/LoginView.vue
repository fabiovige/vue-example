<script setup lang="ts">
const login = () => {
    console.log('Login');
}
</script>

<template>
    <div>
        <h1>Login</h1>
        <form @submit.prevent="login">
            <input type="text" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button type="submit">Login</button>
        </form>
    </div>
</template>

