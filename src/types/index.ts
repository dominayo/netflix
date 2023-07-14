export type Show = {
  adult: boolean
  backdrop_path: string | null
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string | null
  overview: string | null
  popularity: number
  poster_path: string | null
  release_date: string | null
  title: string | null
  video: boolean
  videos: Videos
  vote_average: number
  vote_count: number
}

export type Videos = {
  results: {
    key: string
    type: string
  }[]
}

// "adult": false,
// "backdrop_path": "/e2Jd0sYMCe6qvMbswGQbM0Mzxt0.jpg",
// "genre_ids": [
//   28,
//   80,
//   53
// ],
// "id": 385687,
// "original_language": "en",
// "original_title": "Fast X",
// "overview": "Over many missions and against impossible odds, Dom Toretto and his family have outsmarted, out-nerved and outdriven every foe in their path. Now, they confront the most lethal opponent they've ever faced: A terrifying threat emerging from the shadows of the past who's fueled by blood revenge, and who is determined to shatter this family and destroy everything—and everyone—that Dom loves, forever.",
// "popularity": 4654.279,
// "poster_path": "/fiVW06jE7z9YnO4trhaMEdclSiC.jpg",
// "release_date": "2023-05-17",
// "title": "Fast X",
// "video": false,
// "vote_average": 7.3,
// "vote_count": 2093
