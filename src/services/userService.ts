import { User } from "../models"
import { EpisodeInstace } from "../models/Episode"
import { UserCreationAttributes } from "../models/User"

function filterLastEpisodesByCourse(episodes:EpisodeInstace[]) {
  const coursesOnList: number[] = []

  // Ultimo episodios
  // 1° Parametro -> Resultado acumulado
  // 2° Parametro -> Um único episodio
  // Para cada interação do Reduce, irá acrescentar no currentList
  // 1° Verificação -> Se o courseOnList ele inclui o episodio atual, caso não, ele inclui!
  // 2° Verificação -> Caso o episodio já tenha esse curso na lista, que tem o mesmo curso que está percorrendo
  // ele verifica se a ordem do episodio que já está na lista é maior do episodio que ainda não está na lista.
  // - Caso ele seja o mais recente, ele fará a substituição
  // E por fim retorna a lista com os últimos episodios

  const lastEpisodes = episodes.reduce((currentList, episode) => {
    if (!coursesOnList.includes(episode.courseId)) {
      coursesOnList.push(episode.courseId)
      currentList.push(episode)
      return currentList
    }

    const episodeFromSameCourse = currentList.find(ep => ep.courseId === episode.courseId)

    if (episodeFromSameCourse!.order > episode.order) return currentList

    const listWithoutEpisodesFromSameCourse = currentList.filter(ep => ep.courseId !== episode.courseId)
    listWithoutEpisodesFromSameCourse.push(episode)

    return listWithoutEpisodesFromSameCourse
  }, [] as EpisodeInstace[])

  return lastEpisodes
}

export const userService = {
  findByEmail: async (email: string) => {
    const user = await User.findOne({
      where: {
        email
      }
    })

    return user
  },

  create: async (attributes: UserCreationAttributes) => {
    const user = await User.create(attributes)
    return user
  },

  getKeepWatchingList: async (id: number) => {
    const userWithWatchingEpisodes = await User.findByPk(id, {
      include: {
        association: 'Episodes',
        attributes: [
          'id',
          'name',
          'synopsis',
          'order',
          ['video_url', 'videoUrl'],
          ['seconds_long', 'secondsLong'],
          ['course_id', 'courseId']
        ],
        include: [{
          association: 'Course',
          attributes: [
            'id',
            'name',
            'synopsis',
            ['thumbnail_url', 'thumbnailUrl']
          ],
          as: 'course'
        }],
        through: {
          as: 'watchTime',
          attributes: [
            'seconds',
            ['updated_at', 'updatedAt']
          ]
        }
      }
    })

    if (!userWithWatchingEpisodes) throw new Error('Usuário não encontrado.')

    const keepWatchingList = filterLastEpisodesByCourse(userWithWatchingEpisodes.Episodes!)
    // @ts-ignore
    keepWatchingList.sort((a, b) => a.watchTime!.updatedAt < b.watchTime.updatedAt ? 1 : -1)

    return keepWatchingList
  }
}
