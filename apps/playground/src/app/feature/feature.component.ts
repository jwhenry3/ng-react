import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { Feature, FeatureProps } from '@playground/feature';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ReactHandler } from '../react-handler';

@Component({
  selector: 'feature',
  templateUrl: './feature.component.html',
})
export class FeatureComponent
  extends ReactHandler<FeatureProps>
  implements AfterViewInit, OnDestroy {
  @ViewChild('container')
  _container: ElementRef<HTMLDivElement>;

  onDestroy = new Subject();

  constructor() {
    super(Feature);
  }

  ngAfterViewInit() {
    if (this._container.nativeElement) {
      this.mount(this._container.nativeElement, { seconds: 0 });
      interval(1000)
        .pipe(takeUntil(this.onDestroy))
        .subscribe((i) => this.updateProps({ seconds: i + 1 }));
    } else throw new Error('Container not mounted');
  }

  ngOnDestroy() {
    this.onDestroy.next();
    this.unmount();
  }
}
