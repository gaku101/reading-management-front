import { Ref } from '@nuxtjs/composition-api'

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
  const emailRules = (v: string, email: Ref<string>) => {
    console.log('usernameRules', v, email.value)
    if (!v) {
      email.value = 'emailの入力は必須です'
      return false
    } else if (
      !v.match(
        /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/
      )
    ) {
      email.value = '有効なemailを入力してください'
      return false
    } else {
      email.value = ''
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
  const pageRules = (v: string, bookPage: number, page: Ref<string>) => {
    console.log('pageRules', v, page.value)
    if (!v.match(/^[0-9]+$/)) {
      page.value = 'pageは半角数字で入力してください'
      return false
    } else if (v.length > 4) {
      page.value = 'pageは4桁以内で入力してください'
      return false
    } else if (parseInt(v) > bookPage) {
      page.value = '読んだページ数は総ページ数以下の値で入力してください'
      return false
    } else {
      page.value = ''
      return true
    }
  }
  const notePageRules = (v: string, page: Ref<string>) => {
    console.log('notePageRules', v, page.value)
    if (!v.match(/^[0-9]+$/)) {
      page.value = 'pageは半角数字で入力してください'
      return false
    } else if (v.length > 4) {
      page.value = 'pageは4桁以内で入力してください'
      return false
    } else {
      page.value = ''
      return true
    }
  }
  const noteLineRules = (v: string, line: Ref<string>) => {
    console.log('noteLineRules', v, line.value)
    if (!v.match(/^[0-9]+$/)) {
      line.value = 'lineは半角数字で入力してください'
      return false
    } else if (v.length > 4) {
      line.value = 'lineは4桁以内で入力してください'
      return false
    } else {
      line.value = ''
      return true
    }
  }
  const pointRules = (v: string, ownPoints: number, point: Ref<string>) => {
    console.log('pointRules', v, ownPoints, point.value)
    if (!v.match(/^[0-9]+$/)) {
      point.value = 'pointは半角数字で入力してください'
    } else if (v.length > 4) {
      point.value = 'pointは4桁以内で入力してください'
    } else if (parseInt(v) <= 0) {
      point.value = 'ポイントは1以上の値で入力してください'
    } else if (parseInt(v) > ownPoints) {
      point.value = '入力したポイントが所持ポイントを超えています'
    } else {
      point.value = ''
    }
  }
  return {
    usernameRules,
    emailRules,
    passwordRules,
    passwordConfirmRules,
    pageRules,
    notePageRules,
    noteLineRules,
    pointRules,
  }
}
