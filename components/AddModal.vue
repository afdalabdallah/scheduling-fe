<template>
    <!-- The button to open modal -->
    <div style="">
        <label :for="table" class="hidden sm:block add-btn bg-[#0081C9] rounded-[5px] px-1 py-[4px]  text-white">+
            Tambah
        </label>
        <label :for="table"
            class="sm:hidden text-center block add-btn bg-[#0081C9] rounded-[5px] px-1 py-[4px] max-[499px]:w-full  text-white">
            +
        </label>
    </div>

    <!-- Put this part before </body> tag -->
    <input type="checkbox" :id="table" class="modal-toggle" />
    <div class="modal">
        <div class="modal-box">
            <!-- MODAL CONTENT -->
            <label :for="table" class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
            <div class="mb-2 text-center text-cyan-400 text-2xl font-bold">
                TAMBAH {{ formTitle }}
            </div>
            <form @submit.prevent="submitForm">
                <div class="px-2 overflow-y-auto max-h-[500px]">
                    <div v-for="data in formFormat" class="mb-2">
                        <label>{{ data.label }}</label><br>
                        <input class="w-full p-2 rounded-md border" v-if="data.type === 'text'" type="text"
                            :placeholder="data.label" v-model="formData[data.name]" :name="data.name" required />
                        <input class="w-full p-2 rounded-md border" v-else-if="data.type === 'number'" type="number"
                            :placeholder="data.label" v-model="formData[data.name]" :name="data.name" required />
                        <select required class="w-full p-2 rounded-md border" v-model="formData[data.name]"
                            v-else-if="data.type === 'select'">
                            <option v-for="option in data.options" :value="option.val">{{ option.opt }}
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
                        <label :for="table">
                            <button type="submit">
                                TAMBAH
                            </button>
                        </label>

                    </div>
                    <label :for="table" class="btn bg-red-600 hover:bg-red-400 text-white">CLOSE</label>
                </div>
            </form>
            <!-- END OF CONTENT -->


        </div>
    </div>
</template>

<script setup>
const emit = defineEmits(['inFocus', 'submit'])
let show = true
const formData = ref({})
const props = defineProps(
    [
        'table',
        'formFormat',
        'formTitle',
    ]
)

const submitForm = () => {
    // Emit the form data to the parent component
    emit('formSubmitted', formData.value);
};

</script>