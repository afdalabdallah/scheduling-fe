<style></style>

<template>
  <div>
    <NavBar />
    <!-- <SideBar /> -->
    <div class="drawer lg:drawer-open ">
      <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content ">
        <!-- Page content here -->
        <slot />

      </div>
      <div class="drawer-side z-20 lg:z-0">
        <label for="my-drawer-2" class="drawer-overlay"></label>
        <ul class="menu p-4 pt-[80px] w-auto h-screen bg-base-200 text-base-content">
          <!-- Sidebar content here -->
          <li><a href="/">Beranda</a></li>
          <li><a href="/dosen">Dosen</a></li>
          <li><a href="/matakuliah">Mata Kuliah</a></li>
          <li><a href="/rumpun">Rumpun Mata Kuliah</a></li>
          <li><a href="/perkuliahan">Perkuliahan</a></li>
          <li><a href="/jadwal">Generate Jadwal</a></li>
        </ul>

      </div>
    </div>
    <!-- <slot /> -->

  </div>
</template>