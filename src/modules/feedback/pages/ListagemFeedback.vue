<template>
  <v-container>
    <e-title title="Feedbacks" route="feedback" />

    <div class="my-4" v-for="feedback in feedbacks" :key="feedback.id">
      <v-card>
        <v-card-title>{{ feedback.email }}</v-card-title>
        <v-card-subtitle>{{ feedback.createdAt.seconds }}</v-card-subtitle>
        <v-card-text>
          {{ feedback.feedback }}
        </v-card-text>
      </v-card>
    </div>
  </v-container>
</template>

<script>
  import { getFeedback } from "../../../firebase/services/feedback";
  import ETitle from "../../../shared/components/ETitle.vue";
  export default {
    components: { ETitle },
    data: () => ({
      feedbacks: [],
    }),
    methods: {
      async fetchFeedbacks() {
        const feedbacks = await getFeedback();
        this.feedbacks = feedbacks;
      },
    },
    mounted() {
      this.fetchFeedbacks();
    },
  };
</script>

<style></style>
