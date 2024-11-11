<script setup lang="ts">
import { ref, shallowRef, onMounted } from "vue"
import { useGetStartedData } from "~/composables/useGetStartedData"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import BaseModal from "~/components/common/BaseModal.vue";
import ScheduleForm from "~/components/common/ScheduleForm.vue";

interface FormData {
  name: string,
  email: string,
  telephone: string,
  sessionType: string,
  dayOption: string[],
  timeOption: string[],
  conditions: string,
}

const config = useRuntimeConfig()
const apiUrl = config.public.apiUrl

const getInitialFormData = (): FormData => ({
  name: "",
  email: "",
  telephone: "",
  sessionType: "",
  dayOption: [],
  timeOption: [],
  conditions: "",
});
const form = ref<FormData>(getInitialFormData());
const resetForm = () => {
  form.value = getInitialFormData();
};

const showModal = shallowRef(false)
const showSuccess = shallowRef(false)
const target = ref([])
const isVisible = shallowRef(false)
const { getStarted } = useGetStartedData()

const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0
}

const handleIntersection = (entries: IntersectionObserverEntry[]) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      isVisible.value = true
      entry.target.childNodes.forEach(child => {
        setTimeout(() => {
          child.classList.remove('opacity-0')
        }, 1000)
      })
    }
  })
}

onMounted(() => {
  const observer = new IntersectionObserver(handleIntersection, options)
  observer.observe(target.value)
})

const formatFormData = () => {
    const {name, email, telephone, sessionType, dayOption, timeOption, conditions} = form.value;
    const formattedData = {
        name,
        email,
        telephone,
        sessionType,
        dayOptionString: dayOption.join(', '),
        timeOptionString: timeOption.join(', '),
        conditions,
    };
    return formattedData;
};

const submitForm = async () => {
  try{
    const formData = formatFormData();
    const response = await fetch(`${apiUrl}/schedule-session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    } )
    if (!response.ok) {
      throw new Error('Failed to submit form');
    }
    resetForm()
    showModal.value = false
    showSuccess.value = true
  } catch (e) {
    console.error(e);
  }
}
const cancelForm = () => {
    showModal.value = false;
}
</script>

<template>
  <section id="get-started" class="bg-black text-primary-100 py-16 sm:py-24 lg:py-32">
    <div ref="target" class="mx-auto grid max-w-5xl grid-cols-1 gap-10 px-6 lg:grid-cols-12 lg:gap-8 lg:px-8">
      <div v-show="isVisible" class="max-w-xl tracking-tight text-white lg:col-span-7 opacity-0 animate-fadeinup" data-observe>
        <h2 class="text-3xl sm:text-4xl font-bold mb-4">{{ getStarted.title }}</h2>
        <p v-for="content in getStarted.content" class="text-slate-300 tracking-wide py-6" v-html="content"></p>
        <button
            v-if="!showSuccess"
            type="submit"
            class="flex-none w-full rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            @click="showModal = true">{{ getStarted.cta }}</button>
        <h3 v-if="showSuccess" class="text-green-600 text-lg font-bold"><FontAwesomeIcon icon="fas fa-circle-check" title="success" /> Schedule Sent Successfully!</h3>
      </div>
      <div v-show="isVisible" class="w-full max-w-md pl-2 lg:col-span-5 lg:pt-2 opacity-0 animate-fadeinup" data-observe>
        <p class="mb-6 font-bold leading-6 text-gray-300">{{ getStarted.subtitle }}</p>
        <ul class="list-none text-slate-300">
          <template v-for="list_item in getStarted.list">
            <li class="my-4">{{ list_item }}</li>
          </template>
        </ul>
      </div>
    </div>
  </section>
  <BaseModal :show="showModal">
    <div class="p-12">
      <ScheduleForm
          v-model:name="form.name"
          v-model:email="form.email"
          v-model:telephone="form.telephone"
          v-model:sessionType="form.sessionType"
          v-model:dayOption="form.dayOption"
          v-model:timeOption="form.timeOption"
          v-model:conditions="form.conditions"
          @submit="submitForm"
          @cancel="cancelForm"
      />
    </div>
  </BaseModal>
</template>

<style scoped>

</style>
