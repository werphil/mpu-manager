import { YesNoPipe } from './YesNo.pipe';
import { NgModule } from '@angular/core';



export const PIPES = [
    YesNoPipe
];

@NgModule({
  declarations: PIPES,
  exports: PIPES,
})
export class PipesModule {}
