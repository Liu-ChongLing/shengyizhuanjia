import { SharedModule } from './../../shared/shared.module';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides } from '@ionic/angular';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Component({
  selector: 'app-guide',
  templateUrl: './guide.page.html',
  styleUrls: ['./guide.page.scss'],
  // encapsulation: ViewEncapsulation.None
})
export class GuidePage implements OnInit {
  showSkip = true;
  @ViewChild('slides', { static: false }) slides: IonSlides;
  constructor(private localStorageService: LocalStorageService, private router:
    Router) { }
  ngOnInit() {}
  onSlideWillChange(event: Event) {
    // console.log(event);
    this.slides.isEnd().then((end) => {
      this.showSkip = !end;
    });
  }
  onSkip(event: Event){
    this.router.navigateByUrl('passport/signup');
  }
}
