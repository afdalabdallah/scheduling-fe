<template>
    <!-- The button to open modal -->
    <div style="">
        <label for="unwanted_sesi" class="hidden sm:block add-btn bg-[#0081C9] rounded-[5px] px-1 py-[4px]  text-white">+
            Tambah
        </label>
        <label for="unwanted_sesi"
            class="sm:hidden text-center block add-btn bg-[#0081C9] rounded-[5px] px-1 py-[4px] max-[499px]:w-full  text-white">
            +
        </label>
    </div>

    <!-- Put this part before </body> tag -->
    <input type="checkbox" id="unwanted_sesi" class="modal-toggle" />
    <div class="modal">
        <div class="modal-box">
            <!-- MODAL CONTENT -->
            <label for="unwanted_sesi" class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
            <div class="mb-2 text-center text-cyan-400 text-2xl font-bold">
                TAMBAH UNWANTED SESSION
            </div>
            <form @submit.prevent="submitForm">
                <div class="px-2 overflow-y-auto max-h-[500px]">

                    <label>Hari</label>
                    <select required class="w-full p-2 rounded-md border mb-4" v-model="formData.unwanted_hari">
                        <option v-for="hariAvailable in hari " :value="hariAvailable">{{ hariAvailable }}
                        </option>
                    </select>
                    <label>Sesi</label>
                    <select required class="w-full p-2 rounded-md border" v-model="formData.unwanted_sesi">
                        <option v-for="sesiAvailable in sesi " :value="sesiAvailable">{{ sesiAvailable }}
                        </option>
                    </select>
                </div>
                <div class="modal-action ">
                    <div class="btn bg-cyan-600 hover:bg-cyan-400 text-white">
                        <label for="unwanted_sesi">
                            <button type="submit">
                                TAMBAH
                            </button>
                        </label>

                    </div>
                    <label for="unwanted_sesi" class="btn bg-red-600 hover:bg-red-400 text-white">CLOSE</label>
                </div>
            </form>
            <!-- END OF CONTENT -->


        </div>
    </div>
</template>

<script setup>
const emit = defineEmits(['inFocus', 'submit'])
let show = true
const formData = ref({
    "unwanted_sesi": "",
    "unwanted_hari": ""
})
const props = defineProps(
    [
        'sesi',
        'hari',
        'formFormat',
        'formTitle',
        'dosenData',
        'matkulData'
    ]
)

const submitForm = () => {
    // Emit the form data to the parent component
    // console.log(formData.value);
    emit('sesi-emit', formData.value);
};

</script>