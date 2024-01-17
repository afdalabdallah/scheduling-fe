<template>
    <div class="">
        <p class=" font-bold text-xl mb-1">JADWAL</p>
        <div class="bg-white rounded-lg">

            <div class=" overflow-x-auto">

                <div class="">
                    <AddModal @formSubmitted="onSubmit" v-bind:form-format="formFormat" form-title="JADWAL"
                        table="jadwal" />
                    <!-- <LoadingModal v-bind:showLoading="showLoading" /> -->
                </div>
                
                <div>
                    <form id="selectJadwal" @submit.prevent="selectJadwal">
                        <select v-model="selectedJadwalID">
                            <option v-for="jadwal in allJadwal" :key="jadwal.ID" :value="jadwal.ID">{{ jadwal.CreatedAt }}
                            </option>
                        </select><br>
                        <button type="submit">Submit</button>
                    </form>
                </div>
                <div>
                    Created at: {{ created_at.substring(0, 10) }}
                    <br />

                </div>

                <table class="table table-sm table-fixed" v-if="latestJadwal">

                    <thead class="bg-[#E9F4FF] text-black">
                        <tr>
                            <th>Hari</th>
                            <th>Jam</th>
                            <th v-for="ruangan in listRuangan">
                                <div v-if="ruangan == 501">
                                    105B
                                </div>
                                <div v-else>{{ ruangan }}</div>

                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(hari, keyHari) in processedData" :key="key">
                            <td class="border border-slate-400">
                                {{ keyHari }}
                            </td>
                            <td>
                                <div class="border border-slate-400" v-for="sesi in listSesi">
                                    Sesi {{ sesi }}
                                </div>
                            </td>
                            <td v-for="(dataRuangan, keyRuangan) in hari">
                                <div v-for="sesi in listSesi">
                                    <div v-if="sesiNotEmpty(dataRuangan[sesi])" class="border border-slate-400">
                                        {{ dataRuangan[sesi].mata_kuliah }}
                                        {{ dataRuangan[sesi].kelas }}
                                        {{ dataRuangan[sesi].dosen }}
                                    </div>
                                    <div class="border border-slate-400" v-else>&nbsp; - </div>
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
import { GeneratedIdentifierFlags } from 'typescript';




// Start of utils

let formatJadwal = reactive([])

let processedData = reactive({})

const dayDict = {
    "1": "Senin",
    "2": "Selasa",
    "3": "Rabu",
    "4": "Kamis",
    "5": "Jumat"
}

const listHari = [
    "Senin", "Selasa", "Rabu", "Kamis", "Jumat"
]

function sesiNotEmpty(obj) {
    return Object.keys(obj).length > 0;
}

let getListRuangan = ref([])
const getRuangan = async () => {
    const { data } = await useFetch("http://localhost:3000/api/ruangan");
    getListRuangan = data.value
    console.log(getListRuangan);
}
await getRuangan()

let listRuangan = []

getListRuangan.forEach((ruangan) => {
    listRuangan.push(ruangan.nomor_ruangan)
})

const sesi = ['Sesi 1', 'Sesi 2', 'Sesi 3', 'Sesi 4', 'Sesi 5', 'Sesi 6', 'Sesi 7', 'Sesi 8', 'Sesi 9', 'Sesi 10']
const hari = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat']


const formFormat = [
    {
        'label': "Unwanted Session",
        'name': "unwanted_sesi",
        'type': 'checkbox',
        'hari': hari,
        'sesi': sesi,
    },
    {
        'label': "Ruangan",
        'name': "ruangan",
        'type': 'checkbox',
        'ruangan': listRuangan
    }
]

const changeSesiFormat = (rawUnwantedSession) => {
    const hariDict = {
        "Senin": "1",
        "Selasa": "2",
        "Rabu": "3",
        "Kamis": "4",
        "Jumat": "5"
    }

    const sesiDict = {
        "Sesi 1": "01",
        "Sesi 2": "02",
        "Sesi 3": "03",
        "Sesi 4": "04",
        "Sesi 5": "05",
        "Sesi 6": "06",
        "Sesi 7": "07",
        "Sesi 8": "08",
        "Sesi 9": "09",
        "Sesi 10": "10"
    }

    let tempString = hariDict[rawUnwantedSession.unwanted_hari] + sesiDict[rawUnwantedSession.unwanted_sesi]
    return tempString


}

function processFormData(rawFormData, formatJadwal) {
    let processedFormData = { ...rawFormData };
    const selectedRuangan = [];
    const selectedSessions = [];

    for (const key in processedFormData) {
        if (processedFormData[key] === true && listRuangan.includes(key) && key != "unwanted_sesi") {
            selectedRuangan.push(key);
            delete processedFormData[key];
        } else if (key === "unwanted_sesi") {
            for (const unwanted of processedFormData[key]) {
                let formattedSession = changeSesiFormat(unwanted)
                selectedSessions.push(formattedSession)
            }
        }



    }
    console.log("Selected Ruangan and Session");
    console.log(selectedRuangan);
    console.log(selectedSessions);
    processedFormData["data"] = formatJadwal
    processedFormData.ruangan = selectedRuangan
    processedFormData.unwanted_sesi = selectedSessions

    return processedFormData;
}

