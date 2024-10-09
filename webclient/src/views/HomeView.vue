<script setup lang="ts">
import { ref, onMounted } from 'vue'

const url = 'http://localhost:3000/book'
const getAllBooks = async() => {
  const bookRes = await fetch(url)
  console.log(bookRes)
}

onMounted(getAllBooks)

const response = ref({})
</script>

<template>
  <div class="landingPage">
    <h1 class="">Welcome to Homepage!</h1>
    <div class="bookInfo">
      <div><span class="title">Book Name: </span>klsjlfkjls</div>
      <div><span class="title">Description: </span> kjfllsf</div>
      <div><span class="title">Price: $ </span>834</div>
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
.title {
  font-weight: 600;
}
</style>
