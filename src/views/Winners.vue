<template>
  <div class="container">
    <FormKit
      type="select"
      label="Which country is the smallest?"
      v-model="selectedCategory"
      :options="categoriesOptions"
    />

    <form @submit.prevent="setCategoryWinner" v-if="nomineesOptions.length">
      <div v-for="nominee in nomineesOptions">
        <label
          class="flex cursor-pointer block py-2 px-3 border border-stone-50 rounded my-2 focus:bg-[#fbb138] focus:text-black focus:font-bold focus:border-transparent transition-all"
          v-bind:class="{
            'bg-[#fbb138] text-black font-bold border-transparent':
              selectedNominee === nominee.movie.id,
          }"
        >
          <input
            type="radio"
            name="nominee"
            :value="nominee.id"
            v-model="selectedNominee"
            class="mr-3"
          />

          <div class="inline-flex flex-col" v-if="nominee.name">
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
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import { categoryService, nomineeService } from "../service";

const categoriesOptions = ref([]);
const selectedCategory = ref("");
const nomineesOptions = ref([]);
const selectedNominee = ref("");

async function setCategoryWinner() {
  await categoryService.setWinner(
    Number(selectedCategory.value),
    Number(selectedNominee.value)
  );
}

onMounted(async () => {
  const categories = await categoryService.getAll();

  categoriesOptions.value = [
    {
      label: "Select a category",
      value: "",
    },
    ...categories.map((category) => ({
      label: category.name,
      value: category.id,
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
