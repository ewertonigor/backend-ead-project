import { Category } from "./Category";
import { Course } from "./Course";
import { Episode } from "./Episode";
import { Favorite } from "./Favorite";
import { Like } from "./Like";
import { User } from "./User";
import { WatchTime } from "./WatchTime";

// Uma categoria vai ter muitas cursos
Category.hasMany(Course, { as: 'courses' })

// Curso pertence apenas a uma categoria.
// Curso tem muitos episodes
Course.belongsTo(Category)
Course.belongsToMany(User, { through: Favorite })
Course.belongsToMany(User, { through: Like })
Course.hasMany(Episode, { as: 'episodes'}) // Episodes -> Forma padrão que cria esse nome
Course.hasMany(Favorite, { as: 'favoritesUsers', foreignKey: 'course_id' })

// Episodio está ligado a curso
Episode.belongsTo(Course)
Episode.belongsToMany(User, { through: WatchTime })

Favorite.belongsTo(Course)
Favorite.belongsTo(User)

User.belongsToMany(Course, { through: Favorite })
User.belongsToMany(Course, { through: Like })
User.belongsToMany(Episode, { through: WatchTime })
User.hasMany(Favorite, { as: 'favoriteCourses', foreignKey: 'user_id' })

export {
  Category,
  Course,
  Episode,
  Favorite,
  Like,
  User,
  WatchTime
}
