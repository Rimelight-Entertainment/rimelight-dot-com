export default eventHandler(async (event) => {
  const sql = usePostgres()

  const users = await sql`SELECT * FROM users`

  // Ensure the database connection is closed after the request is processed
  event.waitUntil(sql.end())
  return users
})
