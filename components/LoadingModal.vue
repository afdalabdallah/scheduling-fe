<template>
    <!-- The button to open modal -->

    <!-- Put this part before </body> tag -->
    <input type="checkbox" :id="table" class="modal-toggle" />
    <div class="">
        <div class="">
            <!-- MODAL CONTENT -->
            <!-- <label :for="table" class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label> -->
            <div class="mb-2 text-center text-cyan-400 text-2xl font-bold">
                <div v-if="showLoading == true">
                            <span class="loading loading-spinner text-info"></span>
                </div>
            </div>
            
            <!-- END OF CONTENT -->


        </div>
    </div>
</template>

<script setup>
const emit = defineEmits(['inFocus', 'submit'])

let unwantedSessionData = ref([])
const props = defineProps(
    [
        'table',
        'showModal'
    ]
)


</script>