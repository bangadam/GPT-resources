<template>
  <div id="scrollspy-1">
    <!-- Hero -->
    <div class="relative overflow-hidden">
      <div class="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-10" id="first">
        <div class="max-w-2xl text-center mx-auto">
          <h1
            class="block text-3xl font-bold text-gray-800 sm:text-4xl md:text-5xl dark:text-white leading-6"
          >
            Explore Largest Directory of
            <span class="text-blue-600">ChatGPTs</span>
          </h1>
        </div>
        <!-- full search input -->
        <div class="mt-6">
          <div class="relative">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3">
              <!-- search icon svg -->
              <svg
                class="w-5 h-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M8.5 15a6.5 6.5 0 100-13 6.5 6.5 0 000 13zM15.56 14.44a1 1 0 11-1.42 1.42l-3.44-3.43a7 7 0 111.42-1.42l3.44 3.43z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
            <input
              @input="searchContents"
              class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
              placeholder="Search"
            />
          </div>
        </div>

        <!-- all category -->
        <div class="my-4">
          <button
            @click="filterByCategory"
            class="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-md text-md font-medium border border-gray-200 bg-white text-gray-800 shadow-sm dark:bg-slate-900 dark:border-gray-700 dark:text-white"
          >
            All
          </button>
          <button
            @click="filterByCategory"
            v-for="(v, k) in categories"
            :key="k"
            class="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-md text-md font-medium border border-gray-200 bg-white text-gray-800 shadow-sm dark:bg-slate-900 dark:border-gray-700 dark:text-white m-2"
          >
            {{ v }}
          </button>
        </div>
      </div>
    </div>
    <!-- End Hero -->

    <!-- Card Blog -->
    <div class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-12 mx-auto">
      <!-- Grid -->
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Card -->
        <div
          v-for="(content, index) in contents"
          :key="index"
          class="group flex flex-col h-full bg-white border border-gray-200 shadow-lg rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-800"
        >
          <div class="p-4 md:p-6">
            <h3
              class="text-xl font-semibold text-gray-800 dark:text-gray-300 dark:hover:text-white"
            >
              {{ content.title }}
            </h3>
            <p class="mt-3 text-gray-500">
              {{ content.text }}
            </p>
          </div>
          <div class="bottom-0 mb-2">
            <div
              v-for="(category, index) in content.category"
              :key="index"
              class="inline-flex shadow-sm ml-2 flex-nowrap items-center bg-white border border-gray-200 rounded-full p-1.5 pe-3 dark:bg-slate-900 dark:border-gray-700"
            >
              <div
                class="whitespace-nowrap text-sm font-medium text-gray-800 dark:text-white"
              >
                {{ category }}
              </div>
            </div>
          </div>

          <div
            class="mt-auto flex border-t border-gray-200 divide-x divide-gray-200 dark:border-gray-700 dark:divide-gray-700"
          >
            <a
              class="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-es-xl bg-gray-100 text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              :href="content.url + '?ref=bangadam.scape'"
              target="_blank"
            >
              View site
            </a>
          </div>
        </div>
        <!-- End Card -->
      </div>
      <!-- End Grid -->
    </div>
    <!-- End Card Blog -->
  </div>
</template>

<script>
export default {
  name: "Content",
  data() {
    return {
      contents: [],
      categories: [],
    };
  },
  mounted() {
    this.loadContents();
  },
  methods: {
    async loadContents() {
      let data = await fetch("/data.json");
      let contents = await data.json();
      this.contents = contents.map((content) => {
        content.category = this.stringToArr(content.category);
        return content;
      });
      this.categories = this.contents
        .map((content) => content.category)
        .flat()
        .filter((v, i, a) => {
          if (v === "") return false;
          return a.indexOf(v) === i;
        });
    },
    async searchContents(event) {
      let keyword = event.target.value;
      let data = await fetch("/data.json");
      let contents = await data.json();
      this.contents = contents
        .filter((content) => {
          return (
            content.title.toLowerCase().includes(keyword.toLowerCase()) ||
            content.text.toLowerCase().includes(keyword.toLowerCase())
          );
        })
        .map((content) => {
          content.category = this.stringToArr(content.category);
          return content;
        });
    },
    async filterByCategory(event) {
      let category = event.target.innerText;
      let data = await fetch("/data.json");
      let contents = await data.json();
      if (category === "All") {
        this.contents = contents.map((content) => {
          content.category = this.stringToArr(content.category);
          return content;
        });
      } else {
        this.contents = contents
          .filter((content) => content.category.includes(category))
          .map((content) => {
            content.category = this.stringToArr(content.category);
            return content;
          });
      }
    },
    stringToArr(str) {
      return str.split("; ");
    },
  },
};
</script>
