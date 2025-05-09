// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LessonView from '../views/LessonView.vue'
import ShortlistView from '../views/ShortlistView.vue'
import ChallengeView from '../views/ChallengeView.vue'
import InterviewQuestionsView from '../views/InterviewQuestionsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/section/:sectionId/lesson/:lessonId',
      name: 'lesson',
      component: LessonView,
      props: true,
    },
    {
      path: '/section/:sectionId/challenge',
      name: 'challenge',
      component: ChallengeView,
      props: true,
    },
    {
      path: '/interview-questions',
      name: 'interview-questions',
      component: InterviewQuestionsView,
      props: true,
    },
    {
      path: '/minicourse-recapper',
      name: 'shortlist',
      component: ShortlistView,
      props: true,
    },
    {
      path: '/minicourse-recappert/:lessonId',
      name: 'shortlist-lesson',
      component: ShortlistView,
      props: true,
    },
    {
      path: '/interview-questions/:section',
      name: 'interview-questions-section',
      component: InterviewQuestionsView,
      props: true,
    },
    {
      path: '/interview-questions/:section/:question',
      name: 'interview-questions-detail',
      component: InterviewQuestionsView,
      props: true,
    },
  ],
})

export default router
