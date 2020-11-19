#! /usr/bin/env node

/**
 * @file        events.js
 *              Sample node application showing how to deploy a DCP job whilst receiving
 *              events describing the current state of the job, processing results
 *              as they are received, and so on.
 *
 * @author Wes Garland, wes@kingsds.network
 * @date   Aug 2019
 */

const scheduler = 'https://scheduler.distributed.computer';

async function main() {
  const compute = require('dcp/compute');
  let startTime;

  const job = compute.for(
    ['red', 'green', 'yellow', 'blue', 'brown', 'orange', 'pink'],
    function (colour) {
      console.log(colour);
      progress();
      return colour;
    },
  );

  job.on('accepted', function (event) {
    console.log(` - Job accepted by scheduler, waiting for results`);
    console.log(` - Job has id ${this.id}`);
    startTime = Date.now();
  });
  job.on('complete', function (event) {
    console.log(
      `Job Finished, total runtime = ${
        Math.round((Date.now() - startTime) / 100) / 10
      }s`,
    );
  });
  job.on('readystatechange', function (arg) {
    console.log(`new ready state: ${arg}`);
  });
  job.on('result', function (ev) {
    console.log(
      ` - Received result for slice ${ev.sliceNumber} at ${
        Math.round((Date.now() - startTime) / 100) / 10
      }s`,
    );
    console.log(` * Wow! ${ev.result} is such a pretty colour!`);
  });

  job.public.name = 'events example, nodejs';
  job.public.description = 'DCP-Client Example examples/node/events.js';

  // This is the default behaviour - change if you have multiple bank accounts
  // const wallet = require('dcp/wallet');
  // const ks = await wallet.get(); /* usually loads ~/.dcp/default.keystore */
  // job.setPaymentAccountKeystore(ks);

  const results = await job.exec(compute.marketValue);
  // OR
  // const results = await job.localExec()

  console.log('Results are: ', results.values());
}

require('dcp-client')
  .init(scheduler)
  .then(main)
  .finally(() => setImmediate(process.exit));
