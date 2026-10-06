import type { SanityImageSource } from '@sanity/image-url'
import type { Project, Category } from '@/types/project'
import { urlFor } from './image'

type SanityProject = {
  _id: string
  title?: string
  slug?: {
    current?: string
  }
  categories?: string[]
  description?: string
  sector?: string
  coverImage?: SanityImageSource
  gallery?: Array<SanityImageSource | null>
  location?: string
  completionDate?: string
}

function mapCategory(value: string): Category {
  switch (value) {
    case 'electrical':
      return 'Electrical'
    case 'solar':
      return 'Solar'
    default:
      return 'Construction'
  }
}

export function mapSanityProject(project: SanityProject): Project {
  const images = [
    ...(project.coverImage
      ? [
          {
            src: urlFor(project.coverImage).width(1200).url(),
            alt: project.title ?? 'EN Construction project',
          },
        ]
      : []),

    ...(project.gallery ?? [])
      .filter((image): image is SanityImageSource => Boolean(image))
      .map((image, index) => ({
        src: urlFor(image).width(1200).url(),
        alt: `${project.title ?? 'EN Construction project'}, photo ${index + 2}`,
      })),
  ]

  const category = mapCategory(project.categories?.[0] ?? 'construction')

  return {
    slug: project.slug?.current ?? project._id,
    title: project.title ?? 'Untitled project',
    category,
    sector: project.sector ?? '',
    description: project.description ?? '',
    images,
  }
}