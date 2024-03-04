<template>
  <form @submit.prevent="() => onSelect(categoryId, selectedNomineeRef)">
    <div v-for="nominee in nominees" :key="nominee.id" class="nominee">
      <label
        class="my-2 block flex cursor-pointer rounded border border-stone-50 px-3 py-2 transition-all focus:border-transparent focus:bg-[#fbb138] focus:font-bold focus:text-black"
        :class="{
          'border-transparent bg-[#fbb138] font-bold text-black':
            selectedNomineeId === nominee.id,
        }"
      >
        <input
          v-model="selectedNomineeRef"
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
      class="mb-10 mt-2 w-full rounded bg-[#fbb138] px-2 py-2 font-bold uppercase tracking-widest disabled:border disabled:border-zinc-900 disabled:bg-zinc-600 disabled:text-zinc-400"
    >
      Votar
    </button>
  </form>
</template>

<script lang="ts" setup>
import { defineProps, ref } from 'vue';

import type { Category, Nominee } from '@/types';

type NomineeFormProps = {
  categoryId: Category['id'];
  nominees: Nominee[];
  onSelect: (
    categoryId: Category['id'],
    selectedNomineeId: Nominee['id'],
  ) => void;
  selectedNomineeId?: Nominee['id'];
};

const { categoryId, nominees, selectedNomineeId, onSelect } =
  defineProps<NomineeFormProps>();

const selectedNomineeRef = ref<Nominee['id'] | undefined>(selectedNomineeId);
</script>
