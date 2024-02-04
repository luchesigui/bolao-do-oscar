<template>
  <swiper
    :modules="modules"
    :slides-per-view="1"
    :pagination="pagination"
    class="container pb-10 translate-y-3 w-full"
  >
    <swiper-slide v-for="categorie in categories">
      <h1 class="text-xl font-bold">{{ categorie.name }}</h1>
      <small class="block mb-5 italic">{{
        traducoes.get(categorie.name)
      }}</small>
      <form @submit.prevent="() => voteForCategorie(categorie.name)">
        <div class="nominee" v-for="nominee in categorie.nominees">
          <label
            class="cursor-pointer block py-2 px-3 border border-stone-50 rounded my-2 focus:bg-[#fbb138] focus:text-black focus:font-bold focus:border-transparent transition-all"
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
        <button
          type="submit"
          class="w-full mt-2 py-2 px-2 rounded bg-[#fbb138] uppercase tracking-widest font-bold disabled:bg-zinc-600 disabled:border disabled:border-zinc-900 disabled:text-zinc-400"
          :disabled="getIsVotingDisabled(categorie.name)"
        >
          Votar
        </button>
      </form>
    </swiper-slide>
  </swiper>
</template>

<script lang="ts">
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";

import "swiper/css";
import "swiper/css/pagination";

import {
  Category,
  getCategories,
  setCategoryWinner,
} from "../entities/category";
import { VoteType, getUserVotes, voteForNominee } from "../entities/vote";

interface Data {
  user: string;
  votes: VoteType[];
  pagination: any;
  categories: Category[];
  selectedNominees: { [key: string]: string };
  traducoes: Map<string, string>;
}

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
  data(): Data {
    return {
      user: localStorage.getItem("user") || "",
      votes: [],
      selectedNominees: {},
      pagination: {
        clickable: true,
      },
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
    async fetchCategories(): Promise<void> {
      const categories = await getCategories();
      this.categories = categories;
    },
    async voteForCategorie(categoryName: string): Promise<void> {
      const nominee = this.selectedNominees[categoryName];
      const voteFromThisCategory = this.votes.find(
        (vote: VoteType) => vote.category === categoryName
      );

      if (this.user === "admin") {
        const category = this.categories.find(
          (category: Category) => category.name === categoryName
        );
        setCategoryWinner(category, nominee);
      } else {
        if (!voteFromThisCategory) {
          const currentVote: VoteType = {
            category: categoryName,
            nominee,
            user: this.user,
          };

          const newVote = await voteForNominee(currentVote);
          this.votes.push(newVote);
        } else {
          const newVote = await voteForNominee({
            ...voteFromThisCategory,
            nominee,
          });

          this.votes.map((vote: VoteType) => {
            if (vote.category === categoryName) {
              vote.nominee = newVote.nominee;
            }
          });
        }
      }
    },
    async reloadLastVotes() {
      const stringfiedVotes = localStorage.getItem("votes");

      const votes = stringfiedVotes
        ? JSON.parse(stringfiedVotes)
        : await getUserVotes(this.user);

      this.votes = votes.map((vote: VoteType) => {
        this.selectedNominees[vote.category] = vote.nominee;
        return vote;
      });
    },
    getIsVotingDisabled(categoryName: string): boolean {
      const selectedNominee = this.selectedNominees[categoryName];
      if (!selectedNominee) {
        return true;
      }

      const voteFromThisCategory = this.votes.find(
        (vote: VoteType) => vote.category === categoryName
      );

      const votedNominee = voteFromThisCategory
        ? voteFromThisCategory.nominee
        : "";

      const hasChangedVote =
        !voteFromThisCategory || votedNominee !== selectedNominee;

      return !hasChangedVote;
    },
  },
  watch: {
    votes: function (newVotes: VoteType[]) {
      const stringfiedVotes = JSON.stringify(newVotes);
      localStorage.setItem("votes", stringfiedVotes);
    },
  },
  created(): void {
    this.fetchCategories();
    this.reloadLastVotes();
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
