<template>
  <v-main>
    <v-container fluid>
      <switch-theme></switch-theme>
      <logo />
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md5>
          <v-card class="login-title elevation-12 pa-5 flex-column" shaped>
            <v-card-title class="pa-5 mx-auto">
              <h2 class="pt-5">Cadastro</h2>
            </v-card-title>
            <v-card-subtitle class="pb-12">
              <span> Bom, detectamos que voce é um </span>
              <span class="font-weight-bold">{{ isProfessor }}</span>
            </v-card-subtitle>
            <v-card-text>
              <v-form @submit.prevent="handleFormSubmit" v-model="form">
                <v-text-field
                  outlined
                  label="Email"
                  v-model="email"
                  data-cy="email"
                  required
                  type="email"
                ></v-text-field>
                <v-text-field
                  label="Senha"
                  v-model="password"
                  outlined
                  type="password"
                  data-cy="password"
                  required
                  :rules="[passwordRules.required, passwordRules.min]"
                ></v-text-field>
                <v-text-field
                  label="Confirmação de Senha"
                  v-model="confirmationPassword"
                  outlined
                  type="password"
                  data-cy="confirmation-password"
                  required
                ></v-text-field>
                <v-row class="mt-5" justify="center">
                  <v-btn
                    large
                    class="primary"
                    type="submit"
                    data-cy="btn-next"
                    :disabled="!form"
                  >
                    Proximo
                  </v-btn>
                </v-row>
              </v-form>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <e-overlay :loading="loading"></e-overlay>
  </v-main>
</template>

<script>
  import Logo from "@/shared/components/Logo.vue";
  import { loadingMixin, toastMixin } from "@/mixins";
  import EOverlay from "../../../shared/components/EOverlay.vue";
  import SwitchTheme from "../../../shared/components/SwitchTheme.vue";
  import { mapActions, mapState } from "vuex";
  import { createEmail } from "../services/firebase";
  export default {
    components: { EOverlay, SwitchTheme, Logo },
    mixins: [loadingMixin, toastMixin],
    data: () => ({
      email: "",
      password: "",
      confirmationPassword: "",
      form: false,
      passwordRules: {
        required: value => !!value || "Não pode ser vazio.",
        min: v => v.length >= 8 || "Minimo de 8 Caracteres",
      },
    }),
    // TODO: obrigar uma senha melhor, 8 caracteres com caracteres especiais
    computed: {
      ...mapState("login", ["usuarioProvisorio"]),
      isProfessor() {
        return this.usuarioProvisorio.professor ? "Professor" : "Aluno";
      },
      isFormValid() {
        return this.$refs.formRef.validate();
      },
    },
    methods: {
      ...mapActions("login", ["setUser"]),
      async handleFormSubmit() {
        this.startLoading();
        const data = await createEmail(this);
        data instanceof Error
          ? this.throwError("Algo deu errado 😞")
          : this.handleSuccessfullyCreatedEmail();
        this.stopLoading();
      },
      handleSuccessfullyCreatedEmail() {
        this.throwSuccess(`Email enviado para ${this.email}`);
        this.setUser({
          email: this.email,
        });
        this.$router.replace("/verifica-email");
      },
    },
    mounted() {
      if (!this.usuarioProvisorio.token) {
        this.$router.replace("/");
      }
    },
  };
</script>
