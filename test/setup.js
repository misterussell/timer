
// The imports below will handle chai-enzyme testing
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';

// expect is imported for standard testing
// import { expect } from 'chai';

//shallow is imported for React shallow rendering for testing virtual dom rendering
// import { shallow } from 'enzyme';

//React is is imported for jsx syntax for shallow rendering
// import React from 'react';

//chaiEnzynme is invoked to fulfill final install of the chai-enzyme lib
chai.use(chaiEnzyme());
