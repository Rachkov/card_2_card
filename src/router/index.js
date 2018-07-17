import Vue from 'vue'
import Router from 'vue-router'
import FormCard from '@/components/FormCard'
import Payment from '@/components/Payment'
import History from '@/components/History'
import Auth from '@/components/Auth'
import Registration from '@/components/Registration'
import MsisdnReg from '@/components/MsisdnReg'
import OtpReg from '@/components/OtpReg'
import PasswordReg from '@/components/PasswordReg'
import Settings from '@/components/Settings'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/registration',
      name: 'Registration',
      component: Registration,
      children: [
        {
          path: 'msisdnreg',
          component: MsisdnReg
        },
        {
          path: 'otpreg',
          component: OtpReg
        },
        {
          path: 'passwordreg',
          component: PasswordReg
        }
      ]
    },
    {
      path: '/home',
      name: 'FormCard',
      component: FormCard
    },
    {
      path: '/auth',
      name: 'Auth',
      component: Auth
    },
    {
      path: '/paymentsuccess',
      name: 'Payment',
      component: Payment
    },
    {
      path: '/history',
      name: 'History',
      component: History
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings
    }
  ]
})
