<template>
    <div class="overflow-x-auto">
        <div class="bg-white rounded-lg">
            <div class="flex p-2 items-center gap-4">
                <button class="filter-btn border-[#0081C9] border rounded-[5px] pl-2 pr-3 pt-[2px] pb-[2px]">
                    <div class="flex gap-2">
                        <img class="" src="/img/Filter.svg" />
                        <p>Filter</p>
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
                        <AddModal table="matakuliah" />
                    </div>
                </div>



            </div>
            <table class="table">
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
                                <DeleteModal v-bind:data="matkul" table="Mata Kuliah" />
                            </div>
                        </td>
                    </tr>

                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>

const { data: mataKuliah } = await useFetch("http://localhost:3000/api/matkul");
console.log(mataKuliah);

</script>