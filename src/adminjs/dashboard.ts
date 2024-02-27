import AdminJS, { PageHandler } from "adminjs"
import { Category, Course, Episode, User } from "../models"

export const dashboardOptions: {
  handler?: PageHandler
  component?: string
} = {
  component: AdminJS.bundle('./components/Dashboard'),
  handler: async (req, res, context) => {
    const courses = await Course.count() //Conta o número de registro que temos no nossso banco de dados
    const episodes = await Episode.count()
    const categories = await Category.count()
    const standardUsers = await User.count({ where: { role: 'user'} })

    res.json({
      'Cursos': courses,
      'Episódio': episodes,
      'Categorias': categories,
      'Usuários': standardUsers
    })
  }
}
