import {client} from './client'
import {
  featuredProjectsQuery,
  projectsByCategoryQuery,
  projectsQuery,
} from './queries'
import {mapSanityProject} from './projectMapper'
import type {Project} from '@/types/project'

export async function getProjects(): Promise<Project[]> {
  const projects = await client.fetch(projectsQuery)
  return projects.map(mapSanityProject)
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const projects = await client.fetch(featuredProjectsQuery)
  return projects.map(mapSanityProject)
}

export async function getProjectsByCategory(
  category: string
): Promise<Project[]> {
  const projects = await client.fetch(projectsByCategoryQuery, {category})
  return projects.map(mapSanityProject)
}