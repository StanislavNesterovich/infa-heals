function formatReport(report) {
  return report;
}

function formatReportsToChartData(reports) {
  const chartData = reports.map(report => {
    let goodSubmodules = 0;
    let mediumSubmodules = 0;
    let badSubmodules = 0;

    report.data.submodules.forEach(submodule => {
      switch (submodule.matchingType) {
        case 'UNDEFINED': {
          badSubmodules += 1;
          break;
        }
        case 'BRANCH': {
          mediumSubmodules += 1;
          break;
        }
        default: {
          goodSubmodules += 1
        }
      };
    })
  
    return {
      date: report.createdAt,
      data: [badSubmodules, mediumSubmodules, goodSubmodules],
    }
  });

  return chartData;
}

module.exports = {
  formatReport,
  formatReportsToChartData,
}