function sortedSesi(dataRuangan) {
    // Convert keys to integers and sort them numerically
    const keys = Object.keys(dataRuangan).map(Number).sort((a, b) => a - b);
    // Convert back to strings
    return keys.map(String);
}

const listSesi = [ //this will be fetched later from API
    "01", "02", "03", "04", "05", "06", "07", "08", "09", "10"
]

const emptyProcessedData = () => {
    listHari.forEach((data) => {
        if (!processedData[data]) {
            processedData[data] = {}
        }

        listRuangan.forEach((ruangan) => {
            if (!processedData[data][ruangan]) {
                processedData[data][ruangan] = {}
            }
            listSesi.forEach((sesi) => {
                processedData[data][ruangan][sesi] = {}
            })
        })


    })
}
emptyProcessedData()






// // const sortedData = sortDataBySesi(processedData)
console.log("Processed Data");
console.log(processedData);



const getFormatJadwal = async () => {
    try {
        const { data } = await useFetch("http://localhost:3000/api/perkuliahan/jadwal");
        // console.log("Get Format Jadwal")
        // console.log(data)
        if (data && data.value && data.value.length > 0) {
            let dataLength = data.value.length;
            formatJadwal = data.value;
            // unwanted_sesi = data.value[dataLength - 1].unwanted_sesi;
            // list_ruangan = data.value[dataLength - 1].list_ruangan;
            console.log("Fetching Format");
            console.log(formatJadwal);
        } else {
            console.log("Data does not exist or is empty.");
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};


let fillDisplayData = (geneticResult) => {
    emptyProcessedData()
    geneticResult.forEach((data) => {
        const ruanganKey = data.ruangan
        const dayKey = data.sesi.charAt(0);
        const dayKeyStr = dayDict[dayKey]
        processedData[dayKeyStr][ruanganKey][data.sesi.substring(1, 3)] = data
    })
    return
}


let latestJadwal = reactive([])
let created_at = ref("")
let unwanted_sesi = reactive([])
let list_ruangan = reactive([])
const getLatestJadwal = async () => {
    try {
        const { data } = await useFetch("http://localhost:3000/api/jadwal");
        // console.log("Get Format Jadwal")
        // console.log(data)
        if (data && data.value && data.value.length > 0) {
            let dataLength = data.value.length;
            latestJadwal = data.value[dataLength - 1];
            unwanted_sesi = latestJadwal.unwanted_sesi;
            list_ruangan = latestJadwal.list_ruangan;
            created_at.value = latestJadwal.CreatedAt
            fillDisplayData(latestJadwal.data)
        } else {
            console.log("Data does not exist or is empty.");
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}
await getLatestJadwal()
// let showLoading = ref(true)
let geneticAlgorithmResult
const onSubmit = async (formData) => {
    console.log("Unprocessed");
    console.log(formData);
    await getFormatJadwal()
    let processedFormData = processFormData(formData, formatJadwal)
    console.log("Processed Form Data");
    console.log("Body to model");
    console.log(processedFormData);
    let data
    
    try {
        const response = await useFetch("http://localhost:3000/api/generate", {
            method: "POST",
            body: processedFormData,
            headers: { "Access-Control-Allow-Origin": "*", 'Access-Control-Allow-Headers': '*', }
        });
        data = response.data
    } catch (error) {
        console.log("Error duriing API Called:", error)
    }
    location.reload()

}

let allJadwal = reactive([])
const getAllJadwal = async () => {
    try {
        const response = await useFetch("http://localhost:3000/api/jadwal/", {
            method: "GET",
            headers: { "Access-Control-Allow-Origin": "*", 'Access-Control-Allow-Headers': '*', }
        });
        allJadwal = response.data.value
        console.log("All jadwal")
        console.log(allJadwal)
    } catch (error) {
        console.log("Error during API Called:", error)
    }
}
await getAllJadwal()

let selectedJadwal = reactive([])
let selectedJadwalID = reactive(NaN)
const selectJadwal = async () => {
    console.log("Selected Jadwal")
    console.log(selectedJadwalID)
    try {
        const response = await useFetch("http://localhost:3000/api/jadwal/" + selectedJadwalID, {
            method: "GET",
            headers: { "Access-Control-Allow-Origin": "*", 'Access-Control-Allow-Headers': '*', }
        });
        selectedJadwal = response.data.value.data
        created_at.value = response.data.value.CreatedAt
        console.log(created_at)
        console.log("Selected data jadwal")
        console.log(selectedJadwal)
        fillDisplayData(selectedJadwal)
    } catch (error) {
        console.log("Error during API Called:", error)
    }
}


</script>