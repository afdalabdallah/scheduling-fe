<template>
    <div class="">
        <p class=" font-bold text-xl mb-1">PERKULIAHAN</p>
        <div class="bg-white rounded-lg">

            <div class=" overflow-x-auto">
                <table class="table table-sm">
                    <!-- head -->
                    <thead class="bg-[#E9F4FF] border-none text-black">
                        <tr>
                            <th>Hari</th>
                            <th>Jam</th>
                            <th>101</th>
                            <th>102</th>
                            <th>103</th>
                            <th>104</th>
                            <th>105B</th>
                            <th>105A</th>
                            <th>106</th>
                            <th>107</th>
                            <th>108</th>
                            <th>111</th>
                            <th>112</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(value, key) in processedData" :key="key">
                            <td>
                                {{ key }}
                            </td>
                            <td>
                                <div>Sesi 1</div>
                                <div>Sesi 2</div>
                                <div>Sesi 3</div>
                                <div>Sesi 4</div>
                                <div>Sesi 5</div>
                            </td>
                            <td v-for="(data, dataKey) in value">
                                <div v-if="data.length">
                                    <div v-for="sesi in ['1', '2', '3', '4', '5']">
                                        <div v-for="(matkul) in data">
                                            <div v-if="matkul.sesi[2] == sesi">
                                                a
                                            </div>
                                            <div v-else>bo</div>
                                        </div>
                                    </div>
                                </div>
                                <!-- <div v-else>&nbsp;</div> -->
                            </td>

                        </tr>



                    </tbody>
                </table>
            </div>

        </div>
    </div>
</template>

<script setup>
let mockData = [
    {
        "dosen": "SD",
        "mata_kuliah": "IF4202",
        "kelas": "A",
        "ruangan": "101",
        "sesi": "305",
        "preferensi": ["Pagi", "Siang"],
        "tipe": "jurusan",
        "rmk": "AJK",
    },
    {
        "dosen": "SD",
        "mata_kuliah": "IF4203",
        "kelas": "A",
        "ruangan": "101",
        "sesi": "105",
        "preferensi": ["Pagi", "Siang"],
        "tipe": "jurusan",
        "rmk": "AJK",
    },
    {
        "dosen": "SD",
        "mata_kuliah": "IF4204",
        "kelas": "A",
        "ruangan": "101",
        "sesi": "102",
        "preferensi": ["Pagi", "Siang"],
        "tipe": "jurusan",
        "rmk": "AJK",
    },
    {
        "dosen": "SD",
        "mata_kuliah": "IF4205",
        "kelas": "A",
        "ruangan": "102",
        "sesi": "105",
        "preferensi": ["Pagi", "Siang"],
        "tipe": "jurusan",
        "rmk": "AJK",
    }
]

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
    "111",
    "112"
]

listHari.forEach((data) => {
    if (!processedData[data]) {
        processedData[data] = {}
    }

    listRuangan.forEach((ruangan) => {
        if (!processedData[data][ruangan]) {
            processedData[data][ruangan] = []
        }
    })
})



mockData.sort((a, b) => {
    const sesiA = parseInt(a.sesi)
    const sesiB = parseInt(b.sesi)
    return sesiA - sesiB
})

console.log(mockData);

mockData.forEach((data) => {
    const ruanganKey = data.ruangan
    const dayKey = data.sesi.charAt(0).toLocaleLowerCase();
    const dayKeyStr = dayDict[dayKey]

    processedData[dayKeyStr][ruanganKey].push(data)
})



// const sortedData = sortDataBySesi(processedData)
console.log(processedData);
</script>