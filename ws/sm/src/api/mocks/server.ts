import { Server, Response } from 'miragejs'

export function makeServer({ environment = 'development' } = {}) {

  const server = new Server({
    environment,

    routes() {

      this.namespace = 'api'

      this.post('/login', (schema, request) => {
        const headers = {}
        const userInfo = JSON.parse(request.requestBody)
        let resp = {}
        let statusCode=200
        if (userInfo.email.toLowerCase() ==='joga.singh@gmail.com') {
            resp = {"access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2MTQ0MzQ2NjUsImV4cCI6MTY0NTk3MDg0MywiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoiam9nYS5zaW5naEBnbWFpbC5jb20iLCJuYW1lIjoiSm9nYSBTaW5naCIsImVtYWlsIjoiam9nYS5zaW5naEBnbWFpbC5jb20iLCJyb2xlIjpbImFkbWluIiwic3lzYWRtaW4iXX0.m5CVQqt9Z2V1AGMHgGjW4-VgfhOvDyMRIEWcdUByNa8",
                    "token_type": "bearer",
                    "expires_in": "3600"}
        }else if (userInfo.email.toLowerCase() ==='customer1@gmail.com') {
            resp = {"access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2MTQ0MzQ2NjUsImV4cCI6MTY0NTk3MDg0MywiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoiY3VzdG9tZXIxQGdtYWlsLmNvbSIsIm5hbWUiOiJDdXN0b21lciAxIiwiZW1haWwiOiJjdXN0b21lcjFAZ21haWwuY29tIiwicm9sZSI6WyJjdXN0b21lciIsImd1ZXMiXX0.NcEl4Xe3Ft9DWeJj3dBC5-Edo4U_8l9PjeNez4t6V2c",
                    "token_type": "bearer",
                    "expires_in": "3600"}
        }else {
            resp = {message: "Access denied"}
            statusCode=401
        }
        return new Response(statusCode, headers, resp)
       
      }, { timing: 100 })
    },
  })

  return server
}