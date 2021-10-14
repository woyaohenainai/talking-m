import request from '@/utils/request'

export const login = data => {
  return request({
    methos: 'POST',
    url: '',
    data
  })
}
export const sendSms = mobile => {
  return request({
    methos: 'GEST',
    url: ''
  })
}
