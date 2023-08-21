<template>
    <!-- The button to open modal -->
    <label :for="index" class=" bg-lime-600 p-1 rounded-md text-white">Edit</label>

    <!-- Put this part before </body> tag -->
    <input type="checkbox" :id="index" class="modal-toggle" />
    <div class="modal">
        <div class="modal-box">
            <div class="mb-2 text-center text-lime-600 text-2xl font-bold">
                EDIT DATA
            </div>
            <form @submit.prevent="submitForm">
                <div class="px-2 overflow-y-auto max-h-[500px]">
                    <div v-for="data in formFormat" class="mb-2">
                        <label>{{ data.label }}</label><br>
                        <input class="w-full p-2 rounded-md border" v-if="data.type === 'text'" type="text"
                            :placeholder="data.label" v-model="formData[data.name]" :name="data.name" required />
                        <input class="w-full p-2 rounded-md border" v-else-if="data.type === 'number'" type="number"
                            :placeholder="data.label" v-model="formData[data.name]" :name="data.name" required />
                        <select class="w-full p-2 rounded-md border" v-model="formData[data.name]" :name="data.name"
                            v-else-if="data.type === 'select'" required>
                            <option v-for="option in data.options" :value="option.val" :key="option.val">{{ option.opt }}
                            </option>

                        </select>
                        <div v-else-if="data.type === 'checkbox'" class="flex gap-5">
                            <div>
                                Hari
                                <div v-for="(day, index) in data.hari" :key="index">
                                    <div class="flex gap-1">
                                        <input :id="`day-${index}`" type="checkbox" v-model="formData[day]" :value="day" />
                                        <label :for="`day-${index}`">{{ day }}</label>
                                    </div>
                                </div>
                            </div>
                            <div>
                                Sesi
                                <div v-for="(sesi, index) in data.sesi" :key="index">
                                    <div class="flex gap-1">
                                        <input :id="`sesi-${index}`" type="checkbox" v-model="formData[sesi]"
                                            :value="sesi" />
                                        <label :for="`sesi-${index}`">{{ sesi }}</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-action ">
                    <div class="btn bg-cyan-600 hover:bg-cyan-400 text-white">
                        <label :for="index">
                            <button type="submit">
                                EDIT
                            </button>
                        </label>


                    </div>
                    <label :for="index" class="btn bg-red-600 hover:bg-red-400 text-white">CLOSE</label>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
const emit = defineEmits(['inFocus', 'submit'])
let show = true

const props = defineProps(
    [
        'table',
        'datas',
        'formFormat',
        'index'
    ]
)

const formData = ref({
    ...props.datas
})

const submitForm = () => {
    // Emit the form data to the parent component
    emit('formSubmitted', formData.value);
};

</script>