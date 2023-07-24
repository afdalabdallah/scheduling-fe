<template>
    <div>
        <form @submit.prevent="onSubmit">
            <input class="mb-2" type="text" v-model="formData.nama" id="nama" /><br>
            <input type="text" v-model="formData.kode_rmk" id="kode_rmk" />
            <button type="submit">Submit</button>
        </form>
        
    </div>
  <div>
    <div>Rumpun:</div>
    <div>
      <div v-for="r in rumpun">
        <span>{{ r.nama }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const { data: rumpun } = await useFetch("http://localhost:5000/rumpun");

const formData = ref({
    nama: '',
    kode_rmk: ''
});
const onSubmit = async () => {
    console.log(formData);
    const {respons} = await useFetch("http://localhost:5000/rumpun",{
        method: 'POST',
        body: {
            nama: formData.value.nama,
            kode_rmk: formData.value.nama
        }
    })
    console.log(respons);
}
</script>
