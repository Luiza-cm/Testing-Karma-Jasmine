import { UniqueIdService } from './unique-id.service';

describe(UniqueIdService.name, () => {

  // permite criar uma nova instância de classe para cada teste realizado no it
  let service: UniqueIdService = null;
  beforeEach( () => {
    service = new UniqueIdService();
  });

  it('#generateUniqueIdWithPrefix should generate id when called with prefix', () => {
    const id = service.generateUniqueIdWithPrefix('app');
    expect(id.startsWith('app-')).toBeTrue();
  });

  it(`#${UniqueIdService.prototype.generateUniqueIdWithPrefix.name}
    should not generate duplicated IDs when called multiple times`, () => {

      const ids = new Set();
    for (let i=0; i<50; i++) {
      ids.add(service.generateUniqueIdWithPrefix('app'));
    }
    expect(ids.size).toBe(50);
  });

  it(`#${UniqueIdService.prototype.getNumberOfGeneratedUniqueIds.name}
    should return the number of generatedIds when called`, () => {

      service.generateUniqueIdWithPrefix('app');
    service.generateUniqueIdWithPrefix('app');
    expect(service.getNumberOfGeneratedUniqueIds()).toBe(2);
  });

  it(`#${UniqueIdService.prototype.generateUniqueIdWithPrefix.name}
    should throw when called with empty`, () => {

      // expect( () => { service.generateUniqueIdWithPrefix(null) }).toThrow();
      // expect( () => { service.generateUniqueIdWithPrefix(undefined) }).toThrow();
      // expect( () => { service.generateUniqueIdWithPrefix('') }).toThrow();

      const emptyValues = [null, undefined, '', '0', '1'];
      emptyValues.forEach( emptyValue => {
        expect( () => { service.generateUniqueIdWithPrefix(emptyValue) })
        .withContext(`Empty value: ${emptyValue}`)
        .toThrow();
      });
  });

});
