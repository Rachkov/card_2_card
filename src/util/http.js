import axios from 'axios'
import qs from 'query-string'
import {
  URL,
  URL_AMOUNT_PARAMS
} from '../constants/index'

export function getAmount () {
  return axios.get(`${URL}/commission/rule`, {
    params: URL_AMOUNT_PARAMS
  })
}

export function getReturnUrl (token) {
  return `${window.location.protocol}//${window.location.host}/paymentsuccess?token=${token}`
}

export function getToken () {
  return axios.post(`${URL}/token`)
}

export function startPay (data, token) {
  return axios({
    method: 'post',
    url: `${URL}/payment/${token}/start`,
    data: data,
    params: {
      ...data
    },
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    }
  })
}

export function payment (token) {
  return axios.get(`${URL}/payment/${token}`)
}

export function payments (sessionId, pagesize, pagenum) {
  return axios({
    method: 'get',
    url: `${URL}/payment`,
    params: {
      pageSize: pagesize,
      pageNumber: pagenum
    },
    headers: {
      'Content-type': 'application/json',
      'X-IV-Authorization': `Session ${sessionId}`
    }
  })
}

export function sessionId (msisdn, password) {
  return axios({
    method: 'post',
    url: `${URL}/session/start`,
    data: qs.stringify({
      msisdn: `7${msisdn}`,
      password: password
    }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

export function profile (sessionId) {
  return axios({
    method: 'get',
    url: `${URL}/profile`,
    headers: {
      'X-IV-Authorization': `Session ${sessionId}`
    }
  })
}

export function regMsisdn (msisdn) {
  return axios({
    method: 'post',
    url: `${URL}/profile/registration/start`,
    data: qs.stringify({
      msisdn: `7${msisdn}`
    }),
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    }
  })
}

export function regOtp (msisdn, otp) {
  return axios({
    method: 'post',
    url: `${URL}/profile/registration/verify-otp`,
    data: qs.stringify({
      msisdn: `7${msisdn}`,
      'otp': otp
    }),
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    }
  })
}

export function regConfirm (msisdn, otp, password) {
  return axios({
    method: 'post',
    url: `${URL}/profile/registration/confirm`,
    data: qs.stringify({
      msisdn: `7${msisdn}`,
      'otp': otp,
      password: password
    }),
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    }
  })
}

export function changePassword (password, newPassword, sessionId) {
  return axios({
    method: 'post',
    url: `${URL}/profile/password/change`,
    data: qs.stringify({
      password: password,
      newPassword: newPassword
    }),
    headers: {
      'X-IV-Authorization': `Session ${sessionId}`
    }
  })
}

export function deleteProfile (password, sessionId) {
  return axios({
    method: 'post',
    url: `${URL}/profile/delete`,
    data: qs.stringify({
      password: password
    }),
    headers: {
      'X-IV-Authorization': `Session ${sessionId}`
    }
  })
}
