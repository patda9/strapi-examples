"use strict";

/**
 * Cron config that gives you an opportunity
 * to run scheduled jobs.
 *
 * The cron format consists of:
 * [SECOND (optional)] [MINUTE] [HOUR] [DAY OF MONTH] [MONTH OF YEAR] [DAY OF WEEK]
 *
 * See more details here: https://strapi.io/documentation/developer-docs/latest/setup-deployment-guides/configurations.html#cron-tasks
 */

/**
 * Build cron jobs exporting
 * @param { Array<{ cronExpression: string, task: () => Promise<void> }> } jobs
 * @returns { { [cronExpression: string]: () => Promise<void> } }
 */
function exportJobs(jobs) {
  return jobs.reduce((acc, t) => {
    if (acc[t.cronExpression]) {
      const f = { task: acc[t.cronExpression] };

      acc[t.cronExpression] = async () => {
        await Promise.all([f.task(), t.task()]);
      };
    } else acc[t.cronExpression] = t.task;

    return acc;
  }, {});
}

module.exports = exportJobs([]);
