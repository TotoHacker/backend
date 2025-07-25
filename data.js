export let users = [
  {
    id: '1',
    email: 'admin@example.com',
    password: '123456', // en la vida real, usa hashing!
  }
]

export let leads = [
  {
    id: '1',
    nombre: 'Andrea Flores',
    correo: 'andrea@example.com',
    mensaje: 'Me interesa saber más sobre su producto.',
    estado: 'nuevo',
    fecha_creado: new Date().toISOString(),
  },
  {
    id: '2',
    nombre: 'Luis Ramírez',
    correo: 'luis.ramirez@correo.com',
    mensaje: '¿Pueden contactarme por la tarde?',
    estado: 'contactado',
    fecha_creado: new Date().toISOString(),
  },
]
