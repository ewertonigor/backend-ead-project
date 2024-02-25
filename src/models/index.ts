import { Category } from "./Category";
import { Course } from "./Course";

// Uma categoria vai ter muitas cursos
Category.hasMany(Course)

// Curso pertence apenas a uma categoria.
Course.belongsTo(Category)

export {
  Category,
  Course
}
