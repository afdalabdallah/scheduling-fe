<template>
    <div class="">
        <div class="bg-white rounded-lg">
            <div class="flex p-2 items-center gap-4 overflow-x-auto ">
                <button class="filter-btn border-[#0081C9] border rounded-[5px] pl-2 pr-3 pt-[2px] pb-[2px]">
                    <div class="flex gap-2">
                        <img class="" src="/img/Filter.svg" />
                        <p class="hidden sm:block">Filter</p>
                    </div>

                </button>
                <div class=" w-full pr-5">
                    <div class="flex justify-between">
                        <form class=" bg-[#E9F4FF] rounded-[5px] pl-2 pr-2 pt-[4px] pb-[4px]">
                            <div class=" flex gap-3">
                                <button type="submit">
                                    <img src="/img/Search.svg" />
                                </button>

                                <div>
                                    <input class="bg-inherit" type="text" placeholder="Search" />
                                </div>

                            </div>
                        </form>
                        <AddModal v-bind:form-format="formFormat" form-title="MATA KULIAH" table="matakuliah" />
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
                                    <button>Edit</button>
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

const { data: mataKuliah } = await useFetch("http://localhost:3000/api/matkul");
console.log(mataKuliah);
const formFormat = [
    {
        'label': "Kode MK",
        'name': "kode_mk",
        'type': 'text'
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
        'name': "rumpun",
        'type': 'select'
    },
    {
        'label': "Semester",
        'name': "semester",
        'type': 'number'
    },
    {
        'label': "Tipe",
        'name': "tipe",
        'type': 'select'
    },

]
</script>