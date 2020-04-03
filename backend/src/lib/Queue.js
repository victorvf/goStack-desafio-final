import Bee from 'bee-queue';
import configRedis from '../config/redis';

import CancelationMail from '../app/jobs/CancelationMail';
import DeliveryAvailableMail from '../app/jobs/DeliveryAvailableMail';

const jobs = [CancelationMail, DeliveryAvailableMail];

class Queue {
    constructor() {
        this.queues = {};

        this.init();
    }

    init() {
        jobs.forEach(({ key, handle }) => {
            this.queues[key] = {
                bee: new Bee(key, {
                    redis: configRedis,
                }),
                handle,
            };
        });
    }

    add(queue, job) {
        return this.queues[queue].bee.createJob(job).save();
    }

    processQueue() {
        jobs.forEach(job => {
            const { bee, handle } = this.queues[job.key];

            bee.on('failed', this.handleFailure).process(handle);
        });
    }

    handleFailure(job, error) {
        console.log(`Queue ${job.queue.name}: FAILED`, error);
    }
}

export default new Queue();
