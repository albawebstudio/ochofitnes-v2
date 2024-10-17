import { ref } from 'vue'
import type { Contact } from '~/models/contact'

export function useContactData() {
    const contact = ref<Contact>({
        title: "Feel free to ask anything",
        content: [
            "Transform your fitness and well-being with Ocho Fitness! Whether you need personal training, sports massage, or online coaching, Jovani Morales will help you build strength, stay flexible, and move pain-free—let’s reach your goals together!"
        ]
    })

    return {
        contact
    }
}
