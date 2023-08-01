<template>
    <div class="">
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
                        <form class=" bg-[#E9F4FF] rounded-[5px] pl-2 pr-2 pt-[4px] pb-[4px] max-[499px]:mb-1">
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
                            <AddModal @formSubmitted="onSubmit" v-bind:form-format="formFormat" form-title="MATA KULIAH"
                                table="matakuliah" />
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
                            <th>Nama</th>
                            <th>SKS</th>
                            <th>Rumpun</th>
                            <th>Semester</th>
                            <th>Tipe</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(matkul, index) in mataKuliah">
                            <th>
                                {{ index + 1 }}
                            </th>
                            <td>
                                {{ matkul.kode_mk }}
                            </td>
                            <td>
                                {{ matkul.nama }}
                            </td>
                            <td>
                                {{ matkul.sks }}
                            </td>
                            <td>
                                {{ matkul.rumpun_id }}
                            </td>
                            <td>
                                {{ matkul.semester }}
                            </td>
                            <td>
                                {{ matkul.tipe }}
                            </td>

                            <td>
                                <div class="flex gap-2">
                                    <EditModal @formSubmitted="onSubmitEdit" v-bind:index="matkul.kode_mk"
                                        v-bind:datas="matkul" v-bind:form-format="formFormat" table="Mata Kuliah" />
                                    <DeleteModal v-bind:data="matkul" v-bind:first="matkul.kode_mk"
                                        v-bind:second="matkul.nama" table="Mata Kuliah" />
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



let mataKuliah = reactive([])
const fetchMataKuliah = async () => {
    const { data } = await useFetch("http://localhost:3000/api/matkul");
    mataKuliah = data
}

await fetchMataKuliah()

let rumpun = reactive([])
const fetchRumpun = async () => {
    const { data } = await useFetch("http://localhost:3000/api/rumpun");
    rumpun = data
}
await fetchRumpun()

const formData = ref({});

const onSubmit = async (formData) => {
    console.log("INI FORM DATA DARI PAGE");
    console.log(formData);
    const { respons } = await useFetch("http://localhost:3000/api/matkul", {
        method: "POST",
        body: {
            nama: formData.nama,
            kode_mk: formData.kode_mk,
            tipe: formData.tipe,
            sks: formData.sks,
            semester: formData.semester,
            rumpun_id: formData.rumpun_id,
        },
        headers: { "Access-Control-Allow-Origin": "*", 'Access-Control-Allow-Headers': '*', }
    });
    console.log("INI RESPONSE");
    console.log(respons);
    location.reload()
}

const onSubmitEdit = async (formData) => {
    var baseUrl = "http://localhost:3000/api/matkul/" + formData.ID
    const { respons } = await useFetch(baseUrl, {
        method: "PUT",
        body: {
            nama: formData.nama,
            kode_mk: formData.kode_mk,
            tipe: formData.tipe,
            sks: formData.sks,
            semester: formData.semester,
            rumpun_id: formData.rumpun_id,
        },
        headers: { "Access-Control-Allow-Origin": "*", 'Access-Control-Allow-Headers': '*', }
    });
    console.log(respons);
    location.reload()
}

const rumpunArr = Array.isArray(rumpun.value) ? rumpun.value : [];
// console.log(rumpun.value);
const rumpunOptions = rumpunArr.map(item => ({
    opt: item.nama,
    val: item.ID
}))


const tipe = [
    'Jurusan - P',
    'Jurusan - W',
    'SKPB',
    'Pengayaan'
]

function createTipe(item) {
    return {
        opt: item,
        val: item
    };
}

const tipeOptions = tipe.map(createTipe)

const formFormat = [
    {
        'label': "Kode MK",
        'name': "kode_mk",
        'type': 'text',
    },
    {
        'label': "Nama",
        'name': "nama",
        'type': 'text'
    },
    {
        'label': "SKS",
        'name': "sks",
        'type': 'number'
    },
    {
        'label': "Rumpun",
        'name': "rumpun_id",
        'type': 'select',
        'options': rumpunOptions
    },
    {
        'label': "Semester",
        'name': "semester",
        'type': 'number'
    },
    {
        'label': "Tipe",
        'name': "tipe",
        'type': 'select',
        'options': tipeOptions
    },

]
</script>