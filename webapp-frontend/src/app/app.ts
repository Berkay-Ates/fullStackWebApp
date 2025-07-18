import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./shared/components/header/header";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  template: `   
    <app-header/>
    
    <main>
      <router-outlet/>
    </main>

    <router-outlet />
  `,
  styles: [`
    main {
      padding:16px;
    }
    `
  ],
})
export class App {
  protected title = 'first-ng-app';
}