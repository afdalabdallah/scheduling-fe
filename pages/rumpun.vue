<template>
  <div class="">
    <p class=" font-bold text-xl mb-1">RUMPUN MATA KULIAH</p>
    <div class="bg-white rounded-lg">
      <div class="min-[500px]:flex p-2 items-center gap-4 overflow-x-auto ">
        <button class="max-[499px]:w-full filter-btn border-[#0081C9] border rounded-[5px] pl-2 pr-3 pt-[2px] pb-[2px]">
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
              <AddModal @formSubmitted="onSubmit" v-bind:form-format="formFormat" form-title="RUMPUN" table="rumpun" />
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
              <th>Kode RMK</th>
              <th>Nama</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(rumpun, index) in rumpuns">
              <th>
                {{ index + 1 }}
              </th>
              <td>
                {{ rumpun.kode_rmk }}
              </td>
              <td>
                {{ rumpun.nama }}
              </td>
              <td>
                <div class="flex gap-2">
                  <EditModal @formSubmitted="onSubmitEdit" v-bind:index="rumpun.kode_rmk" v-bind:datas="rumpun"
                    v-bind:form-format="formFormat" table="Rumpun Mata Kuliah" />
                  <DeleteModal @dataDeleted="deleteData" v-bind:data="rumpun" v-bind:first="rumpun.kode_rmk"
                    v-bind:second="rumpun.nama" table="Rumpun Mata Kuliah" />
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
import { ref } from "vue";

let rumpuns = reactive([])
const fetchRumpun = async () => {
  const { data } = await useFetch("http://localhost:3000/api/rumpun");
  rumpuns = data
}
await fetchRumpun()

const formData = ref({
  nama: "",
  kode_rmk: "",
});


const formFormat = [
  {
    'label': "Nama RMK",
    'name': "nama",
    'type': 'text',
  },
  {
    'label': "Kode RMK",
    'name': "kode_rmk",
    'type': 'text'
  },
]

const onSubmit = async (formData) => {
  console.log(formData);
  const { respons } = await useFetch("http://localhost:3000/api/rumpun/post", {
    method: "POST",
    body: {
      nama: formData.nama,
      kode_rmk: formData.kode_rmk,
    },
    headers: { "Access-Control-Allow-Origin": "*", 'Access-Control-Allow-Headers': '*', }
  });
  console.log(respons);
  location.reload()
};

const deleteData = async (id) => {
  var baseUrl = "http://localhost:5000/rumpun/" + id
  console.log(baseUrl);
  const { response } = await useFetch(baseUrl, {
    method: "DELETE",
  });
  console.log(response);
  location.reload()
}

const onSubmitEdit = async (formData) => {
  var baseUrl = "http://localhost:3000/api/rumpun/" + formData.ID
  const { respons } = await useFetch(baseUrl, {
    method: "PUT",
    body: {
      nama: formData.nama,
      kode_rmk: formData.kode_rmk,
    },
    headers: { "Access-Control-Allow-Origin": "*", 'Access-Control-Allow-Headers': '*', }
  });
  console.log(respons);
  location.reload()
}
</script>
