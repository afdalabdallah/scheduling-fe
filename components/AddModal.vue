<template>
    <!-- The button to open modal -->
    <label :for="table" class="add-btn bg-[#0081C9] rounded-[5px] px-1 py-[4px]  text-white">+ Tambah</label>

    <!-- Put this part before </body> tag -->
    <input type="checkbox" :id="table" class="modal-toggle" />
    <div class="modal">
        <div class="modal-box">
            <div v-if="table === 'matakuliah'" class="mb-2 text-center text-red-500 text-2xl font-bold">
                TAMBAH MATA KULIAH
            </div>
            <h3 class="font-bold">Tambah Data Mata Kuliah</h3>
            <div class="mt-3">

            </div>
            <div class="modal-action ">
                <div class="btn bg-red-600 hover:bg-red-400">
                    <label :for="table">
                        YES
                    </label>

                </div>
                <label :for="table" class="btn bg-cyan-400 hover:bg-cyan-200">Tidak</label>
            </div>
        </div>
    </div>
</template>

<script setup>
let show = true
const props = defineProps(
    [
        'table'
    ]
)
</script>