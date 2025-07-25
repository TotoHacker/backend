import express from 'express'
import jwt from 'jsonwebtoken'
import { users } from '../data.js'

const router = express.Router()

router.post('/login', (req, res) => {
  const { email, password } = req.body
  const user = users.find(u => u.email === email && u.password === password)
  if (!user) return res.status(401).json({ message: 'Credenciales inválidas' })

  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  })

  res.json({ token })
})

export default router
