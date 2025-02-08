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
        <category-name :category-name="category.category.name" />
        <nominee-form
          :category-id="category.id"
          :nominees="category.nominees"
          :selected-nominee-id="selectedNominees[category.id]"
          :on-select="voteForCategory"
        />
      </swiper-slide>
    </swiper>
  </div>
</template>

<script lang="ts" setup>
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { onMounted, reactive, ref } from 'vue';
import { useToast } from 'vue-toastification';

import 'swiper/css';
import 'swiper/css/pagination';

import CategoryName from '@/components/CategoryName.vue';
import NomineeForm from '@/components/nominee-form.vue';
import { categoryService, voteService } from '@/services';
import { useUserStore } from '@/stores';
import type { Category, CategoryWithNominees, Nominee, Vote } from '@/types';

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
      categoryHasBeenVoted ? 'voted' : ''
    }"></span>`;
  },
};

let selectedNominees = reactive<Record<Category['id'], Nominee['id']>>({});
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
  categoriesWithNominees.value =
    await categoryService.getCategorieWithNominees(categories);

  selectedNominees = currentVotes.reduce((acc, vote) => {
    const categoryId = vote.category;
    acc[categoryId] = vote.nominee;
    return acc;
  }, {});
});

async function voteForCategory(
  categoryId: Category['id'],
  selectedNomineeId: Nominee['id'],
) {
  const previousVoteForThisCategory = userVotes.value.find(
    (vote) => vote.category === categoryId,
  );

  selectedNominees[categoryId] = selectedNomineeId;

  const vote: Vote = {
    category: categoryId,
    nominee: selectedNomineeId,
    user: user.id,
  };

  if (previousVoteForThisCategory) {
    Object.assign(vote, { id: previousVoteForThisCategory.id });
  }

  await voteService.registerVote(vote);

  swiperInstance.value?.slideNext();

  toast.success(
    `Voto ${
      previousVoteForThisCategory ? 'atualizado' : 'registrado'
    } com sucesso`,
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
