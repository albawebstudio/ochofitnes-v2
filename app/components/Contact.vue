<script setup lang="ts">
import { ref, shallowRef } from 'vue';
import { GoogleMap, CustomMarker, InfoWindow} from "vue3-google-map";
import { useGoogleMapData } from "~/composables/useGoogleMapData"
import { useSiteData } from "~/composables/useSiteData"
import { useContactData } from "~/composables/useContactData";
import Spinner from "~/components/common/Spinner.vue";
import Success from "~/components/common/Success.vue";
import ContactForm from "~/components/common/ContactForm.vue";
import LogoSvg from "~/public/logo-monochrome.svg";

const config = useRuntimeConfig()
const googleMapsApiKey = config.public.googleMapsApiKey
const apiUrl = config.public.apiUrl

const {
  mapOptions,
  markerOptions
} = useGoogleMapData()
const { contact } = useContactData()
const { site, phone, getEmailByAccount, getAddressByLabel } = useSiteData()
const email = getEmailByAccount('jovani')
const address = getAddressByLabel("work")

interface FormData {
  name: string,
  subject: string,
  email: string,
  message: string,
}

const showSpinner = shallowRef(false);
const showSuccess = shallowRef(false);
const showForm = computed(() => !showSuccess.value && !showSpinner.value);

const getInitialFormData = (): FormData => ({
  name: "",
  subject: "",
  email: "",
  message: "",
});

const form = ref<FormData>(getInitialFormData());

const resetForm = () => {
  form.value = getInitialFormData();
};

const isFormValid = computed(() => {
  return form.value.name.trim() &&
      form.value.email.trim() &&
      form.value.subject.trim() &&
      form.value.message.trim();
});

const submitForm = async () => {
  showSpinner.value = true
  // validate
  if (!isFormValid) {
    showSpinner.value = false
    return;
  }
  try{
    const response = await fetch(`${apiUrl}/contact-form`, {
      method: "POST",
      body: JSON.stringify(form),
    } )
    if (!response.ok) {
      throw new Error('Failed to submit form');
    }
    resetForm()
    showSpinner.value = false
    showSuccess.value = true
  } catch (e) {
    console.log(e);
    showSpinner.value = false
  }
}
const clearSuccess = () => {
  resetForm()
  showSuccess.value=false
}
</script>

<template>
  <section id="contact-us" class="bg-white dark:bg-gray-900">
    <div class="container px-6 py-12 mx-auto">
      <div class="text-center w-2/3 mx-auto">
        <h2 class="text-4xl leading-relaxed font-bold tracking-tight text-primary-700 dark:text-primary-500">{{ contact.title }}</h2>
        <p v-for="content in contact.content" class="mt-3 text-gray-500 dark:text-gray-400" v-html="content"></p>
        <address class="text-tertiary-700 dark:text-tertiary-500 mt-4">{{ address.address1 }}, {{ address.city }}, {{ address.state }} {{ address.postal_code }}</address>
      </div>

      <div class="grid grid-cols-1 gap-12 mt-10 lg:grid-cols-2">
        <div class="grid grid-cols-1 gap-6">
          <div>
            <span class="inline-block p-3 text-primary-500 rounded-full bg-blue-100/80 dark:bg-gray-800" aria-description="email">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                     stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/>
              </svg>
            </span>
            <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">Our email</p>
            <p class="mt-2 text-sm text-primary-500 dark:text-primary-400">{{ email.account }}-dot-{{ email.domain}}</p>
          </div>

          <div>
            <span class="inline-block p-3 text-primary-500 rounded-full bg-blue-100/80 dark:bg-gray-800">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"/>
              </svg>
            </span>
            <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">Our Phone</p>
            <p class="mt-2 text-sm text-primary-500 dark:text-primary-400"><NuxtLink :to="'tel:' + phone.raw" external>{{ phone.formatted }}</NuxtLink></p>
          </div>

          <Spinner v-if="showSpinner" />

          <ContactForm
              v-if="showForm"
              v-model:name.trim="form.name"
              v-model:email.trim="form.email"
              v-model:subject.trim="form.subject"
              v-model:message.trim="form.message"
              @submit="submitForm"
          />

          <Success @updateClearSuccess="clearSuccess"
                   v-if="showSuccess" />

        </div>

        <div class="overflow-hidden rounded-lg h-96 lg:h-auto">
          <GoogleMap
              :api-key="googleMapsApiKey"
              :styles="mapOptions.styles"
              style="width: 100%; height: 100%"
              :center="mapOptions.center"
              :zoom="mapOptions.zoom"
          >
            <CustomMarker :options="markerOptions">
              <div style="text-align: center">
                <div style="font-size: 1.125rem">{{ site.title }}</div>
                <LogoSvg :fontControlled="false" width="74" height="74" />
              </div>
              <InfoWindow>
                <div id="content">
                  <div id="siteNotice"></div>
                  <h4>{{ site.title }}</h4>
                  <p>{{ site.tagLine }}</p>
                </div>
              </InfoWindow>
            </CustomMarker>
          </GoogleMap>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>
