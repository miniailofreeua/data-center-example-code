import { Injectable } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { getCronJobNameForBrand } from 'src/modules/brands/helpers/getUpdateCronJobNameForBrand.helper';

@Injectable()
export class CronManager {
  constructor(private schedulerRegistry: SchedulerRegistry) {}

  stopCronJob(jobName: string) {
    try {
      const job = this.schedulerRegistry.getCronJob(jobName);

      job.stop();
      console.log('Job was stopped:', jobName);
    } catch (e) {
      console.log(e);
    }
  }

  addNewJob(brandApiJob, cronFunction) {
    // path time in the seconds
    const cronName = getCronJobNameForBrand(brandApiJob);

    this.stopCronJob(cronName);
    this.deleteJob(cronName);

    const job = new CronJob(
      `${brandApiJob.runEverySeconds} * * * * *`,
      cronFunction,
    );

    this.schedulerRegistry.addCronJob(cronName, job);
    job.start();

    console.log(
      `Job ${cronName} added for every ${brandApiJob.runEverySeconds} seconds`,
    );
  }

  deleteJob(jobName: string) {
    try {
      this.schedulerRegistry.deleteCronJob(jobName);
      console.log('Job was deleted:', jobName);
    } catch (e) {
      console.log(e);
    }
  }

  getCronJobs() {
    const jobs = this.schedulerRegistry.getCronJobs();
    const jobValues = [];
    jobs.forEach((value, key, map) => {
      jobValues.push(value);
    });
    return jobValues;
  }
}
