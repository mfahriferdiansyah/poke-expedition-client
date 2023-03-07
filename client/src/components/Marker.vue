<script>
export default {
    props: ['colorMarker']
}
</script>

<template>
  <button class="">
    <svg
      class="w-20 h-20 animate-bounce hover:animate-none"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      fill="#000000"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <path
          d="M512 85.333333c-164.949333 0-298.666667 133.738667-298.666667 298.666667 0 164.949333 298.666667 554.666667 298.666667 554.666667s298.666667-389.717333 298.666667-554.666667c0-164.928-133.717333-298.666667-298.666667-298.666667z m0 448a149.333333 149.333333 0 1 1 0-298.666666 149.333333 149.333333 0 0 1 0 298.666666z"
          :fill="colorMarker"
        ></path>
      </g>
    </svg>
    <div class="shadow animate-ping"></div>
  </button>
</template>

<style>
.shadow{
		width: 18px;
		height: 4px;
		background:  black;
		margin: 5px auto 0 auto;
		border-radius: 50%;
	}
</style>
