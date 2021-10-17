export default [
  {
    path: "feedback",
    name: "Feedback",
    component: () => import("./pages/Feedback.vue"),
  },
  {
    path: 'consultar-feedbacks',
    name: 'ConsultarFeedbacks',
    component: () => import('./pages/ListagemFeedback.vue')
  }
];
