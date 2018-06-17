import React from 'react'
import { success, error } from 'react-notification-system-redux'

export function showSuccessMsg(message) {
  return (dispatch) => {
    const notificationOpts = {
      title: 'Success Notify',
      message: message,
      position: 'tc',
      autoDismiss: 3
    }
    dispatch(success(notificationOpts))
  }
}

export function showErrorMsg(message) {
  return (dispatch) => {
    const notificationOpts = {
      title: 'Error Notify',
      message: message,
      position: 'tc',
      autoDismiss: 10
    }
    dispatch(error(notificationOpts))
  }
}
