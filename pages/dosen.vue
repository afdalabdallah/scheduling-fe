<template>
    <div class="">
        <p class=" font-bold text-xl mb-1">DOSEN</p>
        <div class="bg-white rounded-lg">
            <div class="min-[500px]:flex p-2 items-center gap-4 overflow-x-auto ">
                <button
                    class="max-[499px]:w-full filter-btn border-[#0081C9] border rounded-[5px] pl-2 pr-3 pt-[2px] pb-[2px]">
                    <div class="flex gap-2 justify-center">
                        <img class="w-[24px]" src="/img/Filter.svg" />
                        <p class="hidden sm:block">Filter</p>
                    </div>

                </button>
                <div class=" w-full ">
                    <div class="min-[500px]:flex justify-between ">
                        <form @submit.prevent="searchMatkul"
                            class=" bg-[#E9F4FF] rounded-[5px] pl-2 pr-2 pt-[4px] pb-[4px] max-[499px]:mb-1">
                            <div class=" flex gap-3">
                                <button type="submit">
                                    <img src="/img/Search.svg" />
                                </button>

                                <div>
                                    <input class="bg-inherit" type="text" placeholder="Search" />
                                </div>

                            </div>
                        </form>
                        <div class="">
                            <AddModal @formSubmitted="onSubmit" v-bind:form-format="formFormat" form-title="DOSEN"
                                table="dosen" />
                        </div>

                    </div>
                </div>

            </div>
            <div class=" overflow-x-auto">
                <table class="table table-sm">
                    <!-- head -->
                    <thead class="bg-[#E9F4FF] border-none text-black">
                        <tr>
                            <th></th>
                            <th>Kode Dosen</th>
                            <th>Nama</th>
                            <th>Rumpun</th>
                            <th>Load</th>
                            <th>Preferensi</th>

                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(dosen, index) in dosenData">
                            <th>
                                {{ index + 1 }}
                            </th>
                            <td>
                                {{ dosen.kode_dosen }}
                            </td>
                            <td>
                                {{ dosen.nama }}
                            </td>
                            <td>
                                {{ dosen.rumpun }}
                            </td>
                            <td>
                                {{ dosen.load }} SKS
                            </td>
                            <td>
                                <div>
                                    <span class="font-semibold">Hari: </span>
                                    <span v-for="(hari, index) in dosen.preferensi.hari" :key="index">
                                        {{ hari }}{{ index !== dosen.preferensi.hari.length - 1 ? ', ' : '' }}
                                    </span>
                                </div>
                                <div>
                                    <span class=" font-semibold">Sesi: </span>
                                    <span v-for="(sesi, index) in dosen.preferensi.sesi" :key="index">
                                        {{ sesi }}{{ index !== dosen.preferensi.sesi.length - 1 ? ', ' : '' }}
                                    </span>
                                </div>
                            </td>


                            <td>
                                <div class="flex gap-2">
                                    <EditModal @formSubmitted="onSubmitEdit" v-bind:index="dosen.kode_dosen"
                                        v-bind:datas="dosen" v-bind:form-format="formFormat" table="Dosen" />
                                    <DeleteModal @dataDeleted="deleteData" v-bind:data="dosen"
                                        v-bind:first="dosen.kode_dosen" v-bind:second="dosen.nama" table="Dosen" />
                                </div>
                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>

        </div>
    </div>
</template>

<script setup>

let dosenData = reactive([])
const fetchDosen = async () => {
    const { data } = await useFetch("http://localhost:3000/api/dosen");
    dosenData = data
}

await fetchDosen()

let rumpun = reactive([])
const fetchRumpun = async () => {
    const { data } = await useFetch("http://localhost:3000/api/rumpun");
    rumpun = data
}
await fetchRumpun()

const rumpunArr = Array.isArray(rumpun.value) ? rumpun.value : [];
// console.log(rumpun.value);
const rumpunOptions = rumpunArr.map(item => ({
    opt: item.nama,
    val: item.id
}))

console.log("Dosen data");
console.log(dosenData);

const sesi = ['Sesi 1', 'Sesi 2', 'Sesi 3', 'Sesi 4', 'Sesi 5', 'Sesi 6', 'Sesi 7', 'Sesi 8', 'Sesi 9', 'Sesi 10']
const hari = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat']
const formFormat = [
    {
        'label': "Nama Dosen",
        'name': "nama",
        'type': 'text',
    },
    {
        'label': "Kode Dosen",
        'name': "kode_dosen",
        'type': 'text'
    },
    {
        'label': "Preferensi",
        'name': "preferensi",
        'type': 'checkbox',
        'hari': hari,
        'sesi': sesi,
    },
    {
        'label': "Rumpun",
        'name': "rumpun_id",
        'type': 'select',
        'options': rumpunOptions
    },
]



function processFormData(rawFormData) {
    const processedFormData = { ...rawFormData };
    const selectedDays = [];
    const selectedSessions = [];

    for (const key in processedFormData) {
        if (processedFormData[key] === true && hari.includes(key)) {
            selectedDays.push(key);
            delete processedFormData[key];
        }

        if (processedFormData[key] === true && sesi.includes(key)) {
            selectedSessions.push(key);
            delete processedFormData[key];
        }
    }

    if (selectedDays.length > 0 || selectedSessions.length > 0) {
        processedFormData.preferensi = {};

        if (selectedDays.length > 0) {
            processedFormData.preferensi.hari = selectedDays;
        }

        if (selectedSessions.length > 0) {
            processedFormData.preferensi.sesi = selectedSessions;
        }
    }

    return processedFormData;
}

const onSubmit = async (formData) => {
    console.log("INI FORM DATA DARI PAGE");
    console.log(formData);
    const processedData = processFormData(formData)
    console.log("Formated Data");
    console.log(processedData);
    let dataArray = []
    dataArray.push(processedData)
    const { respons } = await useFetch("http://localhost:3000/api/dosen", {
        method: "POST",
        body: dataArray,
        headers: { "Access-Control-Allow-Origin": "*", 'Access-Control-Allow-Headers': '*', }
    });
    console.log("INI RESPONSE");
    console.log(respons);
    location.reload()
}

const onSubmitEdit = async (formData) => {
    const processedData = processFormData(formData)
    console.log("Formated Data");
    console.log(processedData);
    var baseUrl = "http://localhost:3000/api/dosen/" + processedData.id
    const { respons } = await useFetch(baseUrl, {
        method: "PUT",
        body: {
            nama: processedData.nama,
            kode_dosen: processedData.kode_dosen,
            preferensi: processedData.preferensi,
            rumpun_id: processedData.rumpun_id,
        },
        headers: { "Access-Control-Allow-Origin": "*", 'Access-Control-Allow-Headers': '*', }
    });
    console.log(respons);
    location.reload()
}

const deleteData = async (id) => {
    var baseUrl = "http://localhost:5000/dosen/" + id
    console.log(baseUrl);
    const { response } = await useFetch(baseUrl, {
        method: "DELETE",
    });
    console.log(response);
    location.reload()
    console.log("Data deleted!");

}


</script>