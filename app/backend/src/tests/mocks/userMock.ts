export const allUsers = [
  {
      id: 1,
      username: "Admin",
      role: "admin",
      email: "admin@admin.com",
      password: "$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW"
  },
  {
    id: 2,
    username: "User",
    role: "user",
    email: "user@user.com",
    password: "$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO"
},
]

export const user = {
  id: 1,
  username: "Admin",
  role: "admin",
  email: "admin@admin.com",
  password: "$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW"
}

export const validLogin = {
  "email": "admin@admin.com",
  "password": "secret_admin"
}

export const nullEmail = {
  "password": "secret_admin"
}

export const nullPassword = {
  "email": "admin@admin.com"
}

export const invalidEmail = {
  "email": "adminadmin.com",
  "password": "secret_admin"
}

export const invalidPassword = {
  "email": "admin@admin.com",
  "password": "sin"
}

export const userResponse = {
  user: {
    id: 1,
    username: "Admin",
    role: "admin",
    email: "admin@admin.com"
  },
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY0ODM0MDk4N30.gSy0RfjRa8uvZ1I6z-yH_Oer84OKax_cgUbQEiW81X4",
}

export const nullFildMessage = 'All fields must be filled';

export const ivalidFildMessage = 'Incorrect email or password';
