import express from 'express'
import { leads } from '../data.js'
import { v4 as uuidv4 } from 'uuid'
import { sendEmail } from '../helpers/sendEmail.js'
import { authenticateToken } from '../middleware/authMiddleware.js'

const router = express.Router()

// 🟢 RUTA PÚBLICA – Crear nuevo lead y enviar email
router.post('/', async (req, res) => {
  const { nombre, correo, mensaje } = req.body
  if (!nombre || !correo || !mensaje) {
    return res.status(400).json({ message: 'Faltan datos requeridos' })
  }

  const nuevoLead = {
    id: uuidv4(),
    nombre,
    correo,
    mensaje,
    estado: 'nuevo',
    fecha_creado: new Date().toISOString(),
  }

  leads.push(nuevoLead)

  const subject = '📥 Nuevo lead recibido'
  const text = `
Nuevo lead registrado:

🧑 Nombre: ${nombre}
📧 Correo: ${correo}
💬 Mensaje: ${mensaje}
📅 Fecha: ${nuevoLead.fecha_creado}
  `
  await sendEmail(subject, text)

  res.status(201).json({ message: 'Lead recibido y correo enviado ✅' })
})

// 🔒 RUTA PRIVADA – Obtener todos los leads
router.get('/', authenticateToken, (req, res) => {
  res.json(leads)
})

// 🔒 RUTA PRIVADA – Actualizar estado del lead
router.patch('/:id', authenticateToken, (req, res) => {
  const { id } = req.params
  const { estado } = req.body
  const lead = leads.find(l => l.id === id)
  if (!lead) return res.status(404).json({ message: 'Lead no encontrado' })

  if (!['nuevo', 'contactado', 'descartado'].includes(estado)) {
    return res.status(400).json({ message: 'Estado inválido' })
  }

  lead.estado = estado
  res.json(lead)
})

export default router
