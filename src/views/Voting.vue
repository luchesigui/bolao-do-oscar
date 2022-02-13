<template>
  <swiper
    :modules="modules"
    :slides-per-view="1"
    :pagination="{ clickable: true }"
    class="pb-10 translate-y-3 w-full"
  >
    <swiper-slide v-for="categorie in categories">
      <h1 class="text-xl font-bold">{{ categorie.name }}</h1>
      <small class="block mb-5 italic">{{
        traducoes.get(categorie.name)
      }}</small>
      <form>
        <div class="nominee" v-for="nominee in categorie.nominees">
          <label
            class="block py-2 px-3 border border-stone-50 rounded my-2 focus:bg-[#fbb138] focus:text-black focus:font-bold focus:border-transparent transition-all"
            v-bind:class="{
              'bg-[#fbb138] text-black font-bold border-transparent':
                selectedNominees[categorie.name] === nominee.name,
            }"
          >
            <input
              type="radio"
              name="nominee"
              :value="nominee.name"
              v-model="selectedNominees[categorie.name]"
              class="mr-2"
            />
            {{ nominee.name }}
          </label>
        </div>
      </form>
    </swiper-slide>
  </swiper>
</template>

<script lang="ts">
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";

import "swiper/css";
import "swiper/css/pagination";

import { getCategories } from "../entities/categorie";

export default {
  name: "Voting",
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    return {
      modules: [Pagination],
    };
  },
  data() {
    return {
      selectedNominees: {},
      categories: [],
      traducoes: new Map([
        ["Best Picture", "Melhor Filme"],
        ["Best Director", "Melhor Direção"],
        ["Best Actor", "Melhor Ator"],
        ["Best Actress", "Melhor Atriz"],
        ["Best Supporting Actor", "Melhor Ator Coadjuvante"],
        ["Best Supporting Actress", "Melhor Atriz Coadjuvante"],
        ["Best Adapted Screenplay", "Melhor Roteiro Adaptado"],
        ["Best Original Screenplay", "Melhor Roteiro Original"],
        ["Best Animated Feature", "Melhor Animação"],
        ["Best International Feature", "Melhor Filme Estrangeiro"],
        ["Best Documentary Feature", "Melhor Documentário"],
        ["Best Cinematography", "Melhor Fotografia"],
        ["Best Film Editing", "Melhor Montagem"],
        ["Best Costume Design", "Melhor Figurino"],
        ["Best Makeup & Hairstyling", "Melhor Maquiagem e Penteado"],
        ["Best Original Score", "Melhor Trilha Sonora"],
        ["Best Original Song", "Melhor Canção"],
        ["Best Production Design", "Melhor Design de Produção"],
        ["Best Sound", "Melhor Som"],
        ["Best Visual Effects", "Melhores Efeitos Visuais"],
        ["Best Live Action Short", "Melhor Curta-Metragem"],
        ["Best Documentary Short", "Melhor Documentário Curta-Metragem"],
        ["Best Animated Short", "Melhor Animação Curta-Metragem"],
      ]),
    };
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

<style lang="css">
:root {
  --swiper-pagination-bullet-inactive-color: #fff;
  --swiper-pagination-color: #fbb138;
  --swiper-pagination-bullet-horizontal-gap: 2px;
}
</style>
