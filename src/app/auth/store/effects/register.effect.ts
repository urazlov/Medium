import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthService } from "../../services/auth.service";
import { registerAction, registerFailureAction, registerSuccessAction } from "../actions/register.action";
import {catchError, switchMap, map, tap} from "rxjs/operators";
import { CurrentUserInterface } from "src/app/shared/types/currentUser.interface";
import {of} from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import { PersistanceService } from "src/app/shared/services/persistance.service";
import { Router } from "@angular/router";

@Injectable()
export class RegisterEffect {
  register$ = createEffect(() =>
  this.actions$.pipe(
    ofType(registerAction),
    switchMap(({request}) => {
      return this.authService.register(request).pipe(
        map((currentUser: CurrentUserInterface) => {
          this.persistanceService.set("accessToken", currentUser.token)
          return registerSuccessAction({currentUser})
        }),
        catchError((errorResposne: HttpErrorResponse) => {
          return of (registerFailureAction({errors: errorResposne.error.errors}))
        })
      )
    })
  ))

  redirectAfterSubmit$ = createEffect(() =>
  this.actions$.pipe(
    ofType(registerSuccessAction),
    tap(() => {
      this.router.navigateByUrl("/")
    })
  ), {dispatch: false})

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private persistanceService: PersistanceService,
    private router: Router){}
}
