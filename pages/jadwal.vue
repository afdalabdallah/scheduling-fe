<template>
    <div class="">
        <p class=" font-bold text-xl mb-1">JADWAL</p>
        <div class="bg-white rounded-lg">

            <div class=" overflow-x-auto">
                <!-- <div class="flex gap-2 justify-between pl-4 pr-4">
                    <div>Hari</div>
                    <div>Jam</div>
                    <div v-for="ruangan in listRuangan">
                        {{ ruangan }}
                    </div>
                </div>
                <div class="grid">
                  
                </div> -->
                <div class="">
                    <AddModal @formSubmitted="onSubmit" v-bind:form-format="formFormat" form-title="Generate Jadwal"
                        table="jadwal" />
                </div>
                <table class="table table-sm table-fixed" v-if="mockData.length > 0">
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
                                <div v-for="sesi in listSesi">
                                    Sesi {{ sesi }}
                                </div>
                            </td>
                            <td v-for="(dataRuangan, keyRuangan) in hari">
                                <div v-for="(sesi, keySesi) in dataRuangan" class="border border-slate-400">
                                    <div v-if="sesiNotEmpty(sesi)" class="border border-slate-400">
                                        {{ sesi.mata_kuliah }}
                                        {{ sesi.dosen }}
                                    </div>
                                    <div v-else>&nbsp; </div>
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

let mockData = reactive([])

let processedData = {}

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

function sortedSesi(dataRuangan) {
    // Convert keys to integers and sort them numerically
    const keys = Object.keys(dataRuangan).map(Number).sort((a, b) => a - b);
    // Convert back to strings
    return keys.map(String);
}

const listSesi = [ //this will be fetched later from API
    "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"
]

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



mockData.sort((a, b) => {
    const sesiA = parseInt(a.sesi)
    const sesiB = parseInt(b.sesi)
    return sesiA - sesiB
})

// console.log(processedData);
// console.log("MockData");
console.log(mockData)
mockData.forEach((data) => {
    // console.log(data);
    const ruanganKey = data.ruangan
    const dayKey = data.sesi.charAt(0);
    const dayKeyStr = dayDict[dayKey]
    processedData[dayKeyStr][ruanganKey][data.sesi.substring(1, 4)] = data
})


// // const sortedData = sortDataBySesi(processedData)
console.log(processedData);

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

function processFormData(rawFormData) {
    const processedFormData = { ...rawFormData };
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
    // if (selectedRuangan.length > 0 || selectedSessions.length > 0) {
    //     processedFormData.preferensi = {};

    //     if (selectedDays.length > 0) {
    //         processedFormData.preferensi.hari = selectedDays;
    //     }

    //     if (selectedSessions.length > 0) {
    //         processedFormData.preferensi.sesi = selectedSessions;
    //     }
    // }
    processedFormData.ruangan = selectedRuangan
    processedFormData.unwanted_sesi = selectedSessions

    return processedFormData;
}

const getFormatJadwal = async () => {
    const { data } = await useFetch("http://localhost:3000/api/api.json");
    mockData = data.value
    console.log(mockData);
}
await getFormatJadwal()

let geneticAlgorithmResult
const onSubmit = async (formData) => {
    console.log("Unprocessed");
    console.log(formData);
    let processedData = processFormData(formData)
    console.log("Processed Form Data");
    processedData.data = mockData
    console.log("Body to model");
    console.log(processedData);
    const { data } = await useFetch("http://localhost:3000/api/generate", {
        method: "POST",
        body: processedData,
        headers: { "Access-Control-Allow-Origin": "*", 'Access-Control-Allow-Headers': '*', }
    });
    console.log("Hasil GA");
    geneticAlgorithmResult = data
    console.log(data);
    location.reload()
}


</script>