<script setup lang="ts">
import { BookItem } from '../components/bookItem.vue'
import { ref, onMounted } from 'vue'

const url = 'http://localhost:3000/book'
const bookArr = ref<any>([])
const getAllBooks = async () => {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJOYW1lIjoiSmFuZVMiLCJwaG9uZU51bWJlciI6Iis5ODc2NTQzMjEwIiwiaWF0IjoxNzI4NDY4NjA4LCJleHAiOjE3Mjg1NTUwMDh9.9J0z-euvqIfML8Gmt8SWam1N2dzleJpUHv4IJ8PKrk0'
  const options = {
    method: "GET",
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
  }
  const bookRes = await fetch(url, options)
  return await bookRes.json()
}

onMounted(async () => {
  bookArr.value = await getAllBooks()
})
// getAllBooks()
</script>

<template>
  <div class="landingPage">
    <h1 class="">Welcome to Homepage!</h1>
    <div class="bookInfo">
      <template v-for="book in bookArr" :key="book.id">
        <BookItem />
      </template>
    </div>
  </div>
</template>

<style lang="css">
.landingPage {
    margin-top: 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.bookInfo {
  display: flex;
  margin-top: 16px;
  flex-direction: column;
  color: black;
  font-size: 20px;
}
</style>
