import { Request, Response } from "express"
import { Category } from "../models"

export const categoriesController = {
  index: async (req: Request, res: Response) => {
    try{
      const categories = await Category.findAll({
        attributes: ['id', 'name', 'position'],
        order: [['position', 'ASC']]
      })
      return res.json(categories)

    } catch(err) {
      // Verificar se esse erro é da instancia do JS
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message })
      }
    }
  }
}
