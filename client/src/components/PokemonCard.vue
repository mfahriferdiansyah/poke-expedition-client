<script></script>

<template>
  <div class="relative m-5 flex h-40 w-64 items-end justify-center pb-1 hover:scale-105">
    <div class="static flex h-32 w-64 cursor-pointer rounded-3xl bg-sky-500 shadow-lg">
      <div class="flex w-4/5 flex-col justify-evenly px-6 py-4">
        <h1 class="justify-center font-bold capitalize text-cyan-100">squirtle</h1>
        <div>
          <p class="font-normal text-white">HP: 125</p>
          <p class="font-normal text-white">Attack: 40</p>
        </div>
      </div>
      <div class="absolute right-5 top-0 flex h-32 w-32 justify-end">
        <img
          class="h-full scale-110 hover:scale-125"
          src="https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/2.svg"
          alt=""
        />
      </div>
    </div>
  </div>
</template>
