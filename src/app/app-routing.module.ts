import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GamePageComponent } from './game-page/game-page.component';
import { EngineTesterComponent } from './engine-tester/engine-tester.component';

const routes: Routes = [
  {
    path: 'game',
    component: GamePageComponent
  },
  {
    path: 'engineTester',
    component: EngineTesterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
