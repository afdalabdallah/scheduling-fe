<template>
    <!-- The button to open modal -->
    <label :for="table" class="hidden sm:block add-btn bg-[#0081C9] rounded-[5px] px-1 py-[4px]  text-white">+
        Tambah
    </label>
    <label :for="table" class="sm:hidden add-btn bg-[#0081C9] rounded-[5px] px-1 py-[4px]  text-white">
        +
    </label>
    <!-- Put this part before </body> tag -->
    <input type="checkbox" :id="table" class="modal-toggle" />
    <div class="modal">
        <div class="modal-box">
            <!-- MODAL CONTENT -->
            <div class="mb-2 text-center text-cyan-400 text-2xl font-bold">
                TAMBAH {{ formTitle }}
            </div>
            <form class="px-2 overflow-y-auto max-h-[500px]">
                <div class="">
                    <div v-for="data in formFormat" class="mb-2">
                        <label>{{ data.label }}</label><br>
                        <input class="w-full p-2 rounded-md border" v-if="data.type === 'text'" type="text"
                            :placeholder="data.label" :name="data.name" />
                        <input class="w-full p-2 rounded-md border" v-else-if="data.type === 'number'" type="number"
                            :placeholder="data.label" :name="data.name" />
                        <select class="w-full p-2 rounded-md border" v-else-if="data.type === 'select'">
                            <option value="alo">Halo</option>
                            <option value="alo">Halo</option>
                            <option value="alo">Halo</option>
                        </select>
                    </div>
                </div>

            </form>
            <!-- END OF CONTENT -->

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
        'table',
        'formFormat',
        'formTitle',
        'onClick'
    ]
)
</script>