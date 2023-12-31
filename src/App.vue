<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import icon from './assets/logo.jpg'
import noprofile from './assets/noprofile.jpg'

//check width of screen
const width = screen.width

const IMG_API_BACKDROP = 'https://image.tmdb.org/t/p/w1280/'
const IMG_API_POSTER = 'https://image.tmdb.org/t/p/w500/'

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

const allMovie = ref<Movie[]>([])
const loading = ref(false)
const fetchMovieList = async () => {
  loading.value = true

  allMovie.value = []
  movieList.value = []

  let url = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1'
  switch (listType.value) {
    case 'playing':
      url = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1'
      break

    case 'popular':
      url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1'
      break
    case 'top':
      url = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1'
      break
  }

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNWJiODRjNWMyMTRlNTgwZjkzMjQwN2JjOGUxNzI5YyIsInN1YiI6IjYxNDM1ZmM3MDA2YjAxMDA0NDdhMWZhZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.M68DWhc1mcdzAbezFqaJWm6EdJ79X4f7rtgp8tFQx_U'
    }
  }

  const response = await fetch(url, options)
  const responseJSON = await response.json()
  allMovie.value = responseJSON.results

  setMovieList()

  loading.value = false
}

const listType = ref('playing')

onMounted(() => {
  fetchMovieList()
})

const changeListType = (type: string) => {
  listType.value = type
  fetchMovieList()
}

const countRating = computed(() => {
  return Math.round(allMovie.value[0]?.vote_average)
})

const movieList = ref<Movie[]>([])

const setMovieList = () => {
  const currentWidth = screen.width
  movieList.value = []
  if (width > 800) {
    movieList.value = allMovie.value.slice(1, Math.floor((currentWidth - 100 * 2) / 205) + 1)
  } else if (width > 500) {
    movieList.value = allMovie.value.slice(1, Math.floor((currentWidth - 80 * 2) / 155) + 1)
  } else {
    movieList.value = allMovie.value.slice(1, Math.floor((currentWidth - 30 * 2) / 105) + 1)
  }
}

onMounted(() => {
  window.addEventListener('resize', setMovieList)
  setMovieList()
})
onUnmounted(() => {
  window.removeEventListener('resize', setMovieList)
  setMovieList()
})

const calculateFontParagraph = () => {
  if (width > 1000) {
    return '14px'
  } else if (width > 800) {
    return '13px'
  } else if (width > 600) {
    return '12px'
  } else {
    return '10px'
  }
}
</script>

