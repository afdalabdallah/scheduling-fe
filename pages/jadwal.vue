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
                        <tr>
                            <td>Senin</td>
                            <td>
                                <div>Sesi 1</div>
                                <div>Sesi 2</div>
                                <div>Sesi 3</div>
                                <div>Sesi 4</div>
                                <div>Sesi 5</div>
                            </td>
                            <td v-for="data in mockData">
                                <div v-if="data.ruangan == 101">{{ data.sesi }}</div>
                                <div v-else>&nbsp;</div>
                            </td>
                            <td>
                                <div>a</div>
                                <div>a</div>
                                <div>a</div>
                                <div>&nbsp;</div>
                                <div>&nbsp;</div>
                            </td>
                            <td>
                                <div>a</div>
                                <div>a</div>
                                <div>&nbsp;</div>
                                <div>a</div>
                                <div>&nbsp;</div>

                            </td>
                        </tr>
                        <tr>
                            <td>Selasa</td>
                            <td>
                                <div>Sesi 1</div>
                                <div>Sesi 2</div>
                                <div>Sesi 3</div>
                                <div>Sesi 4</div>
                                <div>Sesi 5</div>
                            </td>
                        </tr>
                        <tr>
                            <td>Rabu</td>
                            <td>
                                <div>Sesi 1</div>
                                <div>Sesi 2</div>
                                <div>Sesi 3</div>
                                <div>Sesi 4</div>
                                <div>Sesi 4</div>
                            </td>
                        </tr>
                        <tr>
                            <td>Kamis</td>
                            <td>
                                <div>Sesi 1</div>
                                <div>Sesi 2</div>
                                <div>Sesi 3</div>
                                <div>Sesi 4</div>
                                <div>Sesi 5</div>
                            </td>
                        </tr>
                        <tr>
                            <td>Jumat</td>
                            <td>
                                <div>Sesi 1</div>
                                <div>Sesi 2</div>
                                <div>Sesi 3</div>
                                <div>Sesi 4</div>
                                <div>Sesi 5</div>
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
        "mata_kuliah": "IF4201",
        "kelas": "A",
        "ruangan": "101",
        "sesi": "305",
        "preferensi": ["Pagi", "Siang"],
        "tipe": "jurusan",
        "rmk": "AJK",
    },
    {
        "dosen": "SD",
        "mata_kuliah": "IF4201",
        "kelas": "A",
        "ruangan": "101",
        "sesi": "105",
        "preferensi": ["Pagi", "Siang"],
        "tipe": "jurusan",
        "rmk": "AJK",
    },
    {
        "dosen": "SD",
        "mata_kuliah": "IF4201",
        "kelas": "A",
        "ruangan": "101",
        "sesi": "102",
        "preferensi": ["Pagi", "Siang"],
        "tipe": "jurusan",
        "rmk": "AJK",
    },
    {
        "dosen": "SD",
        "mata_kuliah": "IF4201",
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

listRuangan.forEach((data) => {
    if (!processedData[data]) {
        processedData[data] = {}
    }

    for (const key in dayDict) {
        if (!processedData[data][dayDict[key]]) {
            processedData[data][dayDict[key]] = []
        }
    }
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

    processedData[ruanganKey][dayKeyStr].push(data)
})



// const sortedData = sortDataBySesi(processedData)
console.log(processedData);
</script>