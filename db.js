import knex from 'knex'
import dotenv from 'dotenv'
dotenv.config()

const db = knex({
  client: 'pg',
  connection: {
    host: process.env.PG_HOST,
    port: Number(process.env.PG_PORT) || 5432,
    user: process.env.PG_USER,
    password: process.env.PG_PASS,
    database: process.env.PG_DB,
  },
})

async function createTables() {
  const hasUsers = await db.schema.hasTable('users')
  if (!hasUsers) {
    await db.schema.createTable('users', (table) => {
      table.increments('id').primary()
      table.string('email').unique().notNullable()
      table.string('password').notNullable()
    })
    console.log('Tabla users creada')
  }

  const hasLeads = await db.schema.hasTable('leads')
  if (!hasLeads) {
    await db.schema.createTable('leads', (table) => {
      table.uuid('id').primary()
      table.string('nombre').notNullable()
      table.string('correo').notNullable()
      table.text('mensaje').notNullable()
      table.string('estado').notNullable()
      table.timestamp('fecha_creado').defaultTo(db.fn.now())
    })
    console.log('Tabla leads creada')
  }
}

// función para crear admin si no existe
async function createAdmin() {
  const adminEmail = 'admin@example.com'
  const adminPassword = '123456'  // ojo aquí mi amor, para producción usa password hasheado y más seguro

  const admin = await db('users').where({ email: adminEmail }).first()
  if (!admin) {
    await db('users').insert({
      email: adminEmail,
      password: adminPassword,
    })
    console.log(`Admin creado: ${adminEmail} / ${adminPassword}`)
  } else {
    console.log('Admin ya existe')
  }
}

// correr todo junto
async function init() {
  try {
    await createTables()
    await createAdmin()
  } catch (error) {
    console.error('Error inicializando base de datos:', error)
  }
}

init()

export default db
