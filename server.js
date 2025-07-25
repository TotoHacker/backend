import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import authRoutes from './routes/auth.js'
import leadsRoutes from './routes/leads.js'
import { authenticateToken } from './middleware/authMiddleware.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

// Rutas públicas
app.use('/auth', authRoutes)

// Rutas protegidas (requieren token)
app.use('/leads', authenticateToken, leadsRoutes)

// Ruta raíz para prueba rápida
app.get('/', (req, res) => {
  res.send('Backend CRM funcionando 💜')
})

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`)
})
