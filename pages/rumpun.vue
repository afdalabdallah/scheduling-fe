<template>
  <div>
    <form @submit.prevent="onSubmit">
      <input class="mb-2" type="text" v-model="formData.nama" id="nama" /><br />
      <input type="text" v-model="formData.kode_rmk" id="kode_rmk" />
      <button type="submit">Submit</button>
    </form>
  </div>
  <div>
    <div>Rumpun:</div>
    <div>
      <div v-for="r in rumpun">
        <span>{{ r.nama }}</span>
        <!-- The button to open modal -->
        <label v-bind:for="r.ID" class="btn">open modal</label>

        <!-- Put this part before </body> tag -->
        <input type="checkbox" v-bind:id="r.ID" class="modal-toggle" />
        <div class="modal">
          <div class="modal-box">
            <h3 class="font-bold text-lg">{{ r.nama }}</h3>
            <p class="py-4">{{ r.ID }}</p>
            <div class="modal-action">
              <label v-bind:for="r.ID" class="btn">Close!</label>
            </div>
          </div>
        </div>
        <button @click="deleteData(r.ID)">Delete</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
const { data: rumpun } = await useFetch("http://localhost:5000/rumpun");
console.log(rumpun);

const route = useRoute()
const formData = ref({
  nama: "",
  kode_rmk: "",
});
const onSubmit = async () => {
  console.log(formData);
  const { respons } = await useFetch("http://localhost:3000/rumpun/post", {
    method: "POST",
    body: {
      nama: formData.value.nama,
      kode_rmk: formData.value.nama,
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
</script>
