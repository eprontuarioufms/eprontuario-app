export default [
  {
    path: "/",
    name: "Login",
    component: () => import("./pages/LoginFirebase"),
  },
  {
    path: "/registro",
    name: "Register",
    component: () => import("./pages/RegisterFirebase.vue"),
  },
  {
    path: "/create-email",
    name: "CreateEmail",
    component: () => import("./pages/CreateEmailFirebase.vue"),
  },
  {
    path: "/verifica-email",
    name: "VerifyEmail",
    component: () => import("./pages/VerifyEmail.vue"),
  },
  {
    path: "/esqueci-a-senha",
    name: "EsqueciSenha",
    component: () => import("./pages/EsqueciSenha.vue"),
  },
];
