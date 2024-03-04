test("API Node", async () => {
  const res = await fetch("http://127.0.0.1:3001/api")
  expect(res.status).toBe(200)
})
test("Servidor React", async () => {
  const res = await fetch("http://127.0.0.1:3000")
  expect(res.status).toBe(200)
})
export {}