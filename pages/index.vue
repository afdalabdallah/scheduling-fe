<template>
    <div class=" ">
        <div class="grid gap-6 ">
            <div class="flex items-center justify-between ">
                <div>
                    <h1 class="md:text-4xl">Dashboard</h1>
                    <p class="text-[16px] md:text-xl">Selamat datang di myITS Schedule</p>
                </div>
                <img class="w-[70px] md:w-[150px]" src="/img/myITS-Thesis.svg" alt="myitsthesis" />
            </div>
            <div class="w-full shadow-md rounded-xl bg-white">
                <div class="p-[25px]">
                    <p>Generate Jadwal</p>
                </div>
            </div>
            <div>
                <p class="font-bold md:text-[18px]">Menu Pokok</p>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[12px] mt-2">
                    <MenuCard title="Dosen" text="Kelola dosen" icon="/img/dosen_icon.svg" link="/dosen" />
                    <MenuCard title="Mata Kuliah" text="Kelola mata kuliah" icon="/img/mk.svg" link="/matakuliah" />
                    <MenuCard title="Perkuliahan" text="Kelola perkuliahan" icon="/img/perkuliahan_icon.svg"
                        link="/perkuliahan" />

                </div>
            </div>
        </div>


    </div>
</template>

