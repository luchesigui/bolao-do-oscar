<template>
  <div class="container">
    <swiper
      :modules="modules"
      :slides-per-view="1"
      :pagination="paginationOptions"
      @swiper="onSwiper"
    >
      <swiper-slide
        v-for="category in categoriesWithNominees"
        :key="category.id"
      >
        <category-name :category-name="category.name" />

        <form @submit.prevent="() => voteForCategory(category.id)">
          <div
            v-for="nominee in category.nominees"
            :key="nominee.id"
            class="nominee"
          >
            <label
              class="flex cursor-pointer block py-2 px-3 border border-stone-50 rounded my-2 focus:bg-[#fbb138] focus:text-black focus:font-bold focus:border-transparent transition-all"
              :class="{
                'bg-[#fbb138] text-black font-bold border-transparent':
                  selectedNominees[category.id] === nominee.movie.id,
              }"
            >
              <input
                v-model="selectedNominees[category.id]"
                type="radio"
                name="nominee"
                :value="nominee.id"
                class="mr-3"
              />

              <div v-if="nominee.name" class="inline-flex flex-col">
                {{ nominee.name }}
                <small class="italic">{{ nominee.movie.name }}</small>
              </div>
              <span v-else>{{ nominee.movie.name }}</span>
            </label>
          </div>

          <button
            type="submit"
            class="w-full mt-2 mb-10 py-2 px-2 rounded bg-[#fbb138] uppercase tracking-widest font-bold disabled:bg-zinc-600 disabled:border disabled:border-zinc-900 disabled:text-zinc-400"
          >
            Votar
          </button>
        </form>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script lang="ts" setup>
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
import { onMounted, reactive, ref } from "vue";
import { useToast } from "vue-toastification";

import "swiper/css";
import "swiper/css/pagination";

import CategoryName from "../components/CategoryName.vue";
import { categoryService, voteService } from "../service";
import { useUserStore } from "../stores/user";
import type { Category, CategoryWithNominees, Vote } from "../types/";

const { user } = useUserStore();
const toast = useToast();

const modules = [Pagination];

const paginationOptions = {
  clickable: true,
  renderBullet(index: number, className: string) {
    const category = categoriesWithNominees.value[index];
    const categoryHasBeenVoted = category
      ? selectedNominees[category.id]
      : false;

    return `<span class="${className} ${
      categoryHasBeenVoted ? "voted" : ""
    }"></span>`;
  },
};

let selectedNominees = reactive({});
const categoriesWithNominees = ref<CategoryWithNominees[]>([]);
const userVotes = ref<Vote[]>([]);
const swiperInstance = ref<typeof Swiper>();

const onSwiper = (swiper: typeof Swiper) => {
  swiperInstance.value = swiper;
};

onMounted(async () => {
  const [categories, currentVotes] = await Promise.all([
    categoryService.getAll(),
    voteService.getUserVotes(user.id),
  ]);

  userVotes.value = currentVotes;
  categoriesWithNominees.value = await categoryService.getCategorieWithNominees(
    categories
  );

  selectedNominees = currentVotes.reduce((acc, vote) => {
    const categoryId =
      typeof vote.category === "number" ? vote.category : vote.category.id;

    acc[categoryId] = vote.nominee;
    return acc;
  }, {});
});

async function voteForCategory(category: Category["id"]) {
  const previousVoteForThisCategory = userVotes.value.find(
    (vote) => vote.category === category
  );

  const vote: Vote = {
    category,
    nominee: selectedNominees[category],
    user: user.id,
  };

  if (previousVoteForThisCategory) {
    Object.assign(vote, { id: previousVoteForThisCategory.id });
  }

  await voteService.registerVote(vote);

  swiperInstance.value?.slideNext();

  toast.success(
    `Voto ${
      previousVoteForThisCategory ? "atualizado" : "registrado"
    } com sucesso`
  );
}
</script>

<style lang="css">
:root {
  --swiper-pagination-bullet-inactive-color: #fff;
  --swiper-pagination-color: #fbb138;
  --swiper-pagination-bullet-horizontal-gap: 2px;
}

.voted.swiper-pagination-bullet-active {
  opacity: 1;
}

.voted {
  background-color: var(--swiper-pagination-color);
  opacity: 0.4;
}
</style>
