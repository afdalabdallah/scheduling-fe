<template>
    <!-- The button to open modal -->
    <label :for="data.ID" class="bg-red-600 p-1 rounded-md text-white">Delete</label>

    <!-- Put this part before </body> tag -->
    <input type="checkbox" :id="data.ID" class="modal-toggle" />
    <div class="modal">
        <div class="modal-box">
            <div class="mb-2 text-center text-red-500 text-2xl font-bold">
                HAPUS DATA
            </div>
            <h3 class="font-bold">Apakah anda ingin menghapus data {{ table }}</h3>
            <div class="mt-3">
                <p>
                    {{ first }}
                </p>
                <p>
                    {{ second }}
                </p>
            </div>
            <div class="modal-action ">
                <div class="text-white btn bg-red-600 hover:bg-red-500" @click="deleteData(data.ID)">
                    <label :for="data.ID">
                        YA
                    </label>

                </div>
                <label :for="data.ID" class="text-white btn bg-[#0081C9] hover:bg-blue-400">Tidak</label>
            </div>
        </div>
    </div>
</template>

<script setup>
const emit = defineEmits(['inFocus', 'submit'])
let show = true
const props = defineProps(
    [
        'table',
        'data',
        'first',
        'second',
        'deleteFunction'
    ]
)

const deleteData = (id) => {
    emit('dataDeleted', id);
}



</script>