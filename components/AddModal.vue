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
                        <input class="w-full p-2 rounded-md border" v-if="data.type === 'number'" type="number"
                            :placeholder="data.label" v-model="formData[data.name]" :name="data.name" required />
                        <select required class="w-full p-2 rounded-md border" v-model="formData[data.name]"
                            v-if="data.type === 'select'">
                            <option v-for="option in data.options" :value="option.val">{{ option.opt }}
                            </option>
                        </select>
                        <div v-if="table == 'perkuliahan'">
                            <div v-if="data.name == 'mata_kuliah_id'">
                                <div v-for="matkul in matkulData">
                                    <div v-if="matkul.id == formData[data.name]">
                                        <p>Nama: {{ matkul.nama }} </p>
                                        <p>Load: {{ matkul.sks }} SKS</p>
                                        <p>Rumpun: {{ matkul.rumpun }}</p>
                                    </div>
                                </div>
                            </div>
                            <div v-else-if="data.name == 'dosen_id'">
                                <div v-for="dosen in dosenData">
                                    <div v-if="dosen.id == formData[data.name]">
                                        <p>Nama: {{ dosen.nama }} </p>
                                        <p>Load: {{ dosen.load }} SKS</p>
                                        <p>Rumpun: {{ dosen.rumpun_id }}</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div v-if="(data.type === 'checkbox' && (table === 'dosen'))" class="flex gap-5">
                            <div>
                                Hari
                                <div v-for="(day, index) in data.hari" :key="index">
                                    <div class="flex gap-1">
                                        <input :id="`day-${index}`" type="checkbox" v-model="formData[day]" :value="day" />
                                        <label :for="`day-${index}`" class="font-normal">{{ day }}</label>
                                    </div>
                                </div>
                            </div>
                            <div>
                                Sesi
                                <div class="gap-1 grid grid-cols-2">
                                    <div v-for="(sesi, index) in data.sesi" :key="index">
                                        <div class="flex gap-1">
                                            <input :id="`sesi-${index}`" type="checkbox" v-model="formData[sesi]"
                                                :value="sesi" class="" />
                                            <label :for="`sesi-${index}`" class="font-normal">{{ sesi }}</label>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div v-if="data.name === 'unwanted_sesi'">
                            <!-- <SessionModal @sesi-emit="handleUnwanted" v-bind:sesi="data.sesi" v-bind:hari="data.hari" />
                            <div class="flex">
                                <div v-for="unwanted in unwantedSessionData">
                                    {{ unwanted.hari }}
                                    {{ unwanted.sesi }}
                                </div>
                            </div> -->
                            <form id="unwantedSession" @submit.prevent="handleUnwanted">
                                <label>Hari</label>
                                <select required class="w-full p-2 rounded-md border mb-4"
                                    v-model="unwantedSesi.unwanted_hari">
                                    <option v-for="hariAvailable in data.hari " :value="hariAvailable">{{ hariAvailable }}
                                    </option>
                                </select>
                                <label>Sesi</label>
                                <select required class="w-full p-2 rounded-md border" v-model="unwantedSesi.unwanted_sesi">
                                    <option v-for="sesiAvailable in data.sesi " :value="sesiAvailable">{{ sesiAvailable }}
                                    </option>
                                </select>
                                <button class="btn mt-2" type="submit">
                                    add
                                </button>
                            </form>
                            <div v-for="unwanted in unwantedSessionData">
                                {{ unwanted.unwanted_hari }}
                                {{ unwanted.unwanted_sesi }}

                            </div>
                        </div>
                        <div v-if="(data.type === 'checkbox' && data.name === 'ruangan')" class="flex gap-5">
                            <div class="gap-2 grid grid-cols-3">
                                <div v-for="(ruangan, index) in data.ruangan" :key="index">
                                    <div class="flex gap-1">
                                        <input :id="`ruangan-${index}`" type="checkbox" v-model="formData[ruangan]"
                                            :value="ruangan" />
                                        <label :for="`ruangan-${index}`" class="font-normal">{{ ruangan }}</label>

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
const unwantedSesi = ref({
})
let unwantedSessionData = ref([])
const props = defineProps(
    [
        'table',
        'formFormat',
        'formTitle',
        'dosenData',
        'matkulData'
    ]
)


const handleUnwanted = () => {
    let tempSesi = {
        ...unwantedSesi.value
    }
    unwantedSessionData.value.push(tempSesi)


    unwantedSesi.unwanted_hari = null;
    unwantedSesi.unwanted_sesi = null;

    console.log("Unwanted Session Array");
    console.log(unwantedSessionData);
    formData.value["unwanted_sesi"] = [...unwantedSessionData.value]
    console.log(formData);


}
const submitForm = () => {
    // Emit the form data to the parent component
    emit('formSubmitted', formData.value);
};

</script>