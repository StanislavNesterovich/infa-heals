function sortSubmodules(a, b) {
  const aProjects = a.projects.filter(p => p).length;
  const bProjects = b.projects.filter(p => p).length;

  if (aProjects === bProjects) {
    return b.name < a.name
  }

  return bProjects - aProjects;
};

function formatSubmodules(submodules, projects) {
  const formattedSubmoludes = {
    submodules: submodules.repos.map((rep) => {
      return {
        name: rep.name,
        tags: rep.tags,
        repositoryUrl: rep.repositoryUrl,
        projects: projects.map((project) => {
          const submodule = project.report.submodules.find(submodule => submodule.name === rep.name);
          return submodule ? {
            browseUrl: submodule.browseUrl,
            contentId: submodule.contentId,
          } : null;
        }),
      };
    }).sort(sortSubmodules),
    projects: projects.map((project) => {
      return {
        id: project.id,
        name: project.name,
      }
    }),
  }
  return formattedSubmoludes;
}

function formatDependencyGraph(libs) {
  const filteredLibs = libs.filter(lib => !!lib);
  const packageNames = filteredLibs.map(lib => lib.name);
  const matrix = [];

  filteredLibs.forEach((lib) => {
    const dependencies = [];
    packageNames.forEach((name) => {
      if (lib.dependencies && lib.dependencies[name]) {
        dependencies.push(1);
      } else {
        dependencies.push(0);
      }
    });

    matrix.push(dependencies);
  })

  return {
    packageNames,
    matrix,
  };
}

module.exports = {
  formatSubmodules,
  formatDependencyGraph,
}