<template>
  <div class="container">
    <FormKit
      v-model="selectedCategory"
      type="select"
      label="Which country is the smallest?"
      :options="categoriesOptions"
    />

    <form v-if="nomineesOptions.length" @submit.prevent="setCategoryWinner">
      <div v-for="nominee in nomineesOptions" :key="nominee.id">
        <label
          class="my-2 flex cursor-pointer rounded border border-stone-50 px-3 py-2 transition-all focus:border-transparent focus:bg-[#fbb138] focus:font-bold focus:text-black"
          :class="{
            'border-transparent bg-[#fbb138] font-bold text-black':
              selectedNominee === nominee.movie.id,
          }"
        >
          <input
            v-model="selectedNominee"
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
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import { categoryService, nomineeService } from '../service';

const categoriesOptions = ref([
  {
    label: 'Select a category',
    value: '',
  },
]);
const selectedCategory = ref('');
const nomineesOptions = ref([]);
const selectedNominee = ref('');

async function setCategoryWinner() {
  await categoryService.setWinner(
    Number(selectedCategory.value),
    Number(selectedNominee.value),
  );
}

onMounted(async () => {
  const categories = await categoryService.getAll();

  categoriesOptions.value = [
    ...categoriesOptions.value,
    ...categories.map((category) => ({
      label: category.name,
      value: category.id.toString(),
    })),
  ];
});

watch(selectedCategory, async (categoryId) => {
  if (categoryId) {
    const nominees = await nomineeService.getByCategory(Number(categoryId));
    nomineesOptions.value = nominees;
    return;
  }

  nomineesOptions.value = [];
});
</script>
