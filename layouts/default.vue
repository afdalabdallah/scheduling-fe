<style>
</style>

<template>
    <div>
         <NavBar />
         <div class="drawer lg:drawer-open">
          <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
          <div class="drawer-content ">
            <!-- Page content here -->
            <!-- <label for="my-drawer-2" class="btn btn-primary drawer-button lg:hidden">Open drawer</label> -->
           <slot/>
          </div> 
          <div class="drawer-side">
            <label for="my-drawer-2" class="drawer-overlay"></label> 
            <ul class="menu p-4 w-80 h-full bg-gray-200 text-base-content">
              <!-- Sidebar content here -->
              <li><a href="/dosen">Dosen</a></li>
              <li><a href="/matakuliah">Mata Kuliah</a></li>
              <li><a href="/rumpun">Rumpun Mata Kuliah</a></li>
              <li><a href="/perkuliahan">Perkuliahan</a></li>
              <li><a href="/jadwal">Generate Jadwal</a></li>
            </ul>
  
          </div>
        </div>
        
    </div>
   
</template>