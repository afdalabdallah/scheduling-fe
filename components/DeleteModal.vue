<template>
    <!-- The button to open modal -->
    <label :for="data.kode_mk" class="bg-red-600 p-1 rounded-md text-white">Delete</label>

    <!-- Put this part before </body> tag -->
    <input type="checkbox" :id="data.kode_mk" class="modal-toggle" />
    <div class="modal">
        <div class="modal-box">
            <div class="mb-2 text-center text-red-500 text-2xl font-bold">
                HAPUS DATA
            </div>
            <h3 class="font-bold">Apakah anda ingin menghapus data {{ table }}</h3>
            <div class="mt-3">
                <p>
                    {{ data.kode_mk }}
                </p>
                <p>
                    {{ data.nama }}
                </p>
            </div>
            <div class="modal-action ">
                <div class="btn bg-red-600 hover:bg-red-400" @click="deleteData(data.ID)">
                    <label :for="data.kode_mk">
                        YES
                    </label>

                </div>
                <label :for="data.kode_mk" class="btn bg-cyan-400 hover:bg-cyan-200">Tidak</label>
            </div>
        </div>
    </div>
</template>

<script setup>
let show = true
const props = defineProps(
    [
        'table',
        'data'
    ]
)

const deleteData = async (id) => {
    var baseUrl = "http://localhost:5000/matkul/" + id
    console.log(baseUrl);
    const { response } = await useFetch(baseUrl, {
        method: "DELETE",
    });
    console.log(response);
    location.reload()
    console.log("Data deleted!");
}

</script>