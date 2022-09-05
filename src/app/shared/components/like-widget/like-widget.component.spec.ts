import { LikeWidgetModule } from './like-widget.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikeWidgetComponent } from './like-widget.component';

describe('LikeWidgetComponent', () => {
  let component: LikeWidgetComponent = null;
  let fixture: ComponentFixture<LikeWidgetComponent> = null;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ LikeWidgetModule ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LikeWidgetComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should auto-generate ID during ngOnInit when (@Input id) is not assigned', () => {
    fixture.detectChanges();
    expect(component.id).toBeTruthy();
  });

  it('Should NOT auto-generate during ngOnInit when (@Inout id) is assigned', () => {
    const someId = 'someId';
    component.id = someId;
    fixture.detectChanges();
    expect(component.id).toBe(someId);
  });

  // it(`#${LikeWidgetComponent.prototype.like.name}
  //   should trigger emission when called`, (done) => {
  //     fixture.detectChanges();
  //     component.liked.subscribe( () => { // ao usar funcoes assincronas e observables, utilizar done para garantir que o jasmine falhe em casos de erro
  //       expect(true).toBeTrue();
  //       done();
  //     });
  //     component.like();
  // });

  // mesmo teste acima, porem usando spy do jasmine para facilitar o teste na captacao de algum evento
  it(`#${LikeWidgetComponent.prototype.like.name}
    should trigger (@Output liked) when called`, () => {
      spyOn(component.liked, 'emit');
      fixture.detectChanges();
      component.like();
      expect(component.liked.emit).toHaveBeenCalled();
  });

});
