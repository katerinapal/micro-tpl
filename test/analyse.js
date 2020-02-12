import { analyse } from "../lib/analyse";
import fs from "fs";
import path from "path";
import should from "should";

describe('analyse', function () {
  it('should able to check no close tempalate', function () {
    analyse.bind(
      null,
      fs.readFileSync(
        path.join(__dirname, './bad/noclose.html'), { encoding: 'utf8' }
      )
    ).should.throw();
  });
});