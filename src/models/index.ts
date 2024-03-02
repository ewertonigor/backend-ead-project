import { Category } from "./Category";
import { Course } from "./Course";
import { Episode } from "./Episode";
import { Favorite } from "./Favorite";
import { User } from "./User";

// Uma categoria vai ter muitas cursos
Category.hasMany(Course, { as: 'courses' })

// Curso pertence apenas a uma categoria.
// Curso tem muitos episodes
Course.belongsTo(Category)
Course.belongsToMany(User, { through: Favorite })
Course.hasMany(Episode, { as: 'episodes'}) // Episodes -> Forma padrão que cria esse nome
Course.hasMany(Favorite, { as: 'favoritesUsers', foreignKey: 'course_id' })

// Episodio está ligado a curso
Episode.belongsTo(Course)

Favorite.belongsTo(Course)
Favorite.belongsTo(User)

User.belongsToMany(Course, { through: Favorite })
User.hasMany(Favorite, { as: 'favoriteCourses', foreignKey: 'user_id' })

export {
  Category,
  Course,
  Episode,
  Favorite,
  User
}
