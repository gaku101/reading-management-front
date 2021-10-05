import { Ref } from '@vue/composition-api'

export default () => {
  const usernameRules = (v: string, username: Ref<string>) => {
    console.log('usernameRules', v, username.value)
    if (!v) {
      username.value = 'usernameの入力は必須です'
      return false
    } else if (!v.match(/^[a-zA-Z0-9]+$/)) {
      username.value = 'usernameは半角英数字で入力してください'
      return false
    } else if (v.length > 10) {
      username.value = 'usernameは10文字以内で入力してください'
      return false
    } else {
      username.value = ''
      return true
    }
  }
  const passwordRules = (v: string, password: Ref<string>) => {
    console.log('usernameRules', v, password.value)
    if (!v) {
      password.value = 'passwordの入力は必須です'
      return false
    } else if (v.length < 6 || v.length > 32) {
      password.value = 'パスワードは6文字以上32文字以内で入力してください'
      return false
    } else if (!v.match(/^[a-zA-Z0-9]+$/)) {
      password.value = 'passwordは半角英数字で入力してください'
      return false
    } else if (!v.match(/[0-9]/)) {
      password.value =
        'passwordは最低1文字以上の数字が含まれている必要があります'
      return false
    } else if (!v.match(/[a-zA-Z]/)) {
      password.value =
        'passwordは最低1文字以上のアルファベットが含まれている必要があります'
      return false
    } else {
      password.value = ''
      return true
    }
  }
  const passwordConfirmRules = (
    v: string,
    password: string,
    passwordConfirm: Ref<string>
  ) => {
    console.log('passwordConfirmRules', v, password, passwordConfirm.value)
    if (!v) {
      passwordConfirm.value = 'confirm passwordの入力は必須です'
      return false
    } else if (v.length < 6 || v.length > 32) {
      passwordConfirm.value =
        'パスワードは6文字以上32文字以内で入力してください'
      return false
    } else if (!v.match(/^[a-zA-Z0-9]+$/)) {
      passwordConfirm.value = 'passwordは半角英数字で入力してください'
      return false
    } else if (!v.match(/[0-9]/)) {
      passwordConfirm.value =
        'passwordは最低1文字以上の数字が含まれている必要があります'
      return false
    } else if (!v.match(/[a-zA-Z]/)) {
      passwordConfirm.value =
        'passwordは最低1文字以上のアルファベットが含まれている必要があります'
      return false
    } else if (v !== password) {
      passwordConfirm.value =
        'passwordとconfirm passwordの入力が一致していません'
      return false
    } else {
      passwordConfirm.value = ''
      return true
    }
  }
  return {
    usernameRules,
    passwordRules,
    passwordConfirmRules,
  }
}
const rules = {
  confirmNewPassword: [
    (v: string) => !!v || '新しいパスワード（確認用）の入力は必須です',
    // (v: string) =>
    //   v === this.passwordFormData.newPassword ||
    //   '新しいパスワードと新しいパスワード（確認用）の入力が一致していません',
  ],
}
