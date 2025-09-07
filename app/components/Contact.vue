<script setup lang="ts">
import { ref, shallowRef } from 'vue';
import { useSiteData } from "~/composables/useSiteData"
import { useContactData } from "~/composables/useContactData";
import Spinner from "~/components/common/Spinner.vue";
import Success from "~/components/common/Success.vue";
import ContactForm from "~/components/common/ContactForm.vue";
import LogoSvg from "~/public/logo-monochrome.svg";

const config = useRuntimeConfig()
const apiUrl = config.public.apiUrl

const { contact, labels } = useContactData()
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
      body: JSON.stringify(form.value),
    } )
    if (!response.ok) {
      throw new Error('Failed to submit form');
    }
    resetForm()
    showSpinner.value = false
    showSuccess.value = true
  } catch (e) {
    console.error(e);
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
    <div class="my-6">
      <div class="grid sm:grid-cols-2 items-center gap-16 p-8 mx-auto max-w-4xl bg-white shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md text-[#333] font-[sans-serif]">
        <div>
          <h1 class="text-3xl font-extrabold">{{ contact.title }}</h1>
          <p v-for="content in contact.content" class="text-sm text-gray-400 mt-3" v-html="content"></p>
          <div class="mt-12">
            <h2 class="text-lg font-extrabold">{{ labels.email }}</h2>
            <ul class="mt-3">
              <li class="flex items-center">
                <div class="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill='#007bff'
                       viewBox="0 0 479.058 479.058">
                    <path
                        d="M434.146 59.882H44.912C20.146 59.882 0 80.028 0 104.794v269.47c0 24.766 20.146 44.912 44.912 44.912h389.234c24.766 0 44.912-20.146 44.912-44.912v-269.47c0-24.766-20.146-44.912-44.912-44.912zm0 29.941c2.034 0 3.969.422 5.738 1.159L239.529 264.631 39.173 90.982a14.902 14.902 0 0 1 5.738-1.159zm0 299.411H44.912c-8.26 0-14.971-6.71-14.971-14.971V122.615l199.778 173.141c2.822 2.441 6.316 3.655 9.81 3.655s6.988-1.213 9.81-3.655l199.778-173.141v251.649c-.001 8.26-6.711 14.97-14.971 14.97z"
                        data-original="#000000" />
                  </svg>
                </div>
                <div class="ml-4">
                  <small class="block">{{ labels.email }}</small>
                  <strong>{{ email.account }}-dot-{{ email.domain}}</strong>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div>
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

<!--        <form action="https://fabform.io/f/xxxxx" method="post" class="ml-auo space-y-4">
          <input type='text' name ="name" placeholder='Name'
                 class="w-full rounded-md py-2.5 px-4 border text-sm outline-[#007bff]" />
          <input type='email'
                 name='email'
                 placeholder='Email'
                 class="w-full rounded-md py-2.5 px-4 border text-sm outline-[#007bff]" />
          <input type='text' placeholder='Subject'
                 name='subject'                         class="w-full rounded-md py-2.5 px-4 border text-sm outline-[#007bff]" />
          <textarea placeholder='Message' rows="6"
                    name='message'
                    class="w-full rounded-md px-4 border text-sm pt-2.5 outline-[#007bff]"></textarea>
          <button type='button' type="submit"
                  class="text-white bg-[#007bff] hover:bg-blue-600 font-semibold rounded-md text-sm px-4 py-2.5 w-full">Send</button>
        </form>-->
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>
