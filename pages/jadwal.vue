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
                                <div>07.00 - 08.00</div>
                                <div>08.00 - 09.00</div>
                                <div>09.00 - 10.00</div>
                                <div>10.00 - 11.00</div>
                                <div>12.00 - 13.00</div>
                                <div>13.00 - 14.00</div>
                                <div>14.00 - 15.00</div>
                                <div>16.00 - 17.00</div>
                                <div>17.00 - 18.00</div>
                            </td>
                        </tr>
                        <tr>
                            <td>Selasa</td>
                            <td>
                                <div>07.00 - 08.00</div>
                                <div>08.00 - 09.00</div>
                                <div>09.00 - 10.00</div>
                                <div>10.00 - 11.00</div>
                                <div>12.00 - 13.00</div>
                                <div>13.00 - 14.00</div>
                                <div>14.00 - 15.00</div>
                                <div>16.00 - 17.00</div>
                                <div>17.00 - 18.00</div>
                            </td>
                        </tr>
                        <tr>
                            <td>Rabu</td>
                            <td>
                                <div>07.00 - 08.00</div>
                                <div>08.00 - 09.00</div>
                                <div>09.00 - 10.00</div>
                                <div>10.00 - 11.00</div>
                                <div>12.00 - 13.00</div>
                                <div>13.00 - 14.00</div>
                                <div>14.00 - 15.00</div>
                                <div>16.00 - 17.00</div>
                                <div>17.00 - 18.00</div>
                            </td>
                        </tr>
                        <tr>
                            <td>Kamis</td>
                            <td>
                                <div>07.00 - 08.00</div>
                                <div>08.00 - 09.00</div>
                                <div>09.00 - 10.00</div>
                                <div>10.00 - 11.00</div>
                                <div>12.00 - 13.00</div>
                                <div>13.00 - 14.00</div>
                                <div>14.00 - 15.00</div>
                                <div>16.00 - 17.00</div>
                                <div>17.00 - 18.00</div>
                            </td>
                        </tr>
                        <tr>
                            <td>Jumat</td>
                            <td>
                                <div>07.00 - 08.00</div>
                                <div>08.00 - 09.00</div>
                                <div>09.00 - 10.00</div>
                                <div>10.00 - 11.00</div>
                                <div>12.00 - 13.00</div>
                                <div>13.00 - 14.00</div>
                                <div>14.00 - 15.00</div>
                                <div>16.00 - 17.00</div>
                                <div>17.00 - 18.00</div>
                            </td>
                        </tr>
                        <tr v-for="(perkuliahan, index) in perkuliahanData">
                            <th>
                                {{ index + 1 }}
                            </th>
                            <td>
                                {{ perkuliahan.kode_mk }}
                            </td>
                            <td>
                                {{ perkuliahan.nama_mk }}
                            </td>
                            <td>
                                {{ perkuliahan.semester }}
                            </td>
                            <td>
                                {{ perkuliahan.rumpun }}
                            </td>
                            <td>
                                {{ perkuliahan.kode_dosen }}
                            </td>
                            <td>
                                {{ perkuliahan.ruangan }}
                            </td>
                            <td>
                                {{ perkuliahan.sesi }}
                            </td>
                            <td>
                                <div class="flex gap-2">
                                    <EditModal @formSubmitted="onSubmitEdit" v-bind:index="index" v-bind:datas="perkuliahan"
                                        v-bind:form-format="formFormat" table="Perkuliahan" />
                                    <DeleteModal @dataDeleted="deleteData" v-bind:data="perkuliahan"
                                        v-bind:first="perkuliahan.kode_mk" v-bind:second="perkuliahan.nama_mk"
                                        table="Perkuliahan" />
                                </div>
                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>

        </div>
    </div>
</template>