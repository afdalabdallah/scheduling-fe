<template>
    <div class="">
        <p class=" font-bold text-xl mb-1">RUMPUN MATA KULIAH</p>
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
                            <AddModal @formSubmitted="onSubmit" v-bind:form-format="formFormat" form-title="RUANGAN"
                                table="ruangan" />
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
                            <th>Nomor Ruangan</th>
                            <th>Kapasitas</th>
                            <th>Deskripsi</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(ruangan, index) in ruangans">
                            <th>
                                {{ index + 1 }}
                            </th>
                            <td>
                                {{ ruangan.nomor_ruangan }}
                            </td>
                            <td>
                                {{ ruangan.kapasitas }}
                            </td>
                            <td>
                                {{ ruangan.deskripsi }}
                            </td>
                            <td>
                                <div class="flex gap-2">
                                    <EditModal @formSubmitted="onSubmitEdit" v-bind:index="ruangan.nomor_ruangan"
                                        v-bind:datas="ruangan" v-bind:form-format="formFormat" table="Ruangan" />
                                    <DeleteModal @dataDeleted="deleteData" v-bind:data="ruangan"
                                        v-bind:first="ruangan.nomor_ruangan" v-bind:second="ruangan.kapasitas"
                                        table="Ruangan" />
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
import { ref, nextTick, reactive } from "vue";

let ruangans = ref([])
const fetchRuangan = async () => {
    // nextTick(async () => {

    // })

    const { data } = await useFetch("http://localhost:3000/api/ruangan");
    console.log("MASOK KE CALL DEK");
    console.log(data.value);
    ruangans = data.value
}
await fetchRuangan()

const formFormat = [
    {
        'label': "Nomor Ruangan",
        'name': "nomor_ruangan",
        'type': 'text',
    },
    {
        'label': "Kapasitas",
        'name': "kapasitas",
        'type': 'number',
    },
    {
        'label': "Deskripsi",
        'name': "deskripsi",
        'type': 'text'
    },
]

const onSubmit = async (formData) => {
    console.log(formData);
    const { respons } = await useFetch("http://localhost:3000/api/ruangan", {
        method: "POST",
        body: {
            nomor_ruangan: formData.nomor_ruangan,
            kapasitas: formData.kapasitas,
            deskripsi: formData.deskripsi
        },
        headers: { "Access-Control-Allow-Origin": "*", 'Access-Control-Allow-Headers': '*', }
    });
    console.log(respons);
    location.reload()
};

const deleteData = async (id) => {
    var baseUrl = "http://localhost:5000/ruangan/" + id
    console.log(baseUrl);
    const { response } = await useFetch(baseUrl, {
        method: "DELETE",
    });
    console.log(response);
    location.reload()
}

const onSubmitEdit = async (formData) => {
    var baseUrl = "http://localhost:3000/api/ruangan/" + formData.id
    console.log(baseUrl)
    const { respons } = await useFetch(baseUrl, {
        method: "PUT",
        body: {
            nomor_ruangan: formData.nomor_ruangan,
            kapasitas: formData.kapasitas,
            deskripsi: formData.deskripsi
        },
        headers: { "Access-Control-Allow-Origin": "*", 'Access-Control-Allow-Headers': '*', }
    });
    console.log(respons);
    location.reload()
}
</script>
