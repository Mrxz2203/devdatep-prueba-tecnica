import { z } from 'zod'
// zod ayuda a validar las reglas del schema automatica
export const postSchema = z.object({
  titulo: z.string().min(5, 'El título debe tener al menos 5 caracteres'),
  contenido: z.string().min(10, 'El contenido debe tener al menos 10 caracteres'),
  usuario: z.coerce.number().min(1, 'El usuario debe ser entre 1 y 10').max(10, 'El usuario debe ser entre 1 y 10'),
})
// el z.object define el formulario y el contenido que tendra
// el uso de cada zod se pone como "z.string" "z.number"
// el min es una forma de validar que cumple con 5 caracteres como minimo
// el number convierte el text input a numero para poder ser leido