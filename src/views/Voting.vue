<template>
  <swiper :slides-per-view="1" :space-between="50">
    <swiper-slide v-for="categorie in categories">
      <h2>{{ categorie.name }}</h2>
      <form>
        <div class="nominee" v-for="nominee in categorie.nominees">
          <input
            :id="`nominee-${nominee.name}`"
            type="radio"
            name="nominee"
            :value="nominee.name"
            v-model="selectedNominees[categorie.name]"
          />
          <label :for="`nominee-${nominee.name}`">{{ nominee.name }}</label>
        </div>
      </form>
    </swiper-slide>
  </swiper>
</template>

<script lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";

import { getCategories } from "../entities/categorie";

export default {
  name: "Voting",
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      selectedNominees: {},
      categories: [],
    };
  },
  watch: {
    categories(cat) {
      console.log("categories changed", cat);
    },
  },
  methods: {
    async fetchCategories() {
      const categories = await getCategories();
      this.categories = categories;
    },
  },
  created() {
    this.fetchCategories();
  },
};
</script>
