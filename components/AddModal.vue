<template>
    <!-- The button to open modal -->
    <label :for="table" class="hidden sm:block add-btn bg-[#0081C9] rounded-[5px] px-1 py-[4px]  text-white">+
        Tambah
    </label>
    <label :for="table"
        class="sm:hidden text-center block add-btn bg-[#0081C9] rounded-[5px] px-1 py-[4px] max-[499px]:w-full  text-white">
        +
    </label>
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
                            :placeholder="data.label" v-model="formData[data.name]" :name="data.name" />
                        <input class="w-full p-2 rounded-md border" v-else-if="data.type === 'number'" type="number"
                            :placeholder="data.label" v-model="formData[data.name]" :name="data.name" />
                        <select class="w-full p-2 rounded-md border" v-model="formData[data.name]"
                            v-else-if="data.type === 'select'">
                            <option v-for="option in data.options" :value="option.val">{{ option.opt }} {{ option.val }}
                            </option>

                        </select>
                    </div>
                </div>
                <div class="modal-action ">
                    <div class="btn bg-cyan-600 hover:bg-cyan-400 text-white">
                        <button type="submit">
                            TAMBAH
                        </button>

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