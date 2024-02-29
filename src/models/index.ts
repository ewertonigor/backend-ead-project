import { Category } from "./Category";
import { Course } from "./Course";
import { Episode } from "./Episode";
import { User } from "./User";

// Uma categoria vai ter muitas cursos
Category.hasMany(Course, { as: 'courses' })

// Curso pertence apenas a uma categoria.
// Curso tem muitos episodes
Course.belongsTo(Category)
Course.hasMany(Episode)

// Episodio está ligado a curso
Episode.belongsTo(Course)

export {
  Category,
  Course,
  Episode,
  User
}
