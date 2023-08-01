<style></style>

<template>
  <div>
    <NavBar />
    <!-- <SideBar /> -->
    <div class="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content overflow-x-auto">
        <!-- Page content here -->
        <div class="p-[24px] pt-[100px]">
          <div class="lg:mr-[75px] lg:ml-[75px]">
            <slot />
          </div>

        </div>
        <!-- <slot /> -->
      </div>
      <div class="drawer-side z-20 lg:z-0">
        <label for="my-drawer-2" class="drawer-overlay"></label>

        <ul class="menu p-4 lg:pt-[80px] sm:w-2/4 h-screen bg-base-200 text-base-content">
          <!-- Sidebar content here -->
          <div class="flex justify-between items-center lg:hidden mb-5">
            <a class="flex gap-1 pl-2 " style="font-size: 22px; font-weight: 500;">
              <img class="mt-[1px] w-[60px]" src="/img/logo-myits-blue.svg" />
              <span class="">Schedule</span>
            </a>
            <label for="my-drawer-2" class="lg:hidden">
              <img class="w-4" src="/img/cross.svg" />
            </label>

          </div>

          <li class="mb-1">
            <NuxtLink to="/" active-class="active-link">
              <div class="flex items-center gap-1">
                <img class="w-[24px] h-[24px]" src="/img/beranda.svg" />
                Beranda
              </div>
            </NuxtLink>
          </li>
          <li class="mb-1">
            <NuxtLink to="/matakuliah" active-class="active-link">
              <div class="flex items-center gap-1">
                <img class="w-[24px] h-[24px]" src="/img/mk.svg" />
                Mata Kuliah
              </div>
            </NuxtLink>
          </li>
          <li class="mb-1">
            <NuxtLink to="/dosen" active-class="active-link">
              <div class="flex items-center gap-1">
                <img class="w-[24px] h-[24px]" src="/img/dosen_icon.svg" />
                Dosen
              </div>
            </NuxtLink>
          </li>


          <li class="mb-1">
            <NuxtLink to="/rumpun" active-class="active-link">
              <div class="flex items-center gap-1">
                <img class="w-[24px] h-[24px]" src="/img/rumpun.svg" />
                Rumpun Mata Kuliah
              </div>
            </NuxtLink>

          </li>
          <li class="mb-1">
            <NuxtLink to="/perkuliahan" active-class="active-link">
              <div class="flex items-center gap-1">
                <img class="w-[24px] h-[24px]" src="/img/perkuliahan_icon.svg" />
                Perkuliahan
              </div>
            </NuxtLink>

          </li>
          <li class="mb-1">
            <NuxtLink to="/jadwal" active-class="active-link">
              <div class="flex items-center gap-1">
                <img class="w-[24px] h-[24px]" src="/img/jadwal_icon.svg" />
                Generate Jadwal
              </div>
            </NuxtLink>

          </li>
        </ul>
      </div>
    </div>
    <!-- <slot /> -->
  </div>
</template>

<script setup>
</script>
