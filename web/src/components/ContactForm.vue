<template>
    <form @submit.prevent="submit" class="contact-form">
        <h2>联系我</h2>
        <input v-model="form.name" placeholder="姓名" required />
        <input v-model="form.email" type="email" placeholder="邮箱" required />
        <textarea v-model="form.message" placeholder="留言内容" required></textarea>
        <button type="submit">发送</button>
        <p>{{ status }}</p>
    </form>
</template>

<script setup>
import { ref } from 'vue';

const form = ref({
    name: "",
    email: "",
    message: ""
})

const status = ref('')

async function submit() {
    status.value = '正在发送...';
    try {
        const res = await fetch('http://localhost:30001/contact', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(form.value)
        });
        if (res.ok) {
            status.value = "消息发送成功！"
            form.value = { name: "", email: "", message: "" }
        } else {
            status.value = "消息发送失败，请稍后再试。"
        }

    } catch (error) {
        status.value = "消息发送失败，请稍后再试。"
    }
}
</script>

<style scoped>
.contact-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 400px;
    margin: 2rem auto;
}

input,
textarea {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
}

button {
    padding: 0.5rem;
    background: #42b983;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}
</style>