import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HelloComponent } from './components/hello/hello.component';
import { NavComponent } from './components/partial/nav/nav.component';
import { LoadingComponent } from './components/partial/loading/loading.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HelloComponent,
    NavComponent,
    LoadingComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Ayesha-angular-sandbox';
}
