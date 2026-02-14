import { strict as assert } from 'node:assert';
import { Uid } from '../models/index.js';
describe('Uid', () => {
    it('returns a 32 char string', (done) => {
        const id = Uid.rand();
        assert.equal(typeof id, 'string');
        assert.equal(id.length, 32);
        done();
    });
    it('returns a different string every time', (done) => {
        const ids = {};
        for (let i = 0; i < 16; i++) {
            const id = Uid.rand();
            assert(!ids[id], 'id was encountered multiple times');
            ids[id] = true;
        }
        done();
    });
});
//# sourceMappingURL=Uid.test.js.map