<template>
    <div class="">
        <p class=" font-bold text-xl mb-1">PERKULIAHAN</p>
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
                            <AddModal @formSubmitted="onSubmit" v-bind:form-format="formFormat" form-title="PERKULIAHAN"
                                table="perkuliahan" v-bind:dosen-data="dosenData" v-bind:matkul-data="mataKuliah" />
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
                            <th>Kode MK</th>
                            <th>MK</th>
                            <th>Kelas</th>
                            <th>Semester</th>
                            <th>Rumpun</th>
                            <th>Kode Dosen</th>
                            <th>Ruangan</th>
                            <th>Sesi</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(perkuliahan, index) in perkuliahanData">
                            <th>
                                {{ index + 1 }}
                            </th>
                            <td>
                                {{ perkuliahan.kode_mk }}
                            </td>
                            <td>
                                {{ perkuliahan.nama_mk }}
                            </td>
                            <td>
                                {{ perkuliahan.kelas }}
                            </td>
                            <td>
                                {{ perkuliahan.semester }}
                            </td>
                            <td>
                                {{ perkuliahan.rumpun }}
                            </td>
                            <td>
                                {{ perkuliahan.kode_dosen }}
                            </td>
                            <td>
                                {{ perkuliahan.ruangan }}
                            </td>
                            <td>
                                {{ perkuliahan.sesi }}
                            </td>
                            <td>
                                <div class="flex gap-2">
                                    <EditModal @formSubmitted="onSubmitEdit"
                                        v-bind:index="perkuliahan.kode_mk + perkuliahan.kelas" v-bind:datas="perkuliahan"
                                        v-bind:form-format="formFormat" table="perkuliahan" />
                                    <DeleteModal @dataDeleted="deleteData" v-bind:data="perkuliahan"
                                        v-bind:first="perkuliahan.kode_mk" v-bind:second="perkuliahan.nama_mk"
                                        table="perkuliahan" />
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

let perkuliahanData = reactive([])
const fetchPerkuliahan = async () => {
    const { data } = await useFetch("http://localhost:3000/api/perkuliahan");
    perkuliahanData = data
    console.log(perkuliahanData);
}

await fetchPerkuliahan()


let mataKuliah = reactive([])
const fetchMataKuliah = async () => {
    const { data } = await useFetch("http://localhost:3000/api/matkul");
    mataKuliah = data
}

await fetchMataKuliah()

let dosenData = reactive([])
const fetchDosen = async () => {
    const { data } = await useFetch("http://localhost:3000/api/dosen");
    dosenData = data
}

await fetchDosen()

const dosenArr = Array.isArray(dosenData.value) ? dosenData.value : [];
// console.log(rumpun.value);
const dosenOptions = dosenArr.map(item => ({
    opt: item.nama,
    val: item.id,
}))

const matkulArr = Array.isArray(mataKuliah.value) ? mataKuliah.value : [];
// console.log(rumpun.value);
const matkulOptions = matkulArr.map(item => ({
    opt: item.nama,
    val: item.id,
}))


// Will be fetched by api later
const sesi = ['Sesi 1', 'Sesi 2', 'Sesi 3', 'Sesi 4', 'Sesi 5', 'Sesi 6', 'Sesi 7', 'Sesi 8', 'Sesi 9', 'Sesi 10']
const hari = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat']

const formFormat = [
    {
        'label': "Mata Kuliah",
        'name': "mata_kuliah_id",
        'type': 'select',
        'options': matkulOptions
    },
    {
        'label': "Dosen",
        'name': "dosen_id",
        'type': 'select',
        'options': dosenOptions
    },
    {
        'label': "Kelas",
        'name': "kelas",
        'type': 'text'
    },
    // {
    //     'label': "Sesi",
    //     'name': "sesi",
    //     'type': 'checkbox',
    //     'hari': hari,
    //     'sesi': sesi,
    // },

]

const onSubmit = async (formData) => {
    console.log("INI FORM DATA DARI PAGE");
    console.log(formData);
    let bodyArray = []
    bodyArray.push(formData)
    const { respons } = await useFetch("http://localhost:3000/api/perkuliahan", {
        method: "POST",
        body: bodyArray,
        headers: { "Access-Control-Allow-Origin": "*", 'Access-Control-Allow-Headers': '*', }
    });
    console.log("INI RESPONSE");
    // console.log(respons);
    location.reload()
}

const deleteData = async (id) => {
    var baseUrl = "http://localhost:5000/perkuliahan/" + id
    console.log(baseUrl);
    const { response } = await useFetch(baseUrl, {
        method: "DELETE",
    });
    console.log(response);
    location.reload()
    console.log("Data deleted!");

}

const onSubmitEdit = async (formData) => {
    const { respons } = await useFetch(
        "http://localhost:3000/api/perkuliahan" + formData.id,
        {
            method: "PUT",
            body: {
                dosen_id: formData.dosen_id,
                kelas: formData.kelas,
                mata_kuliah_id: formData.mata_kuliah_id,
            },
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*",
            },
        }
    );
    console.log("INI RESPONSE");
    console.log(respons);
    location.reload();
};

</script>