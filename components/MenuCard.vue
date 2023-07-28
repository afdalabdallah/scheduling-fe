<template>
    <div class="card card-hover">
        <a href="/" class="card-hover-line">
            <div class="p-[20px]">
                <img :src="`${icon}`" alt="icon.png" class="mb-3" />
                <p class="font-bold">{{ title }}</p>
                <p class="text-gray-500">{{ text }}</p>
                <div class="flex justify-end mt-5">
                    <div class="bg-gray-200 p-2 flex items-center justify-center" style="border-radius: 50%;">
                        <img class="w-3 h-3" src="/img/arrow-right.svg" />
                    </div>

                </div>
            </div>

        </a>


    </div>
</template>

<script>
export default {
    props: [
        'title',
        'text',
        'icon',
        'link'
    ]
}
</script>