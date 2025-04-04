/**
 * Copyright 2013-2025 the original author or authors from the JHipster project.
 *
 * This file is part of the JHipster project, see https://www.jhipster.tech/
 * for more information.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { before, describe, it } from 'esmocha';
import { expect } from 'chai';
import JDLBinaryOption from '../models/jdl-binary-option.js';
import { binaryOptions } from '../built-in-options/index.js';

describe('jdl - JDLBinaryOption', () => {
  describe('new', () => {
    describe('when passing no argument', () => {
      it('should fail', () => {
        expect(() => {
          // @ts-expect-error
          new JDLBinaryOption();
        }).to.throw("The option's name must be passed to create an option.");
      });
    });
    describe('when passing a name but no value', () => {
      it('should fail', () => {
        expect(() => {
          // @ts-expect-error
          new JDLBinaryOption({ name: binaryOptions.Options.DTO });
        }).to.throw(/^A binary option must have a value\.$/);
      });
    });
    describe('when passing a name and a value', () => {
      let option;

      before(() => {
        option = new JDLBinaryOption({
          name: binaryOptions.Options.DTO,
          value: binaryOptions.Values.dto.MAPSTRUCT,
        });
      });

      it('creates the option', () => {
        expect(option).not.to.be.null;
        expect(option.name).to.equal(binaryOptions.Options.DTO);
        expect(option.value).to.equal(binaryOptions.Values.dto.MAPSTRUCT);
      });
    });
    describe('when passing a list of entity names and excluded names with some of them being repeated', () => {
      let option;

      before(() => {
        option = new JDLBinaryOption({
          name: binaryOptions.Options.DTO,
          value: binaryOptions.Values.dto.MAPSTRUCT,
          entityNames: new Set(['A', 'B', 'C', 'A']),
          excludedNames: new Set(['E', 'E', 'D']),
        });
      });

      it('removes the dupes', () => {
        expect(option.entityNames.size).to.equal(3);
        expect(option.entityNames.has('A')).to.be.true;
        expect(option.entityNames.has('B')).to.be.true;
        expect(option.entityNames.has('C')).to.be.true;
        expect(option.excludedNames.size).to.equal(2);
        expect(option.excludedNames.has('E')).to.be.true;
        expect(option.excludedNames.has('D')).to.be.true;
      });
    });
  });
  describe('setEntityNames', () => {
    let option;

    before(() => {
      option = new JDLBinaryOption({
        name: binaryOptions.Options.DTO,
        value: binaryOptions.Values.dto.MAPSTRUCT,
        entityNames: new Set(['A', 'B', 'C']),
      });
      option.setEntityNames(['A']);
    });

    it('sets the entity names', () => {
      expect(option.entityNames.size).to.equal(1);
      expect(option.entityNames.has('A')).to.be.true;
    });
  });
  describe('addEntityName', () => {
    describe('when passing a nil name', () => {
      let option;

      before(() => {
        option = new JDLBinaryOption({ name: binaryOptions.Options.DTO, value: binaryOptions.Values.dto.MAPSTRUCT });
      });

      it('should fail', () => {
        expect(() => {
          option.addEntityName(null);
        }).to.throw('An entity name has to be passed so as to be added to the option.');
      });
    });
    describe("when passing a name that hasn't been added yet", () => {
      let option;

      before(() => {
        option = new JDLBinaryOption({ name: binaryOptions.Options.DTO, value: binaryOptions.Values.dto.MAPSTRUCT });
        option.addEntityName('A');
      });

      it('should change the set', () => {
        expect(option.entityNames.size).to.equal(1);
      });
    });
    describe('when passing a name that has already been added', () => {
      let option;

      before(() => {
        option = new JDLBinaryOption({ name: binaryOptions.Options.DTO, value: binaryOptions.Values.dto.MAPSTRUCT });
        option.addEntityName('A');
        option.addEntityName('A');
      });

      it('should not change the size', () => {
        expect(option.entityNames.size).to.equal(1);
      });
    });
    describe('when passing an excluded name', () => {
      let option;

      before(() => {
        option = new JDLBinaryOption({ name: binaryOptions.Options.DTO, value: binaryOptions.Values.dto.MAPSTRUCT });
        option.addEntityName('A');
        option.excludeEntityName('A');
      });

      it('should not change the sizes', () => {
        expect(option.entityNames.size).to.equal(1);
        expect(option.excludedNames.size).to.equal(0);
      });
    });
  });
  describe('excludeEntityName', () => {
    describe('when passing a nil name', () => {
      let option;

      before(() => {
        option = new JDLBinaryOption({ name: binaryOptions.Options.DTO, value: binaryOptions.Values.dto.MAPSTRUCT });
      });

      it('should fail', () => {
        expect(() => {
          option.excludeEntityName(null);
        }).to.throw('An entity name has to be passed so as to be excluded from the option.');
      });
    });
    describe("when passing a name that hasn't been excluded yet", () => {
      let option;

      before(() => {
        option = new JDLBinaryOption({ name: binaryOptions.Options.DTO, value: binaryOptions.Values.dto.MAPSTRUCT });
        option.excludeEntityName('A');
      });

      it('should change the set', () => {
        expect(option.excludedNames.size).to.equal(1);
      });
    });
    describe('when passing a name that has already been excluded', () => {
      let option;

      before(() => {
        option = new JDLBinaryOption({ name: binaryOptions.Options.DTO, value: binaryOptions.Values.dto.MAPSTRUCT });
        option.excludeEntityName('A');
        option.excludeEntityName('A');
      });

      it('should not change the size', () => {
        expect(option.excludedNames.size).to.equal(1);
      });
    });
    describe('when passing an added name', () => {
      let option;

      before(() => {
        option = new JDLBinaryOption({ name: binaryOptions.Options.DTO, value: binaryOptions.Values.dto.MAPSTRUCT });
        option.excludeEntityName('A');
        option.addEntityName('A');
      });

      it('should not change the size', () => {
        expect(option.entityNames.size).to.equal(1);
      });
    });
  });
  describe('addEntitiesFromAnotherOption', () => {
    const option = new JDLBinaryOption({
      name: binaryOptions.Options.DTO,
      value: binaryOptions.Values.dto.MAPSTRUCT,
      entityNames: new Set(['B', 'C']),
      excludedNames: new Set(['Z']),
    });

    describe('when passing an invalid option', () => {
      it('should return false', () => {
        expect(option.addEntitiesFromAnotherOption()).to.be.false;
      });
    });
    describe('when passing a valid option', () => {
      let returned;

      before(() => {
        const option2 = new JDLBinaryOption({
          name: binaryOptions.Options.DTO,
          value: binaryOptions.Values.dto.MAPSTRUCT,
          entityNames: new Set(['A', 'C']),
          excludedNames: new Set(['Y']),
        });
        returned = option.addEntitiesFromAnotherOption(option2);
      });

      it('should return true', () => {
        expect(returned).to.be.true;
      });
      it('should add the source entities to the target option', () => {
        expect(option.entityNames).to.deep.equal(new Set(['B', 'C', 'A']));
      });
      it('should add the excluded source entities to the target option', () => {
        expect(option.excludedNames).to.deep.equal(new Set(['Z', 'Y']));
      });
    });
  });
  describe('toString', () => {
    let option;

    before(() => {
      option = new JDLBinaryOption({
        name: binaryOptions.Options.DTO,
        value: binaryOptions.Values.dto.MAPSTRUCT,
      });
      expect(option.toString()).to.equal(`${binaryOptions.Options.DTO} * with ${binaryOptions.Values.dto.MAPSTRUCT}`);
      option.addEntityName('D');
      expect(option.toString()).to.equal(`${binaryOptions.Options.DTO} D with ${binaryOptions.Values.dto.MAPSTRUCT}`);
      option.addEntityName('E');
      option.addEntityName('F');
      expect(option.toString()).to.equal(`${binaryOptions.Options.DTO} D, E, F with ${binaryOptions.Values.dto.MAPSTRUCT}`);
      option.excludeEntityName('A');
      expect(option.toString()).to.equal(`${binaryOptions.Options.DTO} D, E, F with ${binaryOptions.Values.dto.MAPSTRUCT} except A`);
      option.excludeEntityName('B');
      option.excludeEntityName('C');
      expect(option.toString()).to.equal(`${binaryOptions.Options.DTO} D, E, F with ${binaryOptions.Values.dto.MAPSTRUCT} except A, B, C`);
      option = new JDLBinaryOption({
        name: binaryOptions.Options.PAGINATION,
        value: binaryOptions.Values.pagination.PAGINATION,
      });
    });

    it('should stringify the option', () => {
      expect(option.toString()).to.equal(`paginate * with ${binaryOptions.Values.pagination.PAGINATION}`);
    });
  });
});
