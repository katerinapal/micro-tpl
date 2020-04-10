import { analyse as libanalyse_analysejs } from "../lib/analyse";
import fs from "fs";
import path from "path";
import should from "should";
"use strict";

describe('analyse', function () {
  it('should able to check no close tempalate', function () {
    libanalyse_analysejs.bind(
      null,
      fs.readFileSync(
        path.join(__dirname, './bad/noclose.html'), { encoding: 'utf8' }
      )
    ).should.throw();
  });
});