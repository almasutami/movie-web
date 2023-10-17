<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { computed, onMounted, ref } from 'vue'
import icon from './assets/logo.jpg'
import noprofile from './assets/noprofile.jpg'

//check width of screen to adjust recipient display width limit
let width = screen.width
const IMG_API = 'https://image.tmdb.org/t/p/original/'

interface Movie {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

const movieList = ref<Movie[]>([])
const fetchList = () => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNWJiODRjNWMyMTRlNTgwZjkzMjQwN2JjOGUxNzI5YyIsInN1YiI6IjYxNDM1ZmM3MDA2YjAxMDA0NDdhMWZhZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.M68DWhc1mcdzAbezFqaJWm6EdJ79X4f7rtgp8tFQx_U'
    }
  }

  fetch(
    'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc',
    options
  )
    .then((response) => response.json())
    .then((response) => (movieList.value = response.results))
    .catch((err) => console.error(err))
}

onMounted(() => {
  fetchList()
})

const countRating = computed(() => {
  return Math.ceil(movieList.value[0]?.vote_average / 2)
})
</script>

<template>
  <div class="container">
    <div class="toolbar">
      <div style="display: flex; flex-direction: row; gap: 1rem; align-items: center">
        <img :src="icon" alt="logo" style="height: 40px; width: 40px; padding: 0" />
        <h2 style="font-weight: bolder; font-style: oblique">Movie Website</h2>
      </div>

      <div style="padding: 30px">
        <img
          :src="noprofile"
          alt="logo"
          style="height: 36px; width: 36px; padding: 0; border-radius: 50%"
        />
      </div>
    </div>
    <div
      class="featured"
      :style="`background-image: linear-gradient(to right, rgba(30,30,30,1), rgba(30,30,30,0)), url(${
        IMG_API + movieList[0]?.backdrop_path
      });`"
    >
      <!-- :style="`background-image: url(${IMG_API + movieList[0]?.backdrop_path});`" -->
      <div class="featured-content">
        <h1 style="font-weight: bolder; font-size: 42px">
          {{ movieList[0]?.title }} ({{ movieList[0]?.release_date?.slice(0, 4) }})
        </h1>
        <div style="width: 80%; display: flex; flex-direction: column; gap: 8px">
          <p style="font-size: 14px">{{ movieList[0]?.overview }}</p>

          <div
            style="
              display: flex;
              flex-direction: row;
              font-size: 12px;
              gap: 1rem;
              align-items: center;
            "
          >
            <div>TMDB Rating {{ movieList[0]?.vote_average?.toFixed(2) }}</div>
            <div style="display: flex; flex-direction: row; gap: 1px">
              <font-awesome-icon
                icon="fa-solid fa-star"
                style="height: 16px; width: 16px"
                :class="countRating >= 1 ? 'checked' : ''"
              />
              <font-awesome-icon
                icon="fa-solid fa-star"
                style="height: 16px; width: 16px"
                :class="countRating >= 2 ? 'checked' : ''"
              />
              <font-awesome-icon
                icon="fa-solid fa-star"
                style="height: 16px; width: 16px"
                :class="countRating >= 3 ? 'checked' : ''"
              />
              <font-awesome-icon
                icon="fa-solid fa-star"
                style="height: 16px; width: 16px"
                :class="countRating >= 4 ? 'checked' : ''"
              />
              <font-awesome-icon
                icon="fa-solid fa-star"
                style="height: 16px; width: 16px"
                :class="countRating >= 5 ? 'checked' : ''"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
}
.toolbar {
  height: 80px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: rgba(30, 30, 30, 1);
  color: white;
  padding: 10px 30px;
  align-items: center;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
}

.featured {
  min-height: 90vh;
  padding: 100px 100px;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: 100%;
}

.featured-content {
  width: 50%;
  height: 100%;
  display: flex;
  color: white;
  flex-direction: column;
  padding: 20px;
  gap: 2rem;
}

.readmore {
  text-decoration: none;
  color: inherit;
}
.readmore:hover {
  text-decoration: underline;
}

.checked {
  color: rgb(223, 223, 13);
}
</style>
