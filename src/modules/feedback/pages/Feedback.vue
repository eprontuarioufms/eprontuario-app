<template>
  <v-container>
    <e-title title="Sugestões" route="/home"></e-title>
    <v-card class="my-5 pa-2">
      <v-card-title class="pa-2">
        Feedback
      </v-card-title>
      <v-card-subtitle class="pa-2">
        Nos envie sua sugestão de como podemos melhorar esse sistema !
      </v-card-subtitle>

      <v-form @submit.prevent="handleFormSubmit" v-model="isFormValid">
        <v-row class="pa-5">
          <v-text-field
            label="Digite seu email"
            outlined
            type="email"
            :rules="[emailRules.required]"
            hint="Ex: joaopiolho@gmail.com"
            v-model="email"
          >
          </v-text-field>
        </v-row>
        <v-row class="px-5">
          <v-textarea
            auto-grow
            outlined
            label="Em que podemos melhorar ?"
            v-model="feedback"
            :rules="[feedbackRules.required]"
          />
        </v-row>
        <v-row class="px-5 py-2" justify="end">
          <v-btn
            v-if="isAdmin"
            color="primary"
            dark
            @click="$router.push('/home/consultar-feedbacks')"
          >
            Feedbacks
          </v-btn>
          <v-btn
            type="submit"
            color="success"
            :disabled="!isFormValid"
            class="mb-2"
          >
            Enviar
          </v-btn>
        </v-row>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
  import { mapGetters } from "vuex";
  import { sendFeedback } from "../../../firebase/services/feedback";
  import { toastMixin } from "../../../mixins";
  import ETitle from "../../../shared/components/ETitle.vue";
  export default {
    components: { ETitle },
    mixins: [toastMixin],
    data: () => ({
      isFormValid: false,
      emailRules: {
        required: value => !!value || "Este campo é obrigatório",
      },
      feedbackRules: {
        required: value => !!value || "Não pode ser vazio.",
      },
      email: "",
      feedback: "",
    }),
    computed: {
      ...mapGetters("login", ["getEmail", "isAdmin"]),
    },

    methods: {
      async handleFormSubmit() {
        const { email, feedback } = this;
        const createdAt = new Date();

        try {
          await sendFeedback({ email, feedback, createdAt });
          this.showSuccess("Feedback enviado com sucesso.");
          this.$router.push("/home");
        } catch (error) {
          this.throwError(error);
        }
      },
    },
    mounted() {
      this.email = this.getEmail;
    },
  };
</script>

<style></style>
