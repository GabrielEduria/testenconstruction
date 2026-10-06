import {defineQuery} from 'next-sanity'

export const projectsQuery = defineQuery(`
  *[_type == "project"] | order(_createdAt desc) {
    _id,
    title,
    slug,
    categories,
    description,
    sector,
    coverImage,
    gallery,
    featured,
    location,
    completionDate
  }
`)

export const featuredProjectsQuery = defineQuery(`
  *[_type == "project" && featured == true] | order(_createdAt desc) {
    _id,
    title,
    slug,
    categories,
    description,
    sector,
    coverImage,
    gallery,
    featured,
    location,
    completionDate
  }
`)

export const projectsByCategoryQuery = defineQuery(`
  *[_type == "project" && $category in categories] | order(_createdAt desc) {
    _id,
    title,
    slug,
    categories,
    description,
    sector,
    coverImage,
    gallery,
    featured,
    location,
    completionDate
  }
`)