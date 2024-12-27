<script setup lang="ts">
interface Props {
  name: string;
  email: string;
  telephone: string;
  sessionType: string;
  dayOption: Array<string>;
  timeOption: Array<string>;
  conditions: string;
}
defineProps<Props>()

const sessionTypeOptions = [
  { value: 'sports massage', label: 'Sports Massage' },
  { value: 'individual training', label: 'Individual Training' },
  { value: 'online training', label: 'Online Training' },
  { value: 'group training', label: 'Group Training' }
]
const dayOptions = [
  { value: 'Sunday', label: 'Sunday' },
  { value: 'Monday', label: 'Monday' },
  { value: 'Tuesday', label: 'Tuesday' },
  { value: 'Wednesday', label: 'Wednesday' },
  { value: 'Thursday', label: 'Thursday' },
  { value: 'Friday', label: 'Friday' },
  { value: 'Saturday', label: 'Saturday' },
]

const buildTimes = () => {
  const interval = 30,
      meridiem = ['AM', 'PM']
  let times = [],
      startTime = 420

  const endTime = 20
  //loop to increment the time and push results in array

  for ( let i=0; startTime < (endTime * 60); i++ ) {
    let hours = Math.floor(startTime/60)
    let minutes = (startTime%60)
    const displayHour = (hours !== 12) ? (hours % 12) : 12
    let _time = displayHour + ':' + ("0" + minutes).slice(-2) + meridiem[Math.floor(hours/12)]
    times[i] =  { value: _time, label: _time }
    startTime = startTime + interval
  }
  return times
}
const times = buildTimes()

const emit = defineEmits<{
  (e: 'update:name', value: string): void
  (e: 'update:email', value: string): void
  (e: 'update:telephone', value: string): void
  (e: 'update:sessionType', value: string[]): void
  (e: 'update:dayOption', value: string[]): void
  (e: 'update:timeOption', value: string[]): void
  (e: 'update:conditions', value: string): void
  (e: 'submit'): void
  (e: 'cancel'): void
}>()

const updateName = (event: Event) => {
  emit('update:name', (event.target as HTMLInputElement).value);
}

const updateEmail = (event: Event) => {
  emit('update:email', (event.target as HTMLInputElement).value);
}

const updateTelephone = (event: Event) => {
  emit('update:telephone', (event.target as HTMLInputElement).value);
}

const updateSessionType = (value: string[]) => {
  emit('update:sessionType', value);
}

const updateDayOption = (value: string[]) => {
  emit('update:dayOption', value)
}

const updateTimeOption = (value: string[]) => {
  emit('update:timeOption', value);
}

const updateConditions = (event: Event) => {
  emit('update:conditions', (event.target as HTMLTextAreaElement).value);
}

const submitForm = () => {
  emit('submit');
};
const cancelForm = () => {
    emit('cancel');
};
</script>

<template>
  <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
    <h2 class="text-3xl font-bold">Session Schedule Form</h2>
    <button @click="cancelForm" type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
      <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
      </svg>
      <span class="sr-only">Close modal</span>
    </button>
  </div>

  <Vueform :endpoint="false" @submit="submitForm" class="mt-6 space-y-8">

    <TextElement
        :value="name"
        @input="updateName"
        name="name"
        label="Full Name"
        rules="required"
        autocomplete="on"
    />

    <TextElement
        :value="email"
        @input="updateEmail"
        name="email"
        label="Your Email"
        rules="required"
        autocomplete="on"
    />

    <TextElement
        :value="telephone"
        @input="updateTelephone"
        name="telephone"
        label="Your Telephone"
        placeholder="Your Phone Number"
        rules="required"
    />

    <SelectElement
        :value="sessionType"
        @change="updateSessionType"
        name="sessionType"
        label="Session Type"
        :search="true"
        :native="false"
        input-type="search"
        autocomplete="disabled"
        placeholder="Select a session type"
        :items="sessionTypeOptions"
        :rules="['required',]"
    />

    <TagsElement
        :value="dayOption"
        @change="updateDayOption"
        name="dayOption"
        label="Choose two or three possible days for session."
        rules="required|max:3"
        description="Select up to 3"
        :search="true"
        :items="dayOptions"
    />

    <TagsElement
        :value="timeOption"
        @change="updateTimeOption"
        name="timeOption"
        label="Choose up to five possible times for session."
        rules="required|max:5"
        description="Select up to 5"
        :search="true"
        :items="times"
    />

    <TextareaElement
        :value="conditions"
        @input="updateConditions"
        name="conditions"
        label="Let us know if you have any injuries or medical conditions."
        placeholder="Injuries or Medical Conditions"
    />

    <CheckboxElement
        name="terms"
        text=""
        rules="required"
    >
      <slots name="customDescription">I accept the <NuxtLink to="/legal/terms-and-conditions" :external=true title="Terms and Conditions">Terms & Conditions</NuxtLink></slots>
    </CheckboxElement>

    <StaticElement
        name="divider_1"
        tag="hr"
    />

    <GroupElement name="action-group">
      <ButtonElement
          name="cancel"
          @click="cancelForm"
          secondary
          button-label="Cancel"
          size="lg"
          :columns="{
          container: 6,
          label: 12,
          wrapper: 12,
        }"
      />

      <ButtonElement
          name="schedule"
          :submits="true"
          button-label="Schedule Session"
          size="lg"
          button-class="bg-primary-500 hover:bg-primary-600 text-white"
          align="right"
          :columns="{
          container: 6,
          label: 12,
          wrapper: 12,
        }"
      />
    </GroupElement>


  </Vueform>
</template>

<style scoped>

</style>
