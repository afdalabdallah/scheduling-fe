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
                            <th>Kode Dosen</th>
                            <th>Nama</th>
                            <th>Rumpun</th>
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
                                {{ dosen.rumpun_id }}
                            </td>
                            <td>
                                {{ dosen.preferensi }}
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
    val: item.ID
}))

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
        'type': 'text'
    },
    {
        'label': "Rumpun",
        'name': "rumpun_id",
        'type': 'select',
        'options': rumpunOptions
    },
]


const onSubmit = async (formData) => {
    console.log("INI FORM DATA DARI PAGE");
    console.log(formData);
    const { respons } = await useFetch("http://localhost:3000/api/dosen", {
        method: "POST",
        body: {
            nama: formData.nama,
            kode_dosen: formData.kode_dosen,
            preferensi: formData.preferensi,
            rumpun_id: formData.rumpun_id,
        },
        headers: { "Access-Control-Allow-Origin": "*", 'Access-Control-Allow-Headers': '*', }
    });
    console.log("INI RESPONSE");
    console.log(respons);
    location.reload()
}

const onSubmitEdit = async (formData) => {
    var baseUrl = "http://localhost:3000/api/dosen/" + formData.ID
    const { respons } = await useFetch(baseUrl, {
        method: "PUT",
        body: {
            nama: formData.nama,
            kode_dosen: formData.kode_dosen,
            preferensi: formData.preferensi,
            rumpun_id: formData.rumpun_id,
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