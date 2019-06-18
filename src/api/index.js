import ajax from './ajax'

/*
export function reqLogin(username, password) {
    return ajax('/login', {username, password}, 'POST')
}*/


//export const reqLogin = (username, password) => ajax('/login', {username, password}, 'POST')
export const reqLogin = (user) => ajax('/login', user, 'POST')

export const getMenuList = (user) => ajax('/menu', user, 'GET')




