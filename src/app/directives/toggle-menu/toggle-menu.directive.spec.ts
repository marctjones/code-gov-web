import { APP_BASE_HREF } from '@angular/common';
import { Component, Directive } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';
import { Location } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SpyLocation } from '@angular/common/testing';

import { Observable } from 'rxjs';
import { Angulartics2 } from 'angulartics2';

import { ToggleMenuDirective } from './toggle-menu.directive';
import { MobileService } from '../../services/mobile';


describe('ToggleMenuDirective', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ ToggleMenuDirective, TestComponent ],
      imports: [ RouterModule.forRoot([]) ],
      providers: [
        { provide: MobileService, useClass: mockMobileService },
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    });

    this.fixture = TestBed.createComponent(TestComponent);
    this.fixture.detectChanges();
  });

  describe('onClick', () => {
    it('should change the aria-pressed attribute', () => {
      let menu = this.fixture.debugElement.nativeElement.querySelector('#menu');
      const ariaAttribute = menu.getAttribute('aria-pressed');

      menu.click();
      expect(Boolean(menu.getAttribute('aria-pressed'))).not.toEqual(!ariaAttribute);
    });

    it('should trigger the MobileService', () => {
      let mobileService = TestBed.get(MobileService);
      spyOn(mobileService, 'toggleMenu');

      this.fixture.debugElement.nativeElement.querySelector('#menu').click();
      expect(mobileService.toggleMenu).toHaveBeenCalled();
    });
  });
});

@Component({
    selector: 'test',
    template: `
      <a toggle-menu id="menu" routerLink="/explore-code" aria-pressed="false">Test Link</a>
    `
})

class TestComponent {
}

class mockMobileService {
  hideMenu() {
    return true;
  }

  toggleMenu() {
    return true;
  }
}