<template>
  <div class="container">
    <div class="toolbar">
      <div style="display: flex; flex-direction: row; gap: 1rem; align-items: center">
        <img :src="icon" alt="logo" style="height: 40px; width: 40px; padding: 0" />
        <h2 style="font-weight: bolder; font-style: oblique" v-if="width > 800">Movie Website</h2>
      </div>

      <div
        style="
          display: flex;
          flex-direction: row;
          gap: 2rem;
          align-items: center;
          color: rgb(143, 143, 143);
        "
        v-if="width > 700"
      >
        <p
          @click="changeListType('playing')"
          :class="listType === 'playing' ? 'selected-type' : ''"
          class="toolbar-link"
          :style="`font-size: ${calculateFontParagraph()}`"
        >
          Now Playing
        </p>
        <p
          @click="changeListType('popular')"
          :class="listType === 'popular' ? 'selected-type' : ''"
          class="toolbar-link"
          :style="`font-size: ${calculateFontParagraph()}`"
        >
          Popular
        </p>
        <p
          @click="changeListType('top')"
          :class="listType === 'top' ? 'selected-type' : ''"
          class="toolbar-link"
          :style="`font-size: ${calculateFontParagraph()}`"
        >
          Top Rated
        </p>
        <button @click="fetchMovieList()" class="refresh-button">Refresh</button>
      </div>

      <div v-else>
        <select
          style="padding: 10px 20px; border-radius: 10px"
          name="type"
          id="type"
          v-model="listType"
          @change="fetchMovieList()"
        >
          <option value="playing">Now Playing</option>
          <option value="popular">Popular</option>
          <option value="top">Top Rated</option>
        </select>
      </div>

      <div :style="width > 800 ? 'padding: 30px' : 'padding: 10px'">
        <img
          :src="noprofile"
          alt="logo"
          style="height: 36px; width: 36px; padding: 0; border-radius: 50%"
        />
      </div>
    </div>
    <div
      class="featured"
      :style="
        `background-image: linear-gradient(to right, rgba(30,30,30,1), rgba(30,30,30,0)), url(${
          IMG_API_BACKDROP + allMovie[0]?.backdrop_path
        });` +
        `${
          width > 800
            ? 'padding: 100px 100px'
            : width > 500
            ? 'padding: 80px 80px'
            : 'padding: 30px 30px'
        }`
      "
    >
      <div
        v-if="!loading"
        class="featured-content"
        :style="width > 800 ? 'width: 50%' : width > 600 ? 'width: 80%' : 'width: 100%'"
      >
        <h1
          style="font-weight: bolder"
          :style="`${
            width > 800 ? 'font-size: 42px' : width > 500 ? 'font-size: 36px' : 'font-size: 28px'
          }`"
        >
          {{ allMovie[0]?.title }} ({{ allMovie[0]?.release_date?.slice(0, 4) }})
        </h1>
        <div
          style="display: flex; flex-direction: column; gap: 8px"
          :style="width > 800 ? 'width: 80%' : 'width: 100%'"
        >
          <p :style="`font-size: ${calculateFontParagraph()}`">{{ allMovie[0]?.overview }}</p>

          <div
            style="display: flex; flex-direction: row; gap: 1rem; align-items: center"
            :style="`${
              width > 800 ? 'font-size: 12px' : width > 500 ? 'font-size: 11px' : 'font-size: 10px'
            }`"
          >
            <div>TMDB Rating</div>
            <div>{{ allMovie[0]?.vote_average?.toFixed(2) }} / 10</div>
            <div
              v-if="width > 320"
              style="display: flex; flex-direction: row; gap: 1px; align-items: center"
            >
              <div
                v-for="(n, i) in 5"
                :key="i"
                style="display: flex; flex-direction: row; gap: 1px; align-items: center"
              >
                <font-awesome-icon
                  icon="fa-solid fa-star-half"
                  style="height: 17px; width: 17px; padding: 0"
                  v-if="countRating / 2 >= n - 0.5 && countRating / 2 < n"
                  class="checked"
                />
                <font-awesome-icon
                  icon="fa-solid fa-star-half"
                  style="height: 17px; width: 17px"
                  v-if="countRating / 2 >= n - 0.5 && countRating / 2 < n"
                  class="half-unchecked"
                />
                <font-awesome-icon
                  icon="fa-solid fa-star"
                  style="height: 16px; width: 16px"
                  v-else
                  :class="countRating / 2 >= n ? 'checked' : 'unchecked'"
                />
              </div>
            </div>
          </div>
          <div
            v-if="width <= 320"
            style="display: flex; flex-direction: row; gap: 1px; align-items: center"
          >
            <div
              v-for="(n, i) in 5"
              :key="i"
              style="display: flex; flex-direction: row; gap: 1px; align-items: center"
            >
              <font-awesome-icon
                icon="fa-solid fa-star-half"
                style="height: 17px; width: 17px; padding: 0"
                v-if="countRating / 2 >= n - 0.5 && countRating / 2 < n"
                class="checked"
              />
              <font-awesome-icon
                icon="fa-solid fa-star-half"
                style="height: 17px; width: 17px"
                v-if="countRating / 2 >= n - 0.5 && countRating / 2 < n"
                class="half-unchecked"
              />
              <font-awesome-icon
                icon="fa-solid fa-star"
                style="height: 16px; width: 16px"
                v-else
                :class="countRating / 2 >= n ? 'checked' : 'unchecked'"
              />
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="loading" class="featured-content-loader">
        <img :src="icon" alt="logo" style="height: 40px; width: 40px; padding: 0" />
        <div>Now Fetching Data...</div>
      </div>

      <!-- movie list  -->
      <div v-if="!loading" class="movie-list">
        <div style="align-self: flex-end">More movies ></div>
        <div style="display: flex; flex-direction: row; justify-content: space-between">
          <!-- movie list card -->
          <div v-for="(movie, i) in movieList" :key="i">
            <div
              class="movie-list-card"
              :style="
                `background-image: url(${IMG_API_POSTER + movie?.poster_path});` +
                `${
                  width > 800
                    ? 'width: 200px; height: 300px'
                    : width > 500
                    ? 'width: 150px; height: 225px'
                    : 'width: 100px; height: 150px'
                }`
              "
            ></div>
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
  width: 100%;
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
  height: 100%;
  min-height: 90vh;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  background-position: top;
}

.featured-content {
  height: 100%;
  display: flex;
  color: white;
  flex-direction: column;
  padding: 20px;
  gap: 2rem;
}

.checked {
  color: rgb(223, 223, 13);
}
.unchecked {
  color: rgb(205, 205, 205);
}
.half-unchecked {
  color: rgb(205, 205, 205);
  position: absolute;
  transform: scaleX(-1);
  -moz-transform: scaleX(-1);
  -webkit-transform: scaleX(-1);
  -ms-transform: scaleX(-1);
}

.selected-type {
  color: white;
}

.refresh-button {
  border-radius: 5px;
  padding: 5px 12px;
  outline: none;
  border: none;
  color: rgba(30, 30, 30, 1);
  background-color: white;
}
.refresh-button:hover {
  background-color: rgba(70, 70, 70, 1);
  color: white;
  cursor: pointer;
}

.toolbar-link:hover {
  text-decoration: underline;
  cursor: pointer;
}

.featured-content-loader {
  width: 100%;
  height: 100%;
  display: flex;
  color: white;
  flex-direction: column;
  padding: 20px;
  gap: 1rem;
  align-items: center;
}

.movie-list {
  color: white;
  margin: 50px 0px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.movie-list-card {
  color: white;
  padding: 10px;
  font-size: 12px;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center center;
}

.movie-list-card:hover {
  cursor: pointer;
  transition: all 0.2s ease;
  -webkit-transform: scale(1.05);
  -moz-transform: scale(1.05);
  -o-transform: scale(1.05);
  transform: scale(1.05);
  box-shadow:
    0 2px 8px 0 rgba(255, 255, 255, 0.3),
    0 2px 30px 0 rgba(255, 255, 255, 0.3);
}
</style>
