<template>
  <div class="pl-5 pr-5 navbar bg-white fixed z-10">
    <div class="flex-1">
      <label for="my-drawer-2" class="lg:hidden">
        <img class="w-[16px]" src="/img/burger-nav.png" />
      </label>
      <a class="flex gap-1 pl-2" style="font-size: 22px; font-weight: 500;">
        <img width="60px" class="mt-[4px]" src="/img/logo-myits-blue.svg" />
        <span class="">Schedule</span>
      </a>
    </div>
    <div class="flex-none gap-2">
      <div class="dropdown dropdown-end">
        <label tabindex="0" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <img src="/img/user.png" />
          </div>
        </label>
        <ul tabindex="0" class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
          <li>
            <a class="justify-between">
              Profile
            </a>
          </li>
          <li><a>Settings</a></li>
          <li><a>Logout</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>