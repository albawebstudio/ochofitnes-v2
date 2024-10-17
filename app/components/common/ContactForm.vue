<script setup lang="ts">
interface Props {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: 'update:name', value: string): void
  (e: 'update:email', value: string): void
  (e: 'update:subject', value: string): void
  (e: 'update:message', value: string): void
  (e: 'submit'): void
}>();

const updateName = (event: Event) => {
  emit('update:name', (event.target as HTMLInputElement).value);
};

const updateEmail = (event: Event) => {
  emit('update:email', (event.target as HTMLInputElement).value);
};

const updateSubject = (event: Event) => {
  emit('update:subject', (event.target as HTMLInputElement).value);
};

const updateMessage = (event: Event) => {
  emit('update:message', (event.target as HTMLTextAreaElement).value);
};

const submitForm = () => {
  emit('submit');
};
</script>

<template>
  <form @submit.prevent="submitForm" class="space-y-8">
    <div>
      <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Full Name</label>
      <input :value="name"
             @input="updateName"
             type="text"
             id="name"
             class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
             placeholder="Terrified Tim"
             required>
    </div>
    <div>
      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label>
      <input :value="email"
             @input="updateEmail"
             type="email"
             id="email"
             class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
             placeholder="boo@example.com"
             required>
    </div>
    <div>
      <label for="subject" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Subject</label>
      <input :value="subject"
             @input="updateSubject"
             type="text"
             id="subject"
             class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
             placeholder="Let us know how we can help you"
             required>
    </div>
    <div class="sm:col-span-2">
      <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Your message</label>
      <textarea :value="message"
                @input="updateMessage"
                id="message"
                rows="6"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Your message..."></textarea>
    </div>
    <button type="submit" class="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Send message</button>
  </form>
</template>

<style scoped>

</style>
