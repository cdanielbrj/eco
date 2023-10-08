import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthGuard } from './auth.guard';
import { Router } from '@angular/router';

describe('authGuard', () => {
  let guard: AuthGuard;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [AuthGuard]
    });
    guard = TestBed.inject(AuthGuard);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should redirect to login if not authenticated', () => {
    spyOn(sessionStorage, 'getItem').and.returnValue(null);
    expect(guard.canActivate({} as any, {} as any)).toEqual(router.createUrlTree(['/login']));
  });

  it('should allow route access if authenticated', () => {
    spyOn(sessionStorage, 'getItem').and.returnValue('some_token');
    expect(guard.canActivate({} as any, {} as any)).toBeTrue();
  });
});
