<template>
    <div class="">
        <p class=" font-bold text-xl mb-1">PERKULIAHAN</p>
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
                <table class="table table-sm table-fixed">
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
const fetchMock = async () => {
    const { data } = await useFetch("http://localhost:3000/api/api.json");
    mockData = data.value.data
}

await fetchMock()



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

const listRuangan = [ //this will be fetched from API later
    "101",
    "102",
    "103",
    "104",
    "105",
    "501",
    "106",
    "107",
    "108",
    "301",
    "302",
    "111",
    "112"
]

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

console.log(processedData);
// console.log("MockData");
// console.log(mockData)
mockData.forEach((data) => {
    // console.log(data);
    const ruanganKey = data.ruangan
    const dayKey = data.sesi.charAt(0);
    const dayKeyStr = dayDict[dayKey]
    let sesiKey
    if (data.sesi.substring(1,4) == "10"){
        sesiKey == data.sesi.substring(1, 4)
    }else sesiKey = data.sesi[2]
    // console.log(data.sesi.substring(1, 4));
    // console.log(ruanganKey);
    // console.log(dayKey);
    // console.log(dayKeyStr);
    processedData[dayKeyStr][ruanganKey][sesiKey] = data
})


// // const sortedData = sortDataBySesi(processedData)
console.log(processedData);
</script>