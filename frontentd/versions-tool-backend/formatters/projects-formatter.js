function formatProject(project) {
  return {
    id: project.id,
    name: project.name,
    logoUrl: project.logoUrl,
    platforms: project.platforms.map(p => ({ id: p.id, name: p.name })),
  }
}

module.exports = {
  formatProject,
}